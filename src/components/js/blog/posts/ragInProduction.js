import { NOC_PATH } from '../../caseStudy/caseStudyData';

// "How to build a RAG system that survives production"
// Block types are rendered by BlogParts.js (see BLOCKS there).
// The diagrams are illustrative. The project section only repeats what the NOC case study
// already states: no volumes, models or results.
const CHUNK_CODE = `def chunk(text, size=800, overlap=120):
    """Split text into pieces of \`size\` characters that share \`overlap\`."""
    chunks, start = [], 0
    while start < len(text):
        chunks.append(text[start:start + size])
        start += size - overlap
    return chunks`;

const post = {
  // Shown at the end of the article. External links were checked when added.
  sources: [
    { title: "Retrieval-Augmented Generation for Knowledge-Intensive NLP Tasks", publisher: "Lewis et al., arXiv, 2020", url: 'https://arxiv.org/abs/2005.11401' },
    { title: "Introducing Contextual Retrieval", publisher: "Anthropic", url: 'https://www.anthropic.com/news/contextual-retrieval' },
    { title: "Qdrant documentation", publisher: "Qdrant", url: 'https://qdrant.tech/documentation/' },
    { title: "NOC automation with n8n and AI agents (case study)", publisher: "this site", to: NOC_PATH },
  ],
  sections: [
    {
      id: 'what',
      title: 'What RAG is',
      takeaway: 'The model does not know your company. RAG hands it the right pages before it answers.',
      center: true,
      blocks: [
        {
          type: 'p',
          text: 'A language model answers from what it learned in training. It has never seen your runbooks, your contracts or last week’s incidents. Retrieval-augmented generation (RAG) fixes that without retraining anything: before the model answers, the system searches your documents and puts the most relevant pieces in the prompt.',
        },
        {
          type: 'flow',
          alt: 'RAG in three steps',
          steps: [
            { icon: 'search', label: 'Question', sub: 'from a person or an agent' },
            { icon: 'db', label: 'Retrieve', sub: 'find the relevant pieces', hub: true },
            { icon: 'done', label: 'Grounded answer', sub: 'written from those pieces' },
          ],
        },
        {
          type: 'p',
          text: 'It is usually the most practical first step to bring AI into a company: the knowledge stays in your own store, it can be updated at any time, and every answer can point to its source.',
        },
      ],
    },
    {
      id: 'pipelines',
      title: 'Two pipelines, not one',
      takeaway: 'Indexing gets knowledge in. Retrieval gets it out. They run at different times and fail in different ways.',
      blocks: [
        {
          type: 'rag',
          caption:
            'The second row is the one people see. Many quality problems start in the first: a document that was never indexed, or was split in the wrong place.',
          groups: [
            {
              title: 'Indexing · runs when documents change',
              steps: [
                { label: 'Documents', sub: 'wikis, PDFs, tickets' },
                { label: 'Split into chunks', sub: 'small pieces of text' },
                { label: 'Embeddings', sub: 'text → vector' },
                { label: 'Vector store', sub: 'vectors + metadata', highlight: true },
              ],
            },
            {
              title: 'Retrieval · runs on every question',
              steps: [
                { label: 'Question', sub: 'from a person or an agent' },
                { label: 'Vector search', sub: 'closest chunks by meaning', highlight: true },
                { label: 'Build the prompt', sub: 'question + chunks' },
                { label: 'Answer', sub: 'with its sources' },
              ],
            },
          ],
        },
      ],
    },
    {
      id: 'chunking',
      title: 'Chunking decides what can be found',
      takeaway: 'A chunk is the unit of retrieval. If the answer is split across two chunks, neither may be found.',
      blocks: [
        {
          type: 'chunks',
          alt: 'Illustration: one document split into three chunks. Each chunk repeats the end of the one before it.',
          caption: 'Each chunk repeats the end of the previous one, so a sentence cut at the border still appears whole somewhere.',
        },
        {
          type: 'list',
          items: [
            'Too large, and each chunk mixes several topics. The match gets vague and the prompt fills with noise.',
            'Too small, and a chunk loses the context that gave it meaning.',
            'Split on the document’s own structure first (headings, sections, rows) and by length only inside it.',
          ],
        },
        {
          type: 'code',
          lang: 'Python',
          code: CHUNK_CODE,
          caption: 'The simplest version. The numbers are starting points to tune against real questions, not recommendations.',
        },
      ],
    },
    {
      id: 'search',
      title: 'Search by meaning',
      takeaway: 'An embedding turns text into a point in space. Similar meaning, nearby points.',
      blocks: [
        {
          type: 'vectors',
          alt: 'Illustration: chunks as points grouped by topic. The question lands next to one group and its three closest chunks are selected.',
          caption: 'Chunks about the same topic sit together. The question is placed in the same space and its nearest neighbours are returned.',
        },
        {
          type: 'p',
          text: 'An embedding model turns each chunk into a list of numbers, a vector. Texts about the same thing end up close together, even when they share no words. The question is embedded the same way, and the vector store returns the chunks nearest to it.',
        },
        {
          type: 'p',
          text: 'Store metadata next to each vector: source, date, owner, document type. Filtering on it is often what makes a result right: the newest version of a policy, or only the documents this user may see.',
        },
        {
          type: 'callout',
          text: 'Retrieval quality is the ceiling. The model cannot answer from a chunk it was never given.',
        },
      ],
    },
    {
      id: 'production',
      title: 'Demo versus production',
      takeaway: 'A demo answers the questions you rehearsed. Production gets the ones you did not.',
      blocks: [
        {
          type: 'compare',
          labels: ['Demo', 'Production'],
          before: [
            'A folder of files, indexed once',
            'Questions the builder already knows work',
            'Answers with no source',
            'Nobody knows what it costs',
            'Every user sees everything',
          ],
          after: [
            'Re-indexed when documents change',
            'A test set of real questions, run on every change',
            'Every answer cites the chunks it used',
            'Token usage tracked per request',
            'Permissions applied at retrieval time',
            'It can say “I don’t know”',
          ],
        },
      ],
    },
    {
      id: 'start',
      title: 'Where to start',
      takeaway: 'Five steps, in this order.',
      blocks: [
        {
          type: 'timeline',
          steps: [
            { step: 'One question', text: 'Pick one question people already ask every week.' },
            { step: 'Find the source', text: 'Locate where the answer lives today and who keeps it up to date.' },
            { step: 'Test set', text: 'Write down real questions with their correct answers before building.' },
            { step: 'Thin slice', text: 'Index only those documents and put it in front of real users.' },
            { step: 'Measure, then tune', text: 'Change chunking, retrieval or prompt one at a time, against the test set.' },
          ],
        },
      ],
    },
    {
      id: 'project',
      title: 'How I used it on a real project',
      takeaway: 'In the NOC automation, the knowledge base is a tool the agent decides to call.',
      blocks: [
        {
          type: 'p',
          text: 'In the NOC automation I delivered at Chakray, a Python script splits the documents into chunks, turns them into embeddings and stores them in Qdrant. The AI agent has the vector store as a tool: it retrieves the most relevant chunks and answers with them as context.',
        },
        {
          type: 'p',
          text: 'The improvements I would make next are the ones this article points to: tracing with Langfuse to see what the agents retrieve, and hybrid retrieval that combines Qdrant with a knowledge graph.',
        },
        { type: 'link', to: NOC_PATH, text: 'Read the full case study' },
      ],
    },
  ],
};

export default post;
