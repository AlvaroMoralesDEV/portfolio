import React, { useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { BlogGrid } from '../components/js/blog/BlogParts';
import { allTags, blogMeta, filterTags, posts } from '../components/js/blog/blogData';
import { usePageMeta } from '../components/js/hooks';
import '../components/css/CaseStudy.css';
import '../components/css/Blog.css';

function BlogPage() {
  usePageMeta(blogMeta);
  const [params, setParams] = useSearchParams();
  // ?tag=... filters the list; an unknown tag shows everything.
  const tag = allTags.includes(params.get('tag')) ? params.get('tag') : null;
  const shown = tag ? posts.filter((p) => p.tags.includes(tag)) : posts;
  // A tag reached from an article may have a single article: show its button only while active.
  const buttons = tag && !filterTags.includes(tag) ? [...filterTags, tag] : filterTags;

  // Open at the top and hand keyboard / screen-reader focus to the page title.
  useEffect(() => {
    window.scrollTo(0, 0);
    document.getElementById('blog-title')?.focus({ preventScroll: true });
  }, []);

  const pick = (next) => setParams(next ? { tag: next } : {}, { replace: true });

  return (
    <main className="app-main cs-page blog-page">
      <nav className="cs-page-nav" aria-label="Breadcrumb">
        <Link to="/#blog" className="cs-back">
          <span aria-hidden="true">←</span> Back to portfolio
        </Link>
      </nav>

      <section className="cs-section" aria-labelledby="blog-title">
        <header className="cs-header blog-header">
          <p className="cs-eyebrow">Blog</p>
          <h1 id="blog-title" tabIndex={-1}>
            Notes on <span>applied AI</span> and automation
          </h1>
          <p className="cs-sub">{blogMeta.description}</p>
        </header>

        <div className="blog-filter" role="group" aria-label="Filter articles by topic">
          <button type="button" className="blog-filter-btn" aria-pressed={!tag} onClick={() => pick(null)}>
            All
          </button>
          {buttons.map((t) => (
            <button key={t} type="button" className="blog-filter-btn" aria-pressed={tag === t} onClick={() => pick(t)}>
              {t}
            </button>
          ))}
        </div>
        <p className="cs-sr-only" role="status">
          {shown.length} {shown.length === 1 ? 'article' : 'articles'} {tag ? `about ${tag}` : 'in total'}
        </p>

        <BlogGrid key={tag || 'all'} items={shown} />
      </section>
    </main>
  );
}

export default BlogPage;
