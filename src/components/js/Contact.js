import React from 'react';
import { SOCIAL_LINKS } from './Presentation';
import { SectionHeading } from './ui';

const Contact = () => {
  return (
    <section className="pf-section contact" aria-labelledby="contact-title">
      <SectionHeading id="contact-title" eyebrow="Let's talk" title="Contact me" />
      <ul className="contact-links">
        {SOCIAL_LINKS.map((s) => (
          <li key={s.name}>
            <a
              href={s.href}
              className="pf-btn is-ghost"
              {...(s.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
            >
              <img src={s.icon} alt="" />
              {s.name}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Contact;
