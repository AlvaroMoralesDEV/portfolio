// Runs after `react-scripts build` (npm "postbuild").
// Link previews (LinkedIn, WhatsApp, Slack) do not run JavaScript, so they only see the
// tags in the HTML file they are served. This writes build/projects/noc/index.html: the
// same app shell, with the case study's own title, description, Open Graph and canonical
// tags. Static hosts serve it for /projects/noc before falling back to index.html.
const fs = require('fs');
const path = require('path');
const meta = require('../src/components/js/caseStudy/pageMeta.json');

const SITE_URL = 'https://alvaromoralesfc.com';
const buildDir = path.join(__dirname, '..', 'build');
const url = SITE_URL + meta.path;

const escapeAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const escapeText = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

let html = fs.readFileSync(path.join(buildDir, 'index.html'), 'utf8');

// [attribute that identifies the tag, attribute to rewrite, new value]
const replacements = [
  ['name="description"', 'content', meta.description],
  ['property="og:title"', 'content', meta.title],
  ['property="og:description"', 'content', meta.description],
  ['property="og:url"', 'content', url],
  ['name="twitter:title"', 'content', meta.title],
  ['name="twitter:description"', 'content', meta.description],
  ['rel="canonical"', 'href', url],
];

replacements.forEach(([marker, attr, value]) => {
  const pattern = new RegExp(`(<(?:meta|link)[^>]*${marker}[^>]*${attr}=")[^"]*(")`);
  if (!pattern.test(html)) throw new Error(`postbuild-meta: tag with ${marker} not found in build/index.html`);
  html = html.replace(pattern, (_, before, after) => before + escapeAttr(value) + after);
});

if (!/<title>[^<]*<\/title>/.test(html)) throw new Error('postbuild-meta: <title> not found');
html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeText(meta.title)}</title>`);

const outDir = path.join(buildDir, ...meta.path.split('/').filter(Boolean));
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, 'index.html'), html);
console.log(`postbuild-meta: wrote ${path.relative(path.join(__dirname, '..'), path.join(outDir, 'index.html'))}`);
