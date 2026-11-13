import { NOC_PATH } from '../../caseStudy/caseStudyData';

// "Hallucinations, tracing and evaluation: trusting an AI system in production"
// Block types are rendered by BlogParts.js (see BLOCKS there).
// Replaces a "film review" article the user did not like (2026-11-13). The user asked for
// no analogies on this topic, a mention of Langfuse, and a section on hallucinations.
// Fine-tuning is only mentioned briefly, at the user's request. Diagrams are illustrative. The project section only repeats what the NOC
// case study already states.
const post = {
  sources: [
    { title: 'Reduce hallucinations', publisher: 'Claude documentation', url: 'https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations' },
    { title: 'AI observability and application tracing', publisher: 'Langfuse documentation', url: 'https://langfuse.com/docs/observability/overview' },
    { title: 'Evaluation overview', publisher: 'Langfuse documentation', url: 'https://langfuse.com/docs/evaluation/overview' },
    { title: 'LLM-as-a-Judge', publisher: 'Langfuse documentation', url: 'https://langfuse.com/docs/evaluation/evaluation-methods/llm-as-a-judge' },
    { title: 'Demystifying evals for AI agents', publisher: 'Anthropic', url: 'https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents' },
    { title: 'Your AI Product Needs Evals', publisher: 'Hamel Husain', url: 'https://hamel.dev/blog/posts/evals/' },
    { title: 'NOC automation with n8n and AI agents (case study)', publisher: 'this site', to: NOC_PATH },
  ],
  sections: [
    {
      id: 'why',
      title: 'Why AI systems get things wrong',
      takeaway: 'A language model produces the most plausible answer, not the verified one. Sometimes those differ.',
      center: true,
      blocks: [
        {
          type: 'p',
          text: 'A hallucination is an answer that sounds right and is not: a fact that does not exist, a source that says something else, a step the system claims to have done. The model is not lying. It generates likely text, and it has no built-in sense of what it does not know.',
        },
        {
          type: 'flow',
          alt: 'How a hallucination happens, in three steps',
          steps: [
            { icon: 'search', label: 'A question', sub: 'outside what the model can check' },
            { icon: 'code', label: 'Plausible text', sub: 'the most likely answer, not a verified one', hub: true },
            { icon: 'audit', label: 'Confident and wrong', sub: 'with nothing to show it' },
          ],
        },
        {
          type: 'p',
          text: 'Hallucinations can be reduced a great deal, but not removed. So a system you can trust needs three things: a design that makes them rare, a way to see them when they happen, and a way to measure whether a change made things better.',
        },
      ],
    },
    {
      id: 'kinds',
      title: 'What hallucinations look like in a real system',
      takeaway: 'In production they are rarely invented trivia. They hide in the steps.',
      blocks: [
        {
          type: 'cards',
          items: [
            { icon: 'doc', title: 'Unsupported answers', text: 'The answer states something that is not in the documents the system retrieved.' },
            { icon: 'search', title: 'Wrong attribution', text: 'A citation that exists, pointing to a source that does not say that.' },
            { icon: 'tool', title: 'Invented arguments', text: 'A tool called with an identifier or value the model made up instead of looking it up.' },
            { icon: 'done', title: 'False completion', text: 'The agent reports a task as done when a step failed or never ran.' },
          ],
        },
      ],
    },
    {
      id: 'design',
      title: 'Reducing them by design',
      takeaway: 'Most of the work happens before the model writes a word.',
      blocks: [
        {
          type: 'compare',
          labels: ['Invites hallucinations', 'Reduces them'],
          before: [
            'The model answers from memory',
            '“Always give an answer”',
            'Free text that nothing checks',
            'Facts recalled instead of looked up',
            'Every output acted on automatically',
          ],
          after: [
            'Answers grounded in retrieved sources, with citations',
            'Permission to say “I don’t know”',
            'Structured output, validated before use',
            'Tools that fetch the real value',
            'A person reviews what is uncertain or high-risk',
          ],
        },
        {
          type: 'callout',
          text: 'Allowing the model to say “I don’t know” is one of the simplest and most effective changes there is.',
        },
        {
          type: 'p',
          text: 'What about fine-tuning? Training a model further on your own examples can make it more consistent at a narrow task, in format, tone or classification. It is not a reliable way to teach it facts, and it is slower and costlier to change. For knowledge, grounding the answer in retrieved sources comes first.',
        },
      ],
    },
    {
      id: 'tracing',
      title: 'Tracing: seeing every step',
      takeaway: 'When an answer is wrong, the trace shows which step made it wrong.',
      blocks: [
        {
          type: 'pattern',
          name: 'trace',
          alt: 'Illustration of a trace: one request broken into nested steps, an agent, a search, the retrieved chunks, a tool call and the answer. The answer step is flagged as not supported by the retrieved chunks.',
          caption: 'One request as a tree of steps. Here the search worked, but the answer says something the retrieved chunks do not.',
        },
        {
          type: 'p',
          text: 'Logs and metrics tell you that something went wrong: an error rate, a cost, a complaint. A trace records one request step by step: each model call with its prompt and output, each tool call with its arguments, each retrieved chunk, with timing and cost. That is where a hallucination becomes visible and fixable.',
        },
        {
          type: 'p',
          text: 'Langfuse is an open-source platform for this. It records traces from the application, links them to the prompt version that produced them, and can run on your own infrastructure when the data cannot leave.',
        },
      ],
    },
    {
      id: 'evaluation',
      title: 'Evaluation: measuring before you ship',
      takeaway: 'A set of real cases, run on every change, is the most valuable thing an AI team owns.',
      blocks: [
        {
          type: 'timeline',
          steps: [
            { step: 'Collect', text: 'Real cases, including the hard and unusual ones.' },
            { step: 'Expect', text: 'What a good result looks like for each.' },
            { step: 'Run', text: 'Every case through the system, with traces recorded.' },
            { step: 'Score', text: 'Each result graded with the cheapest check that works.' },
            { step: 'Review', text: 'Failures read one by one; new cases added as they appear.' },
          ],
        },
        {
          type: 'cards',
          items: [
            { icon: 'code', title: 'Checks in code', text: 'The output parses, the category is valid, every citation points to a retrieved chunk. Fast, cheap and exact.' },
            { icon: 'client', title: 'A model as judge', text: 'Another model scores what code cannot, such as whether the answer is supported by its sources. Calibrate it against human grades first.' },
            { icon: 'users', title: 'Human review', text: 'The final word on quality, and the best source of new test cases. Keep it for what matters most.' },
            { icon: 'trace', title: 'Scores on traces', text: 'Attach every score to its trace, so a low score leads straight to the step that caused it.' },
          ],
        },
      ],
    },
    {
      id: 'loop',
      title: 'The loop in production',
      takeaway: 'Trust is not a launch milestone. It is a loop that keeps running.',
      blocks: [
        {
          type: 'cycle',
          alt: 'The production loop: trace, score, review, improve, in a circle',
          center: ['real', 'traffic'],
          steps: [
            { label: 'Trace', text: 'Record every request in production, step by step.' },
            { label: 'Score', text: 'Grade a sample automatically, and flag low scores.' },
            { label: 'Review', text: 'Read the flagged traces and find the step that failed.' },
            { label: 'Improve', text: 'Change the prompt, retrieval or tools, and re-run the test set before shipping.' },
          ],
        },
      ],
    },
    {
      id: 'project',
      title: 'On a real project',
      takeaway: 'The NOC automation I delivered at Chakray was built to be audited; tracing is the next step.',
      blocks: [
        {
          type: 'p',
          text: 'Every email is stored with its classification, its source, its state and its real token usage. When the classification fails, the email goes to a review folder instead of being acted on.',
        },
        {
          type: 'p',
          text: 'The next phase I proposed adds tracing and evaluation with Langfuse, so each agent step, tool call and retrieved chunk can be seen, and a prompt change can be evaluated before it reaches production.',
        },
        { type: 'link', to: NOC_PATH, text: 'Read the full case study' },
      ],
    },
  ],
};

export default post;
