import { NOC_PATH, timeline } from '../../caseStudy/caseStudyData';

// "What is a Forward Deployed Engineer?"
// Block types are rendered by BlogParts.js (see BLOCKS there).
// The project section reuses the NOC timeline as is: no project detail is written here
// that the case study does not already state.
const post = {
  // Shown at the end of the article. External links were checked when added.
  sources: [
    { title: "Forward deployed engineers", publisher: "The Pragmatic Engineer", url: 'https://newsletter.pragmaticengineer.com/p/forward-deployed-engineers' },
    { title: "Who are Palantir FDEs?", publisher: "Palantir community forum", url: 'https://community.palantir.com/t/who-are-palantir-fdes/6847' },
    { title: "NOC automation with n8n and AI agents (case study)", publisher: "this site", to: NOC_PATH },
  ],
  sections: [
    {
      id: 'short',
      title: 'The short version',
      takeaway: "A software engineer who works inside the customer's problem and ships the solution there.",
      center: true,
      blocks: [
        {
          type: 'p',
          text: 'Most engineers build a product for many customers they never meet. A Forward Deployed Engineer (FDE) does the opposite: they take the product to one customer, sit with the people who do the work, and build what makes it useful for them.',
        },
        {
          type: 'flow',
          alt: 'Where the role sits, in three steps',
          steps: [
            { icon: 'users', label: 'A customer problem', sub: 'messy · specific · urgent' },
            { icon: 'code', label: 'Forward Deployed Engineer', sub: 'listens · builds · deploys', hub: true },
            { icon: 'done', label: 'Working software', sub: "in the customer's environment" },
          ],
        },
        {
          type: 'p',
          text: 'The title was popularised by Palantir and has since spread across AI companies. The name says where the engineer works: forward, next to the customer, not behind a support queue.',
        },
      ],
    },
    {
      id: 'roles',
      title: 'What people expect, and what the job is',
      takeaway: 'An engineering job first. What changes is where you sit and who you answer to.',
      blocks: [
        {
          type: 'compare',
          labels: ['What people expect', 'What the job is'],
          before: [
            'A consultant who writes slides',
            'Support with a nicer title',
            'Someone who customises demos',
            'Work that ends at the handover',
          ],
          after: [
            'An engineer who writes production code',
            "Works from the customer's workflow, not from a ticket queue",
            'Ships software people use every day',
            'Stays until it runs in production',
          ],
        },
        {
          type: 'p',
          text: 'A consultancy that builds and ships for its clients already works close to this model. That is the kind of work I do at Chakray.',
        },
      ],
    },
    {
      id: 'loop',
      title: 'The loop',
      takeaway: 'Listen, scope, build, deploy, feed back. Then again, with a smaller gap each time.',
      blocks: [
        {
          type: 'cycle',
          alt: 'The five steps of the loop, in a circle',
          center: ["the customer's", 'workflow'],
          steps: [
            { label: 'Listen', text: 'Sit with the people who do the work. Watch the process, not the description of it.' },
            { label: 'Scope', text: 'Pick the thinnest slice that solves a real pain, and agree what stays with a person.' },
            { label: 'Build', text: 'Prototype against real data, in small steps the customer can see.' },
            { label: 'Deploy', text: 'Run it in their environment, with their security, their systems and their constraints.' },
            { label: 'Feed back', text: 'Take what you learned to the product team, so the next customer starts further ahead.' },
          ],
        },
      ],
    },
    {
      id: 'project',
      title: 'What it looks like on a real project',
      takeaway: 'The same loop, on a NOC automation I delivered at Chakray.',
      blocks: [
        {
          type: 'p',
          text: 'At Chakray I delivered a NOC automation for a leading European telecom infrastructure operator, built with n8n and AI agents. These were the five steps with the client, from discovery to production.',
        },
        { type: 'timeline', steps: timeline },
        { type: 'link', to: NOC_PATH, text: 'Read the full case study' },
      ],
    },
    {
      id: 'skills',
      title: 'What the job asks for',
      takeaway: 'Four skills. The hard part is having them at once.',
      blocks: [
        {
          type: 'cards',
          items: [
            {
              icon: 'code',
              title: 'Engineering depth',
              text: 'You write the code yourself: integrations, data pipelines, agents, deployment. There is no one to hand the hard part to.',
            },
            {
              icon: 'client',
              title: 'Discovery',
              text: 'Asking the question behind the request. What people ask for and what they need are often different.',
            },
            {
              icon: 'target',
              title: 'Scope discipline',
              text: 'Saying no to most things so that one thing reaches production.',
            },
            {
              icon: 'users',
              title: 'Clear communication',
              text: 'Explaining a technical decision to someone who cares about the result, not the technology.',
            },
          ],
        },
      ],
    },
    {
      id: 'why',
      title: 'Why the role is growing now',
      takeaway: 'AI models are general. The value appears when someone fits them to one specific workflow.',
      blocks: [
        {
          type: 'p',
          text: 'A language model can do many things reasonably well out of the box. Turning that into a system a company can rely on takes work that is specific to that company: its data, its systems, its rules and its exceptions.',
        },
        {
          type: 'p',
          text: 'That work is hard to do from a distance. It needs an engineer who understands both the model and the workflow, and that is the seat the FDE takes.',
        },
        {
          type: 'callout',
          text: 'The model is the same for everyone. The last mile is different for every customer.',
        },
      ],
    },
  ],
};

export default post;
