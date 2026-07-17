import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { UtilityBar } from '../UtilityBar/UtilityBar';
import { Navbar } from '../Navbar/Navbar';
import { Footer } from '../Footer/Footer';

export const PublicLayout = () => {
  const location = useLocation();
  const mainRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    mainRef.current?.focus();
  }, [location.pathname]);

  return (
    <div className="app-shell">
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <UtilityBar />
      <Navbar />
      <main id="main-content" ref={mainRef} tabIndex={-1} className="app-main" role="main">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};
