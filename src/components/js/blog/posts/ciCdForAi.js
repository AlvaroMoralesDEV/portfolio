// "CI/CD, and what changes when the system uses AI"
// Block types are rendered by BlogParts.js (see BLOCKS there).
// Asked for by the user (2026-11-13): CI/CD related to AI. The user uses Jenkins and allowed
// other tools to be mentioned. The "In my work" section only repeats facts already on the site
// (the "Internal engineering tooling" card and the Jenkins tag on the Odoo project).
// The Jenkinsfile is illustrative: no real job, script or threshold.
// Article files must not import blogData.js: write blog paths as strings.
const JENKINSFILE = `pipeline {
  agent any
  stages {
    stage('Build') {
      steps { sh 'docker build -t my-service:$GIT_COMMIT .' }
    }
    stage('Test') {
      steps { sh 'pytest tests/' }
    }
    stage('Deploy to pre-production') {
      steps { sh './deploy.sh pre-production' }
    }
    stage('Deploy to production') {
      input { message 'Deploy this version to production?' }
      steps { sh './deploy.sh production' }
    }
  }
}`;

const EVAL_STAGE = `stage('Evaluate') {
  steps {
    // Run the saved cases through the system and score the answers.
    // The script exits with an error if the score is under the threshold,
    // and that stops the pipeline like any failed test.
    sh 'python eval/run.py --cases eval/cases.jsonl --min-score 0.9'
  }
}`;

const post = {
  // External links were fetched and loaded when added.
  sources: [
    { title: 'Continuous Integration', publisher: 'Martin Fowler', url: 'https://martinfowler.com/articles/continuousIntegration.html' },
    { title: 'Continuous Delivery', publisher: 'Jez Humble', url: 'https://continuousdelivery.com/' },
    { title: 'Pipeline', publisher: 'Jenkins documentation', url: 'https://www.jenkins.io/doc/book/pipeline/' },
    { title: 'GitHub Actions documentation', publisher: 'GitHub', url: 'https://docs.github.com/en/actions' },
    { title: 'Get started with GitLab CI/CD', publisher: 'GitLab', url: 'https://docs.gitlab.com/ci/' },
    {
      title: 'MLOps: Continuous delivery and automation pipelines in machine learning',
      publisher: 'Google Cloud',
      url: 'https://docs.cloud.google.com/architecture/mlops-continuous-delivery-and-automation-pipelines-in-machine-learning',
    },
    { title: 'Evaluation overview', publisher: 'Langfuse', url: 'https://langfuse.com/docs/evaluation/overview' },
    { title: 'CI/CD integration for LLM evaluation', publisher: 'Promptfoo', url: 'https://www.promptfoo.dev/docs/integrations/ci-cd/' },
  ],
  sections: [
    {
      id: 'idea',
      title: 'Small changes, checked every time',
      takeaway: 'CI/CD replaces a risky release day with many small changes, each one checked by a machine before it moves on.',
      center: true,
      blocks: [
        {
          type: 'flow',
          alt: 'The idea in three steps',
          steps: [
            { icon: 'code', label: 'A small change', sub: 'one commit' },
            { icon: 'flow', label: 'The pipeline', sub: 'build · test · deploy', hub: true },
            { icon: 'done', label: 'A running system', sub: 'the same way every time' },
          ],
        },
        {
          type: 'p',
          text: 'Without it, changes pile up for weeks and go out together. When something breaks, nobody knows which change did it. With CI/CD, every change goes through the same automatic steps on its own, so a problem shows up minutes after the commit that caused it.',
        },
        {
          type: 'p',
          text: 'This article explains the two halves, the stages of a pipeline, and what has to be added when the system contains a language model.',
        },
      ],
    },
    {
      id: 'terms',
      title: 'What CI and CD each mean',
      takeaway: 'CI checks every change as it is merged. CD keeps the result ready to release, or releases it.',
      blocks: [
        {
          type: 'cards',
          items: [
            {
              icon: 'sort',
              title: 'Continuous integration',
              text: 'Everyone merges their work into the main branch often, at least daily. Each merge triggers an automatic build and the tests, so a broken change is caught while it is still small.',
            },
            {
              icon: 'deploy',
              title: 'Continuous delivery',
              text: 'Every change that passes is packaged and deployed to a test environment, so the software is always ready to release. Going to production is a decision a person takes, with one click.',
            },
            {
              icon: 'owner',
              title: 'Continuous deployment',
              text: 'The same, with no click: every change that passes all the checks goes to production on its own. It needs tests and monitoring the team fully trusts.',
            },
            {
              icon: 'doc',
              title: 'The pipeline',
              text: 'The list of steps that does all of this, written in a file that lives in the repository next to the code. It is reviewed and versioned like any other change.',
            },
          ],
        },
        {
          type: 'p',
          text: 'The “CD” in CI/CD is used for both delivery and deployment. Many teams stop at delivery: the pipeline does everything, and a person approves the last step.',
        },
      ],
    },
    {
      id: 'stages',
      title: 'The pipeline, stage by stage',
      takeaway: 'Each stage answers one question, and a “no” stops everything after it.',
      blocks: [
        {
          type: 'pattern',
          name: 'pipeline',
          alt: 'Illustration of a pipeline as connected nodes. Top row, continuous integration: commit, build, test, package. Bottom row, continuous delivery: pre-production, an approval step, production.',
          caption: 'The top row runs on every commit. The bottom row moves the same package from one environment to the next.',
        },
        {
          type: 'timeline',
          steps: [
            { step: 'Commit', text: 'A change is pushed. This starts the pipeline, with no one pressing a button.' },
            { step: 'Build', text: 'Does it compile and assemble? The code and its dependencies become something that can run.' },
            { step: 'Test', text: 'Does it still do what it should? Unit tests first, because they are fast. Slower tests after.' },
            { step: 'Package', text: 'One versioned artefact, often a container image. The same one goes to every environment.' },
            { step: 'Deploy', text: 'To pre-production first. To production once the checks there pass and someone approves.' },
          ],
        },
        {
          type: 'callout',
          text: 'Build once, deploy the same package everywhere. If production runs something that was never tested, the tests proved nothing.',
        },
      ],
    },
    {
      id: 'tools',
      title: 'The pipeline is code',
      takeaway: 'The tool matters less than the habit: the steps live in the repository, not in someone’s head.',
      blocks: [
        {
          type: 'p',
          text: 'I use Jenkins. A Jenkins pipeline is described in a file called Jenkinsfile, kept in the repository. This short example builds a container image, runs the tests, deploys to pre-production and waits for a person before production.',
        },
        {
          type: 'code',
          lang: 'Jenkinsfile',
          code: JENKINSFILE,
          caption: 'An illustrative pipeline. The names and scripts are examples.',
        },
        {
          type: 'matrix',
          highlight: false,
          columns: ['Jenkins', 'GitHub Actions', 'GitLab CI/CD'],
          rows: [
            { label: 'The pipeline file', cells: ['Jenkinsfile', 'YAML files in .github/workflows', '.gitlab-ci.yml'] },
            { label: 'Where it runs', cells: ['Servers you run yourself', 'GitHub’s runners, or your own', 'GitLab’s runners, or your own'] },
            { label: 'A good fit when', cells: ['You need full control, or everything stays in your own network', 'The code is already on GitHub', 'The code is already on GitLab'] },
          ],
          caption: 'Three common tools. The ideas in this article are the same in all of them.',
        },
      ],
    },
    {
      id: 'ai',
      title: 'What changes when the system uses AI',
      takeaway: 'More things can change the behaviour, and a test can no longer expect one exact answer.',
      blocks: [
        {
          type: 'p',
          text: 'In classic software, behaviour changes when the code changes. In an AI system it also changes when a prompt is edited, when the model is replaced by a newer version, or when the documents it searches are updated. A pipeline that only watches the code misses most of that.',
        },
        {
          type: 'matrix',
          columns: ['Classic software', 'A system with AI'],
          rows: [
            { label: 'What changes behaviour', cells: ['Code and configuration', 'Code, prompts, the model version and the knowledge it retrieves'] },
            { label: 'The same input gives', cells: ['The same output', 'An answer that can vary from run to run'] },
            { label: 'How a change is checked', cells: ['Tests that pass or fail', 'A set of saved cases, scored against a threshold'] },
            { label: 'What can break with no commit', cells: ['Very little', 'A provider updates the model, or the documents change'] },
          ],
        },
        {
          type: 'p',
          text: 'The answer is not a different discipline. It is the same pipeline with two additions: everything that changes behaviour is versioned, and an evaluation stage sits next to the tests.',
        },
      ],
    },
    {
      id: 'eval',
      title: 'An evaluation stage in the pipeline',
      takeaway: 'A prompt change goes through the same gate as a code change: it is scored on saved cases before it can be deployed.',
      blocks: [
        {
          type: 'pattern',
          name: 'evalgate',
          alt: 'Illustration: code, prompts and the evaluation set all come from the repository and feed an evaluation step. If the score holds, the change is deployed. If the score drops, the pipeline stops.',
          caption: 'The prompt and the evaluation cases are files in the repository. A change to either one starts the pipeline.',
        },
        {
          type: 'list',
          items: [
            'Prompts are files in the repository, not text pasted into a console. A prompt change gets a commit, a review and a way back.',
            'The evaluation set is a list of real questions with the answers you expect, built up from cases the system got wrong.',
            'The model version is pinned in configuration, so an upgrade is a change you make, test and can undo.',
            'The score has a threshold. Under it, the pipeline stops, just as it does for a failing test.',
          ],
        },
        {
          type: 'code',
          lang: 'Jenkinsfile',
          code: EVAL_STAGE,
          caption: 'An illustrative stage, placed after the tests. The script and the threshold are examples.',
        },
        {
          type: 'p',
          text: 'Evaluation runs cost time and model calls, so they do not all need to run on every commit. A small set of cases on each change and the full set before a release is a common split. How to build the evaluation set, and how tracing feeds it, is covered in a separate article.',
        },
        { type: 'link', to: '/blog/trusting-ai-in-production', text: 'Read: hallucinations, tracing and evaluation' },
      ],
    },
    {
      id: 'project',
      title: 'In my work',
      takeaway: 'Jenkins is the tool I use, and pipelines are part of the shared tooling I worked on.',
      blocks: [
        {
          type: 'p',
          text: 'At Chakray I worked on shared building blocks for the integration team, including deployment plugins and Jenkins pipelines, so services are started, tested and shipped the same way. Jenkins was also part of the Odoo ERP integration project.',
        },
        {
          type: 'p',
          text: 'The habit carries over to AI work without changes: nothing reaches production by hand, and everything that can change the behaviour of the system is in the repository.',
        },
        { type: 'link', to: '/#projects', text: 'See the projects' },
      ],
    },
  ],
};

export default post;
