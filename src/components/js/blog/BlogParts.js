import React from 'react';
import { Link } from 'react-router-dom';
import { useInView, useReducedMotion } from '../hooks';
import { BeforeAfter, Icon, ProblemFlow, RagFlow, Timeline } from '../caseStudy/CaseStudyParts';
import { formatDate, postPath, tagPath } from './blogData';

// ---------------------------------------------------------------------------
// Cover art: one small illustration per article, used on the cards and in the hero.
// Decorative only (the title says what the article is about).
// ---------------------------------------------------------------------------

// Shared by the "vectors" cover and the in-article diagram. x, y in a 340×210 viewBox.
const VECTOR_GROUPS = [
  { label: 'Refund policy', x: 70, y: 22, points: [[52, 48], [78, 40], [90, 66], [60, 76], [74, 58]] },
  { label: 'Shipping times', x: 258, y: 34, points: [[236, 60], [262, 52], [280, 76], [250, 92], [268, 70]] },
  { label: 'Account access', x: 172, y: 200, points: [[150, 150], [178, 140], [194, 166], [162, 176]] },
];
const VECTOR_QUERY = [116, 96];
const VECTOR_HITS = [[90, 66], [74, 58], [60, 76]];
const isHit = ([x, y]) => VECTOR_HITS.some(([hx, hy]) => hx === x && hy === y);

const VectorMarks = () => (
  <>
    {VECTOR_HITS.map(([x, y], i) => (
      <line
        key={`${x}-${y}`}
        className="blog-svg-hot blog-svg-draw"
        style={{ '--s': i }}
        x1={VECTOR_QUERY[0]}
        y1={VECTOR_QUERY[1]}
        x2={x}
        y2={y}
      />
    ))}
    {VECTOR_GROUPS.flatMap((g) => g.points).map((p) => (
      <circle key={p.join('-')} className={isHit(p) ? 'blog-svg-dot is-hot' : 'blog-svg-dot'} cx={p[0]} cy={p[1]} r="5" />
    ))}
    <circle className="blog-svg-halo" cx={VECTOR_QUERY[0]} cy={VECTOR_QUERY[1]} r="13" />
    <circle className="blog-svg-query" cx={VECTOR_QUERY[0]} cy={VECTOR_QUERY[1]} r="7" />
  </>
);

// A small robot head (antenna, eyes, mouth, ears), centred on cx, cy: marks the agent in a cover.
const RobotGlyph = ({ cx, cy, scale = 1 }) => (
  <path
    className="blog-svg-glyph"
    transform={`translate(${cx} ${cy}) scale(${scale})`}
    d="M-9 -4 h18 v13 h-18 Z M0 -4 v-5 M0 -10 v-0.5 M-4 1 v2 M4 1 v2 M-3 6 h6 M-12 1 v4 M12 1 v4"
  />
);

const COVERS = {
  // customer on the left, product on the right, the engineer in the middle
  bridge: (
    <>
      {[26, 54, 82].map((y, i) => (
        <g key={y}>
          <rect className="blog-svg-box" x="22" y={y} width="72" height="20" rx="5" />
          <path className="blog-svg-line blog-svg-flow" style={{ '--s': i }} d={`M94 ${y + 10} C118 ${y + 10} 118 64 138 64`} />
          <rect className="blog-svg-box" x="226" y={y} width="72" height="20" rx="5" />
          <path className="blog-svg-line blog-svg-flow" style={{ '--s': i }} d={`M182 64 C202 64 202 ${y + 10} 226 ${y + 10}`} />
        </g>
      ))}
      <path className="blog-svg-text-line" d="M32 36h30 M32 64h44 M32 92h24 M236 36h44 M236 64h26 M236 92h36" />
      <circle className="blog-svg-halo" cx="160" cy="64" r="28" />
      <circle className="blog-svg-hub" cx="160" cy="64" r="22" />
      <path className="blog-svg-glyph" d="M154 57l-7 7 7 7 M166 57l7 7-7 7 M162 54l-4 20" />
    </>
  ),
  // scattered grey noise, and a few orange points that line up: the signal
  signal: (
    <>
      {[[34, 30], [62, 96], [88, 54], [104, 108], [124, 22], [150, 84], [188, 112], [206, 30], [232, 92], [252, 58], [276, 110], [292, 34], [48, 64], [174, 40], [266, 80]].map(([x, y]) => (
        <circle key={`${x}-${y}`} className="blog-svg-dot" cx={x} cy={y} r="3.5" opacity="0.55" />
      ))}
      <path className="blog-svg-hot blog-svg-flow" d="M46 100 L118 74 L196 70 L278 40" />
      {[[46, 100], [118, 74], [196, 70], [278, 40]].map(([x, y]) => (
        <circle key={`s${x}`} className="blog-svg-dot is-hot" cx={x} cy={y} r="6" />
      ))}
      <circle className="blog-svg-halo" cx="278" cy="40" r="14" />
    </>
  ),
  // three connected steps, the last one under a magnifying glass and flagged
  trace: (
    <>
      <path className="blog-svg-line blog-svg-flow" d="M78 64 H120 M168 64 H204" />
      <rect className="blog-svg-box" x="30" y="50" width="48" height="28" rx="7" />
      <rect className="blog-svg-box" x="120" y="50" width="48" height="28" rx="7" />
      <path className="blog-svg-text-line" d="M40 64h28 M130 64h28" />
      <circle className="blog-svg-halo" cx="236" cy="64" r="40" />
      <circle className="blog-svg-back" cx="236" cy="64" r="32" />
      <circle className="blog-svg-hub" cx="236" cy="64" r="32" />
      <path className="blog-svg-glyph" d="M259 87 L284 112" strokeWidth="5" />
      <path className="blog-svg-glyph" d="M236 50 V66 M236 76 V78" strokeWidth="3" />
    </>
  ),
  // a spec page with ticked criteria turning into code
  spec: (
    <>
      <path className="blog-svg-box" d="M96 12 H150 L168 30 V116 H96 Z" />
      <path className="blog-svg-text-line" d="M150 12 V30 H168" />
      {[46, 66, 86].map((y) => (
        <g key={y}>
          <path className="blog-svg-glyph" d={`M106 ${y}l4 4 7-8`} />
          <path className="blog-svg-text-line" d={`M124 ${y}h32`} />
        </g>
      ))}
      <path className="blog-svg-text-line" d="M106 104h50" />
      <path className="blog-svg-line blog-svg-flow" d="M168 64 H206" />
      <circle className="blog-svg-halo" cx="234" cy="64" r="34" />
      <circle className="blog-svg-hub" cx="234" cy="64" r="26" />
      <path className="blog-svg-glyph" d="M227 56l-8 8 8 8 M241 56l8 8-8 8 M237 52l-6 24" />
    </>
  ),
  // a half court: the screener's block, the drive and the roll  // a half court: the screener's block, the drive and the roll
  court: (
    <g transform="translate(24 2) scale(0.85)">
      <path className="blog-svg-ring" d="M60 8 V40 A100 100 0 0 0 260 40 V8" />
      <path className="blog-svg-text-line" d="M40 8 H280 M130 8 V70 H190 V8" />
      <circle className="blog-svg-box" cx="160" cy="22" r="6" />
      <path className="blog-svg-hot blog-svg-flow" d="M196 116 C176 124 148 116 136 86" />
      <path className="blog-svg-line blog-svg-flow" style={{ '--s': 1 }} d="M162 98 L160 34" />
      <path className="blog-svg-glyph" d="M176 92l8 8 M184 92l-8 8" />
      <circle className="blog-svg-back" cx="162" cy="98" r="9" />
      <circle className="blog-svg-box" cx="162" cy="98" r="9" />
      <circle className="blog-svg-halo" cx="196" cy="116" r="14" />
      <circle className="blog-svg-back" cx="196" cy="116" r="9" />
      <circle className="blog-svg-hub" cx="196" cy="116" r="9" />
    </g>
  ),
  // a diff being reviewed: removed and added lines, and a check
  review: (
    <>
      <rect className="blog-svg-box" x="40" y="18" width="170" height="92" rx="8" />
      <path className="blog-svg-text-line" d="M58 36h96 M58 92h70" />
      <rect className="blog-svg-overlap" x="48" y="46" width="154" height="14" rx="3" opacity="0.5" />
      <rect className="blog-svg-overlap" x="48" y="64" width="154" height="14" rx="3" />
      <path className="blog-svg-glyph" d="M56 53h6 M56 71h6 M59 68v6" />
      <path className="blog-svg-text-line" d="M72 53h84 M72 71h108" />
      <path className="blog-svg-line blog-svg-flow" d="M210 64 H236" />
      <circle className="blog-svg-halo" cx="262" cy="64" r="30" />
      <circle className="blog-svg-hub" cx="262" cy="64" r="22" />
      <path className="blog-svg-glyph" d="M252 64l7 7 13-14" />
    </>
  ),
  // one path of fixed steps, and one agent that picks its own
  fork: (
    <>
      <path className="blog-svg-line blog-svg-flow" d="M76 64 C96 64 92 33 112 33" />
      <path className="blog-svg-line blog-svg-flow" style={{ '--s': 1 }} d="M160 33 H184" />
      <path className="blog-svg-line blog-svg-flow" style={{ '--s': 2 }} d="M232 33 H256" />
      <path className="blog-svg-line blog-svg-flow" style={{ '--s': 3 }} d="M76 64 C96 64 110 96 142 96" />
      <path className="blog-svg-line blog-svg-flow" style={{ '--s': 4 }} d="M178 96 C204 96 204 84 228 84" />
      <path className="blog-svg-line blog-svg-flow" style={{ '--s': 5 }} d="M178 96 C204 96 204 110 228 110" />
      <rect className="blog-svg-box" x="24" y="52" width="52" height="24" rx="12" />
      {[112, 184, 256].map((x) => (
        <rect key={x} className="blog-svg-box" x={x} y="22" width="48" height="22" rx="5" />
      ))}
      <rect className="blog-svg-box" x="228" y="74" width="48" height="20" rx="5" />
      <rect className="blog-svg-box" x="228" y="100" width="48" height="20" rx="5" />
      <path className="blog-svg-text-line" d="M36 64h28 M122 33h28 M194 33h20 M266 33h28" />
      <circle className="blog-svg-halo" cx="160" cy="96" r="24" />
      <circle className="blog-svg-hub" cx="160" cy="96" r="18" />
      <RobotGlyph cx={160} cy={96} />
    </>
  ),
  // a gateway in front of three services, each with its own store
  services: (
    <>
      {[20, 52, 84].map((y, i) => (
        <g key={y}>
          <path className="blog-svg-line blog-svg-flow" style={{ '--s': i }} d={`M96 64 C120 64 120 ${y + 12} 144 ${y + 12}`} />
          <path className="blog-svg-line blog-svg-flow" style={{ '--s': i + 1 }} d={`M216 ${y + 12} H250`} />
          <rect className="blog-svg-box" x="144" y={y} width="72" height="24" rx="6" />
          <rect className="blog-svg-hub" x="250" y={y + 2} width="40" height="20" rx="10" />
        </g>
      ))}
      <path className="blog-svg-text-line" d="M154 32h40 M154 64h28 M154 96h46" />
      <rect className="blog-svg-hub" x="40" y="46" width="56" height="36" rx="8" />
      <path className="blog-svg-glyph" d="M56 58h24 M56 64h24 M56 70h14" />
    </>
  ),
  // agents on the left, systems on the right, one protocol in the middle
  mcp: (
    <>
      {[30, 74].map((y, i) => (
        <g key={y}>
          <path className="blog-svg-line blog-svg-flow" style={{ '--s': i }} d={`M92 ${y + 12} C120 ${y + 12} 120 64 142 64`} />
          <rect className="blog-svg-box" x="28" y={y} width="64" height="24" rx="12" />
        </g>
      ))}
      {[20, 52, 84].map((y, i) => (
        <g key={y}>
          <path className="blog-svg-line blog-svg-flow" style={{ '--s': i + 2 }} d={`M178 64 C204 64 204 ${y + 12} 228 ${y + 12}`} />
          <rect className="blog-svg-box" x="228" y={y} width="64" height="24" rx="6" />
        </g>
      ))}
      <path className="blog-svg-text-line" d="M42 42h36 M42 86h24 M238 32h40 M238 64h26 M238 96h34" />
      <circle className="blog-svg-halo" cx="160" cy="64" r="26" />
      <circle className="blog-svg-hub" cx="160" cy="64" r="19" />
      <path className="blog-svg-glyph" d="M153 58v6a7 7 0 0 0 14 0v-6 M156 52v6 M164 52v6 M160 71v6" />
    </>
  ),
  // one agent in a loop, with the things it can reach around it
  agents: (
    <>
      {[[30, 22], [30, 82], [234, 22], [234, 82]].map(([x, y], i) => (
        <g key={`${x}-${y}`}>
          <path
            className="blog-svg-line blog-svg-flow"
            style={{ '--s': i }}
            d={`M${x < 160 ? x + 56 : x} ${y + 12} L${x < 160 ? 138 : 182} 64`}
          />
          <rect className="blog-svg-box" x={x} y={y} width="56" height="24" rx="6" />
        </g>
      ))}
      <path className="blog-svg-text-line" d="M40 34h32 M40 94h22 M244 34h24 M244 94h34" />
      <circle className="blog-svg-halo" cx="160" cy="64" r="30" />
      <circle className="blog-svg-hub" cx="160" cy="64" r="22" />
      <RobotGlyph cx={160} cy={64} scale={1.2} />
    </>
  ),
  // four pipeline stages in a line, the last one a deploy
  pipeline: (
    <>
      <path className="blog-svg-line blog-svg-flow" d="M72 64 H96" />
      <path className="blog-svg-line blog-svg-flow" style={{ '--s': 1 }} d="M144 64 H168" />
      <path className="blog-svg-line blog-svg-flow" style={{ '--s': 2 }} d="M216 64 H240" />
      {[24, 96, 168].map((x) => (
        <rect key={x} className="blog-svg-box" x={x} y="50" width="48" height="28" rx="7" />
      ))}
      <path className="blog-svg-text-line" d="M34 64h28 M106 64h20 M178 64h28" />
      <circle className="blog-svg-halo" cx="268" cy="64" r="34" />
      <circle className="blog-svg-hub" cx="268" cy="64" r="26" />
      <path className="blog-svg-glyph" d="M268 76 V54 M259 62l9-9 9 9" />
    </>
  ),
  // an open book with three marked rules on the right page
  laws: (
    <>
      <path
        className="blog-svg-box"
        d="M160 34 C140 22 108 22 86 30 V102 C108 94 140 94 160 106 C180 94 212 94 234 102 V30 C212 22 180 22 160 34 Z"
      />
      <path className="blog-svg-text-line" d="M160 34 V106 M100 46h44 M100 60h44 M100 74h30" />
      {[46, 62, 78].map((y) => (
        <g key={y}>
          <circle className="blog-svg-hub" cx="182" cy={y} r="5" />
          <path className="blog-svg-text-line" d={`M194 ${y}h26`} />
        </g>
      ))}
    </>
  ),
  vectors: (
    <g transform="translate(24 -24) scale(0.82)">
      <VectorMarks />
    </g>
  ),
  // a small n8n-style canvas: trigger, step, then a branch
  workflow: (
    <>
      <path className="blog-svg-line blog-svg-flow" d="M80 64h32" />
      <path className="blog-svg-line blog-svg-flow" style={{ '--s': 1 }} d="M168 64h14v-30h26" />
      <path className="blog-svg-line blog-svg-flow" style={{ '--s': 2 }} d="M168 64h14v30h26" />
      <path className="blog-svg-line blog-svg-flow" style={{ '--s': 3 }} d="M264 34h14v30h18" />
      <rect className="blog-svg-hub" x="24" y="50" width="56" height="28" rx="14" />
      <path className="blog-svg-glyph" d="M52 57v7l5 3" />
      <rect className="blog-svg-box" x="112" y="50" width="56" height="28" rx="6" />
      <rect className="blog-svg-box" x="208" y="20" width="56" height="28" rx="6" />
      <rect className="blog-svg-box" x="208" y="80" width="56" height="28" rx="6" />
      <path className="blog-svg-text-line" d="M124 60h32 M124 68h20 M220 30h32 M220 38h18 M220 90h32 M220 98h24" />
      <circle className="blog-svg-halo" cx="296" cy="64" r="11" />
      <circle className="blog-svg-query" cx="296" cy="64" r="6" />
    </>
  ),
};

export const BlogCover = ({ name }) => (
  <svg className="blog-cover" viewBox="0 0 320 128" aria-hidden="true" focusable="false">
    {COVERS[name]}
  </svg>
);

// ---------------------------------------------------------------------------
// Cards (home section and /blog)
// ---------------------------------------------------------------------------

export const PostMeta = ({ post, long }) => (
  <p className="blog-meta">
    {post.scheduled && <span className="blog-scheduled">Scheduled</span>}
    {long && !post.scheduled && 'Published '}
    <time dateTime={post.date}>{formatDate(post.date)}</time>
    <span aria-hidden="true"> · </span>
    {post.url ? post.source : `${post.minutes} min read`}
  </p>
);

/** One article card. The title link's ::after covers the card, so the whole card is one target. */
export function BlogCard({ post, index = 0 }) {
  const external = Boolean(post.url);
  return (
    <li className="blog-card" style={{ '--i': index }}>
      <div className="blog-card-cover">
        <BlogCover name={post.cover} />
      </div>
      <div className="blog-card-body">
        <PostMeta post={post} />
        <h3 className="blog-card-title">
          {external ? (
            <a href={post.url} className="blog-card-link" target="_blank" rel="noopener noreferrer">
              {post.title}
              <span className="cs-sr-only"> (opens the {post.source} in a new tab)</span>
            </a>
          ) : (
            <Link to={postPath(post.slug)} className="blog-card-link">
              {post.title}
            </Link>
          )}
        </h3>
        <p className="blog-card-text">{post.description}</p>
        <ul className="cs-tags" aria-label="Topics">
          {post.tags.map((t) => (
            <li key={t} className="cs-tag">
              {t}
            </li>
          ))}
        </ul>
        <p className="blog-card-cta" aria-hidden="true">
          {external ? `Read on the ${post.source}` : 'Read article'} <span className="blog-card-arrow">{external ? '↗' : '→'}</span>
        </p>
        {post.urlEs && (
          <a href={post.urlEs} className="blog-card-alt" target="_blank" rel="noopener noreferrer" lang="es" hrefLang="es">
            Versión en español ↗
          </a>
        )}
      </div>
    </li>
  );
}

export const BlogGrid = ({ items }) => {
  const [ref, visible] = useInView({ threshold: 0.05 });
  return (
    <ul ref={ref} className={`blog-grid pf-reveal ${visible ? 'is-visible' : ''}`}>
      {items.map((p, i) => (
        <BlogCard key={p.slug || p.url} post={p} index={i} />
      ))}
    </ul>
  );
};

// ---------------------------------------------------------------------------
// Article blocks
// ---------------------------------------------------------------------------

const Figure = ({ className = '', caption, children }) => {
  const [ref, visible] = useInView();
  return (
    <figure ref={ref} className={`blog-figure cs-reveal ${visible ? 'is-visible' : ''} ${className}`}>
      {children}
      {caption && <figcaption className="cs-caption">{caption}</figcaption>}
    </figure>
  );
};

// A loop of steps around a centre. The list next to it carries the text (and is the text alternative).
const CYCLE = { cx: 180, cy: 160, r: 96, labelR: 126 };

function Cycle({ block }) {
  const reduced = useReducedMotion();
  const { cx, cy, r, labelR } = CYCLE;
  const angle = (i) => ((-90 + (360 / block.steps.length) * i) * Math.PI) / 180;
  const at = (i, radius) => [cx + radius * Math.cos(angle(i)), cy + radius * Math.sin(angle(i))];
  // Labels grow away from the ring: to the right on the right half, to the left on the left half.
  const anchor = (i) => {
    const side = Math.cos(angle(i));
    if (side > 0.3) return 'start';
    return side < -0.3 ? 'end' : 'middle';
  };
  const ring = `M ${cx} ${cy - r} A ${r} ${r} 0 1 1 ${cx - 0.01} ${cy - r} Z`;
  return (
    <Figure className="blog-cycle">
      <svg className="blog-cycle-svg" viewBox="-36 0 432 320" role="img" aria-label={block.alt}>
        <path className="blog-svg-ring" d={ring} />
        {!reduced && (
          <circle className="blog-svg-query" r="5">
            <animateMotion dur="9s" repeatCount="indefinite" path={ring} />
          </circle>
        )}
        {block.center.map((line, i) => (
          <text key={line} className="blog-svg-centre" x={cx} y={cy - 4 + i * 16} textAnchor="middle">
            {line}
          </text>
        ))}
        {block.steps.map((s, i) => {
          const [x, y] = at(i, r);
          const [lx, ly] = at(i, labelR);
          return (
            <g key={s.label} className="blog-cycle-node" style={{ '--i': i }}>
              <circle className="blog-svg-back" cx={x} cy={y} r="19" />
              <circle className="blog-svg-hub" cx={x} cy={y} r="19" />
              <text className="blog-svg-num" x={x} y={y + 5} textAnchor="middle">
                {i + 1}
              </text>
              <text className="blog-svg-label" x={lx} y={ly + 4} textAnchor={anchor(i)}>
                {s.label}
              </text>
            </g>
          );
        })}
      </svg>
      <ol className="blog-cycle-list">
        {block.steps.map((s, i) => (
          <li key={s.label} style={{ '--i': i }}>
            <em aria-hidden="true">{i + 1}</em>
            <div>
              <strong>{s.label}</strong>
              <span>{s.text}</span>
            </div>
          </li>
        ))}
      </ol>
    </Figure>
  );
}

// Illustrative embedding space: points grouped by topic, the question and its nearest chunks.
const Vectors = ({ block }) => (
  <Figure className="blog-frame" caption={block.caption}>
    <svg className="blog-vectors-svg" viewBox="0 0 340 210" role="img" aria-label={block.alt}>
      {VECTOR_GROUPS.map((g) => (
        <text key={g.label} className="blog-svg-label is-soft" x={g.x} y={g.y} textAnchor="middle">
          {g.label}
        </text>
      ))}
      <VectorMarks />
      <text className="blog-svg-label is-accent" x={VECTOR_QUERY[0] + 14} y={VECTOR_QUERY[1] + 20}>
        Your question
      </text>
    </svg>
  </Figure>
);

// Illustrative chunking: one document, three chunks that overlap at the borders.
const CHUNK_BARS = [
  { x: 10, w: 124, y: 70 },
  { x: 108, w: 124, y: 92 },
  { x: 206, w: 124, y: 114 },
];
const TEXT_LINES = [0, 1, 2].map((row) => `M20 ${28 + row * 8}h${row === 2 ? 190 : 300}`).join(' ');

const Chunks = ({ block }) => (
  <Figure className="blog-frame" caption={block.caption}>
    <svg className="blog-chunks-svg" viewBox="0 0 340 140" role="img" aria-label={block.alt}>
      <text className="blog-svg-label is-soft" x="10" y="12">
        Document
      </text>
      <rect className="blog-svg-box" x="10" y="18" width="320" height="34" rx="5" />
      <path className="blog-svg-text-line" d={TEXT_LINES} />
      {[108, 206].map((x) => (
        <rect key={x} className="blog-svg-overlap" x={x} y="18" width="26" height={x === 108 ? 92 : 114} />
      ))}
      {CHUNK_BARS.map((c, i) => (
        <g key={c.x} className="blog-chunk" style={{ '--i': i }}>
          <rect className="blog-svg-hub" x={c.x} y={c.y} width={c.w} height="18" rx="4" />
          <text className="blog-svg-num" x={c.x + c.w / 2} y={c.y + 13} textAnchor="middle">
            Chunk {i + 1}
          </text>
        </g>
      ))}
      <text className="blog-svg-label is-accent" x="140" y="64">
        overlap
      </text>
    </svg>
  </Figure>
);

// Comparison table. Wide on phones, so it scrolls inside its own frame.
// The last column is the one the article is about, unless the block says `highlight: false`.
const keyClass = (block, i, cells) => (block.highlight !== false && i === cells.length - 1 ? 'is-key' : '');

const Matrix = ({ block }) => (
  <Figure caption={block.caption}>
    <div className="blog-matrix-scroll" tabIndex={0} role="region" aria-label="Comparison table">
      <table className="blog-matrix">
        <thead>
          <tr>
            <td />
            {block.columns.map((c, i) => (
              <th key={c} scope="col" className={keyClass(block, i, block.columns)}>
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row) => (
            <tr key={row.label}>
              <th scope="row">{row.label}</th>
              {row.cells.map((cell, i) => (
                <td key={cell} className={keyClass(block, i, row.cells)}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </Figure>
);

const Code = ({ block }) => (
  <Figure className="blog-code" caption={block.caption}>
    <span className="blog-code-lang">{block.lang}</span>
    <pre tabIndex={0} aria-label={`${block.lang} code`}>
      <code>{block.code}</code>
    </pre>
  </Figure>
);

const Cards = ({ block }) => (
  <ul className="cs-cards cs-cards-2">
    {block.items.map((c) => (
      <li key={c.title} className="cs-card">
        <Icon name={c.icon} />
        <h3>{c.title}</h3>
        <p>{c.text}</p>
      </li>
    ))}
  </ul>
);

// Illustrative diagrams, picked by `name` in a `pattern` block. 340×150 viewBox.
const Box = ({ x, y, w = 84, h = 32, label, hub }) => (
  <g>
    <rect className={hub ? 'blog-svg-hub' : 'blog-svg-box'} x={x} y={y} width={w} height={h} rx="7" />
    <text className="blog-svg-num" x={x + w / 2} y={y + h / 2 + 4} textAnchor="middle">
      {label}
    </text>
  </g>
);
const Wire = ({ d, s = 0 }) => <path className="blog-svg-line blog-svg-flow" style={{ '--s': s }} d={d} />;
const Note = ({ x, y, children }) => (
  <text className="blog-svg-label is-accent" x={x} y={y} textAnchor="middle">
    {children}
  </text>
);

const PATTERNS = {
  reflection: (
    <>
      <Wire d="M112 52 C140 22 200 22 228 52" />
      <Wire d="M228 98 C200 128 140 128 112 98" s={2} />
      <path className="blog-svg-glyph" d="M219 45l9 7-11 3 M121 105l-9-7 11-3" />
      <Note x="170" y="20">
        draft
      </Note>
      <Note x="170" y="142">
        feedback
      </Note>
      <Box x={28} y={56} w={96} h={38} label="Generate" hub />
      <Box x={216} y={56} w={96} h={38} label="Critique" />
    </>
  ),
  tools: (
    <>
      <Wire d="M96 34 L146 66" />
      <Wire d="M96 116 L146 84" s={1} />
      <Wire d="M244 34 L194 66" s={2} />
      <Wire d="M244 116 L194 84" s={3} />
      <Box x={12} y={18} label="Search" />
      <Box x={12} y={100} label="Database" />
      <Box x={244} y={18} label="API" />
      <Box x={244} y={100} label="Run code" />
      <circle className="blog-svg-halo" cx="170" cy="75" r="34" />
      <circle className="blog-svg-back" cx="170" cy="75" r="27" />
      <circle className="blog-svg-hub" cx="170" cy="75" r="27" />
      <text className="blog-svg-num" x="170" y="79" textAnchor="middle">
        Agent
      </text>
    </>
  ),
  planning: (
    <>
      <Wire d="M70 75 H96" />
      <Wire d="M152 75 C168 75 166 25 184 25" s={1} />
      <Wire d="M226 40 V59" s={2} />
      <Wire d="M226 89 V108" s={3} />
      <Wire d="M268 123 C284 123 272 75 288 75" s={4} />
      <Box x={8} y={58} w={62} h={34} label="Goal" />
      <Box x={96} y={56} w={56} h={38} label="Plan" hub />
      <Box x={184} y={10} label="Step 1" h={30} />
      <Box x={184} y={59} label="Step 2" h={30} />
      <Box x={184} y={108} label="Step 3" h={30} />
      <Box x={288} y={58} w={46} h={34} label="Done" />
    </>
  ),
  multi: (
    <>
      <Wire d="M170 46 C170 76 60 66 60 100" />
      <Wire d="M170 46 V100" s={1} />
      <Wire d="M170 46 C170 76 280 66 280 100" s={2} />
      <Box x={112} y={10} w={116} h={36} label="Orchestrator" hub />
      <Box x={14} y={100} w={92} h={36} label="Researcher" />
      <Box x={124} y={100} w={92} h={36} label="Writer" />
      <Box x={234} y={100} w={92} h={36} label="Reviewer" />
    </>
  ),
  // the layers of a production AI system, with observability alongside all of them
  aistack: (
    <>
      {[
        ['Orchestration · LangGraph, workflows', false],
        ['Skills · the team’s know-how', false],
        ['Harness · loop, context, guardrails', true],
        ['Tools · MCP', false],
        ['Knowledge · RAG', false],
        ['Model · the LLM', false],
      ].map(([label, hub], i) => (
        <Box key={label} x={6} y={8 + i * 36} w={268} h={30} label={label} hub={hub} />
      ))}
      <rect className="blog-svg-hub" x="286" y="8" width="48" height="210" rx="7" />
      <text className="blog-svg-num" transform="translate(315 113) rotate(-90)" textAnchor="middle">
        Langfuse · traces, evals
      </text>
      {[23, 59, 95, 131, 167, 203].map((y, i) => (
        <Wire key={y} d={`M274 ${y} H286`} s={i} />
      ))}
    </>
  ),
  // an agent as a graph: plan, a tool loop, an answer that a person approves
  graph: (
    <>
      <Wire d="M52 75 H70" />
      <Wire d="M134 66 C146 50 144 33 156 33" s={1} />
      <Wire d="M190 48 C190 70 150 82 134 80" s={2} />
      <Wire d="M134 86 C146 100 144 115 156 115" s={3} />
      <Wire d="M228 115 H250" s={4} />
      <Wire d="M292 100 V48" s={5} />
      <text className="blog-svg-label is-accent" x="204" y="74">
        loop
      </text>
      <Box x={6} y={62} w={46} h={26} label="Start" />
      <Box x={70} y={58} w={64} h={34} label="Plan" hub />
      <Box x={156} y={18} w={72} h={30} label="Tool call" />
      <Box x={156} y={100} w={72} h={30} label="Answer" />
      <Box x={250} y={100} w={84} h={30} label="Person OK?" />
      <Box x={262} y={18} w={60} h={30} label="Done" hub />
      <text className="blog-svg-label is-soft" x="170" y="146" textAnchor="middle">
        shared state travels through every step
      </text>
    </>
  ),
  // one request as a tree of steps, and the details of the flagged answer step
  trace: (
    <>
      {/* tree connectors */}
      <path
        className="blog-svg-text-line"
        d="M20 37 V61 H34 M20 61 V169 H34 M48 85 V109 H62 M48 85 V137 H62"
      />
      {[
        ['Request', 6, 18, 'hub'],
        ['Agent', 34, 50, 'box'],
        ['Search', 62, 74, 'box'],
        ['Chunks', 76, 98, 'box'],
        ['Tool call', 62, 126, 'box'],
        ['Answer', 34, 158, 'flag'],
      ].map(([label, x, y, kind], i) => (
        <g key={label}>
          <rect className="blog-svg-back" x={x} y={y} width="86" height="22" rx="6" />
          <rect className={kind === 'box' ? 'blog-svg-box' : 'blog-svg-hub'} x={x} y={y} width="86" height="22" rx="6" />
          <text className={kind === 'flag' ? 'blog-svg-label is-accent' : 'blog-svg-label'} x={x + 10} y={y + 15}>
            {label}
          </text>
          {kind !== 'flag' && <circle className="blog-svg-dot is-hot" cx={x + 76} cy={y + 11} r="3" />}
        </g>
      ))}
      {/* the flagged step and its details */}
      <circle className="blog-svg-halo" cx="110" cy="169" r="10" />
      <path className="blog-svg-glyph" d="M110 164 V170 M110 173.5 V174" />
      <path className="blog-svg-hot blog-svg-flow" d="M120 169 C150 169 150 120 176 120" />
      <rect className="blog-svg-box" x="176" y="18" width="178" height="162" rx="8" />
      <text className="blog-svg-label is-accent" x="190" y="40">
        Answer · step details
      </text>
      {[
        ['Input', 'the question + the chunks', false],
        ['Output', 'a rule that is not in them', false],
        ['Sources', 'none of the chunks', true],
        ['Check', 'not supported by the sources', true],
      ].map(([key, value, bad], i) => (
        <g key={key}>
          <text className="blog-svg-label is-soft" x="190" y={68 + i * 30}>
            {key}
          </text>
          <text className={bad ? 'blog-svg-label is-accent' : 'blog-svg-label'} x="190" y={82 + i * 30}>
            {value}
          </text>
        </g>
      ))}
    </>
  ),
  // four nested rings: the spec outside, scenarios, tests, and the code at the centre
  intent: (
    <>
      <circle className="blog-svg-hub" cx="100" cy="100" r="92" />
      <circle className="blog-svg-back" cx="100" cy="100" r="68" />
      <circle className="blog-svg-box" cx="100" cy="100" r="68" />
      <circle className="blog-svg-back" cx="100" cy="100" r="44" />
      <circle className="blog-svg-box" cx="100" cy="100" r="44" />
      <circle className="blog-svg-halo" cx="100" cy="100" r="26" />
      <circle className="blog-svg-hub" cx="100" cy="100" r="20" />
      <text className="blog-svg-num" x="100" y="25" textAnchor="middle">
        SDD
      </text>
      <text className="blog-svg-num" x="100" y="49" textAnchor="middle">
        BDD
      </text>
      <text className="blog-svg-num" x="100" y="73" textAnchor="middle">
        TDD
      </text>
      <text className="blog-svg-num" x="100" y="104" textAnchor="middle">
        Code
      </text>
      {[
        ['SDD · the spec', 'what and why, written by people', 26],
        ['BDD · the scenarios', 'agreed with the business', 70],
        ['TDD · the tests', 'what correct means in code', 114],
        ['Code', 'drafted by the agent', 158],
      ].map(([label, sub, y], i) => (
        <g key={label}>
          <circle className={i === 0 || i === 3 ? 'blog-svg-hub' : 'blog-svg-box'} cx="214" cy={y - 4} r="6" />
          <text className="blog-svg-label" x="228" y={y}>
            {label}
          </text>
          <text className="blog-svg-label is-soft" x="228" y={y + 14}>
            {sub}
          </text>
        </g>
      ))}
    </>
  ),
  // Orca: one prompt fanned out  // Orca: one prompt fanned out to agents in separate worktrees, reviewed, one merged.
  // Drawn in a larger 360×168 viewBox (see PATTERN_VIEWBOX).
  orca: (
    <>
      <text className="blog-svg-label is-soft" x="162" y="12" textAnchor="middle">
        one git worktree each
      </text>
      {[22, 76, 130].map((y, i) => (
        <g key={y}>
          <Wire d={`M68 95 C80 95 80 ${y + 19} 92 ${y + 19}`} s={i} />
          <path
            className={i === 1 ? 'blog-svg-hot blog-svg-flow' : 'blog-svg-line blog-svg-flow'}
            style={{ '--s': i + 1 }}
            d={`M232 ${y + 19} C246 ${y + 19} 244 95 256 95`}
          />
          <rect className="blog-svg-back" x="92" y={y} width="140" height="38" rx="7" />
          <rect className={i === 1 ? 'blog-svg-hub' : 'blog-svg-box'} x="92" y={y} width="140" height="38" rx="7" />
          <text className="blog-svg-label" x="102" y={y + 16}>
            Agent {i + 1}
          </text>
          <rect className="blog-svg-overlap" x="102" y={y + 22} width={[80, 110, 64][i]} height="5" rx="2" />
          <rect className="blog-svg-dot" x="102" y={y + 30} width={[50, 72, 96][i]} height="3" rx="1.5" />
          {i === 1 && <circle className="blog-orca-pick" cx="222" cy={y + 11} r="3.5" />}
        </g>
      ))}
      <Box x={6} y={78} w={62} h={34} label="Prompt" />
      <circle className="blog-svg-halo" cx="278" cy="95" r="28" />
      <circle className="blog-svg-back" cx="278" cy="95" r="22" />
      <circle className="blog-svg-hub" cx="278" cy="95" r="22" />
      <path className="blog-svg-glyph" d="M268 95l7 7 13-14" />
      <text className="blog-svg-label is-accent" x="356" y="140" textAnchor="end">
        I review
      </text>
      <text className="blog-svg-label is-soft" x="356" y="154" textAnchor="end">
        line comments
      </text>
      <Wire d="M300 95 H308" s={3} />
      <Box x={308} y={78} w={48} h={34} label="Merge" hub />
    </>
  ),
  // CI on the top row, CD on the bottom row. 360×170 viewBox.
  pipeline: (
    <>
      <Note x="180" y="16">
        Continuous integration · every commit
      </Note>
      <Wire d="M78 46 H98" />
      <Wire d="M168 46 H188" s={1} />
      <Wire d="M258 46 H278" s={2} />
      <Wire d="M315 62 V84 H58 V106" s={3} />
      <Wire d="M112 122 H138" s={4} />
      <Wire d="M222 122 H248" s={5} />
      <Box x={8} y={30} w={70} label="Commit" />
      <Box x={98} y={30} w={70} label="Build" />
      <Box x={188} y={30} w={70} label="Test" />
      <Box x={278} y={30} w={74} label="Package" hub />
      <Box x={4} y={106} w={108} label="Pre-production" />
      <Box x={138} y={106} w={84} label="Approval" hub />
      <Box x={248} y={106} w={104} label="Production" />
      <Note x="180" y="160">
        Continuous delivery · the same package
      </Note>
    </>
  ),
  // code, prompts and the evaluation set feed one evaluation step that deploys or stops. 360×170.
  evalgate: (
    <>
      <text className="blog-svg-label is-soft" x="56" y="14" textAnchor="middle">
        in the repository
      </text>
      {['Code', 'Prompts', 'Evaluation set'].map((label, i) => (
        <g key={label}>
          <Wire d={`M108 ${39 + i * 46} C134 ${39 + i * 46} 134 85 158 85`} s={i} />
          <Box x={4} y={24 + i * 46} w={104} h={30} label={label} />
        </g>
      ))}
      <path className="blog-svg-hot blog-svg-flow" d="M214 70 C240 60 246 39 272 39" />
      <Wire d="M214 100 C240 110 246 131 272 131" s={3} />
      <circle className="blog-svg-halo" cx="188" cy="85" r="38" />
      <circle className="blog-svg-back" cx="188" cy="85" r="30" />
      <circle className="blog-svg-hub" cx="188" cy="85" r="30" />
      <text className="blog-svg-num" x="188" y="89" textAnchor="middle">
        Evaluate
      </text>
      <Box x={272} y={24} w={82} h={30} label="Deploy" hub />
      <Box x={272} y={116} w={82} h={30} label="Stop and fix" />
      <text className="blog-svg-label is-accent" x="313" y="70" textAnchor="middle">
        score holds
      </text>
      <text className="blog-svg-label is-soft" x="313" y="108" textAnchor="middle">
        score drops
      </text>
    </>
  ),
  // one agent with eight thin tools, next to one agent with three it uses well
  depth: (
    <>
      <Note x="80" y="14">
        Many thin tools
      </Note>
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => {
        const a = (i * Math.PI) / 4;
        const x = Math.round(80 + 56 * Math.cos(a));
        const y = Math.round(86 + 44 * Math.sin(a));
        return (
          <g key={i}>
            <path className="blog-svg-line" d={`M80 86 L${x} ${y}`} />
            <rect className="blog-svg-back" x={x - 14} y={y - 8} width="28" height="16" rx="4" />
            <rect className="blog-svg-box" x={x - 14} y={y - 8} width="28" height="16" rx="4" />
          </g>
        );
      })}
      <circle className="blog-svg-back" cx="80" cy="86" r="17" />
      <circle className="blog-svg-box" cx="80" cy="86" r="17" />
      <text className="blog-svg-label is-soft" x="80" y="156" textAnchor="middle">
        which one?
      </text>
      <Note x="262" y="14">
        A few it uses well
      </Note>
      {['Search', 'Look up', 'Update'].map((label, i) => (
        <g key={label}>
          <Wire d={`M216 86 C234 86 232 ${46 + i * 40} 250 ${46 + i * 40}`} s={i} />
          <Box x={250} y={31 + i * 40} w={84} h={30} label={label} hub />
        </g>
      ))}
      <circle className="blog-svg-halo" cx="198" cy="86" r="24" />
      <circle className="blog-svg-back" cx="198" cy="86" r="18" />
      <circle className="blog-svg-hub" cx="198" cy="86" r="18" />
    </>
  ),
  // the agent in the middle, one box per law around it, each with its test. 400×190.
  laws: (
    <>
      <Wire d="M200 48 V66" />
      <Wire d="M128 142 L178 112" s={1} />
      <Wire d="M272 142 L222 112" s={2} />
      {[
        ['1 · Understood', 'users know its job', 122, 6],
        ['2 · Limited', 'limits live in code', 6, 142],
        ['3 · Deep', 'few tools, used well', 238, 142],
      ].map(([label, sub, x, y]) => (
        <g key={label}>
          <rect className="blog-svg-box" x={x} y={y} width="156" height="42" rx="8" />
          <text className="blog-svg-num" x={x + 78} y={y + 18} textAnchor="middle">
            {label}
          </text>
          <text className="blog-svg-label is-soft" x={x + 78} y={y + 33} textAnchor="middle">
            {sub}
          </text>
        </g>
      ))}
      <circle className="blog-svg-halo" cx="200" cy="96" r="36" />
      <circle className="blog-svg-back" cx="200" cy="96" r="28" />
      <circle className="blog-svg-hub" cx="200" cy="96" r="28" />
      <text className="blog-svg-num" x="200" y="100" textAnchor="middle">
        Agent
      </text>
    </>
  ),
  // First law: the agent can be trusted inside the circle its users understand. 400×184.
  understood: (
    <>
      <circle className="blog-svg-ring" cx="104" cy="92" r="84" />
      {[[52, 46], [158, 44], [176, 112], [112, 162], [40, 124], [84, 24]].map(([x, y]) => (
        <circle key={`${x}-${y}`} className="blog-svg-dot" cx={x} cy={y} r="4" />
      ))}
      <circle className="blog-svg-halo" cx="104" cy="92" r="52" />
      <circle className="blog-svg-back" cx="104" cy="92" r="44" />
      <circle className="blog-svg-hub" cx="104" cy="92" r="44" />
      {[[88, 78], [122, 84], [100, 112]].map(([x, y]) => (
        <circle key={`${x}-${y}`} className="blog-svg-dot is-hot" cx={x} cy={y} r="4.5" />
      ))}
      <path className="blog-svg-glyph" d="M148 92 H170 M163 85l7 7-7 7" />
      {[
        ['What users understand', 'it can be trusted here', 56, true],
        ['What it could do', 'nobody can rely on it yet', 104, false],
      ].map(([label, sub, y, hub]) => (
        <g key={label}>
          <circle className={hub ? 'blog-svg-hub' : 'blog-svg-ring'} cx="216" cy={y - 4} r="7" />
          <text className="blog-svg-label" x="232" y={y}>
            {label}
          </text>
          <text className="blog-svg-label is-soft" x="232" y={y + 14}>
            {sub}
          </text>
        </g>
      ))}
      <text className="blog-svg-label is-accent" x="208" y="150">
        Explain more, and the circle grows
      </text>
    </>
  ),
  // the continuum from soft magic to hard magic, with three kinds of AI system on it. 360×150.
  spectrum: (
    <>
      <Note x="56" y="18">
        Soft magic
      </Note>
      <Note x="304" y="18">
        Hard magic
      </Note>
      <Wire d="M56 66 H304" />
      <path className="blog-svg-glyph" d="M236 60l7 6-7 6" />
      <circle className="blog-svg-back" cx="56" cy="66" r="13" />
      <circle className="blog-svg-box" cx="56" cy="66" r="13" />
      <circle className="blog-svg-back" cx="180" cy="66" r="13" />
      <circle className="blog-svg-box" cx="180" cy="66" r="13" />
      <circle className="blog-svg-halo" cx="304" cy="66" r="21" />
      <circle className="blog-svg-back" cx="304" cy="66" r="15" />
      <circle className="blog-svg-hub" cx="304" cy="66" r="15" />
      {[
        ['Demo', 'wonder', 56],
        ['Pilot', 'some rules', 180],
        ['Production', 'explicit rules', 304],
      ].map(([label, sub, x]) => (
        <g key={label}>
          <text className="blog-svg-label" x={x} y="106" textAnchor="middle">
            {label}
          </text>
          <text className="blog-svg-label is-soft" x={x} y="121" textAnchor="middle">
            {sub}
          </text>
        </g>
      ))}
    </>
  ),
  // Second law: a boundary round the agent. Two tools pass it, one action is stopped. 360×184.
  limits: (
    <>
      <Note x="118" y="14">
        the limit, written in code
      </Note>
      <path className="blog-svg-hot blog-svg-flow" d="M140 82 L250 38" />
      <path className="blog-svg-hot blog-svg-flow" style={{ '--s': 1 }} d="M142 96 H250" />
      <path className="blog-svg-line" d="M140 108 L170 121" />
      <path className="blog-svg-line" strokeDasharray="2 6" opacity="0.45" d="M186 128 L250 154" />
      <circle className="blog-svg-hot" cx="118" cy="96" r="66" />
      <path className="blog-svg-glyph" d="M172 118l11 11 M183 118l-11 11" />
      <circle className="blog-svg-halo" cx="118" cy="96" r="32" />
      <circle className="blog-svg-back" cx="118" cy="96" r="25" />
      <circle className="blog-svg-hub" cx="118" cy="96" r="25" />
      <text className="blog-svg-num" x="118" y="100" textAnchor="middle">
        Agent
      </text>
      <Box x={250} y={22} w={100} h={30} label="Search" hub />
      <Box x={250} y={81} w={100} h={30} label="Look up" hub />
      <Box x={250} y={140} w={100} h={30} label="Delete" />
      <text className="blog-svg-label is-soft" x="118" y="180" textAnchor="middle">
        the prompt only asks
      </text>
    </>
  ),
  // fixed steps on the left, a model choosing its tools on the right
  versus: (
    <>
      <Note x="80" y="14">
        Workflow
      </Note>
      <Wire d="M80 50 V66" />
      <Wire d="M80 92 V108" s={1} />
      {['Step 1', 'Step 2', 'Step 3'].map((label, i) => (
        <Box key={label} x={38} y={24 + i * 42} w={84} h={26} label={label} />
      ))}
      <Note x="255" y="14">
        Agent
      </Note>
      <Wire d="M214 48 L240 68" />
      <Wire d="M296 48 L270 68" s={1} />
      <Wire d="M255 108 V122" s={2} />
      <Box x={186} y={26} w={56} h={22} label="Tool" />
      <Box x={268} y={26} w={56} h={22} label="Tool" />
      <Box x={227} y={122} w={56} h={22} label="Tool" />
      <circle className="blog-svg-halo" cx="255" cy="84" r="30" />
      <circle className="blog-svg-back" cx="255" cy="84" r="24" />
      <circle className="blog-svg-hub" cx="255" cy="84" r="24" />
      <text className="blog-svg-num" x="255" y="88" textAnchor="middle">
        Agent
      </text>
    </>
  ),
  // one deployable with one database, next to three services with a database each
  split: (
    <>
      <Note x="80" y="14">
        Monolith
      </Note>
      <rect className="blog-svg-box" x="14" y="22" width="132" height="90" rx="8" />
      {['Orders', 'Payments', 'Stock'].map((label, i) => (
        <Box key={label} x={24} y={30 + i * 27} w={112} h={21} label={label} />
      ))}
      <Wire d="M80 112 V124" />
      <Box x={44} y={124} w={72} h={22} label="1 database" hub />
      <Note x="255" y="14">
        Microservices
      </Note>
      {['Orders', 'Payments', 'Stock'].map((label, i) => (
        <g key={label}>
          <Wire d={`M268 ${44 + i * 38} H288`} s={i} />
          <Box x={184} y={32 + i * 38} w={84} h={24} label={label} />
          <Box x={288} y={32 + i * 38} w={40} h={24} label="DB" hub />
        </g>
      ))}
    </>
  ),
  // containers inside pods, pods run by Kubernetes, Kubernetes inside OpenShift
  platform: (
    <>
      <rect className="blog-svg-box" x="6" y="6" width="328" height="138" rx="10" />
      <text className="blog-svg-label" x="16" y="23">
        OpenShift
      </text>
      <text className="blog-svg-label is-soft" x="324" y="23" textAnchor="end">
        routes · builds · security
      </text>
      <rect className="blog-svg-hub" x="16" y="32" width="308" height="104" rx="8" />
      <text className="blog-svg-label" x="26" y="49">
        Kubernetes
      </text>
      <text className="blog-svg-label is-soft" x="314" y="49" textAnchor="end">
        schedules · scales · heals
      </text>
      {[26, 124, 222].map((x) => (
        <g key={x}>
          <rect className="blog-svg-back" x={x} y="58" width="92" height="70" rx="7" />
          <rect className="blog-svg-box" x={x} y="58" width="92" height="70" rx="7" />
          <text className="blog-svg-label is-soft" x={x + 46} y="74" textAnchor="middle">
            Pod
          </text>
          <Box x={x + 8} y={82} w={76} h={36} label="Container" />
        </g>
      ))}
    </>
  ),
  // every agent wired to every system, next to one protocol in the middle
  connectors: (
    <>
      <Note x="80" y="14">
        Without a standard
      </Note>
      {[34, 74, 114].flatMap((a, i) =>
        [34, 74, 114].map((b, j) => <path key={`${a}-${b}`} className="blog-svg-line" d={`M52 ${a + 10} L108 ${b + 10}`} opacity={i === j ? 1 : 0.6} />)
      )}
      {[34, 74, 114].map((y) => (
        <g key={y}>
          <rect className="blog-svg-box" x="16" y={y} width="36" height="20" rx="10" />
          <rect className="blog-svg-box" x="108" y={y} width="36" height="20" rx="5" />
        </g>
      ))}
      <Note x="255" y="14">
        With MCP
      </Note>
      {[34, 74, 114].map((y, i) => (
        <g key={y}>
          <Wire d={`M224 ${y + 10} L242 84`} s={i} />
          <Wire d={`M268 84 L286 ${y + 10}`} s={i + 1} />
          <rect className="blog-svg-box" x="188" y={y} width="36" height="20" rx="10" />
          <rect className="blog-svg-box" x="286" y={y} width="36" height="20" rx="5" />
        </g>
      ))}
      <circle className="blog-svg-back" cx="255" cy="84" r="17" />
      <circle className="blog-svg-hub" cx="255" cy="84" r="17" />
      <text className="blog-svg-num" x="255" y="88" textAnchor="middle">
        MCP
      </text>
      <text className="blog-svg-label is-soft" x="34" y="146" textAnchor="middle">
        agents
      </text>
      <text className="blog-svg-label is-soft" x="126" y="146" textAnchor="middle">
        systems
      </text>
      <text className="blog-svg-label is-soft" x="206" y="146" textAnchor="middle">
        agents
      </text>
      <text className="blog-svg-label is-soft" x="304" y="146" textAnchor="middle">
        systems
      </text>
    </>
  ),
};

// Diagrams that need more room than the default 340×150.
const PATTERN_VIEWBOX = {
  pipeline: '0 0 360 170',
  evalgate: '0 0 360 170',
  understood: '0 0 400 184',
  depth: '0 0 340 162',
  spectrum: '0 0 360 132',
  limits: '0 0 360 184',
  laws: '0 0 400 190',
  orca: '0 0 360 168', aistack: '0 0 340 226', trace: '0 0 360 190', intent: '0 0 440 200',
};

const Pattern = ({ block }) => (
  <Figure className="blog-frame" caption={block.caption}>
    <svg
      className="blog-pattern-svg"
      viewBox={PATTERN_VIEWBOX[block.name] || '0 0 340 150'}
      role="img"
      aria-label={block.alt}
    >
      {PATTERNS[block.name]}
    </svg>
  </Figure>
);

// The pick and roll on a half court. Basket at the top; 1 = ball handler, 2 = screener,
// x = the ball handler's defender. The ball (a moving dot) is skipped under reduced motion.
const BALL_PATH = 'M236 172 C210 184 176 174 160 130 L186 66';

function Court({ block }) {
  const reduced = useReducedMotion();
  return (
    <Figure className="blog-frame blog-court" caption={block.caption}>
      <svg className="blog-court-svg" viewBox="0 0 480 200" role="img" aria-label={block.alt}>
        {/* court lines */}
        <path className="blog-svg-text-line" d="M20 12 H320 M130 12 V100 H210 V12" />
        <path className="blog-svg-ring" d="M40 12 V52 A130 130 0 0 0 300 52 V12" />
        <path className="blog-svg-text-line" d="M154 22 H186" />
        <circle className="blog-svg-box" cx="170" cy="32" r="7" />
        {/* drive, roll and pass */}
        <path className="blog-svg-hot blog-svg-flow" d="M236 172 C210 184 176 174 160 130" />
        <path className="blog-svg-line blog-svg-flow" style={{ '--s': 1 }} d="M200 152 L188 70" />
        <path className="blog-svg-line" strokeDasharray="2 5" d="M160 130 L186 66" />
        <text className="blog-svg-label is-accent" x="150" y="166" textAnchor="end">
          drive
        </text>
        <text className="blog-svg-label is-accent" x="204" y="108">
          roll
        </text>
        <text className="blog-svg-label is-accent" x="166" y="96" textAnchor="end">
          pass
        </text>
        {/* players */}
        <path className="blog-svg-glyph" d="M216 146l10 10 M226 146l-10 10" />
        <circle className="blog-svg-back" cx="200" cy="152" r="11" />
        <circle className="blog-svg-box" cx="200" cy="152" r="11" />
        <text className="blog-svg-num" x="200" y="156" textAnchor="middle">
          2
        </text>
        <circle className="blog-svg-halo" cx="236" cy="172" r="16" />
        <circle className="blog-svg-back" cx="236" cy="172" r="11" />
        <circle className="blog-svg-hub" cx="236" cy="172" r="11" />
        <text className="blog-svg-num" x="236" y="176" textAnchor="middle">
          1
        </text>
        {!reduced && (
          <circle className="blog-svg-query" r="4.5">
            <animateMotion dur="4s" repeatCount="indefinite" path={BALL_PATH} />
          </circle>
        )}
        {/* legend */}
        <g className="blog-court-legend">
          <circle className="blog-svg-hub" cx="360" cy="40" r="9" />
          <text className="blog-svg-num" x="360" y="44" textAnchor="middle">
            1
          </text>
          <text className="blog-svg-label" x="376" y="38">
            Ball handler
          </text>
          <text className="blog-svg-label is-soft" x="376" y="51">
            orchestrator
          </text>
          <circle className="blog-svg-box" cx="360" cy="84" r="9" />
          <text className="blog-svg-num" x="360" y="88" textAnchor="middle">
            2
          </text>
          <text className="blog-svg-label" x="376" y="82">
            Screener
          </text>
          <text className="blog-svg-label is-soft" x="376" y="95">
            specialist
          </text>
          <path className="blog-svg-glyph" d="M355 123l10 10 M365 123l-10 10" />
          <text className="blog-svg-label" x="376" y="132">
            Defender
          </text>
        </g>
      </svg>
    </Figure>
  );
}

// Two neutral columns of points (unlike `compare`, neither side is the wrong one).
const Choice = ({ block }) => (
  <div className="blog-choice">
    {block.columns.map((col) => (
      <div key={col.title} className="blog-choice-col">
        <h3>{col.title}</h3>
        <ul className="cs-points blog-points">
          {col.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

// type → renderer. Adding a block type to an article means adding it here.
const BLOCKS = {
  p: ({ block }) => <p className="cs-lead">{block.text}</p>,
  list: ({ block }) => (
    <ul className="cs-points blog-points">
      {block.items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  ),
  callout: ({ block }) => <p className="blog-callout">{block.text}</p>,
  quote: ({ block }) => (
    <figure className="blog-quote">
      <blockquote>
        <p>“{block.text}”</p>
      </blockquote>
      <figcaption>{block.cite}</figcaption>
    </figure>
  ),
  link: ({ block }) => (
    <p className="blog-link">
      <Link to={block.to} className="pf-btn is-ghost">
        {block.text} <span aria-hidden="true">→</span>
      </Link>
    </p>
  ),
  flow: ({ block }) => <ProblemFlow flow={block} />,
  rag: ({ block }) => <RagFlow groups={block.groups} caption={block.caption} />,
  compare: ({ block }) => <BeforeAfter before={block.before} after={block.after} labels={block.labels} />,
  timeline: ({ block }) => <Timeline steps={block.steps} />,
  cards: Cards,
  choice: Choice,
  cycle: Cycle,
  court: Court,
  vectors: Vectors,
  chunks: Chunks,
  matrix: Matrix,
  pattern: Pattern,
  code: Code,
};

/** One numbered part of an article: heading, one-line takeaway, then its blocks. */
export function PostSection({ section, num }) {
  const titleId = `blog-${section.id}-title`;
  return (
    <section className={`cs-block blog-part ${section.center ? 'cs-block-center' : ''}`} aria-labelledby={titleId}>
      <h2 id={titleId} className="cs-block-title">
        <span className="cs-num" aria-hidden="true">
          {String(num).padStart(2, '0')}
        </span>
        {section.title}
      </h2>
      <p className="cs-takeaway">{section.takeaway}</p>
      {section.blocks.map((block, i) => {
        const Block = BLOCKS[block.type];
        // eslint-disable-next-line react/no-array-index-key
        return <Block key={i} block={block} />;
      })}
    </section>
  );
}

/** Tags of an article, each linking to the list filtered by that tag. */
export const TagLinks = ({ tags, label = 'Topics', className = '' }) => (
  <ul className={`cs-tags ${className}`} aria-label={label}>
    {tags.map((t) => (
      <li key={t}>
        <Link to={tagPath(t)} className="cs-tag blog-tag-link">
          {t}
        </Link>
      </li>
    ))}
  </ul>
);

/** End of an article: the articles that share most tags with it. */
export function RelatedPosts({ items }) {
  return (
    <ul className="blog-related">
      {items.map((p) => (
        <li key={p.slug || p.url} className="blog-related-item">
          <PostMeta post={p} />
          {p.url ? (
            <a href={p.url} className="blog-related-link" target="_blank" rel="noopener noreferrer">
              {p.title} <span aria-hidden="true">↗</span>
            </a>
          ) : (
            <Link to={postPath(p.slug)} className="blog-related-link">
              {p.title} <span aria-hidden="true">→</span>
            </Link>
          )}
          <TagLinks tags={p.shared} label="Topics in common" />
        </li>
      ))}
    </ul>
  );
}

/** The sources of an article: external links open in a new tab, links on this site do not. */
export function PostSources({ items }) {
  return (
    <section className="cs-block blog-part blog-sources" aria-labelledby="blog-sources-title">
      <h2 id="blog-sources-title" className="cs-block-title">
        Sources
      </h2>
      <ol className="blog-sources-list">
        {items.map((s) => (
          <li key={s.url || s.to}>
            {s.url ? (
              <a href={s.url} target="_blank" rel="noopener noreferrer">
                {s.title}
                <span className="cs-sr-only"> (opens in a new tab)</span>
              </a>
            ) : (
              <Link to={s.to}>{s.title}</Link>
            )}
            <span className="blog-sources-pub"> · {s.publisher}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
