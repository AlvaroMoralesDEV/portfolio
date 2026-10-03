import React from 'react';
import aiIcon from '../../assets/icons/gpt.png';
import programmingIcon from '../../assets/icons/coding.png';
import microservicesIcon from '../../assets/icons/microservices.png';
import apiIcon from '../../assets/icons/api.png';
import databaseIcon from '../../assets/icons/databases.png';
import agileIcon from '../../assets/icons/cicd.png';
import businessIconSkill from '../../assets/icons/businessProcess.png';
import softSkillsIcon from '../../assets/icons/softskills.png';
import '../css/Skills.css';

const skillsData = [
  {
    id: 1,
    title: 'AI Agents and LLMs',
    tags: ['AI Agent Orchestration', 'RAG', 'Model Context Protocol (MCP)', 'Vector Databases', 'Qdrant', 'n8n'],
    icon: aiIcon,
  },
  {
    id: 2,
    title: 'Languages and Frameworks',
    tags: ['Java', 'Python', 'TypeScript', 'JavaScript', 'C#', 'Spring Boot', 'Quarkus', 'Node.js', '.NET'],
    icon: programmingIcon,
  },
  {
    id: 3,
    title: 'Integration and Microservices',
    tags: ['Distributed Systems', 'Docker', 'Apache Camel', 'AMQP', 'MQTT', 'RabbitMQ', 'Apache Kafka', 'Airflow', 'Nginx'],
    icon: microservicesIcon,
  },
  {
    id: 4,
    title: 'API Development',
    tags: ['REST', 'SOAP', 'GraphQL', 'Swagger', 'API Management', 'Gravitee', 'Webhooks'],
    icon: apiIcon,
  },
  {
    id: 5,
    title: 'Databases',
    tags: ['PostgreSQL', 'MySQL', 'MongoDB', 'DynamoDB', 'Redis', 'Qdrant', 'Database Design'],
    icon: databaseIcon,
  },
  {
    id: 6,
    title: 'Testing and Good Practices',
    tags: ['Agile / Scrum', 'Git', 'CI/CD', 'TDD/BDD', 'JUnit', 'Cucumber', 'WireMock', 'Postman'],
    icon: agileIcon,
  },
  {
    id: 7,
    title: 'Business Knowledge',
    tags: ['Business Processes', 'ERP (Odoo, A3, SAP)', 'POS', 'E-commerce', 'Supply Chain', 'Accounting', 'Logistics'],
    icon: businessIconSkill,
  },
  {
    id: 8,
    title: 'Client-Facing Skills',
    tags: ['Client Collaboration', 'Requirements Discovery', 'Problem Solving', 'Adaptability', 'English', 'Spanish'],
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
