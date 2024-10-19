import React from 'react';
import profileImage from '../../assets/images/profile.jpg';
import '../css/AboutMe.css';

const AboutMe = () => {
  return (
    <div className="about-container">
      <div className="profile-section">
        <img 
          src={profileImage}
          alt="Profile" 
          className="profile-image" 
        />
      </div>
      <div className="content">
        <div style={{
          position: 'relative',
          padding: '20px',
          backgroundColor: 'rgba(0, 0, 0, 0.5)', 
          borderRadius: '8px',
          marginTop: '5px',
          zIndex: 1,
          textAlign: 'center',
        }}>
          <h1>About Me</h1>
          <p>
            Hi!
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;