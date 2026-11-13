// "Sanderson’s laws of magic, applied to AI agents"
// Block types are rendered by BlogParts.js (see BLOCKS there).
// The user is a fan of Brandon Sanderson's books (2026-11-13). Nothing else is known (favourite
// book, series): ask before adding any. The three laws are quoted from his own essays, which
// were fetched and read; no plot or book is described. One analogy for the whole article.
// The project section only repeats facts already in the NOC case study.
// Article files must not import blogData.js: write blog paths as strings.
const post = {
  // External links were fetched and loaded when added.
  sources: [
    { title: 'Sanderson’s First Law', publisher: 'Brandon Sanderson', url: 'https://www.brandonsanderson.com/blogs/blog/sandersons-first-law' },
    { title: 'Sanderson’s Second Law', publisher: 'Brandon Sanderson', url: 'https://www.brandonsanderson.com/blogs/blog/sandersons-second-law' },
    { title: 'Sanderson’s Third Law of Magic', publisher: 'Brandon Sanderson', url: 'https://www.brandonsanderson.com/blogs/blog/sandersons-third-law-of-magic' },
    { title: 'Building effective agents', publisher: 'Anthropic', url: 'https://www.anthropic.com/engineering/building-effective-agents' },
    { title: 'Writing effective tools for agents', publisher: 'Anthropic', url: 'https://www.anthropic.com/engineering/writing-tools-for-agents' },
    { title: 'People + AI Guidebook', publisher: 'Google PAIR', url: 'https://pair.withgoogle.com/guidebook/' },
    { title: 'NOC automation case study', publisher: 'This site', to: '/projects/noc' },
  ],
  sections: [
    {
      id: 'idea',
      title: 'Rules for magic, written by a novelist',
      takeaway: 'A fantasy author’s three rules for designing magic are a good checklist for designing an AI agent.',
      center: true,
      blocks: [
        {
          type: 'p',
          text: 'I am a fan of Brandon Sanderson’s books. He is known for magic systems that follow rules, and he wrote three essays explaining how he designs them. He calls them his laws of magic, and says they are guidelines for his own writing, not rules for everyone.',
        },
        {
          type: 'flow',
          alt: 'The three laws in three steps',
          steps: [
            { icon: 'search', label: 'First law', sub: 'understood before it is used' },
            { icon: 'target', label: 'Second law', sub: 'limits matter more than powers', hub: true },
            { icon: 'tool', label: 'Third law', sub: 'deepen before you add' },
          ],
        },
        {
          type: 'p',
          text: 'An AI agent is the nearest thing in software to magic: you describe what you want and something happens. That is exactly why the laws fit. They are about making something powerful feel fair and reliable to the people watching it.',
        },
      ],
    },
    {
      id: 'first',
      title: 'First law: it can only solve what people understand',
      takeaway: 'An agent can be trusted with a problem only as far as its users understand what it can and cannot do.',
      blocks: [
        {
          type: 'quote',
          text: 'An author’s ability to solve conflict with magic is directly proportional to how well the reader understands said magic.',
          cite: 'Sanderson’s First Law',
        },
        {
          type: 'pattern',
          name: 'understood',
          alt: 'Illustration: a large dashed circle holds everything the agent could do. Inside it, a smaller highlighted circle holds what its users understand. Only the problems inside the smaller circle can be trusted to the agent, and an arrow shows the smaller circle growing.',
          caption: 'The agent may be able to do everything in the outer circle. It is only useful inside the inner one.',
        },
        {
          type: 'p',
          text: 'In a story, if the hero wins with a power the reader has never seen, the ending feels like cheating. The reader has to know the rules first. Then the solution feels earned.',
        },
        {
          type: 'p',
          text: 'With an agent, the reader is the user. If people do not know what the agent can reach, what it does on its own and where it stops, they cannot rely on its answer. They either check everything again by hand, or trust it with things it was never built for. Both are failures of the design, not of the user.',
        },
        {
          type: 'cards',
          items: [
            {
              icon: 'users',
              title: 'Say what it does',
              text: 'A short, honest description of the job: which requests it handles, which systems it can read, which actions it can take.',
            },
            {
              icon: 'trace',
              title: 'Show its work',
              text: 'The sources it used and the steps it took, next to the answer. An answer that can be checked is one people learn to trust.',
            },
          ],
        },
      ],
    },
    {
      id: 'softhard',
      title: 'Soft magic and hard magic',
      takeaway: 'Unexplained magic is fine for wonder. Solving real problems needs explicit rules.',
      blocks: [
        {
          type: 'p',
          text: 'The same essay describes a scale. At one end is soft magic: mysterious, never explained, there for the sense of wonder. At the other is hard magic, where the author states the rules so the reader can follow how a problem is solved. His point is that soft magic is fine for atmosphere, and should not be what resolves the plot.',
        },
        {
          type: 'pattern',
          name: 'spectrum',
          alt: 'Illustration of a line from soft magic on the left to hard magic on the right, with three points on it: a demo, which runs on wonder, a pilot with some rules, and a production system with explicit rules.',
          caption: 'An AI project moves along this line. Each step to the right replaces a little wonder with a rule someone can rely on.',
        },
        {
          type: 'choice',
          columns: [
            {
              title: 'Soft magic · the demo',
              items: [
                'An open text box: “ask me anything”',
                'Impressive because nobody knows the limits',
                'Good for showing what is possible',
                'Nobody depends on the answer',
              ],
            },
            {
              title: 'Hard magic · production',
              items: [
                'A defined job with known inputs and outputs',
                'Useful because everyone knows the limits',
                'Good for work that repeats every day',
                'People act on the answer',
              ],
            },
          ],
        },
        {
          type: 'p',
          text: 'Most AI projects start as soft magic, and that is useful: the demo is what gets people interested. The work of taking one to production is mostly the work of turning it into hard magic.',
        },
      ],
    },
    {
      id: 'second',
      title: 'Second law: limitations over powers',
      takeaway: 'What an agent cannot do is what makes it safe to use, so design the limits as carefully as the abilities.',
      blocks: [
        {
          type: 'quote',
          text: 'Limitations > Powers',
          cite: 'Sanderson’s Second Law',
        },
        {
          type: 'pattern',
          name: 'limits',
          alt: 'Illustration: an agent inside a solid ring. Two connections pass through the ring to the tools search and look up. A third connection, towards delete, is stopped at the ring with a cross.',
          caption: 'The ring is the tool list and its permissions. The agent cannot cross it, whatever the prompt or the user says.',
        },
        {
          type: 'p',
          text: 'His argument is that what a magic cannot do is more interesting than what it can. He names three things to design on purpose: limitations, weaknesses and costs. Each one has a direct match in an agent.',
        },
        {
          type: 'matrix',
          columns: ['In a story', 'In an agent'],
          rows: [
            { label: 'Limitations', cells: ['What the magic simply cannot do', 'What the agent is not allowed to do: tools it does not have, actions that need a person'] },
            { label: 'Weaknesses', cells: ['Where the magic fails or can be turned against its user', 'Known failure modes: confident wrong answers, instructions hidden in the text it reads'] },
            { label: 'Costs', cells: ['What using the magic takes from the character', 'Tokens, time and money on every run'] },
          ],
        },
        {
          type: 'callout',
          text: 'A limit written in a prompt is a request. A limit written in code is a limit.',
        },
        {
          type: 'p',
          text: 'An agent that can only read cannot delete anything, however it is asked. That is why the useful limits live outside the model: in the list of tools it is given, in the permissions of those tools, and in checks on its output.',
        },
      ],
    },
    {
      id: 'third',
      title: 'Third law: expand what you have before adding more',
      takeaway: 'A few tools the agent uses well beat a long list it uses badly.',
      blocks: [
        {
          type: 'quote',
          text: 'Expand what you already have before you add something new.',
          cite: 'Sanderson’s Third Law',
        },
        {
          type: 'p',
          text: 'He writes that a strong magic system is more often one with few powers that the author has thought through than one with a thousand of them. The temptation in a story is to add another power. The temptation with an agent is to add another tool, another agent, another model.',
        },
        {
          type: 'pattern',
          name: 'depth',
          alt: 'Illustration of two agents. On the left, one agent is wired to eight small unnamed tools, with the note: which one? On the right, one agent is wired to three larger, named tools.',
          caption: 'Every tool is one more thing the model has to choose between. Fewer, clearer tools make that choice easier.',
        },
        {
          type: 'list',
          items: [
            'Before adding a tool, improve the description, the parameters and the error messages of the ones the agent already has.',
            'Before adding a second agent, check whether one agent with a better prompt does the job.',
            'Before adding a feature, find out what users already do with the current ones that you did not expect.',
          ],
        },
      ],
    },
    {
      id: 'checklist',
      title: 'The three laws as a design review',
      takeaway: 'Three questions to ask about any agent before it goes to production.',
      blocks: [
        {
          type: 'pattern',
          name: 'laws',
          alt: 'Illustration: an agent in the centre, connected to three boxes around it. Understood: users know its job. Limited: limits live in code. Deep: few tools, used well.',
          caption: 'One question per law. An agent that fails one of them is not ready, however good the demo looks.',
        },
        {
          type: 'cards',
          items: [
            {
              icon: 'search',
              title: 'Understood',
              text: 'Can a user say, in one or two sentences, what this agent does and where it stops?',
            },
            {
              icon: 'audit',
              title: 'Limited',
              text: 'Are the limits enforced in code, and do we know its weaknesses and what each run costs?',
            },
            {
              icon: 'tool',
              title: 'Deep',
              text: 'Does it do a few things well, with tools that are described and tested, before we add more?',
            },
            {
              icon: 'doc',
              title: 'One caveat',
              text: 'These are a novelist’s guidelines, borrowed as a way to think. They do not replace testing and evaluation.',
            },
          ],
        },
      ],
    },
    {
      id: 'project',
      title: 'On a real project',
      takeaway: 'Two agents, each with one job and a narrow set of tools.',
      blocks: [
        {
          type: 'p',
          text: 'In the NOC automation I worked on, the AI layer is two agents, and each does one thing. The first classifies an incoming email and returns a structured record that is checked against a schema, so the next steps can trust it. The second finds the affected circuit by querying the CMDB through an MCP server written in Python, instead of guessing from the text.',
        },
        {
          type: 'p',
          text: 'That is the three laws in a small space: each agent has a job that can be explained in a sentence, its output and its tools are limited on purpose, and the system is two focused agents, not a dozen.',
        },
        { type: 'link', to: '/projects/noc', text: 'Read the case study' },
      ],
    },
  ],
};

export default post;
