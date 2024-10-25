import React from 'react';
import linkedinIcon from '../../assets/icons/linkedin.png';
import githubIcon from '../../assets/icons/github.png';
import gmailIcon from '../../assets/icons/gmail.png';
import '../css/Contact.css';

const Contact = () => {
  return (
      <div className="section education-section section-background"> {}
        <h1><span style={{ color: '#E4A34E' }}>Contact Me!</span></h1>
        <p>If you want to contact me, send an email or add me on Linkedin!</p>

        <p style={{ margin: '10px 0' }}>
          Email:
          <a href="mailto:alvaromfc24@gmail.com" style={{ color: '#E4A34E', margin: '0 5px' }}>
            alvaromfc24@gmail.com
          </a>
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '10px' }}>
          <a href="https://www.linkedin.com/in/alvaromoralesfenandez-ca%C3%B1adas/" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px' }}>
            <img src={linkedinIcon} alt="LinkedIn" className="icon" />
          </a>
          <a href="mailto:alvaromfc24@gmail.com" style={{ margin: '0 10px' }}>
            <img src={gmailIcon} alt="Gmail" className="icon" />
          </a>
          <a href="https://github.com/AlvaroMoralesDEV" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px' }}>
            <img src={githubIcon} alt="GitHub" className="icon" />
          </a>
        </div>
      </div>
  );
};

export default Contact;
