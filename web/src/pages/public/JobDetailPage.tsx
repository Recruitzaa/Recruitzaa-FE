import { Link } from 'react-router-dom';
import { Badge } from '../../components/ui/Badge';
import styles from './JobDetailPage.module.css';

export const JobDetailPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.breadcrumb}>
        <div className={styles.container}>
          <Link to="/jobs">Back to Job Listings</Link>
        </div>
      </div>

      <section className={styles.header}>
        <div className={styles.container}>
          <h1>Senior React Native Engineer</h1>
          <p>Infosys Limited · Bangalore, KA (Hybrid) · Posted 2 hours ago</p>
        </div>
      </section>

      <div className={styles.container}>
        <div className={styles.layout}>
          <main className={styles.content}>
            <section className={styles.card}>
              <h2>About the Role</h2>
              <p>We are seeking a highly skilled and experienced Senior React Native Engineer to join our mobile development team. You will be responsible for architecting and building high-performance, scalable mobile applications for both iOS and Android platforms.</p>

              <h2>Key Responsibilities</h2>
              <ul>
                <li>Design, build, and maintain high-performance, reusable, and reliable React Native code.</li>
                <li>Collaborate with cross-functional teams to define and ship new features.</li>
                <li>Identify and resolve bottlenecks, bugs, and performance issues.</li>
                <li>Mentor junior developers and participate in code reviews.</li>
                <li>Integrate with RESTful APIs and backend services.</li>
              </ul>

              <h2>Requirements</h2>
              <ul>
                <li>5+ years of professional software development experience.</li>
                <li>3+ years of hands-on experience with React Native and TypeScript.</li>
                <li>Deep understanding of mobile architecture and performance profiling.</li>
                <li>Experience with Redux Toolkit or TanStack Query.</li>
                <li>Familiarity with native build tools (XCode, Gradle).</li>
              </ul>
            </section>
          </main>

          <aside className={styles.sidebar}>
            <section className={styles.card}>
              <div className={styles.score}>
                <div className={styles.circle}>94%</div>
                <div>
                  <strong>Great AI Match</strong>
                  <p>Based on your profile skills</p>
                </div>
              </div>

              <div className={styles.fact}>
                <strong>Salary</strong>
                <span>₹18,00,000 - ₹26,00,000</span>
              </div>
              <div className={styles.fact}>
                <strong>Job Type</strong>
                <span>Full-Time Permanent</span>
              </div>
              <div className={styles.fact}>
                <strong>Location</strong>
                <span>Bangalore, Karnataka</span>
              </div>

              <div className={styles.tags}>
                <Badge>React Native</Badge>
                <Badge>TypeScript</Badge>
                <Badge>Redux Toolkit</Badge>
                <Badge>GraphQL</Badge>
                <Badge>Jest</Badge>
              </div>
            </section>
          </aside>
        </div>
      </div>
    </div>
  );
};
