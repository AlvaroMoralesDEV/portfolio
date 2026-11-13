import React from 'react';
import { scrollToSection, useInView } from '../hooks';

// 24×24 line icons, drawn with the accent colour.
export const ICONS = {
  owner: 'M4 12a8 8 0 0 1 14-5.3M20 12a8 8 0 0 1-14 5.3M18 3v4h-4M6 21v-4h4',
  client: 'M4 5h16v11H10l-6 4z M8 9h8 M8 12h5',
  deploy: 'M12 20V7 M6 13l6-6 6 6 M5 3h14',
  audit: 'M12 3l8 3v6c0 4.5-3.4 7.7-8 9-4.6-1.3-8-4.5-8-9V6z M8.5 12l2.5 2.5 4.5-5',
  flow: 'M3 6h6v4H3z M15 14h6v4h-6z M9 8h3v8h3',
  cart: 'M3 4h2l2.5 11h10l2-8H6.5 M9 19a1 1 0 1 0 .01 0 M17 19a1 1 0 1 0 .01 0',
  bank: 'M3 9l9-5 9 5z M5 10v8 M9.5 10v8 M14.5 10v8 M19 10v8 M3 20h18',
  sort: 'M4 6h16 M7 12h10 M10 18h4',
  db: 'M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3z M4 6v12c0 1.7 3.6 3 8 3s8-1.3 8-3V6 M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3',
  tool: 'M14.5 6.5a4 4 0 0 0 5 5L12 19a2.1 2.1 0 0 1-3-3l7.5-7.5a4 4 0 0 1-2-2z M4 4l4 4 M3 8l5-5',
  trace: 'M3 12h4l3-7 4 14 3-7h4',
  mail: 'M3 6h18v12H3z M3 7l9 6 9-6',
  inbox: 'M3 13l3-8h12l3 8v6H3z M3 13h5l1 3h6l1-3h5',
  done: 'M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0 M8 12l3 3 5-6',
  search: 'M10.5 4a6.5 6.5 0 1 0 0 13a6.5 6.5 0 1 0 0-13 M15.5 15.5L20 20',
  doc: 'M6 3h8l4 4v14H6z M14 3v4h4 M9 12h6 M9 16h6',
  code: 'M8 8l-4 4 4 4 M16 8l4 4-4 4 M13.5 5l-3 14',
  target: 'M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0 M8 12a4 4 0 1 0 8 0a4 4 0 1 0-8 0 M12 12h.01',
  users:
    'M9 11a3 3 0 1 0 0-6a3 3 0 0 0 0 6 M3 19c0-3 2.7-5 6-5s6 2 6 5 M16.5 11a2.5 2.5 0 1 0 0-5 M17 14c2.4.3 4 2 4 4.5',
  graph:
    'M4 6a2 2 0 1 0 4 0a2 2 0 1 0-4 0 M16 8a2 2 0 1 0 4 0a2 2 0 1 0-4 0 M9 18a2 2 0 1 0 4 0a2 2 0 1 0-4 0 M8 6.3l8 1.4 M6.8 7.9l3.4 8.2 M16.8 9.6l-4.6 6.8',
};

export const Icon = ({ name }) => (
  <svg className="cs-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d={ICONS[name]} />
  </svg>
);

export function Hero({ client, summary, keyTech, facts, nextTeaser }) {
  return (
    <header className="cs-header">
      <p className="cs-eyebrow">Case study · Delivered at Chakray</p>
      <h1 id="cs-title" tabIndex={-1}>
        NOC Automation for <span>{client}</span>
      </h1>
      <p className="cs-sub">{summary}</p>

      <ul className="cs-tags cs-key-tech" aria-label="Key technologies">
        {keyTech.map((t) => (
          <li key={t} className="cs-tag">
            {t}
          </li>
        ))}
      </ul>

      <p className="cs-hero-next">
        <span className="cs-hero-next-label">Next phases</span>
        <a
          href="#cs-next-title"
          onClick={(e) => {
            e.preventDefault();
            scrollToSection('cs-next-title');
          }}
        >
          {nextTeaser} <span aria-hidden="true">↓</span>
        </a>
      </p>

      <dl className="cs-facts">
        {facts.map((f) => (
          <div key={f.label} className="cs-fact">
            <dt>{f.label}</dt>
            <dd className="cs-fact-value">{f.value}</dd>
            <dd className="cs-fact-sub">{f.sub}</dd>
          </div>
        ))}
      </dl>
    </header>
  );
}

/** Panel 01: emails → NOC mailbox → the right action on the right ticket. */
export function ProblemFlow({ flow }) {
  const [ref, visible] = useInView();
  return (
    <ol ref={ref} className={`cs-prob cs-reveal ${visible ? 'is-visible' : ''}`} aria-label={flow.alt}>
      {flow.steps.map((s, i) => (
        <li key={s.label} className={`cs-prob-step ${s.hub ? 'is-hub' : ''}`} style={{ '--i': i }}>
          <span className="cs-prob-badge">
            <svg className="cs-prob-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
              <path d={ICONS[s.icon]} />
            </svg>
          </span>
          <span className="cs-prob-label">{s.label}</span>
          <span className="cs-prob-sub">{s.sub}</span>
          {i < flow.steps.length - 1 && <span className="cs-prob-link" aria-hidden="true" />}
        </li>
      ))}
    </ol>
  );
}

const MiniDoc = () => (
  <span className="cs-mini-doc">
    <i />
    <i />
    <i />
    <i />
  </span>
);

// Small looping diagrams for the three AI layer cards. CSS only.
const MiniVisual = ({ visual }) => {
  if (visual.type === 'record') {
    return (
      <div className="cs-mini" role="img" aria-label={visual.alt}>
        <span className="cs-mini-item">
          <MiniDoc />
          {visual.source}
        </span>
        <span className="cs-mini-link" />
        <span className="cs-mini-fields">
          {visual.fields.map((f, i) => (
            <span key={f} className="cs-mini-field" style={{ '--s': i }}>
              {f}
            </span>
          ))}
        </span>
      </div>
    );
  }
  if (visual.type === 'tool') {
    return (
      <div className="cs-mini" role="img" aria-label={visual.alt}>
        {visual.steps.map((s, i) => (
          <React.Fragment key={s}>
            {i > 0 && <span className="cs-mini-link is-back" />}
            <span className={`cs-mini-pill ${i === 0 ? 'is-solid' : ''}`}>{s}</span>
          </React.Fragment>
        ))}
      </div>
    );
  }
  return (
    <div className="cs-mini" role="img" aria-label={visual.alt}>
      <span className="cs-mini-item">
        <MiniDoc />
        {visual.source}
      </span>
      <span className="cs-mini-link" />
      <span className="cs-mini-item">
        <span className="cs-mini-chunks">
          {[0, 1, 2, 3, 4, 5].map((n) => (
            <i key={n} style={{ '--s': n }} />
          ))}
        </span>
        {visual.mid}
      </span>
      <span className="cs-mini-link" />
      <span className="cs-mini-pill is-solid">{visual.target}</span>
    </div>
  );
};

export function Pipeline({ steps }) {
  return (
    <ol className="cs-pipe" aria-label="What the system does, step by step">
      {steps.map((p, i) => (
        <li key={p} style={{ '--i': i }}>
          {p}
        </li>
      ))}
    </ol>
  );
}

/** Native disclosure: the key point stays visible, the detail is one click away. */
export function Details({ label, children }) {
  return (
    <details className="cs-details">
      <summary>{label}</summary>
      <div className="cs-details-body">{children}</div>
    </details>
  );
}

export function BeforeAfter({ before, after, labels = ['Before', 'After'] }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} className={`cs-ba cs-reveal ${visible ? 'is-visible' : ''}`}>
      <div className="cs-ba-col is-before">
        <h3>{labels[0]}</h3>
        <ul>
          {before.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>
      <span className="cs-ba-arrow" aria-hidden="true" />
      <div className="cs-ba-col is-after">
        <h3>{labels[1]}</h3>
        <ul>
          {after.map((a) => (
            <li key={a}>{a}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Timeline({ steps }) {
  const [ref, visible] = useInView();
  return (
    <ol ref={ref} className={`cs-timeline cs-reveal ${visible ? 'is-visible' : ''}`}>
      {steps.map((s, i) => (
        <li key={s.step} className={`cs-tl-item ${i === steps.length - 1 ? 'is-last' : ''}`} style={{ '--i': i }}>
          <span className="cs-tl-dot" aria-hidden="true">
            {i + 1}
          </span>
          <strong className="cs-tl-step">{s.step}</strong>
          <span className="cs-tl-text">{s.text}</span>
        </li>
      ))}
    </ol>
  );
}

const RAG_CAPTION =
  'Documents are indexed once and updated when they change. At run time the agent searches them by meaning and answers from what it finds.';

export function RagFlow({ groups, caption = RAG_CAPTION }) {
  const [ref, visible] = useInView();
  return (
    <figure ref={ref} className={`cs-rag cs-reveal ${visible ? 'is-visible' : ''}`} aria-labelledby="rag-caption">
      {groups.map((g, gi) => (
        <div key={g.title} className="cs-rag-group">
          <h3 className="cs-rag-title">{g.title}</h3>
          <ol className="cs-rag-steps">
            {g.steps.map((s, i) => (
              <li
                key={s.label}
                className={`cs-rag-step ${s.highlight || s.label.startsWith('Qdrant') ? 'is-qdrant' : ''}`}
                style={{ '--i': gi * g.steps.length + i }}
              >
                <em aria-hidden="true">{i + 1}</em>
                <strong>{s.label}</strong>
                <span>{s.sub}</span>
              </li>
            ))}
          </ol>
        </div>
      ))}
      <figcaption id="rag-caption" className="cs-caption">
        {caption}
      </figcaption>
    </figure>
  );
}

export function TechStack({ items }) {
  return (
    <ul className="cs-techstack">
      {items.map((name) => (
        <li key={name} className="cs-tech">
          {name}
        </li>
      ))}
    </ul>
  );
}

export function AiLayers({ items }) {
  return (
    <ul className="cs-cards cs-cards-3">
      {items.map((c) => (
        <li key={c.title} className="cs-card">
          {c.visual && <MiniVisual visual={c.visual} />}
          <Icon name={c.icon} />
          <h3>{c.title}</h3>
          <p>{c.text}</p>
        </li>
      ))}
    </ul>
  );
}

// Illustrative trace: one bar per span, nested by level. Animated in CSS only.
const TraceVisual = ({ visual }) => (
  <div className="cs-next-visual cs-next-trace" role="img" aria-label={visual.alt}>
    {visual.spans.map((s, i) => (
      <div key={s.label} className="cs-next-span">
        <span className="cs-next-span-label">{s.label}</span>
        <span className="cs-next-track">
          <span
            className={`cs-next-bar is-l${s.level}`}
            style={{ left: `${s.left}%`, width: `${s.width}%`, '--s': i }}
          />
        </span>
      </div>
    ))}
    <span className="cs-next-playhead" aria-hidden="true" />
  </div>
);

// Illustrative knowledge graph. The "hot" path is the one the agent follows.
const GraphVisual = ({ visual }) => {
  const byId = Object.fromEntries(visual.nodes.map((n) => [n.id, n]));
  return (
    <div className="cs-next-visual cs-next-graph">
      <svg viewBox="0 0 300 150" role="img" aria-label={visual.alt}>
        {visual.edges.map(([from, to, kind]) => (
          <line
            key={`${from}-${to}`}
            className={`cs-next-edge is-${kind}`}
            x1={byId[from].x}
            y1={byId[from].y}
            x2={byId[to].x}
            y2={byId[to].y}
          />
        ))}
        {visual.nodes.map((n, i) => (
          <g key={n.id} className="cs-next-node">
            <circle className="cs-next-halo" cx={n.x} cy={n.y} r="15" style={{ '--h': i }} />
            <circle className="cs-next-dot" cx={n.x} cy={n.y} r="8" />
            <text x={n.x} y={n.y + 24} textAnchor="middle">
              {n.label}
            </text>
          </g>
        ))}
        <g className="cs-next-legend" aria-hidden="true">
          <line className="cs-next-edge is-vector" x1="34" y1="138" x2="58" y2="138" />
          <text x="64" y="141.5">{visual.legend.vector}</text>
          <line className="cs-next-edge is-graph" x1="168" y1="138" x2="192" y2="138" />
          <text x="198" y="141.5">{visual.legend.graph}</text>
        </g>
      </svg>
    </div>
  );
};

export function NextSteps({ items }) {
  const [ref, visible] = useInView();
  return (
    <ul ref={ref} className={`cs-cards cs-cards-2 cs-reveal ${visible ? 'is-visible' : ''}`}>
      {items.map((c, i) => (
        <li key={c.title} className="cs-card cs-next-card" style={{ '--i': i }}>
          {c.visual.type === 'trace' ? <TraceVisual visual={c.visual} /> : <GraphVisual visual={c.visual} />}
          <div className="cs-next-head">
            <Icon name={c.icon} />
            <div>
              <span className="cs-next-tag">{c.tag}</span>
              <h3>{c.title}</h3>
            </div>
          </div>
          <p>{c.text}</p>
          <div className="cs-next-why">
            <strong>Why</strong>
            <p>{c.why}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export function ImpactCards({ items }) {
  return (
    <ul className="cs-cards cs-cards-2">
      {items.map((c) => (
        <li key={c.title} className="cs-card">
          <Icon name={c.icon} />
          <h3>{c.title}</h3>
          <p>{c.text}</p>
          {/* TODO: metric — set `metric` in caseStudyData.js once a real number is available */}
          {c.metric && <p className="cs-metric">{c.metric}</p>}
        </li>
      ))}
    </ul>
  );
}

export function OtherProjects({ items }) {
  return (
    <ul className="cs-cards cs-cards-2">
      {items.map((p) => (
        <li key={p.title} className="cs-card">
          <Icon name={p.icon} />
          <h4>{p.title}</h4>
          <p>{p.text}</p>
          {p.flow && (
            <ol className="cs-mini-flow" aria-label="Data flow">
              {p.flow.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          )}
          {p.points && (
            <ul className="cs-points">
              {p.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
          )}
          <ul className="cs-tags" aria-label="Technologies">
            {p.tags.map((t) => (
              <li key={t} className="cs-tag">
                {t}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  );
}
