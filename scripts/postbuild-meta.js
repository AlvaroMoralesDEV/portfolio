// Runs after `react-scripts build` (npm "postbuild").
// Link previews (LinkedIn, WhatsApp, Slack) do not run JavaScript, so they only see the
// tags in the HTML file they are served. For every page with its own preview this writes
// build/<path>/index.html: the same app shell, with that page's title, description,
// Open Graph and canonical tags. Static hosts serve it before falling back to index.html.
//
// Pages: the NOC case study, the blog list and every article written on this site.
// Keep the blog list values in sync with `blogMeta` in src/components/js/blog/blogData.js.
const fs = require('fs');
const path = require('path');
const nocMeta = require('../src/components/js/caseStudy/pageMeta.json');
const posts = require('../src/components/js/blog/posts.json');

const SITE_URL = 'https://alvaromoralesfc.com';
const AUTHOR = 'Alvaro Morales';
const root = path.join(__dirname, '..');
const buildDir = path.join(root, 'build');

const pages = [
  nocMeta,
  {
    path: '/blog',
    title: `Blog | ${AUTHOR}`,
    description: 'Articles on applied AI, RAG, AI agents, automation and the work of a Forward Deployed Engineer.',
  },
  ...posts
    .filter((p) => p.slug)
    .map((p) => ({ path: `/blog/${p.slug}`, title: `${p.title} | ${AUTHOR}`, description: p.description })),
];

const escapeAttr = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;');
const escapeText = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');

const shell = fs.readFileSync(path.join(buildDir, 'index.html'), 'utf8');
if (!/<title>[^<]*<\/title>/.test(shell)) throw new Error('postbuild-meta: <title> not found');

pages.forEach((meta) => {
  const url = SITE_URL + meta.path;
  let html = shell;

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

  html = html.replace(/<title>[^<]*<\/title>/, () => `<title>${escapeText(meta.title)}</title>`);

  const outDir = path.join(buildDir, ...meta.path.split('/').filter(Boolean));
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html);
  console.log(`postbuild-meta: wrote ${path.relative(root, path.join(outDir, 'index.html'))}`);
});
