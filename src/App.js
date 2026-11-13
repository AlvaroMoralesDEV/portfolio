import React from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/js/Navbar';
import CanvasBackground from './components/js/CanvasBackground';
import HomePage from './pages/HomePage';
import NocProjectPage, { NOC_PATH } from './pages/NocProjectPage';
import BlogPage from './pages/BlogPage';
import BlogPostPage from './pages/BlogPostPage';
import { BLOG_PATH } from './components/js/blog/blogData';
import './App.css';
import './components/css/Sections.css';

function App() {
  const { pathname } = useLocation();
  const onProjectPage = pathname !== '/';

  return (
    <div className="app-container">
      {/* One canvas for every route; it only gets calmer away from the home page. */}
      <CanvasBackground calm={onProjectPage} />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path={NOC_PATH} element={<NocProjectPage />} />
        <Route path={BLOG_PATH} element={<BlogPage />} />
        <Route path={`${BLOG_PATH}/:slug`} element={<BlogPostPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <footer className="pf-footer">
        <p>© {new Date().getFullYear()} Alvaro Morales · Built with React</p>
      </footer>
    </div>
  );
}

export default App;
