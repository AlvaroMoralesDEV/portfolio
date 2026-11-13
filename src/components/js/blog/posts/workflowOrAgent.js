import { NOC_PATH } from '../../caseStudy/caseStudyData';

// "Workflow or agent? How much autonomy to give an AI system"
// Block types are rendered by BlogParts.js (see BLOCKS there).
// The diagrams are illustrative. The project section only repeats what the NOC case study
// already states.
const post = {
  // Shown at the end of the article. External links were checked when added.
  sources: [
    { title: "Building effective agents", publisher: "Anthropic", url: 'https://www.anthropic.com/research/building-effective-agents' },
    { title: "Integrate AI (n8n advanced AI)", publisher: "n8n documentation", url: 'https://docs.n8n.io/advanced-ai/' },
    { title: "NOC automation with n8n and AI agents (case study)", publisher: "this site", to: NOC_PATH },
  ],
  sections: [
    {
      id: 'two',
      title: 'Two ways to build the same thing',
      takeaway: 'A workflow follows the steps you wrote. An agent chooses its own.',
      blocks: [
        {
          type: 'pattern',
          name: 'versus',
          alt: 'Illustration: on the left a workflow of three fixed steps in order. On the right an agent in the centre that chooses between three tools.',
          caption: 'On the left, the path is drawn before anything runs. On the right, the model draws it as it goes.',
        },
        {
          type: 'p',
          text: 'Both can read an email, look something up and write an answer. The difference is who decides the order. In a workflow, a person decided it once, at design time. In an agent, the model decides it again on every run.',
        },
        {
          type: 'p',
          text: 'That one difference explains almost everything else: cost, speed, how they fail and how you debug them.',
        },
      ],
    },
    {
      id: 'compare',
      title: 'What each one is good at',
      takeaway: 'A workflow is predictable. An agent is flexible. You pay for each with the other.',
      blocks: [
        {
          type: 'matrix',
          highlight: false,
          caption: 'Neither column is the right one. It depends on the task.',
          columns: ['Workflow', 'Agent'],
          rows: [
            { label: 'Steps', cells: ['Known in advance', 'Decided at run time'] },
            { label: 'Cost', cells: ['The same on every run', 'Changes with every run'] },
            { label: 'Handles', cells: ['The cases you planned for', 'Cases nobody listed'] },
            { label: 'Fails by', cells: ['Stopping at a case it does not know', 'Doing something you did not expect'] },
            { label: 'To debug', cells: ['Follow the path', 'Read what the model did and why'] },
          ],
        },
      ],
    },
    {
      id: 'levels',
      title: 'The levels in between',
      takeaway: 'Autonomy is a dial, not a switch. Turn it only as far as the task needs.',
      blocks: [
        {
          type: 'timeline',
          steps: [
            { step: 'Fixed workflow', text: 'No model. Every step and branch is written by hand.' },
            { step: 'Model step', text: 'One model call inside the workflow: classify, extract, summarise.' },
            { step: 'Router', text: 'The model picks which branch of the workflow runs.' },
            { step: 'Agent with tools', text: 'The model works in a loop with a short list of tools.' },
            { step: 'Open agent', text: 'A broad goal, many tools, and the model plans its own work.' },
          ],
        },
        {
          type: 'p',
          text: 'Most useful systems in a company sit at the second, third or fourth level. Each step to the right handles more cases and is harder to predict, test and explain.',
        },
      ],
    },
    {
      id: 'choose',
      title: 'How to choose',
      takeaway: 'Ask one question: can I write the steps down before the request arrives?',
      blocks: [
        {
          type: 'choice',
          columns: [
            {
              title: 'Use a workflow when',
              items: [
                'The steps are the same for every request',
                'A wrong action is expensive or hard to undo',
                'Someone will ask exactly why it did what it did',
                'Volume is high and cost per run matters',
              ],
            },
            {
              title: 'Use an agent when',
              items: [
                'The input is free text and no two cases look alike',
                'The next step depends on what the last one found',
                'Listing every case by hand would never end',
                'A person can review the result before it counts',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'together',
      title: 'Use both',
      takeaway: 'Let the workflow move the data, and put the model only where judgment is needed.',
      center: true,
      blocks: [
        {
          type: 'flow',
          alt: 'A workflow with an agent in the middle',
          steps: [
            { icon: 'flow', label: 'Workflow', sub: 'collects and cleans the input' },
            { icon: 'code', label: 'Agent', sub: 'reads · decides · returns a result', hub: true },
            { icon: 'done', label: 'Workflow', sub: 'validates and acts on it' },
          ],
        },
        {
          type: 'p',
          text: 'The agent gets a clean input and must return a result in a fixed shape. The workflow checks that shape before it acts, and sends anything that does not fit to a person. The model decides; it does not get to do anything on its own.',
        },
        {
          type: 'callout',
          text: 'The narrower the job you give the model, the more you can trust what comes back.',
        },
      ],
    },
    {
      id: 'project',
      title: 'On a real project',
      takeaway: 'The workflows move the data; the AI makes the decisions that used to need a person reading every email.',
      blocks: [
        {
          type: 'p',
          text: 'That is how the NOC automation I delivered at Chakray is built, with n8n and AI agents. Eight focused workflows around a SQL queue do the plumbing. Two agents sit inside them, each with one job: one classifies the email, the other enriches it.',
        },
        {
          type: 'p',
          text: 'Every email ends in an explicit, audited state, and when the classification fails the email goes to a review folder instead of being acted on.',
        },
        { type: 'link', to: NOC_PATH, text: 'Read the full case study' },
      ],
    },
  ],
};

export default post;
