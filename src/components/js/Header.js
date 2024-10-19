import React from 'react';
import '../css/Header.css';

function Header() {
  return (
    <header>
      <div className="header-container">
        <img src="icon.png" alt="Logo" className="logo-icon" /> {}
        <h1 className="logo-name">Alvaro Morales</h1>
        <nav>
          <ul className="nav-menu">
            <li><a href="#home">Home</a></li>
            <li><a href="#about">About Me</a></li>
            <li><a href="#experience">Experience</a></li>
            <li><a href="#contact">Contact</a></li>
            <li><a href="#blog">Blog</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
