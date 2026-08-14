import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../store/hooks';
import styles from './Footer.module.css';
import { BrandLogo } from '../../brand/BrandLogo';
import { BRAND } from '../../../config/content';
import { ROUTES } from '../../../config/routes';

export const Footer = () => {
  const { appUser, isAuthenticated } = useAppSelector((s) => s.auth);
  const audience = useAppSelector((s) => s.ui.audience);
  const location = useLocation();
  const isEmployerContext =
    location.pathname.startsWith('/employers') ||
    location.pathname.startsWith('/employer') ||
    location.search.includes('intent=employer');
  const isJobSeekerContext =
    location.pathname.startsWith('/jobs') ||
    location.pathname.startsWith('/candidate') ||
    location.search.includes('intent=candidate');
  // Mirror the Navbar's audience-aware behaviour so the footer doesn't keep
  // cross-promoting the other audience once a guest has self-identified —
  // but never hide the section matching the page they're actually on.
  const showCandidateSection =
    (!isAuthenticated || appUser?.role !== 'EMPLOYER') &&
    (audience !== 'employer' || isJobSeekerContext);
  const showEmployerSection =
    (!isAuthenticated || appUser?.role !== 'CANDIDATE') &&
    (audience !== 'job_seeker' || isEmployerContext);

  return (
    <footer className={styles.footer} role="contentinfo">
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <BrandLogo forceVariant="dark" />
            <p>
              {BRAND.name} brings job discovery and structured hiring workflows into role-based
              workspaces.
            </p>
          </div>

          {showCandidateSection && (
            <div>
              <div className={styles.heading}>For Candidates</div>
              <ul className={styles.links}>
                <li>
                  <Link to="/jobs">Browse Jobs</Link>
                </li>
                <li>
                  <Link to={isAuthenticated ? '/candidate/ai-hub' : ROUTES.AUTH.REGISTER_CANDIDATE}>
                    Resume Tools
                  </Link>
                </li>
                <li>
                  <Link
                    to={isAuthenticated ? '/candidate/pipeline' : ROUTES.AUTH.REGISTER_CANDIDATE}
                  >
                    Application Tracker
                  </Link>
                </li>
                <li>
                  <Link
                    to={isAuthenticated ? '/candidate/dashboard' : ROUTES.AUTH.REGISTER_CANDIDATE}
                  >
                    Candidate Workspace
                  </Link>
                </li>
              </ul>
            </div>
          )}

          {showEmployerSection && (
            <div>
              <div className={styles.heading}>For Employers</div>
              <ul className={styles.links}>
                <li>
                  <Link to={isAuthenticated ? '/employer/post-job' : ROUTES.AUTH.REGISTER_EMPLOYER}>
                    Post a Job
                  </Link>
                </li>
                <li>
                  <Link to="/#services">Staffing Solutions</Link>
                </li>
                <li>
                  <Link to="/#services">Executive Search</Link>
                </li>
                <li>
                  <Link
                    to={isAuthenticated ? '/employer/dashboard' : ROUTES.AUTH.REGISTER_EMPLOYER}
                  >
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
            © {new Date().getFullYear()} {BRAND.legalName} All rights reserved.
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
