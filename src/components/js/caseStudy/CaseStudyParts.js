import React from 'react';
import { useInView } from '../hooks';

// 24×24 line icons, drawn with the accent colour.
const ICONS = {
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
};

const Icon = ({ name }) => (
  <svg className="cs-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d={ICONS[name]} />
  </svg>
);

export function Hero({ client, pipeline, facts }) {
  return (
    <header className="cs-header">
      <p className="cs-eyebrow">Featured Project · Delivered at Chakray</p>
      <h2 id="cs-title">
        NOC Automation for <span>{client}</span>
      </h2>
      <p className="cs-sub">Built with n8n and AI agents. Running in production, delivered side by side with the client.</p>

      <ol className="cs-pipe" aria-label="What the system does, step by step">
        {pipeline.map((p, i) => (
          <li key={p} style={{ '--i': i }}>
            {p}
          </li>
        ))}
      </ol>

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

export function BeforeAfter({ before, after }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} className={`cs-ba cs-reveal ${visible ? 'is-visible' : ''}`}>
      <div className="cs-ba-col is-before">
        <h4>Before</h4>
        <ul>
          {before.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
      </div>
      <span className="cs-ba-arrow" aria-hidden="true" />
      <div className="cs-ba-col is-after">
        <h4>After</h4>
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

export function RagFlow({ groups }) {
  const [ref, visible] = useInView();
  return (
    <figure ref={ref} className={`cs-rag cs-reveal ${visible ? 'is-visible' : ''}`} aria-labelledby="rag-caption">
      {groups.map((g, gi) => (
        <div key={g.title} className="cs-rag-group">
          <h4 className="cs-rag-title">{g.title}</h4>
          <ol className="cs-rag-steps">
            {g.steps.map((s, i) => (
              <li
                key={s.label}
                className={`cs-rag-step ${s.label.startsWith('Qdrant') ? 'is-qdrant' : ''}`}
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
        Documents are indexed once and updated when they change. At run time the agent searches them by meaning and
        answers from what it finds.
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
          <Icon name={c.icon} />
          <h4>{c.title}</h4>
          <p>{c.text}</p>
        </li>
      ))}
    </ul>
  );
}

export function ImpactCards({ items }) {
  return (
    <ul className="cs-cards">
      {items.map((c) => (
        <li key={c.title} className="cs-card">
          <Icon name={c.icon} />
          <h4>{c.title}</h4>
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
