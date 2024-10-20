import React from 'react';
import profileImage from '../../assets/images/profile.jpg';
import linkedinIcon from '../../assets/icons/linkedin.png';
import githubIcon from '../../assets/icons/github.png';
import gmailIcon from '../../assets/icons/gmail.png';
import skillsIcon from '../../assets/icons/skills.png';
import experienceIcon from '../../assets/icons/experience.png';
import educationIcon from '../../assets/icons/education.png';
import computerIcon from '../../assets/icons/computer.png';
import businessIcon from '../../assets/icons/business.png';
import '../css/AboutMe.css';

const AboutMe = () => {
  return (
    <div className="about-container">
      <div className="section profile-section">
        <h1>About Me</h1>
        <div className="profile-info">
          <img src={profileImage} alt="Profile" className="profile-image" />
          <div className="profile-description">
            <p>
              Hi! I'm <span style={{ color: '#E4A34E' }}>Alvaro Morales</span>, a passionate Software Engineer with experience in integration solutions, microservices, and distributed systems.
            </p>
            <div className="contact-info">
              <a href="https://www.linkedin.com/in/alvaromoralesfenandez-ca%C3%B1adas/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Profile">
                <img src={linkedinIcon} alt="LinkedIn" className="social-icon" />
              </a>
              <a href="https://github.com/AlvaroMoralesDEV" target="_blank" rel="noopener noreferrer" aria-label="GitHub Profile">
                <img src={githubIcon} alt="GitHub" className="social-icon" />
              </a>
              <a href="mailto:alvaromfc24@gmail.com" aria-label="Email Alvaro Morales">
                <img src={gmailIcon} alt="Email" className="social-icon" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="content">
        <div className="section skills-section">
          <h1>Skills</h1>
          <img src={skillsIcon} alt="Skills Icon" className="section-icon" />
          <ul className="skills-list">
            <li>
              <span className="skill-category">Languages & Frameworks:</span>
              &nbsp;Java, JavaScript, TypeScript, C#, Spring Boot, Node, .NET, Python
            </li>
            <li>
              <span className="skill-category">Tools & Technologies:</span>
              &nbsp;Docker, Apache Camel, Quarkus, Gravitee, N8n, Wso2, REST, SOAP, AMQP, MQTT, Nginx, JUnit, WireMock, Postman, Cucumber, Zabbix, Grafana
            </li>
            <li>
              <span className="skill-category">Databases:</span>
              &nbsp;MySQL, PostgreSQL, MongoDB, DynamoDB
            </li>
            <li>
              <span className="skill-category">Concepts & Methodologies:</span>
              &nbsp;Integration, Microservices, Distributed Systems, CI/CD, TDD/BDD, EDI, Supply Chain, Agile methodology
            </li>
          </ul>
        </div>

        <div className="section experience-section">
          <h1>Experience</h1>
          <img src={experienceIcon} alt="Experience Icon" className="section-icon" />

          <div className="experience-item">
            <h2 style={{ display: 'inline', marginRight: '10px', color: '#e6b678' }}>
              <a href="https://www.chakray.com/es/" target="_blank" rel="noopener noreferrer" style={{ color: '#e6b678', textDecoration: 'none' }}>
                Chakray Consulting
              </a>
            </h2>
            <h5 style={{ margin: '5px 0', color: '#D9D9D9' }}>2022 - Current</h5>
            <ul className="experience-list">
              <li>
                Developed <span style={{ color: '#E4A34E' }}>integration</span> solutions within a <span style={{ color: '#E4A34E' }}>microservices</span> architecture focusing on accounting and logistics processes.
              </li>
              <li>
                Orchestrated message queuing systems and webhooks optimizing task scheduling and enabling real-time <span style={{ color: '#E4A34E' }}>data synchronization</span>.
              </li>
              <li>
                Leveraged <span style={{ color: '#E4A34E' }}>API</span> managers to enhance system interoperability and security.
              </li>
              <li>
                Utilized <span style={{ color: '#E4A34E' }}>databases</span> for efficient data querying and robust system integration.
              </li>
              <li>
                Designed custom plugins and Cucumber steps to accelerate <span style={{ color: '#E4A34E' }}>quality assurance</span>.
              </li>
            </ul>
          </div>

          <div className="experience-item" style={{ marginTop: '30px' }}>
            <h2 style={{ display: 'inline', marginRight: '10px', color: '#e6b678' }}>
              <a href="https://www.xeosefa.com/" target="_blank" rel="noopener noreferrer" style={{ color: '#e6b678', textDecoration: 'none' }}>
                Xeosefa (Intern)
              </a>
            </h2>
            <h5 style={{ margin: '5px 0', color: '#D9D9D9' }}>2021 - 2022</h5>
            <ul className="experience-list">
              <li>
                <span style={{ color: '#E4A34E' }}>Automated</span> accounting and logistics processes using .NET principles.
              </li>
              <li>
                Integrated <span style={{ color: '#E4A34E' }}>DynamoDB (AWS)</span> into the application enhancing data handling for high-volume transactions.
              </li>
              <li>
                Developed a cron job to <span style={{ color: '#E4A34E' }}>automate</span> batch order processing via REST API.
              </li>
              <li>
                Synchronized the internal <span style={{ color: '#E4A34E' }}>ERP</span> system (A3) with the application using A3’s API.
              </li>
            </ul>
          </div>
        </div>
        <div className="section education-section">
          <h1>Education</h1>
          <img src={educationIcon} alt="Education Icon" className="section-icon" />
          <ul className="education-list">
            <li>
              Graduated in Computer Engineering (Graduated 2022)
              <img src={computerIcon} alt="Computer Icon" className="degree-icon" style={{ marginLeft: '10px' }} />
            </li>
            <li>
              Graduated in Business Administration and Management (Graduated 2022)
              <img src={businessIcon} alt="Business Icon" className="degree-icon" style={{ marginLeft: '10px' }} />
            </li>
          </ul>
          <div>
            <a href="https://web.ua.es/es/grados/grado-en-i2ade/plan-de-estudios.html" target="_blank" rel="noopener noreferrer" className="more-info">
              University of Alicante
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default AboutMe;
