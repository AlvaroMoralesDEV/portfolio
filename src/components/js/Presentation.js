import React, { useEffect, useState } from 'react';
import '../css/Presentation.css';
import profileImage from '../../assets/images/profile.jpg';
import linkedinIcon from '../../assets/icons/linkedin.png';
import githubIcon from '../../assets/icons/github.png';
import gmailIcon from '../../assets/icons/gmail.png';

function Presentation() {
    const skills = [
        "Business Process Automation",
        "Systems Integration Engineer",
        "Process Improvement",
        "Workflow Optimization",
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
            <div className="content">
                <div className="intro-content">
                    <img src={profileImage} alt="Profile" className="profile-image" />
                    <div className="text-container">
                        <h1>Hi! I'm <span style={{ color: '#E4A34E' }}>Alvaro Morales</span></h1>
                        <p>
                            I love being a  <span style={{ color: '#E4A34E' }}>software engineer</span>! My focus is on creating innovative integration solutions that streamline processes and improve system interoperability. I’m passionate about building efficient systems that connect diverse platforms seamlessly.
                        </p>
                        <h2 className={`rotating-skills ${isTransitioning ? 'fade-out' : 'fade-in'}`}>
                            {skills[currentSkillIndex]}
                        </h2>
                        <div className="contact-icons">
                            <a href="https://www.linkedin.com/in/alvaromoralesfenandez-ca%C3%B1adas/" target="_blank" rel="noopener noreferrer">
                                <img src={linkedinIcon} alt="LinkedIn" className="icon" />
                            </a>
                            <a href="mailto:alvaromfc24@gmail.com">
                                <img src={gmailIcon} alt="Gmail" className="icon" />
                            </a>
                            <a href="https://github.com/AlvaroMoralesDEV" target="_blank" rel="noopener noreferrer">
                                <img src={githubIcon} alt="GitHub" className="icon" />
                            </a>
                        </div>
                        {}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Presentation;
