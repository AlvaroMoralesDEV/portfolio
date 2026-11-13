// "Architecture patterns, and where microservices fit"
// Block types are rendered by BlogParts.js (see BLOCKS there).
// The diagrams are illustrative. The project section repeats the bank payments card of the
// home page, plus one fact from the user (2026-11-13): every Chakray project they worked on
// follows a microservices architecture, from the Odoo ERP integration to the bank.
const post = {
  // Shown at the end of the article. External links were checked when added.
  sources: [
    { title: "Microservices", publisher: "James Lewis and Martin Fowler", url: 'https://martinfowler.com/articles/microservices.html' },
    { title: "Monolith First", publisher: "Martin Fowler", url: 'https://martinfowler.com/bliki/MonolithFirst.html' },
    { title: "Pattern: Microservice Architecture", publisher: "microservices.io", url: 'https://microservices.io/patterns/microservices.html' },
    { title: "Pattern: Saga", publisher: "microservices.io", url: 'https://microservices.io/patterns/data/saga.html' },
    { title: "What is Docker?", publisher: "Docker documentation", url: 'https://docs.docker.com/get-started/docker-overview/' },
    { title: "Kubernetes overview", publisher: "Kubernetes documentation", url: 'https://kubernetes.io/docs/concepts/overview/' },
    { title: "Red Hat OpenShift", publisher: "Red Hat", url: 'https://www.redhat.com/en/technologies/cloud-computing/openshift' },
    { title: "Projects: point of sale payments and core banking", publisher: "this site", to: '/#projects' },
  ],
  sections: [
    {
      id: 'patterns',
      title: 'The patterns in one picture',
      takeaway: 'An architecture pattern is a decision about where the boundaries go.',
      blocks: [
        {
          type: 'p',
          text: 'Every system has to answer the same questions: what is deployed together, what shares data, and how the parts talk. The named patterns are the common answers. Most real systems mix more than one.',
        },
        {
          type: 'cards',
          items: [
            {
              icon: 'sort',
              title: 'Layered',
              text: 'Presentation, business logic and data in separate layers. Simple to understand; the default inside most applications.',
            },
            {
              icon: 'inbox',
              title: 'Modular monolith',
              text: 'One deployable, split inside into modules with clear borders. Easy to run, and the modules can be pulled out later.',
            },
            {
              icon: 'graph',
              title: 'Microservices',
              text: 'Small services that are deployed on their own and own their data. Independent teams and releases, at the price of a distributed system.',
            },
            {
              icon: 'trace',
              title: 'Event-driven',
              text: 'Parts publish events and others react to them. Loose coupling and good for bursts; harder to follow one request end to end.',
            },
          ],
        },
      ],
    },
    {
      id: 'split',
      title: 'Monolith and microservices',
      takeaway: 'The difference is not the size of the code. It is what can be deployed, scaled and broken on its own.',
      blocks: [
        {
          type: 'pattern',
          name: 'split',
          alt: 'Illustration: a monolith with three modules sharing one database, next to three microservices that each have their own database.',
          caption: 'Same three capabilities. On the left they ship together and share a database; on the right each one ships alone and owns its data.',
        },
        {
          type: 'matrix',
          highlight: false,
          caption: 'Neither column is the right one. Each row is a trade.',
          columns: ['Monolith', 'Microservices'],
          rows: [
            { label: 'Deploy', cells: ['Everything at once', 'One service at a time'] },
            { label: 'Scale', cells: ['The whole application', 'Only the part under load'] },
            { label: 'Data', cells: ['One database, simple transactions', 'A database per service, no shared transaction'] },
            { label: 'Failure', cells: ['One bug can take it all down', 'Contained, if calls are protected'] },
            { label: 'To operate', cells: ['One thing to run and watch', 'Many things, plus the network between them'] },
          ],
        },
      ],
    },
    {
      id: 'platform',
      title: 'Docker, Kubernetes and OpenShift',
      takeaway: 'Three layers, three jobs: package the service, run many of them, and give teams a platform around it.',
      blocks: [
        {
          type: 'pattern',
          name: 'platform',
          alt: 'Illustration: containers inside pods, the pods run by Kubernetes, and Kubernetes running inside OpenShift.',
          caption: 'Each layer contains the one before it.',
        },
        {
          type: 'cards',
          items: [
            {
              icon: 'inbox',
              title: 'Docker · the package',
              text: 'A container image holds the service with everything it needs to run. The same image runs on a laptop, in a test environment and in production.',
            },
            {
              icon: 'owner',
              title: 'Kubernetes · the operator',
              text: 'You declare what should be running and Kubernetes keeps it so: it places containers on machines, restarts the ones that fail and scales them up and down.',
            },
            {
              icon: 'audit',
              title: 'OpenShift · the platform',
              text: 'Red Hat’s Kubernetes distribution. It adds what a company needs around the cluster: routes to expose services, image builds, a web console and stricter security defaults.',
            },
            {
              icon: 'deploy',
              title: 'What it changes for a developer',
              text: 'Configuration moves out of the code into the environment, so one image is promoted through every stage. A deployment is a declared state, not a script.',
            },
          ],
        },
      ],
    },
    {
      id: 'talk',
      title: 'How services talk',
      takeaway: 'Ask and wait, or leave a message and move on. Most systems need both.',
      blocks: [
        {
          type: 'flow',
          alt: 'Asynchronous communication in three steps',
          steps: [
            { icon: 'mail', label: 'Service A', sub: 'publishes a message' },
            { icon: 'inbox', label: 'Queue', sub: 'holds it until it is handled', hub: true },
            { icon: 'done', label: 'Service B', sub: 'processes it when it can' },
          ],
        },
        {
          type: 'list',
          items: [
            'Synchronous calls (REST) are simple and give an answer right away, but the caller is only as available as everything it calls.',
            'Asynchronous messages (queues, events) let the caller answer at once and do the slow work in the background. If the receiver is down, the message waits.',
            'The price of asynchronous work is that the result arrives later, so the system has to deal with “not finished yet”.',
          ],
        },
      ],
    },
    {
      id: 'safety',
      title: 'The patterns that keep it working',
      takeaway: 'In a distributed system, something is always failing a little. These four make that survivable.',
      blocks: [
        {
          type: 'cards',
          items: [
            {
              icon: 'done',
              title: 'Idempotency',
              text: 'The same request sent twice has the effect of one. Each request carries an id, and a repeated id is recognised before anything happens.',
            },
            {
              icon: 'owner',
              title: 'Timeouts and retries',
              text: 'Every call has a limit, and a failed call is retried with a growing pause. Without idempotency, a retry is a duplicate.',
            },
            {
              icon: 'flow',
              title: 'Compensation (saga)',
              text: 'There is no single transaction across services. Each step has an undo, and when a later step fails the earlier ones are reversed.',
            },
            {
              icon: 'trace',
              title: 'Observability',
              text: 'One request crosses many services. A shared request id in every log and trace is what makes a failure findable.',
            },
          ],
        },
      ],
    },
    {
      id: 'when',
      title: 'When not to',
      takeaway: 'Microservices solve a problem of teams and releases. They add a problem of networks and data.',
      blocks: [
        {
          type: 'choice',
          columns: [
            {
              title: 'Stay with a monolith when',
              items: [
                'One team works on the whole product',
                'The domain is still changing shape',
                'There is no platform to run many services',
                'Everything is released together anyway',
              ],
            },
            {
              title: 'Split into services when',
              items: [
                'Several teams need to release without waiting for each other',
                'Parts of the system have very different load',
                'The borders between capabilities are stable',
                'There is a platform, pipelines and monitoring in place',
              ],
            },
          ],
        },
        {
          type: 'callout',
          text: 'Start with clear modules. A good modular monolith is the cheapest way to find out where the service borders really are.',
        },
      ],
    },
    {
      id: 'project',
      title: 'On real projects',
      takeaway: 'Every project I have worked on at Chakray follows a microservices architecture.',
      blocks: [
        {
          type: 'p',
          text: 'From the integration of an Odoo ERP with e-commerce platforms and stores to payment APIs for a bank, the shape is the same: small services with one job each, talking through APIs and queues.',
        },
        {
          type: 'p',
          text: 'The bank project shows three of the patterns above. Point-of-sale payments are checked, posted to the core banking system and settled in the background:',
        },
        {
          type: 'list',
          items: [
            'Idempotency: duplicate requests are rejected by request id before any money moves.',
            'Asynchronous work: the caller gets an answer right away; commission transfers run in the background through queues.',
            'Compensation: if a step fails, the earlier transfers are reversed automatically.',
          ],
        },
        { type: 'link', to: '/#projects', text: 'See the projects' },
      ],
    },
  ],
};

export default post;
