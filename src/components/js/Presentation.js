import React, { useEffect, useState } from 'react';
import profileImage from '../../assets/images/profile.jpg';
import linkedinIcon from '../../assets/icons/linkedin.png';
import githubIcon from '../../assets/icons/github.png';
import gmailIcon from '../../assets/icons/gmail.png';
import { scrollToSection, useReducedMotion } from './hooks';

const FOCUS_AREAS = [
  'AI Agent Engineering',
  'RAG & Model Context Protocol',
  'Client-Facing Engineering',
  'Systems Integration',
  'Business Process Automation',
];

const PILLARS = [
  { title: 'AI agents', text: 'RAG pipelines, MCP servers and agent orchestration.' },
  { title: 'Integrations', text: 'ERP, e-commerce, point of sale and banking systems that talk to each other.' },
  { title: 'Client-facing', text: 'From discovery with the client to a solution running in production.' },
];

export const SOCIAL_LINKS = [
  { name: 'LinkedIn', href: 'https://www.linkedin.com/in/alvaromoralesfenandez-ca%C3%B1adas/', icon: linkedinIcon, external: true },
  { name: 'Email', href: 'mailto:alvaromfc24@gmail.com', icon: gmailIcon },
  { name: 'GitHub', href: 'https://github.com/AlvaroMoralesDEV', icon: githubIcon, external: true },
];

function RotatingFocus() {
  const reducedMotion = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (reducedMotion) return undefined;
    let timeout;
    const interval = setInterval(() => {
      setFading(true);
      timeout = setTimeout(() => {
        setIndex((i) => (i + 1) % FOCUS_AREAS.length);
        setFading(false);
      }, 300);
    }, 3000);
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [reducedMotion]);

  // Screen readers and reduced-motion users get the full list instead of a rotating line.
  return (
    <>
      <p className="pf-sr-only">Focus areas: {FOCUS_AREAS.join(', ')}.</p>
      {reducedMotion ? (
        <p className="hero-focus is-static" aria-hidden="true">
          {FOCUS_AREAS.join(' · ')}
        </p>
      ) : (
        <p className={`hero-focus ${fading ? 'is-fading' : ''}`} aria-hidden="true">
          {FOCUS_AREAS[index]}
        </p>
      )}
    </>
  );
}

function Presentation() {
  const go = (e, id) => {
    e.preventDefault();
    scrollToSection(id);
  };

  return (
    <div className="hero">
      <div className="hero-panel">
        <div className="hero-photo">
          <img src={profileImage} alt="Portrait of Alvaro Morales" />
        </div>

        <div className="hero-text">
          <p className="pf-eyebrow">Software Engineer · AI Agents &amp; Integrations</p>
          <h1>
            Hi! I'm <span>Alvaro Morales</span>
          </h1>
          <p className="hero-lead">
            I build <span>AI agents</span> and the integrations that plug them into the systems companies already run:
            RAG pipelines, MCP servers and automated workflows. I work <span>directly with clients</span>, get to the
            real problem and ship solutions that make it to production.
          </p>
          <RotatingFocus />

          <div className="hero-actions">
            <a href="#projects" className="pf-btn" onClick={(e) => go(e, 'projects')}>
              See my projects
            </a>
            <a href="#contact" className="pf-btn is-ghost" onClick={(e) => go(e, 'contact')}>
              Get in touch
            </a>
          </div>
        </div>

        <ul className="hero-pillars">
          {PILLARS.map((p) => (
            <li key={p.title}>
              <strong>{p.title}</strong>
              <span>{p.text}</span>
            </li>
          ))}
        </ul>
      </div>

      <a href="#experience" className="hero-cue" aria-label="Scroll to experience" onClick={(e) => go(e, 'experience')}>
        <span aria-hidden="true" />
      </a>
    </div>
  );
}

export default Presentation;
