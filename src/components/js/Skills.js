import React from 'react';
import programmingIcon from '../../assets/icons/coding.png';
import microservicesIcon from '../../assets/icons/microservices.png';
import apiIcon from '../../assets/icons/api.png';
import databaseIcon from '../../assets/icons/databases.png';
import agileIcon from '../../assets/icons/cicd.png';
import businessIconSkill from '../../assets/icons/businessProcess.png';
import testingIcon from '../../assets/icons/test.png';
import softSkillsIcon from '../../assets/icons/softskills.png';
import '../css/Skills.css';

const skillsData = [
  {
    id: 1,
    title: 'Languages and Frameworks',
    tags: ['Java', 'JavaScript', 'C#', 'TypeScript', 'Python', 'Spring Boot', 'Node.js', '.NET'],
    icon: programmingIcon,
  },
  {
    id: 2,
    title: 'Microservices',
    tags: ['Event-Driven Architecture', 'Docker', 'RabbitMQ', 'Apache Kafka', 'ActiveMQ', 'Apache Camel', 'n8n'],
    icon: microservicesIcon,
  },
  {
    id: 3,
    title: 'API Development',
    tags: ['REST', 'SOAP', 'GraphQL', 'Swagger', 'Api Management', 'Gravitee', 'Webhook'],
    icon: apiIcon,
  },
  {
    id: 4,
    title: 'Databases',
    tags: ['SQL', 'PostgreSQL', 'MySQL', 'NoSQL', 'MongoDB', 'DynamoDB', 'Redis', 'Database Design'],
    icon: databaseIcon,
  },
  {
    id: 5,
    title: 'Agile and Good Practices',
    tags: ['Agile Methodology', 'Scrum', 'Kanban', 'Jenkins', 'Git', 'CI/CD', 'TDD/BDD', 'Confluence'],
    icon: agileIcon,
  },
  {
    id: 6,
    title: 'Business Knowledge',
    tags: ['Business Processes', 'ERP', 'Supply Chain', 'Accounting', 'Logistics', 'SAP', 'EDI'],
    icon: businessIconSkill,
  },
  {
    id: 7,
    title: 'Testing and Quality Assurance',
    tags: ['JUnit', 'Cucumber', 'Mockito', 'Postman', 'WireMock'],
    icon: testingIcon,
  },
  {
    id: 8,
    title: 'Soft Skills',
    tags: ['Teamwork', 'Adaptability', 'Critical Thinking', 'Problem Solving', 'Continuous Learning'],
    icon: softSkillsIcon,
  },
];

const Skills = () => {
  return (
    <div className="skills-container"> {}
      <div className="content">
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
    </div>
  );
};

export default Skills;
