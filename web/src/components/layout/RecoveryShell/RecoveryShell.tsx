import { Outlet, useLocation } from 'react-router-dom';
import { useEffect, useRef, type ReactNode } from 'react';
import { UtilityBar } from '../UtilityBar/UtilityBar';
import { Navbar } from '../Navbar/Navbar';
import { Footer } from '../Footer/Footer';

interface RecoveryShellProps {
  children?: ReactNode;
}

/** Public chrome for auth/error pages that sit outside PublicLayout routes. */
export const RecoveryShell = ({ children }: RecoveryShellProps) => {
  const location = useLocation();
  const mainRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    mainRef.current?.focus();
  }, [location.pathname]);

  return (
    <div className="app-shell">
      <nav aria-label="Skip links">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
      </nav>
      <UtilityBar />
      <Navbar />
      <main id="main-content" ref={mainRef} tabIndex={-1} className="app-main" role="main">
        {children ?? <Outlet />}
      </main>
      <Footer />
    </div>
  );
};
