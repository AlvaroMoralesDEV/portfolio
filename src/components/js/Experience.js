import React from 'react';
import { Reveal, SectionHeading } from './ui';

const ROLES = [
  {
    company: 'Chakray Consulting',
    href: 'https://www.chakray.com/es/',
    period: '2022 – Present',
    current: true,
    text: 'Partnering with clients to design and ship AI agents and integrations that automate their business workflows.',
    highlights: [
      'AI-driven NOC automation for a leading European telecom infrastructure operator, delivered to production',
      'Migration of business-critical scripts to Apache Airflow on OpenShift',
      'ERP, e-commerce, point-of-sale and banking integrations',
    ],
  },
  {
    company: 'Xeosefa',
    href: 'https://www.xeosefa.com/',
    period: 'Intern · 2021 – 2022',
    text: 'Automated supply chain processes using .NET and integrated AWS services.',
  },
];

const Experience = () => {
  return (
    <section className="pf-section" aria-labelledby="experience-title">
      <SectionHeading id="experience-title" eyebrow="Where I have worked" title="Experience" />
      <Reveal as="ol" className="xp-list">
        {ROLES.map((role, i) => (
          <li key={role.company} className={`xp-item ${role.current ? 'is-current' : ''}`} style={{ '--i': i }}>
            <span className="xp-dot" aria-hidden="true" />
            <div className="xp-card">
              <div className="xp-head">
                <h3>
                  <a href={role.href} target="_blank" rel="noopener noreferrer">
                    {role.company}
                  </a>
                </h3>
                <span className="xp-period">{role.period}</span>
              </div>
              <p>{role.text}</p>
              {role.highlights && (
                <ul className="xp-highlights">
                  {role.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              )}
            </div>
          </li>
        ))}
      </Reveal>
    </section>
  );
};

export default Experience;
