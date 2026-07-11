import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks';
import { Button } from '../../ui/Button';
import styles from './PortalTopbar.module.css';

export const PortalTopbar = () => {
  const location = useLocation();
  const { appUser } = useAppSelector((s) => s.auth);
  const isEmployer = location.pathname.startsWith('/employer');

  const getFirstName = (name: string) => {
    return name.split(' ')[0];
  };

  return (
    <div className={styles.topbar}>
      <div>
        <div className={styles.breadcrumbs}>
          <Link to="/">Home</Link> <span>/</span> 
          {isEmployer ? (
            <>
              <Link to="/employer/dashboard">Employer Workspace</Link> <span>/</span> <span className={styles.active}>Dashboard</span>
            </>
          ) : (
            <>
              <Link to="/candidate/dashboard">Candidate Workspace</Link> <span>/</span> <span className={styles.active}>Overview Dashboard</span>
            </>
          )}
        </div>
        <div className={styles.greeting}>
          {isEmployer
            ? `Welcome back, ${appUser ? getFirstName(appUser.displayName) : 'Employer'} 👋`
            : `Welcome back, ${appUser ? getFirstName(appUser.displayName) : 'Developer'} 👋`}
        </div>
      </div>
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
  );
};
