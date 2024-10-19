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
      }, 500);
    }, 5000);

    return () => clearInterval(interval);
  }, [skills.length]);

  return (
    <div className="home-container">
      <CanvasBackground /> {}
      <div className="content">
        <img src={profileImage} alt="Profile" className="profile-image" />
        <h1>Hello, I'm Alvaro Morales</h1>
        <p>Business Process Automation & Systems Integration Engineer<br/><br/><br/><br/></p>
        <h2 className={`rotating-skills ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
          {skills[currentSkillIndex]}
        </h2>
      </div>
    </div>
  );
}


export default Home;
