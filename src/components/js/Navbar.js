import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { scrollToSection, useActiveSection } from './hooks';
import '../css/Navbar.css';

export const NAV_SECTIONS = [
  { id: 'presentation', label: 'Home' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
];

const SECTION_IDS = NAV_SECTIONS.map((s) => s.id);
const NO_IDS = [];

function Navbar() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef(null);
  const firstLinkRef = useRef(null);
  const navigate = useNavigate();
  const onHome = useLocation().pathname === '/';
  // Section tracking only makes sense on the home page; project pages sit under "Projects".
  const tracked = useActiveSection(onHome ? SECTION_IDS : NO_IDS);
  const active = onHome ? tracked : 'projects';
  const hrefFor = (id) => (onHome ? `#${id}` : `/#${id}`);

  // Close the drawer on Escape and return focus to the toggle.
  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    firstLinkRef.current?.focus();
    return () => document.removeEventListener('keydown', onKey);
  }, [open]);

  // Close the drawer if the viewport grows past the mobile breakpoint.
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 769px)');
    const onChange = (e) => e.matches && setOpen(false);
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  const goTo = (e, id) => {
    e.preventDefault();
    if (onHome) scrollToSection(id);
    else navigate(`/#${id}`);
    setOpen(false);
  };

  return (
    <header className="nav-bar">
      <div className="nav-inner">
        <a href={hrefFor('presentation')} className="nav-brand" onClick={(e) => goTo(e, 'presentation')}>
          Alvaro <span>Morales</span>
        </a>

        <button
          ref={toggleRef}
          type="button"
          className={`nav-toggle ${open ? 'is-open' : ''}`}
          aria-expanded={open}
          aria-controls="nav-menu"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
          <span className="nav-toggle-bar" />
        </button>

        <nav aria-label="Main">
          <ul id="nav-menu" className={`nav-links ${open ? 'is-open' : ''}`}>
            {NAV_SECTIONS.map((s, i) => (
              <li key={s.id}>
                <a
                  ref={i === 0 ? firstLinkRef : undefined}
                  href={hrefFor(s.id)}
                  className={`nav-link ${active === s.id ? 'is-active' : ''}`}
                  aria-current={active === s.id ? 'true' : undefined}
                  onClick={(e) => goTo(e, s.id)}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      {open && <div className="nav-backdrop" aria-hidden="true" onClick={() => setOpen(false)} />}
    </header>
  );
}

export default Navbar;
