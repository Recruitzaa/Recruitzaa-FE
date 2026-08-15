import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks';
import { Button } from '../../ui/Button';
import styles from './PortalTopbar.module.css';
import { Menu, Sun, Moon } from 'lucide-react';
import { useTheme } from '../../../hooks/useTheme';

export const PortalTopbar = ({ onOpenMenu }: { onOpenMenu: () => void }) => {
  const location = useLocation();
  const { appUser } = useAppSelector((s) => s.auth);
  const { toggleTheme, isDark } = useTheme();
  const isEmployer = location.pathname.startsWith('/employer');

  const getFirstName = (name: string) => {
    return name.split(' ')[0];
  };

  return (
    <div className={styles.topbar}>
      <button
        type="button"
        className={styles.menuButton}
        onClick={onOpenMenu}
        aria-label="Open workspace navigation"
      >
        <Menu size={20} />
      </button>
      <div className={styles.greeting}>
        {isEmployer
          ? `Welcome back, ${appUser ? getFirstName(appUser.displayName) : 'Employer'} 👋`
          : `Welcome back, ${appUser ? getFirstName(appUser.displayName) : 'Developer'} 👋`}
      </div>
      <div className={styles.headerRight}>
        <button
          type="button"
          onClick={toggleTheme}
          className={styles.themeToggle}
          aria-label={isDark ? 'Use light theme' : 'Use dark theme'}
          title={isDark ? 'Use light theme' : 'Use dark theme'}
        >
          {isDark ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <div className={styles.actions}>
          {isEmployer ? (
            <>
              <Link to="/employer/candidates">
                <Button variant="outline">Candidate Search</Button>
              </Link>
              <Link to="/employer/post-job">
                <Button variant="primary">Post New Job</Button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/candidate/ai-hub">
                <Button variant="outline">Check ATS Score</Button>
              </Link>
              <Link to="/jobs">
                <Button variant="primary">Find Jobs</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
