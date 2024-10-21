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

//skills icons
import microservicesIcon from '../../assets/icons/microservices.png';
import integrationIcon from '../../assets/icons/integration.png';
import databaseIcon from '../../assets/icons/databases.png';
import programmingIcon from '../../assets/icons/coding.png';
import agileIcon from '../../assets/icons/cicd.png';
import businessIconSkill from '../../assets/icons/businessProcess.png';

import '../css/AboutMe.css';

const skillsData = [
  {
    id: 1,
    title: 'Languages and Frameworks',
    tags: ['Java', 'JavaScript', 'TypeScript', 'C#', 'Spring Boot', 'Node.js', '.NET', 'Python', 'React', 'TDD/BDD', 'JUnit'],
    icon: programmingIcon,
  },
  {
    id: 2,
    title: 'Microservices and API Development',
    tags: ['Docker', 'REST', 'GraphQL', 'SOAP', 'Swagger', 'Postman', 'WireMock', 'Event-Driven Architecture'],
    icon: microservicesIcon,
  },
  {
    id: 3,
    title: 'Integration Technologies',
    tags: ['RabbitMQ', 'Apache Kafka', 'ActiveMQ', 'Apache Camel', 'n8n', 'Gravitee', 'WSO2'],
    icon: integrationIcon,
  },
  {
    id: 4,
    title: 'Databases',
    tags: ['SQL', 'NoSQL', 'Database Design', 'MySQL', 'PostgreSQL', 'MongoDB', 'DynamoDB'],
    icon: databaseIcon,
  },
  {
    id: 5,
    title: 'Business Knowledge',
    tags: ['Business Processes', 'ERP', 'Supply Chain', 'Accounting', 'Logistics', 'SAP'],
    icon: businessIconSkill,
  },
  {
    id: 6,
    title: 'Agile Practices and CI/CD',
    tags: ['Agile Methodology', 'Scrum', 'Kanban', 'Jenkins', 'Continuous Integration', 'Continuous Deployment'],
    icon: agileIcon,
  },
];

const AboutMe = () => {
  return (
    <div className="about-container">
      <div className="section profile-section">
        <h1>About Me</h1>
        <div className="profile-info">
          <img src={profileImage} alt="Profile" className="profile-image" />
          <div className="profile-description">
            <p>
              Hi! I'm <span style={{ color: '#FFA500' }}>Alvaro Morales</span>, a passionate Software Engineer with experience in integration solutions, microservices, and distributed systems.
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
          <div className="skills-header">
            <h1>Skills</h1>
            <img src={skillsIcon} alt="Skills Icon" className="section-icon" />
          </div>
          <div className="skills-grid">
            {skillsData.map(skill => (
              <div key={skill.id} className="skill-box">
                <img src={skill.icon} alt={`${skill.title} Icon`} className="skill-icon" />
                <h3>{skill.title}</h3>
                <div className="tags">
                  {skill.tags.map((tag, index) => (
                    <span key={index} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="section experience-section">
          <h1>Experience</h1>
          <img src={experienceIcon} alt="Experience Icon" className="section-icon top-right-icon" />
          <div className="experience-item">
            <p>
              Developed integration solutions within a microservices architecture focusing on accounting and logistics processes at&nbsp;
              <a href="https://www.chakray.com/es/" target="_blank" rel="noopener noreferrer" className="experience-link">
                Chakray Consulting
              </a>&nbsp;
              (2022 - Current)
            </p>
          </div>

          <div className="experience-item" style={{ marginTop: '30px' }}>
            <p>
              Automated accounting and logistics processes using .NET principles and integrated AWS services at&nbsp;
              <a href="https://www.xeosefa.com/" target="_blank" rel="noopener noreferrer" className="experience-link">
                Xeosefa
              </a>&nbsp;
              (Intern, 2021 - 2022)
            </p>
          </div>
        </div>


        <div className="section education-section">
  <h1>Education</h1>
  <img src={educationIcon} alt="Education Icon" className="section-icon top-right-icon" />
  <div className="education-item" style={{ marginTop: '30px' }}>
    <ul className="education-list">
      <li>
        Graduated in Computer Engineering (2022)
        <img src={computerIcon} alt="Computer Icon" className="degree-icon" style={{ marginLeft: '10px' }} />
      </li>
      <li>
        Graduated in Business Administration and Management (2022)
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
    </div>
  );
};

export default AboutMe;
