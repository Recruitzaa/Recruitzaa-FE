import { Link } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks';
import styles from './Footer.module.css';
import logo from '../../../assets/logo.png';

export const Footer = () => {
  const { appUser, isAuthenticated } = useAppSelector((s) => s.auth);

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <img src={logo} alt="Recruitzaa logo" width="140" height="36" />
            <p>
              Recruitzaa is India's premier AI-powered recruitment and staffing platform, connecting
              verified talent with global enterprise leaders.
            </p>
            <p className={styles.cities}>Bangalore · Hyderabad · Mumbai · Delhi NCR</p>
          </div>

          {(!isAuthenticated || appUser?.role !== 'EMPLOYER') && (
            <div>
              <div className={styles.heading}>For Candidates</div>
              <ul className={styles.links}>
                <li>
                  <Link to="/jobs">Browse Jobs</Link>
                </li>
                <li>
                  <Link to={isAuthenticated ? '/candidate/ai-hub' : '/auth'}>
                    ATS Resume Checker
                  </Link>
                </li>
                <li>
                  <Link to="/candidate/pipeline">Application Tracker Board</Link>
                </li>
                <li>
                  <Link to="/candidate/dashboard">Candidate Workspace</Link>
                </li>
              </ul>
            </div>
          )}

          {(!isAuthenticated || appUser?.role !== 'CANDIDATE') && (
            <div>
              <div className={styles.heading}>For Employers</div>
              <ul className={styles.links}>
                <li>
                  <Link to={isAuthenticated ? '/employer/post-job' : '/auth'}>Post a Job</Link>
                </li>
                <li>
                  <Link to="/#services">Staffing Solutions</Link>
                </li>
                <li>
                  <Link to="/#services">Executive Search</Link>
                </li>
                <li>
                  <Link to={isAuthenticated ? '/employer/dashboard' : '/auth'}>
                    Employer Portal
                  </Link>
                </li>
              </ul>
            </div>
          )}

          <div>
            <div className={styles.heading}>Company</div>
            <ul className={styles.links}>
              <li>
                <Link to="/#about">About Us</Link>
              </li>
              <li>
                <a href="mailto:support@recruitzaa.com">Contact Support</a>
              </li>
              <li>
                <Link to="/privacy">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/terms">Terms of Service</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={styles.bottomBar}>
          <div>
            © {new Date().getFullYear()} Recruitzaa Technologies Pvt. Ltd. All rights reserved.
          </div>
          <div className={styles.contactBar}>
            <span>
              Support:{' '}
              <a href="tel:+918431185984" className={styles.contactLink}>
                +91 8431185984
              </a>
            </span>
            <span className={styles.separator}>|</span>
            <a href="mailto:support@recruitzaa.com" className={styles.contactLink}>
              support@recruitzaa.com
            </a>
          </div>
          <div>
            <a href="https://www.recruitzaa.com" className={styles.siteLink}>
              www.recruitzaa.com
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
