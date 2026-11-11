import pageMeta from './pageMeta.json';

// Content for the "Featured Project" case study.
// Everything here is derived from the real project but kept generic on purpose:
// no client name, hostnames, IPs, mailboxes, table names, tool names or credentials.

export const CLIENT = 'a leading European telecom infrastructure operator';

// Route, browser-tab title and link-preview text of the project page. Kept in JSON so
// scripts/postbuild-meta.js can read the same values at build time.
export { pageMeta };
export const NOC_PATH = pageMeta.path;

// One-line summary, shared by the home page card and the project page hero.
export const summary =
  'Built with n8n and AI agents. Running in production, delivered side by side with the client.';

// Key tech shown on the card and in the hero; the full list is `techStack`.
// Docker, OpenShift and MySQL added at the user's request (2026-11-11).
export const keyTech = ['n8n', 'Azure OpenAI', 'Qdrant', 'MCP', 'Docker', 'OpenShift', 'MySQL'];

// One-line takeaway shown under each section heading of the project page.
export const takeaways = {
  problem: 'Every email to the NOC mailbox has to end up as the right action on the right ticket.',
  process: 'Five steps with the client, from discovery to production.',
  architecture: 'Two monolithic workflows became eight focused ones around a SQL queue.',
  workflows: 'Four of the workflows, one tab each.',
  ai: 'The workflows move the data; the AI makes the decisions that used to need a person reading every email.',
  stack: 'Everything the system runs on.',
  impact: 'Owned end to end, from discovery to production.',
  next: 'Two improvements for the AI layer: see what the agents do, and retrieve better context.',
};

export const problem = [
  'The mailbox takes in customer and provider emails: outages, follow-ups and resolutions.',
  'The automation in place could not keep evolving: every change meant touching duplicated logic, and failures left no trace.',
];

// Panel 01 diagram: three steps, the mailbox in the middle. The actions are the three
// sub-workflows of the ITSM worker (open, follow-up, resolve).
export const problemFlow = {
  alt: 'What has to happen, in three steps',
  steps: [
    { icon: 'mail', label: 'Emails arrive', sub: 'outages · follow-ups · resolutions' },
    { icon: 'inbox', label: 'NOC mailbox', sub: 'customers and providers', hub: true },
    { icon: 'done', label: 'Right action, right ticket', sub: 'open · follow up · resolve' },
  ],
};

// The user implemented the AI agents on this project (user, 2026-11-11).
export const problemRole = {
  label: 'My part',
  text: 'I rebuilt the workflows and implemented the AI agents that read every email and decide what to do with it.',
};

// Hero link down to block 08.
export const nextTeaser = 'Langfuse tracing and hybrid Graph RAG';

// Short pipeline shown in the hero.
export const pipeline = ['Email arrives', 'AI classifies', 'CMDB enriches', 'Incident handled', 'Customer answered'];

// Facts taken from the project sources (not business metrics).
export const facts = [
  { value: '8', label: 'workflows', sub: '5 main + 3 reusable' },
  { value: '2', label: 'AI agents', sub: 'classify + enrich' },
  { value: '3', label: 'environments', sub: 'local · pre-production · production' },
];

export const beforeAfter = {
  before: [
    '2 monolithic workflows',
    'Logic duplicated per business line and action',
    'Configuration embedded in nodes',
    'No error traceability',
  ],
  after: [
    '8 focused workflows around a SQL queue',
    '4 verification chains → 1, 3 draft chains → 1',
    'Configuration in environment variables',
    'Every email ends in an explicit, audited state',
  ],
};

export const timeline = [
  { step: 'Discovery', text: 'Sat with the team to understand how the work was really done and where it hurt.' },
  { step: 'Requirements', text: 'Agreed with the client what to automate, the business rules and what stays with a person.' },
  { step: 'Build', text: 'Built it in small steps on a local copy of their systems, adjusting on client feedback.' },
  { step: 'Validate', text: 'Deployed to pre-production and validated with the client.' },
  { step: 'Production', text: 'Went live by changing configuration only. No workflow changes.' },
];

// ---------------------------------------------------------------------------
// Workflow canvases. Positions are grid coordinates (col, row).
// kind: trigger | step | decision | ai | tool | output | error | manual
// ---------------------------------------------------------------------------
export const workflows = [
  {
    id: 'ingestion',
    title: 'Ingestion',
    summary: 'Polls the NOC mailbox, filters noise, turns attachments into text and hands each email to the AI layer.',
    cols: 6,
    rows: 3,
    nodes: [
      { id: 'poll', col: 0, row: 1, kind: 'trigger', label: 'Mailbox poll', sub: 'every minute' },
      { id: 'filter', col: 1, row: 1, kind: 'decision', label: 'Real email?', sub: 'draft · age · sender' },
      { id: 'discard', col: 1, row: 2, kind: 'error', label: 'Discarded', sub: 'reason logged' },
      { id: 'clean', col: 2, row: 1, kind: 'step', label: 'Extract & clean', sub: 'dedupe per message' },
      { id: 'att', col: 3, row: 1, kind: 'decision', label: 'Attachments?' },
      { id: 'parse', col: 3, row: 0, kind: 'step', label: 'Parse by type', sub: 'PDF · DOCX · XLSX…' },
      { id: 'ai', col: 4, row: 1, kind: 'ai', label: 'AI classify', sub: 'sub-workflow' },
      { id: 'aierr', col: 4, row: 2, kind: 'error', label: 'Review folder', sub: 'classification failed' },
      { id: 'tokens', col: 4, row: 0, kind: 'step', label: 'Token accounting', sub: 'real usage per email' },
      { id: 'queue', col: 5, row: 1, kind: 'output', label: 'Audit log + queue', sub: 'SQL' },
      { id: 'worker', col: 5, row: 2, kind: 'output', label: 'ITSM worker', sub: 'or AI discard folder' },
    ],
    edges: [
      ['poll', 'filter'],
      ['filter', 'clean', 'yes'],
      ['filter', 'discard', 'no'],
      ['clean', 'att'],
      ['att', 'parse', 'yes'],
      ['att', 'ai', 'no'],
      ['parse', 'ai'],
      ['ai', 'aierr', 'error'],
      ['ai', 'tokens'],
      ['tokens', 'queue'],
      ['queue', 'worker'],
    ],
    notes: [
      'Unsupported files (signatures, archives) are marked as not processable instead of failing the run.',
      'Attachment text is grouped per parent email, so emails in the same poll never mix.',
    ],
  },
  {
    id: 'ai',
    title: 'AI classification',
    summary: 'One agent classifies the email with a validated schema, using a Qdrant vector store as a tool to pull relevant knowledge. A second agent finds the affected circuit in the CMDB through an MCP server written in Python.',
    cols: 6,
    rows: 3,
    nodes: [
      { id: 'in', col: 0, row: 1, kind: 'trigger', label: 'Email input', sub: 'from ingestion' },
      { id: 'cls', col: 1, row: 1, kind: 'ai', label: 'Classifier agent', sub: 'action · business line · entities' },
      { id: 'schema', col: 1, row: 0, kind: 'tool', label: 'Structured output', sub: 'JSON Schema + auto-fix' },
      { id: 'qdrant', col: 1, row: 2, kind: 'tool', label: 'Qdrant vector store', sub: 'retrieval + embeddings' },
      { id: 'ci', col: 2, row: 1, kind: 'decision', label: 'Circuit found?' },
      { id: 'enr', col: 3, row: 1, kind: 'ai', label: 'Enrichment agent', sub: 'match CI in CMDB' },
      { id: 'mcp', col: 3, row: 0, kind: 'tool', label: 'MCP · CMDB', sub: 'primary → fallback catalogue' },
      { id: 'skip', col: 3, row: 2, kind: 'step', label: 'Skip enrichment' },
      { id: 'merge', col: 4, row: 1, kind: 'step', label: 'Merge results', sub: 'records CI source' },
      { id: 'norm', col: 5, row: 1, kind: 'output', label: 'Normalised record', sub: 'business line · dates' },
    ],
    edges: [
      ['in', 'cls'],
      ['schema', 'cls', null, 'tool'],
      ['qdrant', 'cls', null, 'tool'],
      ['cls', 'ci'],
      ['ci', 'enr', 'yes'],
      ['ci', 'skip', 'no'],
      ['mcp', 'enr', null, 'tool'],
      ['enr', 'merge'],
      ['merge', 'norm'],
      ['skip', 'norm', null, null, 'late'],
    ],
    notes: [
      'The agent decides when to query Qdrant; the chunks it gets back are the context for its answer.',
      'Replaced brittle regex + JSON.parse parsing with schema-validated output.',
      'LLM provider is swappable per environment (cloud model in production, a different one in development).',
    ],
  },
  {
    id: 'itsm',
    title: 'ITSM worker',
    summary: 'Consumes the SQL queue safely in parallel and routes each email by business line and action type.',
    cols: 6,
    rows: 3,
    nodes: [
      { id: 'claim', col: 0, row: 1, kind: 'trigger', label: 'Claim from queue', sub: 'atomic · reclaims stuck items' },
      { id: 'loop', col: 1, row: 1, kind: 'step', label: 'For each email', sub: 'reload from mailbox' },
      { id: 'bl', col: 2, row: 1, kind: 'decision', label: 'Business line?', sub: 'network → automated' },
      { id: 'act', col: 3, row: 1, kind: 'decision', label: 'Action type?', sub: 'incident → automated' },
      { id: 'pending', col: 3, row: 2, kind: 'manual', label: 'Pending · manual', sub: 'not automated yet' },
      { id: 'sub', col: 4, row: 1, kind: 'step', label: 'Sub-workflow', sub: 'open · follow-up · resolve' },
      { id: 'ok', col: 5, row: 1, kind: 'decision', label: 'Success?' },
      { id: 'ack', col: 5, row: 0, kind: 'output', label: 'ACK + archive' },
      { id: 'err', col: 5, row: 2, kind: 'error', label: 'Error', sub: 'append-only history' },
    ],
    edges: [
      ['claim', 'loop'],
      ['loop', 'bl'],
      ['bl', 'act'],
      ['bl', 'pending', 'other'],
      ['act', 'sub'],
      ['act', 'pending', 'RFO · change'],
      ['sub', 'ok'],
      ['ok', 'ack', 'yes'],
      ['ok', 'err', 'no'],
    ],
    notes: [
      'Row-level locking plus one-item-per-conversation lets several workers run without race conditions.',
      'Every item ends in an explicit state: completed, error or pending-manual. Nothing fails silently.',
    ],
  },
  {
    id: 'open',
    title: 'Open incident',
    summary: 'Creates or links the incident in the ITSM, replies to the customer and leaves a full trail on the ticket.',
    cols: 6,
    rows: 3,
    nodes: [
      { id: 'in', col: 0, row: 1, kind: 'trigger', label: 'Email + AI record' },
      { id: 'known', col: 1, row: 1, kind: 'decision', label: 'Circuit in CMDB?' },
      { id: 'open', col: 2, row: 1, kind: 'decision', label: 'Already open?', sub: 'incident on that CI' },
      { id: 'link', col: 3, row: 0, kind: 'step', label: 'Link existing', sub: 'incident' },
      { id: 'create', col: 3, row: 1, kind: 'step', label: 'Create incident', sub: '+ impact CI' },
      { id: 'nohom', col: 3, row: 2, kind: 'step', label: 'Create incident', sub: 'without CI' },
      { id: 'reply', col: 4, row: 1, kind: 'output', label: 'Reply to customer', sub: 'draft → fallback send' },
      { id: 'trail', col: 5, row: 1, kind: 'output', label: 'Ticket trail', sub: '.eml · AI summary · NOC group' },
    ],
    edges: [
      ['in', 'known'],
      ['known', 'open', 'yes'],
      ['known', 'nohom', 'no'],
      ['open', 'link', 'yes'],
      ['open', 'create', 'no'],
      ['link', 'reply'],
      ['create', 'reply'],
      ['nohom', 'reply'],
      ['reply', 'trail'],
    ],
    notes: [
      'Each step returns either success or an item with an error field; the parent decides ACK, error or pending.',
      'Shared utility sub-workflows (tag email, attach .eml, comment + assign) are reused by follow-up and resolution.',
    ],
  },
];

// How the AI was added on top of the workflow engine, in plain terms.
export const aiIntro = 'I designed and implemented the AI agents in three layers, each one doing a single job.';

export const aiLayers = [
  {
    icon: 'sort',
    title: '1 · Classifier agent',
    text: 'Reads each email and its attachments and returns a structured record: what is being asked, which business line it belongs to and the key details. The output is checked against a schema, so the next steps can trust it.',
    visual: {
      type: 'record',
      alt: 'Illustration: an email goes in and a structured record comes out with action, business line and entities.',
      source: 'Email',
      fields: ['action', 'business line', 'entities'],
    },
  },
  {
    icon: 'tool',
    title: '2 · Enrichment agent with tools',
    text: 'An agent that can use tools. Through an MCP server written in Python, it queries the CMDB to find the exact circuit the email is about, instead of guessing from the text.',
    visual: {
      type: 'tool',
      alt: 'Illustration: the agent calls the CMDB through an MCP server and gets the answer back.',
      steps: ['Agent', 'MCP', 'CMDB'],
    },
  },
  {
    icon: 'db',
    title: '3 · Knowledge base in Qdrant',
    text: 'The knowledge the agent can search. A Python script splits the documents into chunks, turns them into embeddings and stores them in Qdrant. The agent has the vector store as a tool: it retrieves the most relevant chunks and answers with them as context.',
    visual: {
      type: 'index',
      alt: 'Illustration: documents are split into chunks and stored in Qdrant.',
      source: 'Documents',
      mid: 'Chunks',
      target: 'Qdrant',
    },
  },
];

// Two halves of the RAG layer: getting knowledge in, and getting it out.
export const ragSteps = [
  {
    title: 'Indexing · a Python script loads documents into Qdrant',
    steps: [
      { label: 'Documents', sub: 'runbooks and resolved incidents' },
      { label: 'Split into chunks', sub: 'small pieces of text' },
      { label: 'Embeddings', sub: 'text → vector' },
      { label: 'Qdrant store', sub: 'vectors + metadata' },
    ],
  },
  {
    title: 'Retrieval · the AI workflow uses it',
    steps: [
      { label: 'New email', sub: 'reaches the AI agent' },
      { label: 'Qdrant search', sub: 'the agent calls it as a tool' },
      { label: 'Relevant chunks', sub: 'closest matches by meaning' },
      { label: 'Grounded answer', sub: 'the model uses them as context' },
    ],
  },
];

export const techStack = [
  'n8n',
  'Docker',
  'OpenShift',
  'Azure OpenAI',
  'Qdrant',
  'MCP',
  'Python',
  'MySQL', // the only database listed, by the user's choice (2026-11-11)
  'Microsoft Graph',
  'Keycloak',
  'Nginx',
  'WireMock',
];

export const impact = [
  {
    title: 'End-to-end ownership',
    text: 'From discovery to production: architecture, workflows, AI agents, MCP integration, the Qdrant knowledge base and the local dev stack.',
    icon: 'owner',
    metric: null, // TODO: metric (e.g. number of workflows / sub-workflows owned)
  },
  {
    title: 'Client-facing delivery',
    text: 'Worked directly with the NOC team. Requirements, demos and acceptance were done together, not through a ticket queue.',
    icon: 'client',
    metric: null, // TODO: metric (e.g. iterations / demo cycles to production)
  },
  {
    title: 'Production deployment',
    text: 'Environment-driven config, no hard-coded values, so promotion only meant changing variables.',
    icon: 'deploy',
    metric: null, // TODO: metric (e.g. emails processed per day in production)
  },
  {
    title: 'Auditable, cost-aware AI',
    text: 'Every email stored with its classification, CI source, state and real token usage.',
    icon: 'audit',
    metric: null, // TODO: metric (e.g. triage time before vs after / % auto-ticketed)
  },
];

// Improvements for next phases (user, 2026-11-11). These are proposals, not built in this
// project: keep them out of `techStack` and `keyTech`. The diagrams are illustrative
// (no real timings or schema), so do not add numbers to them.
export const nextSteps = [
  {
    icon: 'trace',
    tag: 'Observability',
    title: 'Tracing and evaluation with Langfuse',
    text: 'Every email becomes one trace: each agent step, tool call and retrieved chunk, with its latency and cost.',
    why: 'The audit log already records the result and the token usage of each email. Traces add the steps in between, so a wrong classification can be debugged and a prompt change can be evaluated before it reaches production.',
    visual: {
      type: 'trace',
      alt: 'Illustration of one trace: an email run containing the classifier agent with its Qdrant search, then the enrichment agent with its CMDB lookup.',
      // left and width are percentages of the run; illustrative only
      spans: [
        { label: 'Email run', left: 0, width: 100, level: 0 },
        { label: 'Classifier agent', left: 0, width: 54, level: 1 },
        { label: 'Qdrant search', left: 10, width: 20, level: 2 },
        { label: 'Enrichment agent', left: 58, width: 42, level: 1 },
        { label: 'MCP · CMDB', left: 66, width: 22, level: 2 },
      ],
    },
  },
  {
    icon: 'graph',
    tag: 'Retrieval',
    title: 'Hybrid retrieval: Qdrant + Graph RAG',
    text: 'Qdrant stays as the way in: it finds the documents closest in meaning to the email. A knowledge graph then expands from those matches to everything connected to them.',
    why: 'NOC knowledge is relational: an incident belongs to a circuit, the circuit to a customer, and a runbook solved it. No single chunk holds those links, so similarity alone misses them. Vector search still finds the starting point.',
    visual: {
      type: 'graph',
      alt: 'Illustration of hybrid retrieval: Qdrant matches a new email to a similar past incident, then the graph follows that incident to its runbook, its circuit and the customer on that circuit.',
      // x, y in a 300×150 viewBox. Edge kind: vector (similarity match) or graph (stored link).
      nodes: [
        { id: 'email', label: 'New email', x: 36, y: 58 },
        { id: 'incident', label: 'Past incident', x: 128, y: 58 },
        { id: 'runbook', label: 'Runbook', x: 212, y: 24 },
        { id: 'circuit', label: 'Circuit', x: 204, y: 92 },
        { id: 'customer', label: 'Customer', x: 268, y: 58 },
      ],
      edges: [
        ['email', 'incident', 'vector'],
        ['incident', 'runbook', 'graph'],
        ['incident', 'circuit', 'graph'],
        ['circuit', 'customer', 'graph'],
      ],
      legend: { vector: 'Qdrant · similar', graph: 'Graph · connected' },
    },
  },
];

// flow: short left-to-right strip. points: what the solution does. All generic: no client names,
// hosts, logins or internal identifiers from the design docs.
export const otherProjects = [
  {
    title: 'Odoo ERP ↔ e-commerce & stores',
    text: 'Integration of Odoo ERP with multiple e-commerce platforms and the stores’ point of sale, streamlining data exchange and improving operational efficiency.',
    icon: 'cart',
    flow: ['Shops & stores', 'API gateway', 'n8n', 'Odoo ERP'],
    points: [
      'One workflow per API resource: sales, returns, stock adjustments and transfers between stores',
      'Requests are validated against a JSON Schema at the gateway before they reach n8n',
      'Every run is logged back to the ERP as success, warning or error, with email alerts',
    ],
    tags: ['n8n', 'Odoo', 'Gravitee', 'REST APIs', 'Jenkins'],
  },
  {
    title: 'Point of sale payments ↔ core banking',
    text: 'Payment APIs for a bank: point-of-sale payments are checked, posted to the core banking system and settled in the background.',
    icon: 'bank',
    flow: ['Point of sale', 'Payment API', 'Queues', 'Core banking'],
    points: [
      'Duplicate requests are rejected by request id before any money moves',
      'The caller gets an answer right away; commission transfers run in the background through queues',
      'If a step fails, the earlier transfers are reversed automatically',
    ],
    tags: ['Apache Camel', 'RabbitMQ', 'ActiveMQ', 'Redis', 'Docker'],
  },
  {
    title: 'Airflow on OpenShift',
    text: 'Migrated business-critical scripts to Apache Airflow running in production on the client’s OpenShift environment.',
    icon: 'flow',
    flow: ['Legacy scripts', 'Airflow DAGs', 'OpenShift'],
    points: [
      'Pulls from Oracle and SQL Server databases, SOAP services, SharePoint and file shares',
      'Connections are managed in Airflow, outside the code',
    ],
    tags: ['Apache Airflow', 'OpenShift', 'Python', 'Oracle', 'SQL Server'],
  },
  {
    title: 'Internal engineering tooling',
    text: 'Shared building blocks that let the integration team start, test and ship services the same way.',
    icon: 'tool',
    points: [
      'Maven archetypes to bootstrap new services from a template',
      'Deployment plugins and Jenkins pipelines',
      'Reusable Cucumber step libraries for testing',
    ],
    tags: ['Maven', 'Archetypes', 'Jenkins', 'Cucumber', 'Docker'],
  },
];
