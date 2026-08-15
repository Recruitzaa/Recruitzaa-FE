import { useCallback, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';
import { useAppSelector } from '../../../store/hooks';
import { logOut } from '../../../services/auth.service';
import { WorkspaceSwitcher } from '../WorkspaceSwitcher';
import styles from './PortalSidebar.module.css';
import { useFocusTrap } from '../../../hooks/useFocusTrap';
import { ROUTES } from '../../../config/routes';
import { UserAvatar } from '../../ui/UserAvatar/UserAvatar';
import { BrandLogo } from '../../brand/BrandLogo';

interface PortalSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PortalSidebar = ({ isOpen, onClose }: PortalSidebarProps) => {
  const sidebarRef = useRef<HTMLElement>(null);
  const closeSidebar = useCallback(onClose, [onClose]);
  useFocusTrap(isOpen, sidebarRef, { onEscape: closeSidebar });
  const location = useLocation();
  const navigate = useNavigate();
  const { appUser } = useAppSelector((s) => s.auth);
  const isEmployer = location.pathname.startsWith('/employer');

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    try {
      await logOut();
      navigate(ROUTES.AUTH.LOGIN);
    } catch (err) {
      console.error('Logout failed:', err);
    }
  };

  return (
    <>
      {isOpen && (
        <button
          type="button"
          className={styles.overlay}
          aria-label="Close navigation"
          onClick={onClose}
        />
      )}
      <aside
        ref={sidebarRef}
        className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}
        aria-label="Employer workspace navigation"
        tabIndex={-1}
      >
        <div className={styles.brand}>
          <Link to={isEmployer ? '/employers' : '/'} className="flex items-center gap-2">
            <BrandLogo width={130} height={34} />
          </Link>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close navigation"
          >
            <X size={20} />
          </button>
        </div>

        <ul className={styles.menu}>
          {isEmployer ? (
            <>
              <li className={styles.sectionLabel}>Employer Hub</li>
              <li>
                <Link
                  onClick={onClose}
                  to="/employer/dashboard"
                  className={`${styles.link} ${isActive('/employer/dashboard') ? styles.active : ''}`}
                >
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  onClick={onClose}
                  to="/employer/post-job"
                  className={`${styles.link} ${isActive('/employer/post-job') ? styles.active : ''}`}
                >
                  <span>Post a Job</span>
                </Link>
              </li>
              <li>
                <Link
                  onClick={onClose}
                  to="/employer/my-jobs"
                  className={`${styles.link} ${isActive('/employer/my-jobs') ? styles.active : ''}`}
                >
                  <span>Active Listings</span>
                </Link>
              </li>
              <li>
                <Link
                  onClick={onClose}
                  to="/employer/candidates"
                  className={`${styles.link} ${isActive('/employer/candidates') ? styles.active : ''}`}
                >
                  <span>Candidate Pipeline</span>
                  <span className={`${styles.badge} bg-[#c14f16] text-white`}>14</span>
                </Link>
              </li>
              <li>
                <Link
                  onClick={onClose}
                  to="/employer/inbox"
                  className={`${styles.link} ${isActive('/employer/inbox') ? styles.active : ''}`}
                >
                  <span>Inbox Messages</span>
                </Link>
              </li>

              <li className={styles.sectionLabel}>Company Settings</li>
              <li>
                <Link
                  onClick={onClose}
                  to="/employer/profile"
                  className={`${styles.link} ${isActive('/employer/profile') ? styles.active : ''}`}
                >
                  <span>Company Profile</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={handleSignOut}
                  className={styles.linkButton}
                  aria-label="Sign out of employer account"
                >
                  <span>Sign Out</span>
                </button>
              </li>
            </>
          ) : (
            <>
              <li className={styles.sectionLabel}>Workspace</li>
              <li>
                <Link
                  to="/candidate/dashboard"
                  className={`${styles.link} ${isActive('/candidate/dashboard') ? styles.active : ''}`}
                >
                  <span>Overview</span>
                </Link>
              </li>
              <li>
                <Link to="/jobs" className={styles.link}>
                  <span>Verified Job Search</span>
                  <span className={styles.badge}>12.8K</span>
                </Link>
              </li>
              <li>
                <Link
                  to="/candidate/pipeline"
                  className={`${styles.link} ${isActive('/candidate/pipeline') ? styles.active : ''}`}
                >
                  <span>Application Pipeline</span>
                  <span className={`${styles.badge} bg-[#c14f16] text-white`}>7</span>
                </Link>
              </li>

              <li className={styles.sectionLabel}>AI Career Copilot</li>
              <li>
                <Link
                  to="/candidate/ai-hub"
                  className={`${styles.link} ${isActive('/candidate/ai-hub') ? styles.active : ''}`}
                >
                  <span>ATS Resume Parser</span>
                </Link>
              </li>
              <li>
                <Link to="/candidate/ai-hub" className={styles.link}>
                  <span>AI Resume Builder</span>
                </Link>
              </li>

              <li className={styles.sectionLabel}>Profile & Settings</li>
              <li>
                <Link
                  to="/candidate/profile"
                  className={`${styles.link} ${isActive('/candidate/profile') ? styles.active : ''}`}
                >
                  <span>Saved Positions</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={handleSignOut}
                  className={styles.linkButton}
                  aria-label="Sign out of workspace account"
                >
                  <span>Sign Out / Switch</span>
                </button>
              </li>
            </>
          )}
        </ul>

        <WorkspaceSwitcher />

        <div className={styles.user}>
          <div
            className={`${styles.avatar} ${isEmployer ? 'bg-slate-900 text-white' : 'bg-slate-100 text-slate-800 dark:bg-slate-850 dark:text-slate-100'}`}
          >
            <UserAvatar photoUrl={appUser?.photoUrl} name={appUser?.displayName} />
          </div>
          <div className={styles.userInfo}>
            <div className={styles.userName}>{appUser ? appUser.displayName : 'Loading...'}</div>
            <div className={styles.userRole}>
              {isEmployer ? 'Enterprise Account' : 'Job Seeker'}
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
