import { Link, useLocation } from 'react-router-dom';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { PageTransition } from '../../components/layout/PageTransition';
import { SEO } from '../../components/seo/SEO';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { addApplication } from '../../store/slices/kanban.slice';
import { useToast } from '../../hooks/useToast';
import styles from './JobDetailPage.module.css';

const jobSchema = {
  '@context': 'https://schema.org/',
  '@type': 'JobPosting',
  title: 'Senior React Native Engineer',
  description:
    'We are seeking a highly skilled Senior React Native Engineer to lead the mobile app development of our flagship enterprise platform. You will work on building scalable applications and ensuring optimal performance.',
  identifier: {
    '@type': 'PropertyValue',
    name: 'Infosys Limited',
    value: 'JOB-12345',
  },
  datePosted: '2026-07-10',
  validThrough: '2026-09-10',
  employmentType: 'FULL_TIME',
  hiringOrganization: {
    '@type': 'Organization',
    name: 'Infosys Limited',
    sameAs: 'https://www.infosys.com',
    logo: 'https://recruitzaa.com/logo.png',
  },
  jobLocation: {
    '@type': 'Place',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Bangalore',
      addressRegion: 'KA',
      addressCountry: 'IN',
    },
  },
  baseSalary: {
    '@type': 'MonetaryAmount',
    currency: 'INR',
    value: {
      '@type': 'QuantitativeValue',
      minValue: 1800000,
      maxValue: 2600000,
      unitText: 'YEAR',
    },
  },
};

export const JobDetailPage = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const location = useLocation();
  const applications = useAppSelector((state) => state.kanban.applications);

  const isPortalView = location.pathname.startsWith('/candidate');
  const backLink = isPortalView ? '/candidate/jobs' : '/jobs';
  const isApplied = applications.some((app) => app.id === 'rj1');

  const handleApply = () => {
    dispatch(
      addApplication({
        id: 'rj1',
        companyName: 'Infosys Limited',
        jobTitle: 'Senior React Native Engineer',
        salaryEstimate: '₹18 – 26 LPA',
      })
    );
    toast.success('Successfully applied to Infosys Limited!');
  };

  return (
    <PageTransition>
      <SEO
        title="Senior React Native Engineer | Infosys | Recruitzaa"
        description="Apply for Senior React Native Engineer at Infosys Limited in Bangalore. Salary ₹18L - ₹26L. Precision AI candidate matching."
        type="job"
        schema={jobSchema}
      />
      <div className={styles.page}>
        <div className={styles.breadcrumb}>
          <div className={styles.container}>
            <Link to={backLink}>Back to Job Listings</Link>
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
                <p>
                  We are seeking a highly skilled and experienced Senior React Native Engineer to
                  join our mobile development team. You will be responsible for architecting and
                  building high-performance, scalable mobile applications for both iOS and Android
                  platforms.
                </p>

                <h2>Key Responsibilities</h2>
                <ul>
                  <li>
                    Design, build, and maintain high-performance, reusable, and reliable React
                    Native code.
                  </li>
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

                <div
                  style={{
                    marginTop: '1.5rem',
                    borderTop: '1px solid var(--color-border)',
                    paddingTop: '1.5rem',
                  }}
                >
                  <Button
                    variant="primary"
                    style={{
                      width: '100%',
                      padding: '0.75rem 1rem',
                      fontSize: '0.875rem',
                      fontWeight: 700,
                    }}
                    onClick={handleApply}
                    disabled={isApplied}
                  >
                    {isApplied ? 'Applied' : 'Apply Now'}
                  </Button>
                </div>
              </section>
            </aside>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
