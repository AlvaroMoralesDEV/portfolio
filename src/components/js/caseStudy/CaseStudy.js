import React from 'react';
import ArchitectureDiagram from './ArchitectureDiagram';
import WorkflowTabs from './WorkflowTabs';
import {
  AiLayers,
  BeforeAfter,
  Details,
  Hero,
  ImpactCards,
  NextSteps,
  Pipeline,
  ProblemFlow,
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
  nextSteps,
  nextTeaser,
  pipeline,
  problem,
  problemFlow,
  problemRole,
  ragSteps,
  summary,
  takeaways,
  techStack,
  timeline,
  workflows,
} from './caseStudyData';
import '../../css/CaseStudy.css';

// One idea per panel: numbered heading, one-line takeaway, then the detail.
const Block = ({ id, num, title, takeaway, center, children }) => (
  <section className={`cs-section cs-block ${center ? 'cs-block-center' : ''}`} aria-labelledby={`cs-${id}-title`}>
    <h2 id={`cs-${id}-title`} className="cs-block-title" tabIndex={-1}>
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
        <Hero client={CLIENT} summary={summary} keyTech={keyTech} facts={facts} nextTeaser={nextTeaser} />
      </section>

      <Block id="problem" num="01" title="The problem" takeaway={takeaways.problem} center>
        {problem.map((p) => (
          <p key={p} className="cs-lead">
            {p}
          </p>
        ))}
        <ProblemFlow flow={problemFlow} />
        <p className="cs-lead cs-prob-role">
          <strong>{problemRole.label}</strong>
          {problemRole.text}
        </p>
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

      <Block id="next" num="08" title="Improvements for next phases" takeaway={takeaways.next}>
        <NextSteps items={nextSteps} />
      </Block>
    </>
  );
}

export default CaseStudy;
