import React from 'react';
import experienceIcon from '../../assets/icons/experience.png';
import '../css/ExperienceEducation.css';

const Experience = () => {
  return (
    <div className="section experience-section section-background"> {}
      <h1><span style={{ color: '#E4A34E' }}>Experience</span></h1>
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
      <div className="experience-item">
        <p>
          Automated supply chain processes using .NET and integrated AWS services at&nbsp;
          <a href="https://www.xeosefa.com/" target="_blank" rel="noopener noreferrer" className="experience-link">
            Xeosefa
          </a>&nbsp;
          (Intern, 2021 - 2022)
        </p>
      </div>
    </div>
  );
};

export default Experience;
