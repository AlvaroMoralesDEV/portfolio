import React from 'react';
import { Element } from 'react-scroll';
import Presentation from './components/js/Presentation';
import Contact from './components/js/Contact';
import Posts from './components/js/Posts';
import Education from './components/js/Education';
import Experience from './components/js/Experience';
import CanvasBackground from './components/js/CanvasBackground';
import Skills from './components/js/Skills';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <CanvasBackground /> {}
      <Element name="presentation">
        <Presentation />
      </Element>
      <Element name="skills">
        <Skills />
      </Element>
      <Element name="experience">
        <Experience />
      </Element>
      <Element name="education">
        <Education />
      </Element>
      <Element name="posts">
        <Posts />
      </Element>
      <Element name="contact">
        <Contact />
      </Element>
    </div>
  );
}

export default App;
