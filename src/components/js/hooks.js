import { useEffect, useRef, useState } from 'react';

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  typeof window.matchMedia === 'function' &&
  window.matchMedia(REDUCED_MOTION_QUERY).matches;

/** Scrolls to a page section (below the sticky navbar) and moves keyboard focus to it. */
export function scrollToSection(id) {
  const target = document.getElementById(id);
  if (!target) return;
  const navHeight = document.querySelector('.nav-bar')?.offsetHeight || 0;
  const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
  window.scrollTo({ top, behavior: prefersReducedMotion() ? 'auto' : 'smooth' });
  target.focus({ preventScroll: true });
  if (window.history?.replaceState) window.history.replaceState(null, '', `#${id}`);
}

/** Live value of the reduced-motion preference (used to skip SVG motion that CSS cannot disable). */
export function useReducedMotion() {
  const [reduced, setReduced] = useState(prefersReducedMotion);

  useEffect(() => {
    if (typeof window.matchMedia !== 'function') return undefined;
    const mq = window.matchMedia(REDUCED_MOTION_QUERY);
    const onChange = (e) => setReduced(e.matches);
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, []);

  return reduced;
}

/**
 * Returns [ref, isVisible]. Becomes true once the element enters the viewport
 * and stays true. If IntersectionObserver is unavailable, it is visible at once.
 */
export function useInView(options = { threshold: 0.15 }) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      setIsVisible(true);
      return undefined;
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setIsVisible(true);
        observer.disconnect();
      }
    }, options);
    observer.observe(node);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [ref, isVisible];
}

/** Tracks which of the given element ids is currently in the middle of the viewport. */
export function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  const key = ids.join('|');

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return undefined;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    );
    key.split('|').forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [key]);

  return active;
}

const SITE_URL = 'https://alvaromoralesfc.com';

/**
 * Sets the document title and the description / Open Graph / canonical tags while a page
 * is mounted, then restores what index.html shipped with.
 */
export function usePageMeta({ title, description, path }) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    const targets = [
      ['meta[name="description"]', 'content', description],
      ['meta[property="og:title"]', 'content', title],
      ['meta[property="og:description"]', 'content', description],
      ['meta[property="og:url"]', 'content', url],
      ['meta[name="twitter:title"]', 'content', title],
      ['meta[name="twitter:description"]', 'content', description],
      ['link[rel="canonical"]', 'href', url],
    ];
    const previousTitle = document.title;
    document.title = title;
    const restore = targets.map(([selector, attr, value]) => {
      const el = document.head.querySelector(selector);
      if (!el) return null;
      const previous = el.getAttribute(attr);
      el.setAttribute(attr, value);
      return () => el.setAttribute(attr, previous);
    });
    return () => {
      document.title = previousTitle;
      restore.forEach((undo) => undo?.());
    };
  }, [title, description, path]);
}
