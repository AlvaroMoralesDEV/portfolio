import React from 'react';
import Navbar from './components/js/Navbar';
import Presentation from './components/js/Presentation';
import Contact from './components/js/Contact';
import Education from './components/js/Education';
import Experience from './components/js/Experience';
import CanvasBackground from './components/js/CanvasBackground';
import Skills from './components/js/Skills';
import CaseStudy from './components/js/caseStudy/CaseStudy';
import './App.css';
import './components/css/Sections.css';

// id + tabIndex let the navbar move keyboard focus to the section it scrolls to.
const Section = ({ name, children }) => (
  <div id={name} tabIndex={-1} className="app-section">
    {children}
  </div>
);

function App() {
  return (
    <div className="app-container">
      <CanvasBackground />
      <Navbar />
      <main className="app-main">
        <Section name="presentation">
          <Presentation />
        </Section>
        <Section name="experience">
          <Experience />
        </Section>
        <Section name="projects">
          <CaseStudy />
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
      <footer className="pf-footer">
        <p>© {new Date().getFullYear()} Alvaro Morales · Built with React</p>
      </footer>
    </div>
  );
}

export default App;
