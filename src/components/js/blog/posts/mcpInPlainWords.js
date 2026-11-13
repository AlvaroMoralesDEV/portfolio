import { NOC_PATH } from '../../caseStudy/caseStudyData';

// "MCP in plain words: how AI agents reach your systems"
// Block types are rendered by BlogParts.js (see BLOCKS there).
// The diagrams and the code are illustrative (a made-up catalogue, not a client system).
// The project section only repeats what the NOC case study already states.
const SERVER_CODE = `from mcp.server.fastmcp import FastMCP

mcp = FastMCP("catalogue")

@mcp.tool()
def find_product(name: str) -> dict:
    """Look up a product by name. Returns its id, price and stock."""
    return catalogue.search(name)

if __name__ == "__main__":
    mcp.run()`;

const post = {
  // Shown at the end of the article. External links were checked when added.
  sources: [
    { title: "Introducing the Model Context Protocol", publisher: "Anthropic", url: 'https://www.anthropic.com/news/model-context-protocol' },
    { title: "What is the Model Context Protocol (MCP)?", publisher: "modelcontextprotocol.io", url: 'https://modelcontextprotocol.io/' },
    { title: "MCP Python SDK", publisher: "GitHub", url: 'https://github.com/modelcontextprotocol/python-sdk' },
    { title: "Writing effective tools for agents", publisher: "Anthropic", url: 'https://www.anthropic.com/engineering/writing-tools-for-agents' },
    { title: "NOC automation with n8n and AI agents (case study)", publisher: "this site", to: NOC_PATH },
  ],
  sections: [
    {
      id: 'problem',
      title: 'The problem it removes',
      takeaway: 'Every agent needed its own connector to every system. With MCP, each system is connected once.',
      blocks: [
        {
          type: 'p',
          text: 'An agent is only useful if it can reach real systems: a database, a ticketing tool, an inventory. Until recently each of those connections was custom code, written again for every application and every model.',
        },
        {
          type: 'pattern',
          name: 'connectors',
          alt: 'Illustration: on the left, three agents each wired to three systems with nine connections. On the right, the same agents and systems connected through MCP in the middle.',
          caption: 'Without a standard, connections multiply. With one, each side is built once.',
        },
        {
          type: 'p',
          text: 'The Model Context Protocol (MCP) is an open standard, introduced by Anthropic, for that connection. A system is wrapped once in an MCP server, and any application that speaks MCP can use it.',
        },
      ],
    },
    {
      id: 'parts',
      title: 'The three parts',
      takeaway: 'A host that runs the model, a server that wraps a system, and a protocol between them.',
      center: true,
      blocks: [
        {
          type: 'flow',
          alt: 'The three parts of MCP',
          steps: [
            { icon: 'client', label: 'Host', sub: 'the application with the model' },
            { icon: 'flow', label: 'MCP', sub: 'lists tools · carries calls', hub: true },
            { icon: 'db', label: 'Server', sub: 'wraps one system' },
          ],
        },
        {
          type: 'cards',
          items: [
            {
              icon: 'tool',
              title: 'Tools',
              text: 'Actions the model can ask for: search, create, update. Each has a name, a description and typed arguments.',
            },
            {
              icon: 'doc',
              title: 'Resources',
              text: 'Data the application can read and put in front of the model: a file, a record, a page.',
            },
            {
              icon: 'client',
              title: 'Prompts',
              text: 'Ready-made instructions the server offers, so common tasks start the same way every time.',
            },
            {
              icon: 'audit',
              title: 'The application stays in charge',
              text: 'The model only asks. The host decides whether a call runs, and the server decides what it is allowed to do.',
            },
          ],
        },
      ],
    },
    {
      id: 'code',
      title: 'What a server looks like',
      takeaway: 'A function, its types and one sentence. That sentence is the interface.',
      blocks: [
        {
          type: 'code',
          lang: 'Python',
          code: SERVER_CODE,
          caption: 'A complete server with one tool, using the official Python SDK. The catalogue is an example.',
        },
        {
          type: 'p',
          text: 'The model never sees the body of the function. It sees the name, the argument types and the docstring, and from those it decides when to call the tool and with what. Writing that description is writing a prompt.',
        },
      ],
    },
    {
      id: 'design',
      title: 'Designing tools a model can use',
      takeaway: 'A tool is an interface for a reader that takes every word literally.',
      blocks: [
        {
          type: 'cards',
          items: [
            {
              icon: 'target',
              title: 'Few and specific',
              text: 'One tool per question the agent really has. A long list of similar tools is where wrong calls come from.',
            },
            {
              icon: 'doc',
              title: 'Describe it for the model',
              text: 'Say what the tool is for, when to use it and what it returns. Names that make sense to your team may mean nothing to a model.',
            },
            {
              icon: 'sort',
              title: 'Small, structured results',
              text: 'Return the fields the agent needs, not the whole record. Everything returned takes space in the context.',
            },
            {
              icon: 'client',
              title: 'Errors that say what to do',
              text: '“No product with that name; try a shorter search” lets the agent recover. A stack trace does not.',
            },
          ],
        },
      ],
    },
    {
      id: 'safety',
      title: 'Keeping it safe',
      takeaway: 'Treat what the model sends like any other input from outside: check it.',
      blocks: [
        {
          type: 'compare',
          labels: ['Risky', 'Safer'],
          before: [
            'One tool that runs any query',
            'The server uses an admin account',
            'Reading and writing in the same tool',
            'Arguments passed straight to the system',
            'No record of what was called',
          ],
          after: [
            'Tools that each do one named thing',
            'An account with only the access the tools need',
            'Writes in separate tools, with confirmation',
            'Arguments validated by the server',
            'Every call logged with its arguments and result',
          ],
        },
        {
          type: 'callout',
          text: 'The server is the security boundary. The prompt is not.',
        },
      ],
    },
    {
      id: 'project',
      title: 'On a real project',
      takeaway: 'In the NOC automation I delivered at Chakray, an agent reaches the CMDB through MCP.',
      blocks: [
        {
          type: 'p',
          text: 'One of the agents there can use tools. Through an MCP server written in Python, it queries the CMDB to find the exact circuit an email is about, instead of guessing from the text.',
        },
        { type: 'link', to: NOC_PATH, text: 'Read the full case study' },
      ],
    },
  ],
};

export default post;
