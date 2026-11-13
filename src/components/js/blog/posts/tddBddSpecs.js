// "TDD, BDD and SDD: write what “correct” means first"
// The user asked for "SDD" in the title and each of the three explained (2026-11-13).
// Block types are rendered by BlogParts.js (see BLOCKS there).
// Asked for by the user (2026-11-13): TDD vs BDD, plus spec-driven development as the
// approach now used with AI. The project section only repeats facts already on the site
// (the "Internal engineering tooling" card and the Skills section). Code is illustrative.
// Article files must not import blogData.js: write blog paths as strings.
const TDD_CODE = `def test_discount_is_capped_at_fifty_percent():
    assert apply_discount(price=100, percent=80) == 50

# 1. Red: the test fails, apply_discount does not exist yet.
# 2. Green: write the simplest code that makes it pass.
# 3. Refactor: clean it up, with the test as a safety net.`;

const BDD_CODE = `Feature: Discounts at checkout

  Scenario: A discount never takes off more than half the price
    Given a product that costs 100 euros
    When the customer applies an 80% discount code
    Then the price to pay is 50 euros`;

const SPEC_CODE = `# Spec: discounts at checkout

## What and why
Customers can apply one discount code at checkout.
A discount must never reduce the price by more than half.

## Acceptance criteria
- A valid code lowers the price by its percentage, up to 50%.
- An expired code is rejected with a clear message.
- Only one code per order.

## Out of scope
- Stacking codes. Discounts on shipping.`;

const post = {
  sources: [
    { title: 'Test Driven Development', publisher: 'Martin Fowler', url: 'https://martinfowler.com/bliki/TestDrivenDevelopment.html' },
    { title: 'Introducing BDD', publisher: 'Dan North', url: 'https://dannorth.net/blog/introducing-bdd/' },
    { title: 'Behaviour-Driven Development', publisher: 'Cucumber', url: 'https://cucumber.io/docs/bdd/' },
    { title: 'Gherkin reference', publisher: 'Cucumber', url: 'https://cucumber.io/docs/gherkin/reference/' },
    { title: 'Spec-driven development with AI: get started with a new open source toolkit', publisher: 'GitHub blog', url: 'https://github.blog/ai-and-ml/generative-ai/spec-driven-development-with-ai-get-started-with-a-new-open-source-toolkit/' },
    { title: 'Spec Kit', publisher: 'GitHub', url: 'https://github.com/github/spec-kit' },
    { title: 'Kiro', publisher: 'Kiro', url: 'https://kiro.dev/' },
  ],
  sections: [
    {
      id: 'intent',
      title: 'Three ways to start from intent',
      takeaway: 'All three write down what “correct” means before the code exists. They differ in who writes it and at what level.',
      center: true,
      blocks: [
        {
          type: 'flow',
          alt: 'The shared idea in three steps',
          steps: [
            { icon: 'target', label: 'Intent', sub: 'what the software must do' },
            { icon: 'doc', label: 'Written first', sub: 'a test · a scenario · a spec', hub: true },
            { icon: 'code', label: 'Code', sub: 'written to satisfy it' },
          ],
        },
        {
          type: 'p',
          text: 'TDD and BDD have been around for about twenty years. SDD is the newer one, and it has grown with AI coding agents: when an agent writes the code, the most valuable thing a person writes is the description of what correct looks like.',
        },
        {
          type: 'cards',
          items: [
            {
              icon: 'code',
              title: 'TDD · Test-Driven Development',
              text: 'The developer writes a small automated test first, then the code that makes it pass. It works at the level of functions and classes.',
            },
            {
              icon: 'users',
              title: 'BDD · Behaviour-Driven Development',
              text: 'The team describes behaviour with concrete examples in plain language (given, when, then) that the business can read. The examples become automated tests.',
            },
            {
              icon: 'doc',
              title: 'SDD · Spec-Driven Development',
              text: 'A written specification of what to build and why comes first. An AI agent turns it into a plan, tasks and code, and the result is checked against the spec.',
            },
            {
              icon: 'target',
              title: 'What they share',
              text: 'The definition of “correct” is written before the code. Only the author and the level change.',
            },
          ],
        },
      ],
    },
    {
      id: 'tdd',
      title: 'TDD: Test-Driven Development',
      takeaway: 'A failing test first. Write one small test, watch it fail, make it pass, clean up. Repeat.',
      blocks: [
        {
          type: 'cycle',
          alt: 'The TDD cycle: red, green, refactor, in a circle',
          center: ['one small', 'test'],
          steps: [
            { label: 'Red', text: 'Write a test for the next small piece of behaviour. It fails, because the code does not exist yet.' },
            { label: 'Green', text: 'Write the simplest code that makes the test pass.' },
            { label: 'Refactor', text: 'Improve the code without changing what it does. The tests catch any mistake.' },
          ],
        },
        {
          type: 'code',
          lang: 'Python',
          code: TDD_CODE,
          caption: 'A unit test written before the function it tests. The developer writes it, in code, for code.',
        },
      ],
    },
    {
      id: 'bdd',
      title: 'BDD: Behaviour-Driven Development',
      takeaway: 'Behaviour in the language of the business: examples everyone can read and agree on.',
      blocks: [
        {
          type: 'code',
          lang: 'Gherkin',
          code: BDD_CODE,
          caption: 'A scenario in Gherkin. Each Given, When and Then line is linked to code that runs it, for example with Cucumber.',
        },
        {
          type: 'p',
          text: 'BDD grew out of TDD. Instead of tests named after functions, it describes behaviour with concrete examples: given a situation, when something happens, then this is the result. The scenarios are written with the people who know the business, and they become automated tests.',
        },
      ],
    },
    {
      id: 'compare',
      title: 'TDD and BDD side by side',
      takeaway: 'They are not rivals. BDD checks you build the right thing; TDD checks you build the thing right.',
      blocks: [
        {
          type: 'matrix',
          highlight: false,
          caption: 'Most teams that use BDD also use TDD inside it.',
          columns: ['TDD', 'BDD'],
          rows: [
            { label: 'Written by', cells: ['Developers', 'Developers, testers and the business, together'] },
            { label: 'Written in', cells: ['Code', 'Plain language (Given, When, Then)'] },
            { label: 'Level', cells: ['Small units of code', 'Behaviour a user can see'] },
            { label: 'Answers', cells: ['Does this code work?', 'Does the system do what the business needs?'] },
            { label: 'Tools', cells: ['JUnit, pytest and similar', 'Cucumber and Gherkin'] },
          ],
        },
      ],
    },
    {
      id: 'sdd',
      title: 'SDD: Spec-Driven Development',
      takeaway: 'The spec leads, the agent follows. The specification becomes the main thing a person writes and reviews.',
      blocks: [
        {
          type: 'p',
          text: 'In SDD the specification is the source of truth: what to build, why, and how to know it is done. An agent turns it into a plan, the plan into small tasks, and the tasks into code, which is then checked against the spec. GitHub’s open-source Spec Kit and the Kiro editor are two tools built around this idea.',
        },
        {
          type: 'timeline',
          steps: [
            { step: 'Specify', text: 'Describe what to build and why, with acceptance criteria. No technology yet.' },
            { step: 'Plan', text: 'Decide the technical approach: architecture, stack and constraints.' },
            { step: 'Tasks', text: 'Break the plan into small pieces that can be built and checked one by one.' },
            { step: 'Implement', text: 'The agent writes the code for each task.' },
            { step: 'Verify', text: 'Check the result against the spec, and update the spec when something was missing.' },
          ],
        },
        {
          type: 'code',
          lang: 'Markdown',
          code: SPEC_CODE,
          caption: 'A short example spec. It says what and why, how to know it is done, and what is out of scope.',
        },
      ],
    },
    {
      id: 'together',
      title: 'How they fit together with AI',
      takeaway: 'Each layer narrows the space of wrong answers an agent can give.',
      blocks: [
        {
          type: 'pattern',
          name: 'intent',
          alt: 'Illustration of four nested rings: the SDD spec on the outside, then BDD scenarios, then TDD tests, and the code at the centre. Each ring narrows what the code is allowed to do. A legend says who writes each one.',
          caption: 'Each ring narrows what counts as correct. People write the outer rings; the agent fills the centre, and a person reviews it.'
        },
        {
          type: 'choice',
          columns: [
            {
              title: 'What I write and review',
              items: [
                'The spec: what, why, and what is out of scope',
                'The acceptance scenarios',
                'The tests that define tricky behaviour',
                'The final review of the code',
              ],
            },
            {
              title: 'What an agent can draft',
              items: [
                'The plan and the task list, for me to approve',
                'The code for each task',
                'More tests around the ones I wrote',
                'The glue between steps and code',
              ],
            },
          ],
        },
        {
          type: 'callout',
          text: 'The agent writes the code. You decide what “correct” means.',
        },
      ],
    },
    {
      id: 'project',
      title: 'In my work',
      takeaway: 'Tests are written first where it matters, and shared so the whole team tests the same way.',
      blocks: [
        {
          type: 'p',
          text: 'At Chakray I worked on shared building blocks for the integration team, including reusable Cucumber step libraries for testing, so every service is tested the same way. TDD and BDD are part of how I work, and the same habit carries over to AI: write down what correct means, then let the agent help with the rest.',
        },
        { type: 'link', to: '/#projects', text: 'See the projects' },
      ],
    },
  ],
};

export default post;
