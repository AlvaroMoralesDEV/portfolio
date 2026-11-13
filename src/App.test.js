import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// jsdom has no canvas 2D context and no matchMedia.
jest.mock('./components/js/CanvasBackground', () => () => null);

beforeAll(() => {
  window.matchMedia = () => ({ matches: false, addEventListener() {}, removeEventListener() {} });
  window.scrollTo = () => {};
  Element.prototype.scrollIntoView = () => {};
});

const renderAt = (url) =>
  render(
    <MemoryRouter initialEntries={[url]}>
      <App />
    </MemoryRouter>
  );

test('home page shows the project card, not the full case study', () => {
  renderAt('/');
  expect(screen.getByRole('link', { name: /view case study/i })).toHaveAttribute('href', '/projects/noc');
  expect(screen.queryByRole('heading', { name: /key workflows/i })).toBeNull();
});

test('/projects/noc renders the case study with a way back', () => {
  renderAt('/projects/noc');
  expect(screen.getByRole('heading', { level: 1, name: /noc automation/i })).toBeInTheDocument();
  expect(screen.getAllByRole('link', { name: /back to portfolio/i })[0]).toHaveAttribute('href', '/#projects');
  expect(document.title).toMatch(/NOC Automation/);
});

test('the old /#noc-case-study link redirects to the project page', () => {
  renderAt('/#noc-case-study');
  expect(screen.getByRole('heading', { level: 1, name: /noc automation/i })).toBeInTheDocument();
});

test('unknown paths fall back to the home page', () => {
  renderAt('/nope');
  expect(screen.getByRole('link', { name: /view case study/i })).toBeInTheDocument();
});

test('home page shows the latest articles and a link to all of them', () => {
  renderAt('/');
  expect(screen.getByRole('link', { name: /ci\/cd/i })).toHaveAttribute('href', '/blog/ci-cd-for-ai-systems');
  // the article published on the Chakray blog is pinned to the home page
  expect(screen.getByRole('link', { name: /n8n automation/i })).toHaveAttribute('target', '_blank');
  expect(screen.getByRole('link', { name: /all articles/i })).toHaveAttribute('href', '/blog');
  expect(screen.getByRole('link', { name: /read the blog/i })).toHaveAttribute('href', '/blog');
});

const cards = () => screen.getAllByRole('listitem').filter((li) => li.className.includes('blog-card'));

test('/blog lists every article, with the external one opening in a new tab', () => {
  renderAt('/blog');
  expect(screen.getByRole('heading', { level: 1, name: /applied ai/i })).toBeInTheDocument();
  expect(cards()).toHaveLength(14);
  const external = screen.getByRole('link', { name: /n8n automation/i });
  expect(external).toHaveAttribute('href', expect.stringMatching(/^https:\/\/chakray\.com\//));
  expect(external).toHaveAttribute('target', '_blank');
  expect(document.title).toMatch(/^Blog/);
});

test('/blog?tag= filters the list by topic', () => {
  renderAt('/blog?tag=AI%20agents');
  expect(cards()).toHaveLength(10);
  expect(screen.getByRole('button', { name: 'AI agents' })).toHaveAttribute('aria-pressed', 'true');
});

test('an article is one panel, with related articles and a way back', () => {
  renderAt('/blog/rag-in-production');
  expect(screen.getByRole('heading', { level: 1, name: /rag system/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { level: 2, name: /two pipelines/i })).toBeInTheDocument();
  expect(document.querySelectorAll('article.cs-section')).toHaveLength(1);
  expect(screen.getByRole('heading', { level: 2, name: /related articles/i })).toBeInTheDocument();
  expect(screen.getByRole('link', { name: /retrieval-augmented generation for knowledge-intensive/i })).toHaveAttribute(
    'href',
    'https://arxiv.org/abs/2005.11401'
  );
  expect(screen.getByRole('link', { name: /mcp in plain words/i })).toHaveAttribute('href', '/blog/mcp-in-plain-words');
  expect(screen.getAllByRole('link', { name: /all articles/i })[0]).toHaveAttribute('href', '/blog');
  expect(document.title).toMatch(/RAG system/);
});

test('an unknown article falls back to the blog list', () => {
  renderAt('/blog/nope');
  expect(screen.getByRole('heading', { level: 1, name: /applied ai/i })).toBeInTheDocument();
});
