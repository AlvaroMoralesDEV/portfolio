import React from 'react';
import '../css/Footer.css';
import gmailIcon from '../../assets/icons/email.png';

function Footer() {
  return (
    <footer>
      <div className="footer-content">
        <p>&copy; {new Date().getFullYear()} Alvaro Morales.</p>
        <div className="contact-info">
          <a href="https://www.linkedin.com/in/alvaromoralesfenandez-ca%C3%B1adas/" target="_blank" rel="noopener noreferrer">
            <img src={gmailIcon} alt="LinkedIn" className="social-icon" /> {}
          </a>
          <a href="alvaromfc24@gmail.com">
            <img src="/path/to/email-icon.png" alt="Email" className="social-icon" /> {}
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;