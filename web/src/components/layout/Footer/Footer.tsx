import { Link } from 'react-router-dom';
import styles from './Footer.module.css';
import logo from '../../../assets/logo.png';

export const Footer = () => {
  return (
    <footer id="about" className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          <div className={styles.brand}>
            <img src={logo} alt="Recruitzaa" />
            <p>Recruitzaa is India's premier AI-powered recruitment and staffing platform, connecting verified talent with global enterprise leaders.</p>
            <p className={styles.cities}>Bangalore · Hyderabad · Mumbai · Delhi NCR</p>
          </div>
          <div>
            <div className={styles.heading}>For Candidates</div>
            <ul className={styles.links}>
              <li><Link to="/jobs">Browse Jobs</Link></li>
              <li><Link to="/auth">ATS Resume Checker</Link></li>
              <li><Link to="/candidate/pipeline">Application Tracker Board</Link></li>
              <li><Link to="/candidate/dashboard">Candidate Workspace</Link></li>
            </ul>
          </div>
          <div>
            <div className={styles.heading}>For Employers</div>
            <ul className={styles.links}>
              <li><Link to="/auth">Post a Job</Link></li>
              <li><a href="#services">Staffing Solutions</a></li>
              <li><a href="#services">Executive Search</a></li>
              <li><Link to="/auth">Employer Portal</Link></li>
            </ul>
          </div>
          <div>
            <div className={styles.heading}>System Reference</div>
            <ul className={styles.links}>
              <li><Link to="/">Prototype Hub Index</Link></li>
              <li><Link to="/auth">Design System Tokens</Link></li>
              <li><Link to="/auth">Register / Sign In</Link></li>
            </ul>
          </div>
        </div>
        <div className={styles.bottom}>
          <div>© 2025 Recruitzaa Technologies Pvt. Ltd. All rights reserved.</div>
          <div>www.recruitzaa.com</div>
        </div>
      </div>
    </footer>
  );
};
