import { NOC_PATH } from '../../caseStudy/caseStudyData';

// "What really matters in AI engineering today"
// Block types are rendered by BlogParts.js (see BLOCKS there).
// Asked for by the user (2026-11-13), with the topics they named: MCP, Langfuse, RAG, the
// harness, LangGraph and skills (added at the user's request: "I think is important"). Inspired by a YouTube video Claude could not read (title only), so
// the video is not cited. The "passing trends" list is general opinion, with no product named.
// Keep the tone formal: the user asked not to use the word "smoke" (2026-11-13).
// Only link to articles that are already published (scheduled ones redirect to /blog).
// Article files must not import blogData.js (it imports them): write blog paths as strings.
const SKILL_FILE = `---
name: review-pull-request
description: Review a pull request against the team's checklist. Use when asked to review a PR.
---

# Reviewing a pull request
1. Read the description and the linked ticket.
2. Run the tests with scripts/run_tests.sh.
3. Check every item in checklist.md.
4. Write the review: blocking issues first, then suggestions.`;

const post = {
  sources: [
    { title: 'Effective harnesses for long-running agents', publisher: 'Anthropic', url: 'https://www.anthropic.com/engineering/effective-harnesses-for-long-running-agents' },
    { title: 'Effective context engineering for AI agents', publisher: 'Anthropic', url: 'https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents' },
    { title: 'Building agents with the Claude Agent SDK', publisher: 'Claude by Anthropic', url: 'https://claude.com/blog/building-agents-with-the-claude-agent-sdk' },
    { title: 'Equipping agents for the real world with Agent Skills', publisher: 'Anthropic', url: 'https://www.anthropic.com/engineering/equipping-agents-for-the-real-world-with-agent-skills' },
    { title: 'Agent Skills overview', publisher: 'agentskills.io', url: 'https://agentskills.io/' },
    { title: 'What is the Model Context Protocol (MCP)?', publisher: 'modelcontextprotocol.io', url: 'https://modelcontextprotocol.io/' },
    { title: 'Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks', publisher: 'Lewis et al., arXiv, 2020', url: 'https://arxiv.org/abs/2005.11401' },
    { title: 'LangGraph: agent orchestration framework', publisher: 'LangChain', url: 'https://www.langchain.com/langgraph' },
    { title: 'Langfuse overview', publisher: 'Langfuse documentation', url: 'https://langfuse.com/docs' },
    { title: 'NOC automation with n8n and AI agents (case study)', publisher: 'this site', to: NOC_PATH },
  ],
  sections: [
    {
      id: 'test',
      title: 'Lasting ideas and passing trends',
      takeaway: 'There is a new AI announcement every day. One question separates what lasts from what does not.',
      center: true,
      blocks: [
        {
          type: 'p',
          text: 'Every week brings a new model, a new framework and a new claim that everything has changed. Much of it fades within weeks. Some of it becomes the way systems are built for years.',
        },
        {
          type: 'flow',
          alt: 'The test in three steps',
          steps: [
            { icon: 'search', label: 'Something new', sub: 'a tool, a model, a claim' },
            { icon: 'target', label: 'One question', sub: 'does it help a system run in production?', hub: true },
            { icon: 'done', label: 'Keep or skip', sub: 'learn it, or let it pass' },
          ],
        },
        {
          type: 'p',
          text: 'The ideas below pass that test. They are the parts I find in every AI system that works for real users, whatever model sits in the middle.',
        },
      ],
    },
    {
      id: 'stack',
      title: 'The stack that matters',
      takeaway: 'The model is one layer. Most of the engineering is in the layers around it.',
      blocks: [
        {
          type: 'pattern',
          name: 'aistack',
          alt: 'Illustration of the layers of a production AI system, from the model at the bottom up through knowledge (RAG), tools (MCP), the harness, skills and orchestration, with observability (Langfuse) running alongside all of them.',
          caption: 'Models change every few months. The layers around them are where a system becomes reliable, and they outlast any single model.',
        },
      ],
    },
    {
      id: 'harness',
      title: 'The harness',
      takeaway: 'The model is the engine. The harness is the rest of the car.',
      blocks: [
        {
          type: 'p',
          text: 'A model on its own only turns text into text. The harness is the software around it that makes it an agent: it runs the loop, gives the model its tools, decides what goes into the context, asks for permission before risky actions, and keeps track of progress on long tasks. Claude Code is a harness; the Claude Agent SDK lets you build your own.',
        },
        {
          type: 'cards',
          items: [
            { icon: 'owner', title: 'The loop', text: 'Act, look at the result, decide the next step, and know when to stop.' },
            { icon: 'doc', title: 'The context', text: 'What the model sees at each step. Choosing it well is now called context engineering, and it matters more than prompt tricks.' },
            { icon: 'tool', title: 'The tools', text: 'What the agent can reach, described so the model knows when to use each one.' },
            { icon: 'audit', title: 'The guardrails', text: 'Permissions, confirmations and limits, enforced in code rather than in the prompt.' },
          ],
        },
        {
          type: 'callout',
          text: 'Two teams with the same model get very different results. The difference is usually the harness.',
        },
      ],
    },
    {
      id: 'skills',
      title: 'Skills: know-how the agent loads when it needs it',
      takeaway: 'A skill packages how your team does something, so the agent does it the same way every time.',
      blocks: [
        {
          type: 'p',
          text: 'Agent Skills, introduced by Anthropic and now an open format, are folders of instructions, scripts and resources. Each one teaches the agent a specific task: how to review a pull request, fill in a form, or follow a release checklist.',
        },
        {
          type: 'flow',
          alt: 'How an agent loads a skill, in three steps',
          steps: [
            { icon: 'search', label: 'Discover', sub: 'only the name and description, always loaded' },
            { icon: 'doc', label: 'Activate', sub: 'the full instructions, when the task matches', hub: true },
            { icon: 'tool', label: 'Execute', sub: 'scripts and extra files, only if needed' },
          ],
        },
        {
          type: 'code',
          lang: 'SKILL.md',
          code: SKILL_FILE,
          caption: 'A skill is a folder with a SKILL.md file. The description at the top decides when the agent uses it. This one is an example.',
        },
        {
          type: 'cards',
          items: [
            { icon: 'doc', title: 'Loaded on demand', text: 'The agent only sees each skill’s short description until a task needs it. Many skills cost almost nothing in context.' },
            { icon: 'code', title: 'Code where code is better', text: 'A skill can bundle scripts the agent runs instead of improvising: the same steps, the same result.' },
            { icon: 'users', title: 'The team’s way of working', text: 'Checklists and conventions written once, in the repository, and used by everyone’s agent.' },
            { icon: 'flow', title: 'Portable', text: 'Skills are plain files, so they can be versioned, reviewed and shared like any other code.' },
          ],
        },
        {
          type: 'callout',
          text: 'Prompts tell the model what to do once. Skills teach it how your team does it, every time.',
        },
      ],
    },
    {
      id: 'reach',
      title: 'MCP and RAG: reaching systems and knowledge',
      takeaway: 'An agent is only as useful as what it can reach. These two are how it reaches things.',
      blocks: [
        {
          type: 'choice',
          columns: [
            {
              title: 'MCP · for actions and live data',
              items: [
                'An open standard to connect agents to systems',
                'Each system is wrapped once in a server with a fixed list of tools',
                'Any application that speaks MCP can use it',
                'Access is defined in one place, not in every prompt',
              ],
            },
            {
              title: 'RAG · for knowledge',
              items: [
                'Search your own documents before the model answers',
                'Knowledge stays in your store and can be updated any time',
                'Every answer can point to its source',
                'Quality depends on chunking and retrieval more than on the model',
              ],
            },
          ],
        },
        {
          type: 'p',
          text: 'They solve different problems and work well together: RAG tells the agent what is known, MCP lets it check what is true right now and act on it.',
        },
        { type: 'link', to: '/blog/rag-in-production', text: 'Read: How to build a RAG system that survives production' },
      ],
    },
    {
      id: 'langgraph',
      title: 'LangGraph: when the flow needs structure',
      takeaway: 'A graph of steps with shared state: freedom for the model where it helps, fixed paths where it does not.',
      blocks: [
        {
          type: 'pattern',
          name: 'graph',
          alt: 'Illustration of an agent built as a graph: a plan step can call a tool and loop back, or write an answer that a person approves before it is done.',
          caption: 'Each box is a step, each arrow a possible next step. The loop and the human check are part of the design, not left to chance.',
        },
        {
          type: 'p',
          text: 'LangGraph, from the LangChain team, builds agents as graphs: steps are nodes, the allowed moves between them are edges, and a shared state travels through. That makes loops, retries and human approval explicit, and lets a long task stop and resume.',
        },
        {
          type: 'p',
          text: 'Use it when the flow has real branches and loops. For a straight line of steps, plain code or a workflow tool such as n8n is simpler.',
        },
      ],
    },
    {
      id: 'langfuse',
      title: 'Langfuse: seeing what the system did',
      takeaway: 'If you cannot see each step, you cannot fix it, and you cannot prove a change made it better.',
      blocks: [
        {
          type: 'cards',
          items: [
            { icon: 'trace', title: 'Traces', text: 'Every request as a tree of steps: each model call, tool call and retrieved chunk, with its timing and cost.' },
            { icon: 'audit', title: 'Evaluations', text: 'Scores on real traces and test sets, so a prompt or model change is measured before it ships.' },
            { icon: 'doc', title: 'Prompt management', text: 'Prompts versioned outside the code, linked to the traces they produced.' },
            { icon: 'db', title: 'Open source', text: 'It can run on your own infrastructure, which matters when the data cannot leave.' },
          ],
        },
      ],
    },
    {
      id: 'trends',
      title: 'Trends I approach with caution',
      takeaway: 'Not necessarily wrong, but not where the lasting value is. I would think twice before building on them.',
      blocks: [
        {
          type: 'compare',
          labels: ['Passing trend', 'Lasting practice'],
          before: [
            'A new framework every week',
            'Fully autonomous agents that replace a team',
            'Choosing a model by a leaderboard',
            'Prompt tricks that work once',
            '“A bigger model will fix it”',
          ],
          after: [
            'The few ideas underneath every framework',
            'Agents with one job and a person in the loop',
            'Choosing by your own test set',
            'A clean context and well-described tools',
            'Better retrieval, tools and evaluation',
          ],
        },
      ],
    },
    {
      id: 'project',
      title: 'On a real project',
      takeaway: 'The NOC automation I delivered at Chakray uses most of this stack, and the next phase adds the rest.',
      blocks: [
        {
          type: 'p',
          text: 'It runs AI agents inside n8n workflows. One agent pulls knowledge from Qdrant, the RAG layer, and another reaches the CMDB through an MCP server written in Python.',
        },
        {
          type: 'p',
          text: 'The improvements I proposed for the next phase are tracing and evaluation with Langfuse, and hybrid retrieval that combines Qdrant with a knowledge graph.',
        },
        { type: 'link', to: NOC_PATH, text: 'Read the full case study' },
      ],
    },
  ],
};

export default post;
