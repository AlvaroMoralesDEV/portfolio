import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import Presentation from '../components/js/Presentation';
import Contact from '../components/js/Contact';
import Education from '../components/js/Education';
import Experience from '../components/js/Experience';
import Skills from '../components/js/Skills';
import ProjectsSection from '../components/js/caseStudy/ProjectsSection';
import BlogSection from '../components/js/blog/BlogSection';
import { NOC_PATH } from './NocProjectPage';

// Old deep link to the case study, from when it lived on this page.
const LEGACY_CASE_STUDY_HASH = '#noc-case-study';

// id + tabIndex let the navbar move keyboard focus to the section it scrolls to.
const Section = ({ name, children }) => (
  <div id={name} tabIndex={-1} className="app-section">
    {children}
  </div>
);

function HomePage() {
  const { hash } = useLocation();
  const isLegacyLink = hash === LEGACY_CASE_STUDY_HASH;

  // Arriving with a hash (e.g. from the project page's menu): jump to that section.
  useEffect(() => {
    if (!hash || isLegacyLink) return;
    const target = document.getElementById(decodeURIComponent(hash.slice(1)));
    if (!target) return;
    target.scrollIntoView(); // html has scroll-padding-top for the sticky navbar
    target.focus({ preventScroll: true });
  }, [hash, isLegacyLink]);

  if (isLegacyLink) return <Navigate to={NOC_PATH} replace />;

  return (
    <main className="app-main">
      <Section name="presentation">
        <Presentation />
      </Section>
      <Section name="experience">
        <Experience />
      </Section>
      <Section name="projects">
        <ProjectsSection />
      </Section>
      <Section name="blog">
        <BlogSection />
      </Section>
      <Section name="skills">
        <Skills />
      </Section>
      <Section name="education">
        <Education />
      </Section>
      <Section name="contact">
        <Contact />
      </Section>
    </main>
  );
}

export default HomePage;
