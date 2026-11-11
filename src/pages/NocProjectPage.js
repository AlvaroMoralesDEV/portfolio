import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import CaseStudy from '../components/js/caseStudy/CaseStudy';
import { NOC_PATH, pageMeta } from '../components/js/caseStudy/caseStudyData';
import { usePageMeta } from '../components/js/hooks';

export { NOC_PATH };

const BackLink = () => (
  <Link to="/#projects" className="cs-back">
    <span aria-hidden="true">←</span> Back to portfolio
  </Link>
);

function NocProjectPage() {
  usePageMeta({ ...pageMeta, path: NOC_PATH });

  // Open at the top and hand keyboard / screen-reader focus to the page title.
  useEffect(() => {
    window.scrollTo(0, 0);
    document.getElementById('cs-title')?.focus({ preventScroll: true });
  }, []);

  return (
    <main className="app-main cs-page">
      <nav className="cs-page-nav" aria-label="Breadcrumb">
        <BackLink />
      </nav>

      <CaseStudy />

      <nav className="cs-section cs-page-end" aria-label="More">
        <p>That is the NOC project. The portfolio has four more.</p>
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

export default NocProjectPage;
