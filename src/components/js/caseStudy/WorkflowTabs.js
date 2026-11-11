import React, { useRef, useState } from 'react';
import WorkflowCanvas from './WorkflowCanvas';
import { Details } from './CaseStudyParts';
import { useInView } from '../hooks';

// Accessible tabs (WAI-ARIA tabs pattern, automatic activation).
function WorkflowTabs({ workflows }) {
  const [active, setActive] = useState(0);
  const tabRefs = useRef([]);
  // Observed once on the container, so a remounted canvas (tab change) renders immediately.
  const [ref, visible] = useInView();

  const onKeyDown = (e) => {
    const last = workflows.length - 1;
    let next = null;
    if (e.key === 'ArrowRight') next = active === last ? 0 : active + 1;
    if (e.key === 'ArrowLeft') next = active === 0 ? last : active - 1;
    if (e.key === 'Home') next = 0;
    if (e.key === 'End') next = last;
    if (next !== null) {
      e.preventDefault();
      setActive(next);
      tabRefs.current[next]?.focus();
    }
  };

  const wf = workflows[active];

  return (
    <div ref={ref} className="cs-tabs">
      <div role="tablist" aria-label="Key workflows" className="cs-tablist" onKeyDown={onKeyDown}>
        {workflows.map((w, i) => (
          <button
            key={w.id}
            ref={(el) => (tabRefs.current[i] = el)}
            type="button"
            role="tab"
            id={`cs-tab-${w.id}`}
            aria-selected={i === active}
            aria-controls={`cs-panel-${w.id}`}
            tabIndex={i === active ? 0 : -1}
            className={`cs-tab ${i === active ? 'is-active' : ''}`}
            onClick={() => setActive(i)}
          >
            <span className="cs-tab-num" aria-hidden="true">{i + 1}</span>
            {w.title}
          </button>
        ))}
      </div>

      <div role="tabpanel" id={`cs-panel-${wf.id}`} aria-labelledby={`cs-tab-${wf.id}`} className="cs-tabpanel">
        <p className="cs-lead">{wf.summary}</p>
        {/* key forces a remount so the entrance animation replays on tab change */}
        <WorkflowCanvas key={wf.id} workflow={wf} visible={visible} />
        {/* key resets the disclosure to closed when the tab changes */}
        <Details key={`notes-${wf.id}`} label="Show implementation details">
          <ul className="cs-notes">
            {wf.notes.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </Details>
      </div>
    </div>
  );
}

export default WorkflowTabs;
