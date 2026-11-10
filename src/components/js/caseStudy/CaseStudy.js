import React from 'react';
import ArchitectureDiagram from './ArchitectureDiagram';
import WorkflowTabs from './WorkflowTabs';
import { AiLayers, BeforeAfter, Hero, ImpactCards, OtherProjects, RagFlow, TechStack, Timeline } from './CaseStudyParts';
import {
  CLIENT,
  aiIntro,
  aiLayers,
  beforeAfter,
  facts,
  impact,
  otherProjects,
  pipeline,
  problem,
  ragSteps,
  techStack,
  timeline,
  workflows,
} from './caseStudyData';
import '../../css/CaseStudy.css';

const Block = ({ num, title, children }) => (
  <div className="cs-block">
    <h3>
      <span className="cs-num" aria-hidden="true">
        {num}
      </span>
      {title}
    </h3>
    {children}
  </div>
);

function CaseStudy() {
  return (
    <section className="cs-section" aria-labelledby="cs-title">
      <Hero client={CLIENT} pipeline={pipeline} facts={facts} />

      <Block num="01" title="The problem">
        {problem.map((p) => (
          <p key={p} className="cs-lead">
            {p}
          </p>
        ))}
        <BeforeAfter before={beforeAfter.before} after={beforeAfter.after} />
      </Block>

      <Block num="02" title="How I worked with the client">
        <Timeline steps={timeline} />
      </Block>

      <Block num="03" title="Architecture">
        <ArchitectureDiagram />
      </Block>

      <Block num="04" title="Key workflows">
        <WorkflowTabs workflows={workflows} />
      </Block>

      <Block num="05" title="AI agents & RAG with Qdrant">
        <p className="cs-lead">{aiIntro}</p>
        <AiLayers items={aiLayers} />
        <RagFlow groups={ragSteps} />
      </Block>

      <Block num="06" title="Tech stack">
        <TechStack items={techStack} />
      </Block>

      <Block num="07" title="Impact & what I owned">
        <ImpactCards items={impact} />
      </Block>

      <Block num="08" title="Other projects">
        <OtherProjects items={otherProjects} />
      </Block>
    </section>
  );
}

export default CaseStudy;
