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
