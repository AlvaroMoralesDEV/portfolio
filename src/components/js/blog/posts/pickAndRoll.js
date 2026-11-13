import { NOC_PATH } from '../../caseStudy/caseStudyData';

// "The pick and roll of AI agents"
// Block types are rendered by BlogParts.js (see BLOCKS there).
// The user is a basketball fan and asked to say so (2026-11-13); no other personal detail
// (team, position, league) is known, so none is written. The court diagram is illustrative.
// The project section only repeats what the NOC case study already states.
const post = {
  sources: [
    { title: 'Pick and roll', publisher: 'Wikipedia', url: 'https://en.wikipedia.org/wiki/Pick_and_roll' },
    { title: 'Building effective agents', publisher: 'Anthropic', url: 'https://www.anthropic.com/research/building-effective-agents' },
    { title: 'Agentic Design Patterns Part 1: Four AI agent strategies', publisher: 'Andrew Ng, The Batch (DeepLearning.AI)', url: 'https://www.deeplearning.ai/the-batch/how-agents-can-improve-llm-performance/' },
    { title: 'NOC automation with n8n and AI agents (case study)', publisher: 'this site', to: NOC_PATH },
  ],
  sections: [
    {
      id: 'why',
      title: 'Why a basketball play',
      takeaway: 'Two players, two roles, one read. That is also the best way I know to explain two agents working together.',
      center: true,
      blocks: [
        {
          type: 'p',
          text: 'I am a big basketball fan, and the more I build with AI agents, the more I see the court in them. The play I keep coming back to is the pick and roll: the most common action in the NBA, and one of the simplest.',
        },
        {
          type: 'flow',
          alt: 'The pick and roll in three steps',
          steps: [
            { icon: 'users', label: 'Two players', sub: 'ball handler · screener' },
            { icon: 'target', label: 'One read', sub: 'what the defence does', hub: true },
            { icon: 'done', label: 'One good shot', sub: 'for whoever is open' },
          ],
        },
        {
          type: 'p',
          text: 'Multi-agent systems sound complicated. Most of the good ones are this play: one agent that owns the goal, one that does a specialist job, and a clean pass between them.',
        },
      ],
    },
    {
      id: 'play',
      title: 'The play',
      takeaway: 'The screen forces the defence to choose. Whatever it chooses, someone is open.',
      blocks: [
        {
          type: 'court',
          alt: 'Illustration of a pick and roll on a half court: the screener blocks the ball handler’s defender, the ball handler drives past the screen, the screener rolls to the basket, and the ball handler passes to them.',
          caption: 'The screener (2) blocks the path of the ball handler’s defender. The ball handler (1) drives, the screener rolls to the basket, and the ball follows whoever is open.',
        },
        {
          type: 'timeline',
          steps: [
            { step: 'Set the screen', text: 'The screener stands in the path of the ball handler’s defender.' },
            { step: 'Use it', text: 'The ball handler drives past the screen, close enough that the defender is held up.' },
            { step: 'Read', text: 'The defence has to choose: stay with the ball, or take the screener.' },
            { step: 'Roll', text: 'The screener turns and heads for the basket, ready for a pass.' },
            { step: 'Finish', text: 'The ball handler shoots or passes, depending on the read.' },
          ],
        },
      ],
    },
    {
      id: 'agents',
      title: 'The same play with agents',
      takeaway: 'Every role on the court has a counterpart in a two-agent system.',
      blocks: [
        {
          type: 'matrix',
          highlight: false,
          caption: 'The mapping is loose, like every analogy, but the roles line up.',
          columns: ['On the court', 'In the system'],
          rows: [
            { label: 'Ball handler', cells: ['Has the ball and runs the play', 'The orchestrator: owns the goal and the context'] },
            { label: 'Screener', cells: ['Does one job very well', 'The specialist agent: one task, its own tools'] },
            { label: 'The screen', cells: ['Clears the way for the drive', 'Work the specialist takes off the main agent'] },
            { label: 'The read', cells: ['Watch what the defence does', 'Look at the result before the next step'] },
            { label: 'The pass', cells: ['Ball to the open player', 'Handoff with everything needed to finish'] },
          ],
        },
        {
          type: 'p',
          text: 'Anthropic calls one version of this orchestrator and workers: a central model splits the task and hands pieces to others. The pick and roll is the smallest form of it, with one worker and one decision.',
        },
      ],
    },
    {
      id: 'read',
      title: 'The read decides everything',
      takeaway: 'A great pick and roll is not the screen. It is the decision after it.',
      blocks: [
        {
          type: 'p',
          text: 'On the court, the ball handler watches the defender. If the defender stays with the ball, the screener is open. If the defender takes the screener, the ball handler has the shot. The play only works if that read is right, and it is made in a second.',
        },
        {
          type: 'choice',
          columns: [
            {
              title: 'Keep the ball when',
              items: [
                'The task is small and the orchestrator already has what it needs',
                'Handing off would cost more than doing it',
                'The answer depends on context only the orchestrator holds',
              ],
            },
            {
              title: 'Make the pass when',
              items: [
                'The task needs tools or knowledge the specialist has',
                'The orchestrator’s context is getting crowded',
                'A focused agent with a short prompt will do it better',
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'pass',
      title: 'The pass is the handoff',
      takeaway: 'A pass the roller cannot catch is a turnover. The same goes for agents.',
      blocks: [
        {
          type: 'compare',
          labels: ['A bad pass', 'A good pass'],
          before: [
            '“Look into this” with no goal',
            'Half the context, or all of it, unsorted',
            'No idea what shape the answer should take',
            'Nobody checks what comes back',
          ],
          after: [
            'One clear task with a goal',
            'Exactly the context the task needs',
            'A fixed format for the result',
            'The orchestrator validates the result before using it',
          ],
        },
        {
          type: 'callout',
          text: 'Make the pass easy to catch: short, specific, and on time.',
        },
      ],
    },
    {
      id: 'turnovers',
      title: 'Turnovers: how the play breaks',
      takeaway: 'The same four mistakes ruin a pick and roll and a multi-agent system.',
      blocks: [
        {
          type: 'cards',
          items: [
            {
              icon: 'audit',
              title: 'The moving screen',
              text: 'On the court it is a foul. In a system it is an agent acting outside its role: the specialist that starts making the orchestrator’s decisions.',
            },
            {
              icon: 'client',
              title: 'No communication',
              text: 'Two players who do not talk run into each other. Agents without a shared view of the task redo work or contradict each other.',
            },
            {
              icon: 'users',
              title: 'Both going for the ball',
              text: 'Two agents with overlapping jobs. Give every agent one job and make the borders explicit.',
            },
            {
              icon: 'target',
              title: 'Forcing the pass',
              text: 'Calling the play when a simple shot was there. Not every task needs a second agent; each handoff adds cost and a place to fail.',
            },
          ],
        },
      ],
    },
    {
      id: 'project',
      title: 'Where I have run this play',
      takeaway: 'In the NOC automation I delivered at Chakray, two agents share the work, one job each.',
      blocks: [
        {
          type: 'p',
          text: 'One agent classifies each email. The other finds the affected circuit in the CMDB through an MCP server written in Python. Neither tries to do the other’s job, and the workflows around them move the ball.',
        },
        { type: 'link', to: NOC_PATH, text: 'Read the full case study' },
      ],
    },
  ],
};

export default post;
