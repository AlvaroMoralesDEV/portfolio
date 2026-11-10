import React from 'react';
import computerIcon from '../../assets/icons/computer.png';
import businessIcon from '../../assets/icons/business.png';
import { Reveal, SectionHeading } from './ui';

const DEGREES = [
  {
    title: 'Computer Engineering',
    text: 'The engineering side: how to design and build software systems.',
    icon: computerIcon,
  },
  {
    title: 'Business Administration and Management',
    text: 'The business side: how the companies I build for actually operate.',
    icon: businessIcon,
  },
];

const Education = () => {
  return (
    <section className="pf-section" aria-labelledby="education-title">
      <SectionHeading id="education-title" eyebrow="Double degree · Graduated 2022" title="Education" />
      <Reveal as="ul" className="edu-grid">
        {DEGREES.map((d, i) => (
          <li key={d.title} className="pf-card edu-card" style={{ '--i': i }}>
            <span className="pf-icon-tile">
              <img src={d.icon} alt="" />
            </span>
            <div>
              <h3>{d.title}</h3>
              <p>{d.text}</p>
            </div>
          </li>
        ))}
      </Reveal>
      <p className="edu-school">
        <a
          href="https://web.ua.es/es/grados/grado-en-i2ade/plan-de-estudios.html"
          target="_blank"
          rel="noopener noreferrer"
        >
          University of Alicante <span aria-hidden="true">→</span>
        </a>
      </p>
    </section>
  );
};

export default Education;
