import React, { useEffect, useState } from 'react';
import '../css/Presentation.css';
import profileImage from '../../assets/images/profile.jpg';
import linkedinIcon from '../../assets/icons/linkedin.png';
import githubIcon from '../../assets/icons/github.png';
import gmailIcon from '../../assets/icons/gmail.png';

function Presentation() {
    const skills = [
        "AI Agent Engineering",
        "RAG & Model Context Protocol",
        "Client-Facing Engineering",
        "Systems Integration",
        "Business Process Automation"
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
                            I love being a  <span style={{ color: '#E4A34E' }}>software engineer</span>! I focus on <span style={{ color: '#E4A34E' }}>AI agents</span>. Building RAG pipelines, MCP servers and the integrations that plug them into the systems companies already run. I enjoy working directly with clients, understanding their real problems, and shipping solutions that make it to production.
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
