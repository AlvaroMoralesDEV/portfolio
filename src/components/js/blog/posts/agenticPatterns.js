import { NOC_PATH } from '../../caseStudy/caseStudyData';

// "Four agentic patterns you should know"
// Block types are rendered by BlogParts.js (see BLOCKS there).
// The diagrams are illustrative. The project section only repeats what the NOC case study
// already states.
const whenAndWatch = (use, watch) => ({
  type: 'cards',
  items: [
    { icon: 'done', title: 'Use it when', text: use },
    { icon: 'audit', title: 'Watch out for', text: watch },
  ],
});

const post = {
  // Shown at the end of the article. External links were checked when added.
  sources: [
    { title: "Agentic Design Patterns Part 1: Four AI agent strategies", publisher: "Andrew Ng, The Batch (DeepLearning.AI)", url: 'https://www.deeplearning.ai/the-batch/how-agents-can-improve-llm-performance/' },
    { title: "Building effective agents", publisher: "Anthropic", url: 'https://www.anthropic.com/research/building-effective-agents' },
    { title: "ReAct: Synergizing Reasoning and Acting in Language Models", publisher: "Yao et al., arXiv, 2022", url: 'https://arxiv.org/abs/2210.03629' },
    { title: "Reflexion: Language Agents with Verbal Reinforcement Learning", publisher: "Shinn et al., arXiv, 2023", url: 'https://arxiv.org/abs/2303.11366' },
    { title: "NOC automation with n8n and AI agents (case study)", publisher: "this site", to: NOC_PATH },
  ],
  sections: [
    {
      id: 'agent',
      title: 'From one call to an agent',
      takeaway: 'An agent is a model in a loop: it acts, looks at the result and decides what to do next.',
      blocks: [
        {
          type: 'p',
          text: 'A single call to a language model is one shot: a prompt goes in, an answer comes out. It works for small, well-defined tasks. It stops working when the task needs information the model does not have, several steps, or a second look at its own answer.',
        },
        {
          type: 'cycle',
          alt: 'The agent loop: act, observe, decide, and round again',
          center: ['the goal'],
          steps: [
            { label: 'Act', text: 'The model takes one step: it writes something, calls a tool or asks a question.' },
            { label: 'Observe', text: 'It reads what came back: a result, an error, a piece of feedback.' },
            { label: 'Decide', text: 'It chooses the next step, or stops because the goal is met.' },
          ],
        },
        {
          type: 'p',
          text: 'Agentic patterns are the common ways to build that loop. Four of them cover most of what is built today. They are not exclusive: real systems combine them.',
        },
      ],
    },
    {
      id: 'reflection',
      title: 'Reflection',
      takeaway: 'The model reviews its own draft before anyone else sees it.',
      blocks: [
        {
          type: 'pattern',
          name: 'reflection',
          alt: 'Illustration: a generate step sends a draft to a critique step, which sends feedback back.',
          caption: 'One step writes, another criticises. The loop ends when the critic is satisfied or a limit is reached.',
        },
        {
          type: 'p',
          text: 'The first answer of a model is a first draft. Reflection adds a second step that reads the draft against the requirements and says what is wrong, and the first step tries again with that feedback. The critic can be the same model with a different prompt, a different model, or a real check such as running the tests.',
        },
        whenAndWatch(
          'Quality matters more than speed, and there is a clear way to judge the output: tests that pass, a schema that validates, a checklist to meet.',
          'A critic with nothing concrete to check tends to approve everything. Always set a maximum number of rounds.'
        ),
      ],
    },
    {
      id: 'tools',
      title: 'Tool use',
      takeaway: 'The model stops guessing and asks a real system.',
      blocks: [
        {
          type: 'pattern',
          name: 'tools',
          alt: 'Illustration: an agent in the centre connected to four tools: search, database, API and code execution.',
          caption: 'The model decides which tool to call and with what arguments. The application runs the call and returns the result.',
        },
        {
          type: 'p',
          text: 'A model only knows its training data and what is in the prompt. With tools it can look things up, query a database, call an API or run code. Each tool is described to the model with a name, what it does and the arguments it takes; the model answers with the call it wants to make.',
        },
        whenAndWatch(
          'The answer depends on data the model cannot know, or the task ends in an action: creating a ticket, updating a record, sending a message.',
          'Every tool is a new way to fail, and a tool that writes can do damage. Keep the list short, validate the arguments, and separate reading from writing.'
        ),
      ],
    },
    {
      id: 'planning',
      title: 'Planning',
      takeaway: 'Decide the steps first, then do them one at a time.',
      blocks: [
        {
          type: 'pattern',
          name: 'planning',
          alt: 'Illustration: a goal goes to a plan step, which produces three steps executed in order until the task is done.',
          caption: 'The plan is written before any work starts, and can be revised when a step fails.',
        },
        {
          type: 'p',
          text: 'On a long task a model that improvises loses track of the goal. With planning, the first step is to break the goal into smaller steps. Each step is then executed on its own, with the plan in view, so progress can be checked against something.',
        },
        whenAndWatch(
          'The task has many steps that depend on each other, and you cannot write them down in advance because they change with every request.',
          'A wrong plan is followed faithfully. Let the agent revise the plan when a step fails, and if the steps are always the same, write a plain workflow instead.'
        ),
      ],
    },
    {
      id: 'multi',
      title: 'Multi-agent',
      takeaway: 'Several agents, each with one job and only the tools that job needs.',
      blocks: [
        {
          type: 'pattern',
          name: 'multi',
          alt: 'Illustration: an orchestrator hands work to three agents: a researcher, a writer and a reviewer.',
          caption: 'An orchestrator splits the work and combines the results. The roles here are an example.',
        },
        {
          type: 'p',
          text: 'One prompt that has to do everything gets long, and the model starts to mix instructions. Splitting the work between agents keeps each prompt short and each context clean: every agent sees only what its job needs.',
        },
        whenAndWatch(
          'The work divides into clearly different jobs, or parts of it can run at the same time.',
          'More agents means more calls, more cost and harder debugging. When something goes wrong, you need to see what each agent received and returned.'
        ),
      ],
    },
    {
      id: 'choose',
      title: 'Which one to start with',
      takeaway: 'Start with the simplest thing that works. Add a pattern only when you can name the failure it fixes.',
      blocks: [
        {
          type: 'matrix',
          highlight: false,
          caption: 'Every pattern buys something and costs something.',
          columns: ['Fixes', 'Costs'],
          rows: [
            { label: 'Reflection', cells: ['Careless or incomplete answers', 'More calls for every answer'] },
            { label: 'Tool use', cells: ['Missing knowledge, no way to act', 'Each tool can fail or be misused'] },
            { label: 'Planning', cells: ['Long tasks that drift from the goal', 'Mistakes in the plan carry through'] },
            { label: 'Multi-agent', cells: ['One prompt doing too many jobs', 'Coordination and harder debugging'] },
          ],
        },
        {
          type: 'callout',
          text: 'The best agent is often the one with the fewest moving parts that still does the job.',
        },
      ],
    },
    {
      id: 'project',
      title: 'On a real project',
      takeaway: 'The NOC automation I delivered at Chakray uses two of them.',
      blocks: [
        {
          type: 'p',
          text: 'Tool use: the agent that classifies each email has a Qdrant vector store as a tool to pull relevant knowledge, and a second agent finds the affected circuit in the CMDB through an MCP server written in Python.',
        },
        {
          type: 'p',
          text: 'A split of roles: two agents, each with one job. One classifies the email, the other enriches it. The steps around them are plain workflows, because those steps are always the same.',
        },
        { type: 'link', to: NOC_PATH, text: 'Read the full case study' },
      ],
    },
  ],
};

export default post;
