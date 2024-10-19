import React from 'react';
import { Link } from 'react-router-dom'; // Ensure this line is present
import '../css/Header.css';

function Header() {
  return (
    <header>
      <div className="header-container">
        <h1 className="logo-name">Alvaro Morales</h1>
        <nav>
          <ul className="nav-menu">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Me</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><a href="#blog">Blog</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
