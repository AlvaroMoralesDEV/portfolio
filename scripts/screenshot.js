// Dev-only screenshot helper (not part of the build). Drives a running Chrome over the
// DevTools protocol, because plain `chrome --screenshot` ignores #hash scrolling and
// stretches 100vh sections. Needs Node 18+ (global fetch) and Node 22+ (global WebSocket).
//
// 1. Start Chrome headless with a debug port (any empty profile folder outside the repo):
//      chrome --headless=new --remote-debugging-port=9333 --user-data-dir=<tmp>/chrome-profile --hide-scrollbars about:blank
// 2. With the dev server (npm start) or a served build running:
//      node scripts/screenshot.js <outDir> <name> <url> <width> [cssSelector] [reduced]
//    e.g. node scripts/screenshot.js <tmp>/shots rag http://localhost:3000/blog/rag-in-production 390 ".blog-frame"
//
// It scrolls through the whole page first so every IntersectionObserver reveal fires, prints
// the page's scrollWidth (must equal the width: no horizontal scroll) and title, then writes
// one PNG per element matching the selector (default: main). Pass "reduced" as the 6th
// argument to emulate prefers-reduced-motion. Close Chrome when done.
const fs = require('fs');
const path = require('path');

const [outDir, name, url, widthArg, selector = 'main', reduced] = process.argv.slice(2);
if (!outDir || !name || !url || !widthArg) {
  console.error('usage: node scripts/screenshot.js <outDir> <name> <url> <width> [selector] [reduced]');
  process.exit(1);
}
const width = Number(widthArg);
const DEBUG = 'http://127.0.0.1:9333';
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

(async () => {
  fs.mkdirSync(outDir, { recursive: true });
  const tab = await (await fetch(`${DEBUG}/json/new?about:blank`, { method: 'PUT' })).json();
  const ws = new WebSocket(tab.webSocketDebuggerUrl);
  await new Promise((r) => (ws.onopen = r));

  let id = 0;
  const pending = new Map();
  ws.onmessage = (m) => {
    const d = JSON.parse(m.data);
    if (d.id && pending.has(d.id)) {
      pending.get(d.id)(d.result);
      pending.delete(d.id);
    }
  };
  const send = (method, params = {}) =>
    new Promise((r) => {
      pending.set(++id, r);
      ws.send(JSON.stringify({ id, method, params }));
    });
  const evaluate = async (expression) =>
    (await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })).result.value;

  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width, height: 900, deviceScaleFactor: 1, mobile: width < 600 });
  if (reduced) {
    await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] });
  }
  await send('Page.navigate', { url });
  await sleep(1500);

  // scroll through the page so every reveal animation is triggered
  const height = await evaluate('document.documentElement.scrollHeight');
  for (let y = 0; y < height; y += 500) {
    await evaluate(`window.scrollTo(0, ${y})`);
    await sleep(120);
  }
  await sleep(1200);

  console.log(
    name,
    await evaluate(
      'JSON.stringify({ scrollWidth: document.documentElement.scrollWidth, width: document.documentElement.clientWidth, path: location.pathname, title: document.title })'
    )
  );

  const rects = JSON.parse(
    await evaluate(
      `JSON.stringify([...document.querySelectorAll(${JSON.stringify(selector)})].map((e) => {
        const r = e.getBoundingClientRect();
        return { x: 0, y: Math.max(0, r.top + scrollY - 10), width: ${width}, height: r.height + 20 };
      }))`
    )
  );
  for (const [i, clip] of rects.entries()) {
    const shot = await send('Page.captureScreenshot', { format: 'png', captureBeyondViewport: true, clip: { ...clip, scale: 1 } });
    const file = path.join(outDir, `${name}-${String(i).padStart(2, '0')}.png`);
    fs.writeFileSync(file, Buffer.from(shot.data, 'base64'));
    console.log('wrote', file);
  }
  if (rects.length === 0) console.log('no element matches', selector);

  await fetch(`${DEBUG}/json/close/${tab.id}`);
  ws.close();
})();
