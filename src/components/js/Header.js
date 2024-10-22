import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';

function Header() {
  return (
    <header>
      <div className="header-container">
        <nav>
          <ul className="nav-menu">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About Me</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><a href="/posts">Posts</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
