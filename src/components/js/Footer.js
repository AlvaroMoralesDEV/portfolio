import React from 'react';
import '../css/Footer.css';
import gmailIcon from '../../assets/icons/gmail.png';
import linkedinIcon from '../../assets/icons/linkedin.png';
import githubIcon from '../../assets/icons/github.png';


function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Alvaro Morales.</p>
        <div className="contact-info">
          <a href="https://www.linkedin.com/in/alvaromoralesfenandez-ca%C3%B1adas/" target="_blank" rel="noopener noreferrer">
            <img src={linkedinIcon} alt="LinkedIn" className="social-icon" /> {}
          </a>
          <a href="https://github.com/AlvaroMoralesDEV" target="_blank" rel="noopener noreferrer">
            <img src={githubIcon} alt="Github" className="social-icon" /> {}
          </a>
          <a href="mailto:alvaromfc24@gmail.com">
            <img src={gmailIcon} alt="Email" className="social-icon" /> {}
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;