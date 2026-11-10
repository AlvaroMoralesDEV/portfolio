import React from 'react';
import { useInView } from './hooks';

/** Fades its content in the first time it scrolls into view. Children can stagger with `--i`. */
export function Reveal({ as: Tag = 'div', className = '', children, ...rest }) {
  const [ref, visible] = useInView();
  return (
    <Tag ref={ref} className={`pf-reveal ${visible ? 'is-visible' : ''} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}

/** Centred section heading: small pill label above the title. */
export const SectionHeading = ({ id, eyebrow, title }) => (
  <header className="pf-heading">
    <p className="pf-eyebrow">{eyebrow}</p>
    <h2 id={id}>{title}</h2>
  </header>
);

export const Tags = ({ items, label }) => (
  <ul className="pf-tags" aria-label={label}>
    {items.map((t, i) => (
      <li key={t} className="pf-tag" style={{ '--t': i }}>
        {t}
      </li>
    ))}
  </ul>
);
