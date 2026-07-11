import { Link } from 'react-router-dom';
import { PageTransition } from '../../components/layout/PageTransition';
import { SEO } from '../../components/seo/SEO';
import { JobCard } from '../../features/jobs/components/JobCard/JobCard';
import styles from './JobListingsPage.module.css';

const jobs = [
  { id: '1', title: 'Senior React Native Engineer', company: 'Infosys Limited', location: 'Bangalore, KA', type: 'Hybrid', salary: '₹18,00,000 - ₹26,00,000 LPA', postedAt: '2 hours ago', matchScore: 94, tags: ['React Native', 'TypeScript', 'Redux Toolkit', '5+ Years Exp'], avatarText: 'INF', avatarColor: '#0F172A', isPriority: true },
  { id: '2', title: 'Mobile Application Specialist', company: 'Zomato Media Pvt. Ltd.', location: 'Gurugram, HR', type: 'Remote', salary: '₹20,00,000 - ₹30,00,000 LPA', postedAt: '5 hours ago', matchScore: 91, tags: ['React Native', 'iOS Pipeline', 'GraphQL', 'Expo'], avatarText: 'ZOM', avatarColor: '#854D0E', isPriority: false },
  { id: '3', title: 'Lead Mobile Frontend Architect', company: 'Flipkart Internet Pvt. Ltd.', location: 'Bangalore, KA', type: 'On-Site', salary: '₹28,00,000 - ₹38,00,000 LPA', postedAt: '1 day ago', matchScore: 86, tags: ['React Native Architecture', 'Performance Tuning', 'Android / iOS', '7+ Years Exp'], avatarText: 'FLP', avatarColor: '#1E3A8A', isPriority: false },
];

export const JobListingsPage = () => {
  return (
    <PageTransition>
      <SEO 
        title="Search Jobs | AI Match | Recruitzaa"
        description="Find verified remote and on-site jobs in IT, Healthcare, and Finance. Apply now with AI-optimized ATS resumes."
      />
      <div className={styles.page}>
      <div className={styles.breadcrumb}>
        <div className={styles.container}>
          <span>Home</span><span>/</span><span>Job Search</span><span>/</span><strong>IT & Software</strong>
        </div>
      </div>

      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.heroTop}>
            <div>
              <p>Verified job search</p>
              <h1>Job Search & Filter Engine</h1>
            </div>
            <Link to="/auth" className={styles.heroCta}>Apply with profile</Link>
          </div>

          <div className={styles.searchBar}>
            <label>
              Job Title
              <input defaultValue="React Native Developer" />
            </label>
            <label>
              Location
              <input defaultValue="Bangalore, KA" />
            </label>
            <label>
              Experience Level
              <select defaultValue="Mid-Senior (3-6 yrs)">
                <option>Mid-Senior (3-6 yrs)</option>
                <option>Senior (6-10 yrs)</option>
                <option>Lead (10+ yrs)</option>
              </select>
            </label>
          </div>
        </div>
      </section>

      <div className={styles.container}>
        <div className={styles.mainLayout}>
          <aside className={styles.sidebar}>
            <div className={styles.filterCard}>
              <h2>Filters</h2>
              <p>Remote, hybrid, salary bands, experience level, and AI match score.</p>
              <div className={styles.filterPills}>
                <span>Remote</span><span>Hybrid</span><span>High Match</span><span>Urgent</span>
              </div>
            </div>
          </aside>

          <main className={styles.feed}>
            <div className={styles.feedHeader}>
              <div>Showing <strong>4,821</strong> verified opportunities</div>
              <div>Sort by <strong>AI Match Score</strong></div>
            </div>

            <div className={styles.list}>
              {jobs.map((job) => (
                <JobCard key={job.id} {...job} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </div>
    </PageTransition>
  );
};
