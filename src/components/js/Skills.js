import React from 'react';
import aiIcon from '../../assets/icons/gpt.png';
import programmingIcon from '../../assets/icons/coding.png';
import microservicesIcon from '../../assets/icons/microservices.png';
import apiIcon from '../../assets/icons/api.png';
import databaseIcon from '../../assets/icons/databases.png';
import agileIcon from '../../assets/icons/cicd.png';
import businessIconSkill from '../../assets/icons/businessProcess.png';
import softSkillsIcon from '../../assets/icons/softskills.png';
import { Reveal, SectionHeading, Tags } from './ui';

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
    tags: ['Business Processes', 'ERP (Odoo, A3, SAP)', 'Point of Sale', 'E-commerce', 'Supply Chain', 'Accounting', 'Logistics'],
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
    <section className="pf-section" aria-labelledby="skills-title">
      <SectionHeading id="skills-title" eyebrow="What I work with" title="Skills" />
      <Reveal as="ul" className="skills-grid">
        {skillsData.map((skill, i) => (
          <li key={skill.id} className="pf-card skill-card" style={{ '--i': i }}>
            <span className="pf-icon-tile">
              <img src={skill.icon} alt="" />
            </span>
            <h3>{skill.title}</h3>
            <Tags items={skill.tags} label={`${skill.title} skills`} />
          </li>
        ))}
      </Reveal>
    </section>
  );
};

export default Skills;
