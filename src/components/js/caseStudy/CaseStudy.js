import React from 'react';
import ArchitectureDiagram from './ArchitectureDiagram';
import WorkflowTabs from './WorkflowTabs';
import {
  AiLayers,
  BeforeAfter,
  Details,
  Hero,
  ImpactCards,
  Pipeline,
  RagFlow,
  TechStack,
  Timeline,
} from './CaseStudyParts';
import {
  CLIENT,
  aiIntro,
  aiLayers,
  beforeAfter,
  facts,
  impact,
  keyTech,
  pipeline,
  problem,
  ragSteps,
  summary,
  takeaways,
  techStack,
  timeline,
  workflows,
} from './caseStudyData';
import '../../css/CaseStudy.css';

// One idea per panel: numbered heading, one-line takeaway, then the detail.
const Block = ({ id, num, title, takeaway, children }) => (
  <section className="cs-section cs-block" aria-labelledby={`cs-${id}-title`}>
    <h2 id={`cs-${id}-title`} className="cs-block-title">
      <span className="cs-num" aria-hidden="true">
        {num}
      </span>
      {title}
    </h2>
    <p className="cs-takeaway">{takeaway}</p>
    {children}
  </section>
);

/** The full NOC case study, as a stack of separate panels (used by the project page). */
function CaseStudy() {
  return (
    <>
      <section className="cs-section" aria-labelledby="cs-title">
        <Hero client={CLIENT} summary={summary} keyTech={keyTech} facts={facts} />
      </section>

      <Block id="problem" num="01" title="The problem" takeaway={takeaways.problem}>
        {problem.map((p) => (
          <p key={p} className="cs-lead">
            {p}
          </p>
        ))}
      </Block>

      <Block id="process" num="02" title="How I worked with the client" takeaway={takeaways.process}>
        <Timeline steps={timeline} />
      </Block>

      <Block id="architecture" num="03" title="Architecture" takeaway={takeaways.architecture}>
        <BeforeAfter before={beforeAfter.before} after={beforeAfter.after} />
        <ArchitectureDiagram />
      </Block>

      <Block id="workflows" num="04" title="Key workflows" takeaway={takeaways.workflows}>
        <Pipeline steps={pipeline} />
        <WorkflowTabs workflows={workflows} />
      </Block>

      <Block id="ai" num="05" title="AI agents & RAG with Qdrant" takeaway={takeaways.ai}>
        <p className="cs-lead">{aiIntro}</p>
        <AiLayers items={aiLayers} />
        <Details label="Show how indexing and retrieval work">
          <RagFlow groups={ragSteps} />
        </Details>
      </Block>

      <Block id="stack" num="06" title="Tech stack" takeaway={takeaways.stack}>
        <TechStack items={techStack} />
      </Block>

      <Block id="impact" num="07" title="Impact & what I owned" takeaway={takeaways.impact}>
        <ImpactCards items={impact} />
      </Block>
    </>
  );
}

export default CaseStudy;
