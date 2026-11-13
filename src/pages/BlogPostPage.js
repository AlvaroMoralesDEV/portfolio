import React, { useEffect } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { BlogCover, PostMeta, PostSection, PostSources, RelatedPosts, TagLinks } from '../components/js/blog/BlogParts';
import { BLOG_PATH, findPost, postPath, relatedPosts } from '../components/js/blog/blogData';
import { usePageMeta } from '../components/js/hooks';
import '../components/css/CaseStudy.css';
import '../components/css/Blog.css';

const BackLink = () => (
  <Link to={BLOG_PATH} className="cs-back">
    <span aria-hidden="true">←</span> All articles
  </Link>
);

function Article({ post }) {
  const related = relatedPosts(post.slug);
  usePageMeta({
    title: `${post.title} | Alvaro Morales`,
    description: post.description,
    path: postPath(post.slug),
  });

  // Open at the top and hand keyboard / screen-reader focus to the article title.
  useEffect(() => {
    window.scrollTo(0, 0);
    document.getElementById('blog-title')?.focus({ preventScroll: true });
  }, [post.slug]);

  return (
    <main className="app-main cs-page blog-page blog-post-page">
      <nav className="cs-page-nav" aria-label="Breadcrumb">
        <BackLink />
      </nav>

      {/* The whole article is one panel; what to read next gets its own. */}
      <article className="cs-section blog-article" aria-labelledby="blog-title">
        <header className="cs-header blog-header">
          <p className="cs-eyebrow">Article</p>
          <h1 id="blog-title" tabIndex={-1}>
            {post.title}
          </h1>
          <p className="cs-sub">{post.description}</p>
          <PostMeta post={post} long />
          <TagLinks tags={post.tags} className="cs-key-tech" />
          <div className="blog-hero-cover">
            <BlogCover name={post.cover} />
          </div>
        </header>

        {post.sections.map((section, i) => (
          <PostSection key={section.id} section={section} num={i + 1} />
        ))}
        {post.sources.length > 0 && <PostSources items={post.sources} />}
      </article>

      <nav className="cs-section cs-page-end blog-end" aria-labelledby="blog-related-title">
        {related.length > 0 && (
          <>
            <h2 id="blog-related-title" className="blog-next-label">
              Related articles
            </h2>
            <RelatedPosts items={related} />
          </>
        )}
        <div className="cs-page-end-links">
          <BackLink />
          <Link to="/#contact" className="pf-btn">
            Get in touch <span aria-hidden="true">→</span>
          </Link>
        </div>
      </nav>
    </main>
  );
}

function BlogPostPage() {
  const post = findPost(useParams().slug);
  if (!post) return <Navigate to={BLOG_PATH} replace />;
  return <Article key={post.slug} post={post} />;
}

export default BlogPostPage;
