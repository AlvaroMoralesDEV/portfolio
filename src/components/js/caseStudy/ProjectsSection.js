import React from 'react';
import { Link } from 'react-router-dom';
import { SectionHeading } from '../ui';
import { OtherProjects, Pipeline } from './CaseStudyParts';
import { CLIENT, NOC_PATH, keyTech, otherProjects, pipeline, summary } from './caseStudyData';
import '../../css/CaseStudy.css';

/** Home page "Projects" section: a card for the NOC case study plus the other projects. */
function ProjectsSection() {
  return (
    <section className="cs-section" aria-labelledby="projects-title">
      <SectionHeading id="projects-title" eyebrow="What I have built" title="Projects" />

      <article className="cs-feature" aria-labelledby="cs-feature-title">
        <p className="cs-eyebrow">Featured project · Delivered at Chakray</p>
        <h3 id="cs-feature-title">
          NOC Automation for <span>{CLIENT}</span>
        </h3>
        <p className="cs-feature-text">{summary}</p>
        <ul className="cs-tags" aria-label="Key technologies">
          {keyTech.map((t) => (
            <li key={t} className="cs-tag">
              {t}
            </li>
          ))}
        </ul>
        <Pipeline steps={pipeline} />
        {/* The link's ::after covers the card, so the whole card is one click target. */}
        <Link to={NOC_PATH} className="pf-btn cs-feature-link">
          View case study{' '}
          <span className="cs-feature-arrow" aria-hidden="true">
            →
          </span>
        </Link>
      </article>

      <h3 className="cs-subheading">Other projects</h3>
      <OtherProjects items={otherProjects} />
    </section>
  );
}

export default ProjectsSection;
