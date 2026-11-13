import React from 'react';
import { Link } from 'react-router-dom';
import { SectionHeading } from '../ui';
import { BlogGrid } from './BlogParts';
import { BLOG_PATH, homePosts } from './blogData';
import '../../css/CaseStudy.css';
import '../../css/Blog.css';

/** Home page "Blog" section: the latest articles (plus any pinned one) and a link to the full list. */
function BlogSection() {
  return (
    <section className="cs-section" aria-labelledby="blog-section-title">
      <SectionHeading id="blog-section-title" eyebrow="What I write about" title="Blog" />
      <BlogGrid items={homePosts()} />
      <p className="blog-more">
        <Link to={BLOG_PATH} className="pf-btn is-ghost">
          All articles <span aria-hidden="true">→</span>
        </Link>
      </p>
    </section>
  );
}

export default BlogSection;
