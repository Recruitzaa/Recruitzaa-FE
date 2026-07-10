import { Link } from 'react-router-dom';
import styles from './EmployerLandingPage.module.css';

const services = [
  ['Permanent Placement', 'Full-Cycle Recruitment'],
  ['Contract Staffing', 'Rapid Contractor Deployment'],
  ['Executive Search', 'Confidential Headhunting'],
  ['AI Screening & Sourcing', 'Automated Profile Matching'],
];

export const EmployerLandingPage = () => {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.content}>
          <div className={styles.badge}>Adecco Reference Standard</div>
          <h1>Enterprise Staffing & Precision Hiring</h1>
          <p>Recruitzaa helps enterprise teams hire faster with structured sourcing, verified talent, and a review-first workflow that keeps quality high.</p>
          <Link to="/auth" className={styles.cta}>Start Hiring</Link>
        </div>
        <div className={styles.statsBar}>
          <div><strong>50,000+</strong><span>Candidates</span></div>
          <div><strong>2,300+</strong><span>Companies</span></div>
          <div><strong>12,800+</strong><span>Jobs</span></div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <p>Services</p>
          <h2>Flexible engagement models for enterprise hiring</h2>
        </div>
        <div className={styles.grid}>
          {services.map(([title, desc], index) => (
            <article key={title} className={styles.card}>
              <div className={styles.index}>0{index + 1}</div>
              <h3>{title}</h3>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.sectionAlt}>
        <div className={styles.sectionHeader}>
          <p>How It Works</p>
          <h2>Three simple steps</h2>
        </div>
        <div className={styles.steps}>
          <div className={styles.step}><strong>1</strong><span>Register your company</span></div>
          <div className={styles.step}><strong>2</strong><span>Post a job, reviewed within 24h</span></div>
          <div className={styles.step}><strong>3</strong><span>Receive AI-matched candidates</span></div>
        </div>
      </section>
    </div>
  );
};
