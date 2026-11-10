import React from 'react';
import { useReducedMotion } from '../hooks';

// Grid geometry (SVG user units)
const COL_W = 184;
const ROW_H = 104;
const NODE_W = 140;
const NODE_H = 60;
const PAD_X = 30;
const PAD_Y = 32;
const GAP = COL_W - NODE_W;

const pos = (n) => ({ x: PAD_X + n.col * COL_W, y: PAD_Y + n.row * ROW_H });

// Wraps a short sub-label into at most two lines.
function wrap(text, max = 20) {
  if (!text || text.length <= max) return text ? [text] : [];
  const words = text.split(' ');
  const lines = [''];
  words.forEach((w) => {
    const cur = lines[lines.length - 1];
    if ((cur + ' ' + w).trim().length > max && lines.length < 2) lines.push(w);
    else lines[lines.length - 1] = (cur + ' ' + w).trim();
  });
  return lines;
}

/**
 * Path between two nodes plus the anchor for its label.
 * Edges spanning several columns either turn early and run along the target row
 * (default) or stay on the source row and turn late (`route === 'late'`),
 * whichever keeps them clear of other nodes.
 */
function edgeGeometry(a, b, route) {
  const pa = pos(a);
  const pb = pos(b);

  if (a.col === b.col) {
    const x = pa.x + NODE_W / 2;
    const down = pb.y > pa.y;
    const y1 = down ? pa.y + NODE_H : pa.y;
    const y2 = down ? pb.y : pb.y + NODE_H;
    return { d: `M${x},${y1} L${x},${y2}`, lx: x, ly: (y1 + y2) / 2, sx: x, sy: y1 };
  }

  const x1 = pa.x + NODE_W;
  const y1 = pa.y + NODE_H / 2;
  const x2 = pb.x;
  const y2 = pb.y + NODE_H / 2;
  const base = { sx: x1, sy: y1 };

  if (y1 === y2) {
    return { ...base, d: `M${x1},${y1} L${x2},${y2}`, lx: (x1 + x2) / 2, ly: y1 - 12 };
  }

  if (b.col - a.col > 1) {
    if (route === 'late') {
      const xt = x2 - GAP;
      return {
        ...base,
        d: `M${x1},${y1} L${xt},${y1} C${xt + GAP / 2},${y1} ${x2 - GAP / 2},${y2} ${x2},${y2}`,
        lx: x1 + GAP / 2,
        ly: y1 - 12,
      };
    }
    const xt = x1 + GAP;
    return {
      ...base,
      d: `M${x1},${y1} C${x1 + GAP / 2},${y1} ${xt - GAP / 2},${y2} ${xt},${y2} L${x2},${y2}`,
      lx: x1 + GAP / 2,
      ly: (y1 + y2) / 2,
    };
  }

  const dx = (x2 - x1) / 2;
  return {
    ...base,
    d: `M${x1},${y1} C${x1 + dx},${y1} ${x2 - dx},${y2} ${x2},${y2}`,
    lx: (x1 + x2) / 2,
    ly: (y1 + y2) / 2,
  };
}

const KIND_LABEL = {
  trigger: 'Trigger',
  step: 'Step',
  decision: 'Decision',
  ai: 'AI agent',
  tool: 'AI tool',
  output: 'Output',
  error: 'Error path',
  manual: 'Manual handling',
};

// 12×12 glyphs drawn inside the badge of each node.
const GLYPHS = {
  trigger: <path d="M7,0 L2,7 H5.5 L4.5,12 L10,4.5 H6.5 Z" />,
  decision: <path d="M6,0.5 L11.5,6 L6,11.5 L0.5,6 Z" />,
  ai: <path d="M6,0 Q6,6 12,6 Q6,6 6,12 Q6,6 0,6 Q6,6 6,0 Z" />,
  tool: <path d="M1.5,6 H10.5 M6,1.5 V10.5" className="wf-glyph-stroke" />,
  step: <circle cx="6" cy="6" r="3.2" />,
  output: <path d="M1.8,6.5 L4.8,9.5 L10.2,3" className="wf-glyph-stroke" />,
  error: <path d="M2.5,2.5 L9.5,9.5 M9.5,2.5 L2.5,9.5" className="wf-glyph-stroke" />,
  manual: <path d="M3.5,2 V10 M8.5,2 V10" className="wf-glyph-stroke" />,
};

function Badge({ kind, cx, cy }) {
  return (
    <g className="wf-badge">
      <circle cx={cx} cy={cy} r="10" className="wf-badge-bg" />
      <g transform={`translate(${cx - 6},${cy - 6})`} className="wf-glyph">
        {GLYPHS[kind]}
      </g>
    </g>
  );
}

function Node({ node, index }) {
  const { x, y } = pos(node);
  const subLines = wrap(node.sub);
  const cx = x + NODE_W / 2;
  const labelY = subLines.length ? y + (subLines.length > 1 ? 22 : 27) : y + NODE_H / 2 + 5;
  return (
    <g className={`wf-node wf-${node.kind}`} style={{ '--i': index }}>
      <rect x={x} y={y} width={NODE_W} height={NODE_H} rx="12" className="wf-node-box" />
      <Badge kind={node.kind} cx={x + 16} cy={y} />
      <text x={cx} y={labelY} textAnchor="middle" className="wf-label">
        {node.label}
      </text>
      {subLines.map((line, i) => (
        <text key={i} x={cx} y={labelY + 15 + i * 12} textAnchor="middle" className="wf-sub">
          {line}
        </text>
      ))}
    </g>
  );
}

function EdgeLabel({ x, y, text }) {
  const w = text.length * 6.2 + 12;
  return (
    <g className="wf-edge-label">
      <rect x={x - w / 2} y={y - 8} width={w} height="16" rx="8" />
      <text x={x} y={y + 3.5} textAnchor="middle">
        {text}
      </text>
    </g>
  );
}

function WorkflowCanvas({ workflow, visible }) {
  const reducedMotion = useReducedMotion();
  const byId = Object.fromEntries(workflow.nodes.map((n) => [n.id, n]));
  const width = PAD_X * 2 + (workflow.cols - 1) * COL_W + NODE_W;
  const height = PAD_Y * 2 + (workflow.rows - 1) * ROW_H + NODE_H;
  const markerId = `wf-arrow-${workflow.id}`;
  const titleId = `wf-title-${workflow.id}`;
  const descId = `wf-desc-${workflow.id}`;
  const kinds = [...new Set(workflow.nodes.map((n) => n.kind))];

  const edges = workflow.edges.map(([from, to, label, type, route]) => ({
    key: `${from}-${to}`,
    from,
    to,
    label,
    isTool: type === 'tool',
    ...edgeGeometry(byId[from], byId[to], route),
  }));

  return (
    <div className={`wf ${visible ? 'is-visible' : ''}`}>
      <div className="wf-frame">
        <div className="wf-bar" aria-hidden="true">
          <span className="wf-bar-dots">
            <i />
            <i />
            <i />
          </span>
          <span className="wf-bar-title">{workflow.title}</span>
          <span className="wf-bar-meta">simplified from the production workflow</span>
        </div>

        <div
          className="wf-scroll"
          tabIndex={0}
          role="region"
          aria-label={`${workflow.title} workflow diagram (scrolls horizontally)`}
        >
          <svg
            className="wf-svg"
            viewBox={`0 0 ${width} ${height}`}
            style={{ minWidth: Math.round(width * 0.72) }}
            role="img"
            aria-labelledby={`${titleId} ${descId}`}
          >
            <title id={titleId}>{`${workflow.title} workflow`}</title>
            <desc id={descId}>{workflow.summary}</desc>
            <defs>
              <pattern id={`wf-dots-${workflow.id}`} width="18" height="18" patternUnits="userSpaceOnUse">
                <circle cx="1.5" cy="1.5" r="1.1" className="wf-dot" />
              </pattern>
              <marker
                id={markerId}
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="6.5"
                markerHeight="6.5"
                orient="auto-start-reverse"
              >
                <path d="M0,0.5 L10,5 L0,9.5 z" className="wf-arrowhead" />
              </marker>
            </defs>
            <rect width={width} height={height} fill={`url(#wf-dots-${workflow.id})`} />

            <g className="wf-edges">
              {edges.map((e) => (
                <g key={e.key} className={`wf-edge ${e.isTool ? 'wf-edge-tool' : ''}`}>
                  <path d={e.d} markerEnd={e.isTool ? undefined : `url(#${markerId})`} />
                  <circle cx={e.sx} cy={e.sy} r="3.5" className="wf-port" />
                </g>
              ))}
            </g>

            {/* Data travelling along the connections. SMIL ignores CSS, so skip it for reduced motion. */}
            {!reducedMotion && (
              <g className="wf-pulses" aria-hidden="true">
                {edges
                  .filter((e) => !e.isTool)
                  .map((e, i) => (
                    <circle key={e.key} r="3.2" className="wf-pulse">
                      <animateMotion dur="2.6s" begin={`-${(i * 0.47) % 2.6}s`} repeatCount="indefinite" path={e.d} />
                    </circle>
                  ))}
              </g>
            )}

            {workflow.nodes.map((n, i) => (
              <Node key={n.id} node={n} index={i} />
            ))}

            <g className="wf-edge-labels">
              {edges
                .filter((e) => e.label)
                .map((e) => (
                  <EdgeLabel key={e.key} x={e.lx} y={e.ly} text={e.label} />
                ))}
            </g>
          </svg>
        </div>
      </div>
      <p className="wf-hint" aria-hidden="true">
        Swipe to explore the canvas →
      </p>

      {/* Text alternative for screen readers */}
      <ol className="cs-sr-only">
        {edges.map((e) => (
          <li key={e.key}>
            {byId[e.from].label}
            {e.label ? ` (${e.label})` : ''} → {byId[e.to].label}
            {byId[e.to].sub ? `: ${byId[e.to].sub}` : ''}
          </li>
        ))}
      </ol>

      <ul className="wf-legend" aria-label="Legend">
        {kinds.map((k) => (
          <li key={k}>
            <span className={`wf-legend-swatch wf-${k}`} aria-hidden="true" />
            {KIND_LABEL[k]}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default WorkflowCanvas;
