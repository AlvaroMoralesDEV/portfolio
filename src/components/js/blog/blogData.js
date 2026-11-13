import entries from './posts.json';
import agenticPatterns from './posts/agenticPatterns';
import architecturePatterns from './posts/architecturePatterns';
import ciCdForAi from './posts/ciCdForAi';
import howIWorkWithAi from './posts/howIWorkWithAi';
import mcpInPlainWords from './posts/mcpInPlainWords';
import pickAndRoll from './posts/pickAndRoll';
import ragInProduction from './posts/ragInProduction';
import sandersonLaws from './posts/sandersonLaws';
import tddBddSpecs from './posts/tddBddSpecs';
import trustInProduction from './posts/trustInProduction';
import whatMattersInAi from './posts/whatMattersInAi';
import whatIsFde from './posts/whatIsFde';
import workflowOrAgent from './posts/workflowOrAgent';

// posts.json holds the list (title, description, date, tags, cover) so that
// scripts/postbuild-meta.js can read it at build time. The article bodies live in posts/.
// An entry with `url` instead of `slug` is an article published elsewhere: it only gets a card.
const BODIES = {
  'sandersons-laws-for-ai-agents': sandersonLaws,
  'ci-cd-for-ai-systems': ciCdForAi,
  'agentic-patterns': agenticPatterns,
  'architecture-patterns-and-microservices': architecturePatterns,
  'mcp-in-plain-words': mcpInPlainWords,
  'how-i-work-with-ai': howIWorkWithAi,
  'pick-and-roll-of-ai-agents': pickAndRoll,
  'what-matters-in-ai-engineering': whatMattersInAi,
  'trusting-ai-in-production': trustInProduction,
  'tdd-bdd-and-sdd': tddBddSpecs,
  'workflow-or-agent': workflowOrAgent,
  'rag-in-production': ragInProduction,
  'what-is-a-forward-deployed-engineer': whatIsFde,
};

export const BLOG_PATH = '/blog';
export const postPath = (slug) => `${BLOG_PATH}/${slug}`;

export const blogMeta = {
  path: BLOG_PATH,
  title: 'Blog | Alvaro Morales',
  description: 'Articles on applied AI, RAG, AI agents, automation and the work of a Forward Deployed Engineer.',
};

const WORDS_PER_MINUTE = 200;

// Every string in the article body counts as reading, except code.
const countWords = (value, key) => {
  if (['code', 'icon', 'type', 'id', 'to', 'url', 'sources'].includes(key)) return 0;
  if (typeof value === 'string') return value.split(/\s+/).filter(Boolean).length;
  if (Array.isArray(value)) return value.reduce((n, v) => n + countWords(v), 0);
  if (value && typeof value === 'object') return Object.entries(value).reduce((n, [k, v]) => n + countWords(v, k), 0);
  return 0;
};

// An article dated in the future is scheduled: the live site hides it until that day.
// The dev server and the tests show everything, with a "Scheduled" mark on the card.
const TODAY = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD, local time
const SHOW_SCHEDULED = process.env.NODE_ENV !== 'production';

// Newest first; entries with the same date keep the order of posts.json.
export const posts = entries
  .filter((entry) => SHOW_SCHEDULED || entry.date <= TODAY)
  .map((entry, order) => {
    const body = entry.slug ? BODIES[entry.slug] : null;
    return {
      ...entry,
      order,
      sections: body?.sections,
      sources: body?.sources || [],
      scheduled: entry.date > TODAY,
      minutes: body ? Math.max(1, Math.round(countWords(body) / WORDS_PER_MINUTE)) : null,
    };
  })
  .sort((a, b) => b.date.localeCompare(a.date) || a.order - b.order);

export const findPost = (slug) => posts.find((p) => p.slug === slug && p.sections);

export const tagPath = (tag) => `${BLOG_PATH}?tag=${encodeURIComponent(tag)}`;

// Every tag in use, most used first.
const tagCount = posts.flatMap((p) => p.tags).reduce((count, t) => ({ ...count, [t]: (count[t] || 0) + 1 }), {});
export const allTags = Object.keys(tagCount).sort((a, b) => tagCount[b] - tagCount[a] || a.localeCompare(b));
// The filter on the list page only offers topics with more than one article.
export const filterTags = allTags.filter((t) => tagCount[t] > 1);

/** Home page: pinned entries always show; the newest articles fill the remaining places. */
export const homePosts = (limit = 3) => {
  const pinned = posts.filter((p) => p.pinned);
  const latest = posts.filter((p) => !p.pinned).slice(0, Math.max(0, limit - pinned.length));
  return posts.filter((p) => pinned.includes(p) || latest.includes(p));
};

/**
 * Articles to read after this one: the ones sharing most tags with it (newest first on a tie).
 * Each comes with `shared`, the tags it has in common. Articles with nothing in common are left out.
 */
export const relatedPosts = (slug, limit = 2) => {
  const current = posts.find((p) => p.slug === slug);
  if (!current) return [];
  return posts
    .filter((p) => p !== current)
    .map((p) => ({ ...p, shared: p.tags.filter((t) => current.tags.includes(t)) }))
    .filter((p) => p.shared.length > 0)
    .sort((a, b) => b.shared.length - a.shared.length)
    .slice(0, limit);
};

export const formatDate = (iso) =>
  new Date(`${iso}T00:00:00`).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
