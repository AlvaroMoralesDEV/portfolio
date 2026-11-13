// "How I work with AI: a system, not autopilot"
// Block types are rendered by BlogParts.js (see BLOCKS there).
// The user's points (2026-11-13): understand it yourself before using AI, review the code,
// never let the AI do everything unchecked, and they built a system for it. Tools named at the
// user's request: Orca and Claude. The instructions file below is a generic example, not a
// copy of any real project's file.
const RULES_FILE = `# Project rules (read at the start of every session)

## Commands
- Build: npm run build      # warnings fail the build
- Tests: npm test

## Hard rules
- Do not add dependencies without asking.
- Never put credentials, hostnames or client names in code or copy.
- Follow the existing style. No new colours, no new patterns.

## Before calling anything done
- The build and the tests pass.
- Check the change on screen, on desktop and on mobile.`;

const post = {
  // Shown at the end of the article. External links were checked when added.
  sources: [
    { title: "Claude Code overview", publisher: "Anthropic", url: 'https://code.claude.com/docs/en/overview' },
    { title: "Best practices for Claude Code", publisher: "Anthropic", url: 'https://code.claude.com/docs/en/best-practices' },
    { title: "Orca", publisher: "Stably AI, GitHub", url: 'https://github.com/stablyai/orca' },
    { title: "What is the Model Context Protocol (MCP)?", publisher: "modelcontextprotocol.io", url: 'https://modelcontextprotocol.io/' },
  ],
  sections: [
    {
      id: 'first',
      title: 'Understand it first',
      takeaway: 'AI makes me faster at work I understand. It does not replace understanding it.',
      center: true,
      blocks: [
        {
          type: 'p',
          text: 'Before I ask an AI to write anything, I read the code, the data and the problem myself. If I cannot explain what the change should do and why, I am not ready to delegate it: I would not be able to tell whether the result is right.',
        },
        {
          type: 'flow',
          alt: 'The order of work, in three steps',
          steps: [
            { icon: 'search', label: 'I understand', sub: 'the problem and the code' },
            { icon: 'code', label: 'AI drafts', sub: 'small, scoped changes', hub: true },
            { icon: 'audit', label: 'I review', sub: 'every line, before it counts' },
          ],
        },
        {
          type: 'p',
          text: 'The model writes quickly and confidently, whether it is right or wrong. Speed only helps when someone who understands the problem is checking the direction.',
        },
      ],
    },
    {
      id: 'system',
      title: 'The system',
      takeaway: 'Five steps, the same every time. The AI works inside them, not around them.',
      blocks: [
        {
          type: 'cycle',
          alt: 'The five steps of the system, in a circle',
          center: ['every', 'change'],
          steps: [
            { label: 'Understand', text: 'Read the code and the problem until I can explain the change myself.' },
            { label: 'Set the rules', text: 'Write down what the AI must and must not do in this project.' },
            { label: 'Delegate small', text: 'Hand over one scoped task at a time, never “build the whole thing”.' },
            { label: 'Review', text: 'Read every change. Anything I do not understand does not go in.' },
            { label: 'Verify', text: 'Run the build and the tests, and look at the result myself.' },
          ],
        },
      ],
    },
    {
      id: 'rules',
      title: 'The rules are written down',
      takeaway: 'An AI forgets between sessions. A file in the repository does not.',
      blocks: [
        {
          type: 'p',
          text: 'Every project gets an instructions file that the AI reads at the start of each session: how to build and test, the hard rules, and what “done” means. When I correct the AI twice for the same thing, the correction goes into the file.',
        },
        {
          type: 'code',
          lang: 'Markdown',
          code: RULES_FILE,
          caption: 'A shortened example. The real files grow with each project.',
        },
        {
          type: 'p',
          text: 'The rules that matter most are the ones that protect the client: no credentials, no internal names, no invented numbers. Those are not left to the model’s judgment.',
        },
      ],
    },
    {
      id: 'tools',
      title: 'The tools',
      takeaway: 'An agent in the terminal, several in parallel, and a standard way to reach real systems.',
      blocks: [
        {
          type: 'cards',
          items: [
            {
              icon: 'code',
              title: 'Claude and Claude Code',
              text: 'Claude Code works in the terminal, inside the repository: it reads the code, runs commands and proposes changes, following the project’s instructions file.',
            },
            {
              icon: 'flow',
              title: 'Orca',
              text: 'Runs several coding agents side by side, each in its own git worktree, so one idea can be tried in different ways and compared. Every diff can be reviewed and commented line by line before it is merged.',
            },
            {
              icon: 'tool',
              title: 'MCP',
              text: 'The Model Context Protocol connects agents to real systems through servers with a fixed list of tools, so access is defined in one place.',
            },
            {
              icon: 'doc',
              title: 'Skills and instructions',
              text: 'Reusable instructions for recurring tasks: how to review, how to verify a page, how to write a commit. The same steps every time.',
            },
          ],
        },
        {
          type: 'p',
          text: 'The tools change every few months. The system around them does not: understand, set the rules, delegate small, review, verify.',
        },
      ],
    },
    {
      id: 'orca',
      title: 'Several agents, one decision',
      takeaway: 'With Orca, one task goes to several agents at once. I compare their work and merge only what I choose.',
      blocks: [
        {
          type: 'pattern',
          name: 'orca',
          alt: 'Illustration: one prompt goes to three agents, each working in its own git worktree. Their changes come to a review step, and only the chosen one is merged.',
          caption: 'Each agent works on its own copy of the repository, so they never touch each other’s changes. Nothing reaches the main branch without a review.',
        },
        {
          type: 'timeline',
          steps: [
            { step: 'One prompt', text: 'The same scoped task, written once.' },
            { step: 'Fan out', text: 'Several agents take it in parallel, each in its own git worktree.' },
            { step: 'Compare', text: 'Different agents solve it in different ways. The diffs sit side by side.' },
            { step: 'Comment', text: 'I leave comments on specific lines and send them back to the agent.' },
            { step: 'Merge one', text: 'I merge the version I understand and trust. The rest is discarded.' },
          ],
        },
        {
          type: 'p',
          text: 'Parallel agents do not mean less review. They mean more options to review: instead of accepting the first answer, I pick the best one, and the comparison often shows a problem that a single version would have hidden.',
        },
      ],
    },
    {
      id: 'review',
      title: 'Review is not optional',
      takeaway: 'Code I have not read does not get merged, no matter who wrote it.',
      blocks: [
        {
          type: 'compare',
          labels: ['Letting the AI do everything', 'How I use it'],
          before: [
            '“Build the whole feature”',
            'Accept the change because it runs',
            'Trust the summary of what was done',
            'Let it install, push and deploy on its own',
            'Find the problem in production',
          ],
          after: [
            'One scoped task with clear limits',
            'Read the diff and understand every line',
            'Check the result myself: build, tests, screen',
            'I decide what is installed, committed and deployed',
            'Find the problem before it leaves my machine',
          ],
        },
        {
          type: 'callout',
          text: 'The AI proposes. I decide. My name is on the commit.',
        },
      ],
    },
    {
      id: 'mine',
      title: 'What stays with me',
      takeaway: 'The parts where a mistake is expensive, or where the answer depends on people.',
      blocks: [
        {
          type: 'choice',
          columns: [
            {
              title: 'I hand to the AI',
              items: [
                'First drafts of code I already know how to write',
                'Repetitive changes across many files',
                'Tests, once I know what they must prove',
                'Looking for something in a large codebase',
              ],
            },
            {
              title: 'I keep',
              items: [
                'Understanding the problem with the client',
                'Architecture and design decisions',
                'Anything touching security or client data',
                'The final review and the decision to ship',
              ],
            },
          ],
        },
      ],
    },
  ],
};

export default post;
