import React from 'react';
import linkedinIcon from '../../assets/icons/linkedin.png';
import githubIcon from '../../assets/icons/github.png';
import gmailIcon from '../../assets/icons/gmail.png';
import '../css/Contact.css';

const Contact = () => {
  return (
    <div className="contact-container"> {}
      <div className="content">
        <div style={{
          position: 'relative',
          padding: '20px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          borderRadius: '8px',
          marginTop: '-100px',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          color: '#F0F0F0',
        }}>
          <h1><span style={{ color: '#E4A34E' }}>Contact Me!</span></h1>
          <p>If you would like to get in touch, feel free to reach out via email or connect with me on LinkedIn!</p>

          <p style={{ margin: '10px 0' }}>
            Email:
            <a href="mailto:alvaromfc24@gmail.com" style={{ color: '#E4A34E', margin: '0 5px' }}>
              alvaromfc24@gmail.com
            </a>
          </p>

          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: '10px'
          }}>
            <a
              href="https://www.linkedin.com/in/alvaromoralesfenandez-ca%C3%B1adas/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ margin: '0 10px' }}
            >
              <img
                src={linkedinIcon}
                alt="LinkedIn"
                className="icon"
              />
            </a>

            <a
              href="mailto:alvaromfc24@gmail.com"
              style={{ margin: '0 10px' }}
            >
              <img
                src={gmailIcon}
                alt="Gmail"
                className="icon"
              />
            </a>

            <a
              href="https://github.com/AlvaroMoralesDEV"
              target="_blank"
              rel="noopener noreferrer"
              style={{ margin: '0 10px' }}
            >
              <img
                src={githubIcon}
                alt="GitHub"
                className="icon"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
