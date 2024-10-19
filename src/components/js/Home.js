import React, { useEffect, useState } from 'react';
import '../css/Home.css';
import profileImage from '../../assets/images/profile.jpg';
import CanvasBackground from './CanvasBackground';

function Home() {
  const skills = [
    "Automation",
    "Integration",
    "Process Improvement",
    "Workflow Optimization",
    "Data Analysis",
    "Project Management",
    "Microservices"
  ];

  const [currentSkillIndex, setCurrentSkillIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentSkillIndex((prevIndex) => (prevIndex + 1) % skills.length);
        setIsTransitioning(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, [skills.length]);

  return (
    <div className="home-container">
      <CanvasBackground />
      <div className="content">
        {}
        <div style={{
          display: 'flex',
          flexDirection: 'column', 
          alignItems: 'center', 
        }}>
          {}
          <img src={profileImage} alt="Profile" className="profile-image" />

          {}
          <div style={{
            position: 'relative',
            padding: '20px',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', 
            borderRadius: '8px',
            marginTop: '5px',
            zIndex: 1
          }}>
            <h1>Hello, I'm Alvaro Morales</h1>
            <p>Business Process Automation & Systems Integration Engineer<br/><br/></p>
            
            {}
            <h2 className={`rotating-skills ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
              {skills[currentSkillIndex]}
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
