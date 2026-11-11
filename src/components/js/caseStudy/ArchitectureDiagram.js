import React from 'react';
import { useInView } from '../hooks';

const Connector = () => <span className="arch-arrow" aria-hidden="true" />;

// HTML/CSS diagram so it reflows to a vertical stack on mobile instead of shrinking.
function ArchitectureDiagram() {
  const [ref, visible] = useInView();

  return (
    <figure ref={ref} className={`arch cs-reveal ${visible ? 'is-visible' : ''}`} aria-labelledby="arch-caption">
      <div className="arch-flow">
        <div className="arch-col">
          <h3 className="arch-col-title">Sources</h3>
          <ul className="arch-list">
            <li className="arch-block">
              <strong>NOC mailbox</strong>
              <span>customer &amp; provider emails + attachments</span>
            </li>
          </ul>
        </div>

        <Connector />

        <div className="arch-col arch-core">
          <h3 className="arch-col-title">n8n orchestration</h3>
          <ol className="arch-grid">
            <li className="arch-block">
              <em aria-hidden="true">1</em>
              <strong>Ingestion</strong>
              <span>filter · parse · dedupe</span>
            </li>
            <li className="arch-block arch-ai">
              <em aria-hidden="true">2</em>
              <strong>AI layer</strong>
              <span>classifier + enrichment agents</span>
            </li>
            <li className="arch-block">
              <em aria-hidden="true">3</em>
              <strong>SQL queue + audit</strong>
              <span>decouples capture from ticketing</span>
            </li>
            <li className="arch-block">
              <em aria-hidden="true">4</em>
              <strong>ITSM worker</strong>
              <span>routing + reusable sub-workflows</span>
            </li>
          </ol>

          <div className="arch-rag-link" aria-hidden="true" />
          <div className="arch-block arch-rag">
            <strong>RAG knowledge layer</strong>
            <span>Qdrant vector DB · knowledge the agent can search</span>
          </div>
        </div>

        <Connector />

        <div className="arch-col">
          <h3 className="arch-col-title">Integrations</h3>
          <ul className="arch-list">
            <li className="arch-block">
              <strong>ITSM platform</strong>
              <span>incidents · worklogs · attachments</span>
            </li>
            <li className="arch-block">
              <strong>CMDB via MCP</strong>
              <span>circuit lookup for the AI agent</span>
            </li>
            <li className="arch-block">
              <strong>Customer reply</strong>
              <span>email API</span>
            </li>
            <li className="arch-block">
              <strong>NOC operators</strong>
              <span>state visible as mail folders</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="arch-deploy">
        <div className="arch-deploy-title">
          <strong>Docker-based deployment</strong>
          <span>same images, config only through environment variables</span>
        </div>
        <ol className="arch-envs" aria-label="Environments, in promotion order">
          <li className="arch-env">
            Local <span>mocked ITSM, mailbox &amp; CMDB</span>
          </li>
          <li className="arch-env">
            Pre-production <span>validated with the client</span>
          </li>
          <li className="arch-env is-prod">
            <i className="cs-live-dot" aria-hidden="true" />
            Production <span>live</span>
          </li>
        </ol>
      </div>

      <figcaption id="arch-caption" className="cs-caption">
        Emails flow left to right. Capture and ticketing only talk through the SQL queue, so either side can change or
        retry without losing an email. The RAG layer gives the AI agent relevant knowledge as context.
      </figcaption>
    </figure>
  );
}

export default ArchitectureDiagram;
