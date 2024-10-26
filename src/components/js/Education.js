import React from 'react';
import computerIcon from '../../assets/icons/computer.png';
import businessIcon from '../../assets/icons/business.png';
import educationIcon from '../../assets/icons/education.png';
import '../css/ExperienceEducation.css';

const Education = () => {
  return (
    <div className="section education-section section-background"> {}
      <h1><span style={{ color: '#E4A34E' }}>Education</span></h1>
      <img src={educationIcon} alt="Education Icon" className="section-icon top-right-icon" />
      <div className="education-item">
        <ul className="education-list">
          <p>
            Graduated in Computer Engineering (2022)
            <img src={computerIcon} alt="Computer Icon" className="degree-icon" />
          </p>
          <p>
            Graduated in Business Administration and Management (2022)
            <img src={businessIcon} alt="Business Icon" className="degree-icon" />
          </p>
        </ul>
        <div className="university-item">
          <a 
            href="https://web.ua.es/es/grados/grado-en-i2ade/plan-de-estudios.html" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="more-info"
          >
            University of Alicante
          </a>
        </div>
      </div>
    </div>
  );
};

export default Education;
