import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import styles from './LandingPage.module.css';
import logo from '../../assets/logo.png';

const featuredJobs = [
  { title: 'Senior React Native Engineer', meta: 'Infosys Limited · Bangalore · Full-Time', match: '89% Match' },
  { title: 'Mobile App Specialist (iOS / React)', meta: 'Zomato · Gurugram · Hybrid', match: '92% Match' },
  { title: 'Lead Frontend Architect', meta: 'Flipkart · Bangalore · Remote', match: '86% Match' },
];

export const LandingPage = () => {
  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.badge}>Next-Generation Recruitment Platform</div>
          <h1 className={styles.title}>Your Next Great <span>Hire Starts Here.</span></h1>
          <p className={styles.subtitle}>
            Recruitzaa connects top-tier talent with leading enterprises across IT, engineering, finance, and healthcare - powered by precision AI matching.
          </p>

          <div className={styles.searchBox}>
            <div className={styles.field}>
              <label>Job Title or Keyword</label>
              <input defaultValue="React Native Developer" placeholder="e.g. React Native Developer, Data Engineer" />
            </div>
            <div className={styles.field}>
              <label>Location</label>
              <input defaultValue="Bangalore" placeholder="City or Remote" />
            </div>
            <Link to="/jobs" className={styles.searchButton}>
              <Search size={16} /> Search Jobs
            </Link>
          </div>

          <div className={styles.metrics}>
            <div><strong>12,800+</strong><span>Active Listings</span></div>
            <div><strong>50,000+</strong><span>Verified Candidates</span></div>
            <div><strong>2,300+</strong><span>Enterprise Clients</span></div>
          </div>
        </div>

        <div className={styles.preview}>
          <div className={styles.previewHeader}>
            <span>Top AI-Matched Roles for You</span>
            <span>90%+ Fit Score</span>
          </div>
          {featuredJobs.map((job) => (
            <Link key={job.title} to="/jobs" className={styles.previewCard}>
              <div>
                <strong>{job.title}</strong>
                <p>{job.meta}</p>
              </div>
              <span>{job.match}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <p>Tailored Solutions</p>
          <h2>Built for Candidates & Enterprise Employers</h2>
          <span>Whether you are scaling a technical team or advancing your career, Recruitzaa provides structured tools for measurable outcomes.</span>
        </div>

        <div className={styles.twoCards}>
          <article className={styles.portalCard}>
            <h3>For Job Seekers</h3>
            <p>Discover AI-ranked positions that align with your verified skill set, salary expectations, and work preferences. Build ATS-optimized resumes and prepare with interactive mock interview tools.</p>
            <ul>
              <li>AI-powered resume ATS scoring & optimization</li>
              <li>Real-time application status tracking board</li>
              <li>Personalized salary benchmarks by role and city</li>
            </ul>
            <Link to="/jobs" className={styles.primaryLink}>Explore All Jobs</Link>
          </article>

          <article className={styles.portalCard}>
            <h3>For Enterprise Employers</h3>
            <p>Streamline candidate acquisition with automated sourcing across multiple channels. Evaluate pre-screened profiles with verified technical skills and reduced time-to-fill.</p>
            <ul>
              <li>Automated candidate matching & shortlisting</li>
              <li>Multi-channel job distribution (LinkedIn, Naukri, Indeed)</li>
              <li>Dedicated talent acquisition account managers</li>
            </ul>
            <Link to="/employers" className={styles.darkLink}>Start Hiring Talent</Link>
          </article>
        </div>
      </section>

      <section id="services" className={styles.sectionAlt}>
        <div className={styles.sectionHeader}>
          <p>Enterprise Services</p>
          <h2>End-to-End Staffing & Recruitment</h2>
          <span>Flexible engagement models designed to meet your organization's specific hiring demands.</span>
        </div>

        <div className={styles.servicesGrid}>
          {[
            ['01', 'Permanent Placement', 'Full-cycle recruitment for core engineering, product, and leadership roles with guaranteed placement periods.'],
            ['02', 'Contract Staffing', 'Rapid deployment of specialized technical contractors for project-based demands and peak workloads.'],
            ['03', 'Executive Search', 'Confidential, headhunting services for VP, Director, and C-level executive talent acquisition.'],
            ['04', 'AI Screening & Sourcing', 'Automated profile enrichment and qualification matching to reduce recruiter screening overhead by 60%.'],
          ].map(([num, title, desc]) => (
            <article key={title} className={styles.serviceCard}>
              <div className={styles.serviceNum}>{num}</div>
              <h4>{title}</h4>
              <p>{desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.brandStrip}>
        <img src={logo} alt="Recruitzaa" />
        <p>Recruitzaa Technologies Pvt. Ltd. | Bangalore · Hyderabad · Mumbai · Delhi NCR</p>
      </section>
    </div>
  );
};
