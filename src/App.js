import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import Header from './components/js/Header';
import Footer from './components/js/Footer';
import Home from './components/js/Home';
import AboutMe from './components/js/aboutMe';
import Contact from './components/js/Contact'; 
import Posts from './components/js/Posts';
import CanvasBackground from './components/js/CanvasBackground';

import './App.css';

function App() {
  const location = useLocation();
  const isAboutPage = location.pathname === '/about';

  return (
    <div className="app-container">
      <Header />
      <main style={{ position: 'relative' }}>
        {}
        {!isAboutPage && <CanvasBackground />}
        <div style={{ position: 'relative', zIndex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<AboutMe />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/posts" element={<Posts />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default function AppWrapper() {
  return (
    <Router>
      <App />
    </Router>
  );
}
