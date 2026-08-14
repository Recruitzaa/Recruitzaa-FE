import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/** Scroll to in-page anchors — required with HashRouter where native fragments do not work. */
export const useHashScroll = (anchorIds: string[]) => {
  const location = useLocation();
  const anchorKey = anchorIds.join(',');

  useEffect(() => {
    const scrollToAnchor = () => {
      const hash = `${location.hash}${window.location.hash}`;
      for (const id of anchorIds) {
        if (!hash.includes(`#${id}`)) continue;
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }
    };

    scrollToAnchor();
    window.addEventListener('hashchange', scrollToAnchor);
    return () => window.removeEventListener('hashchange', scrollToAnchor);
  }, [location.pathname, location.hash, anchorKey]);
};
