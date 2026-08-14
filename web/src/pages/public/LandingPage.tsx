import { Link, useLocation, useNavigate } from 'react-router-dom';
import type { FormEvent } from 'react';
import { Search } from 'lucide-react';
import { useEffect, useId } from 'react';
import { PageTransition } from '../../components/layout/PageTransition';
import { SEO } from '../../components/seo/SEO';
import styles from './LandingPage.module.css';
import { SITE_CONTENT } from '../../config/content';
import { LandingPageSections } from './components/LandingPageSections';
import { useAppSelector } from '../../store/hooks';
import { ROUTES } from '../../config/routes';
import { scrollToElementId } from '../../lib/scrollToElement';

const content = SITE_CONTENT.landingPage;

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Recruitzaa',
  url: 'https://recruitzaa.com',
  logo: 'https://recruitzaa.com/logo.png',
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  url: 'https://recruitzaa.com',
  potentialAction: {
    '@type': 'SearchAction',
    target: 'https://recruitzaa.com/jobs?q={search_term_string}',
    'query-input': 'required name=search_term_string',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: content.faqs.map((item) => ({
    '@type': 'Question',
    name: item.q,
    acceptedAnswer: {
      '@type': 'Answer',
      text: item.a,
    },
  })),
};

export const LandingPage = () => {
  const { isAuthenticated, appUser } = useAppSelector((state) => state.auth);
  const location = useLocation();
  const navigate = useNavigate();
  const keywordId = useId();
  const locationId = useId();
  const activeRole = appUser?.activeRole ?? appUser?.role;
  const workspaceRoute =
    activeRole === 'EMPLOYER'
      ? '/employer/dashboard'
      : activeRole === 'EXPERT'
        ? '/expert/dashboard'
        : activeRole === 'EMPLOYEE'
          ? '/employee/dashboard'
          : activeRole === 'SUPER_ADMIN'
            ? '/admin/dashboard'
            : '/candidate/dashboard';
  const roleTask =
    activeRole === 'EMPLOYER'
      ? {
          title: 'Manage job listings',
          description: 'Review active roles, drafts, and listing information.',
          action: 'Manage jobs',
          to: '/employer/my-jobs',
        }
      : activeRole === 'EXPERT'
        ? {
            title: 'Manage your availability',
            description: 'Review calendar connections and session availability.',
            action: 'Open calendar',
            to: '/expert/calendar-settings',
          }
        : activeRole === 'EMPLOYEE'
          ? {
              title: 'Review employee tools',
              description: 'Return to your work dashboard and available employee services.',
              action: 'View tools',
              to: '/employee/dashboard',
            }
          : activeRole === 'SUPER_ADMIN'
            ? {
                title: 'Review job approvals',
                description: 'Continue with platform review and moderation work.',
                action: 'Review queue',
                to: '/admin/job-approvals',
              }
            : {
                title: 'Browse opportunities',
                description:
                  'Search the current catalogue by role, location, workplace, and experience.',
                action: 'Browse jobs',
                to: '/jobs',
              };
  const accountTask =
    activeRole === 'CANDIDATE'
      ? {
          title: 'Strengthen your profile',
          description:
            'Keep your skills, experience, and preferences current for better comparisons.',
          action: 'Review profile',
          to: '/candidate/profile',
        }
      : activeRole === 'EMPLOYER'
        ? {
            title: 'Review company information',
            description: 'Keep your employer profile and organization details current.',
            action: 'Company profile',
            to: '/employer/profile',
          }
        : {
            title: 'Return to your workspace',
            description: 'Access the information and controls available for your active role.',
            action: 'Open workspace',
            to: workspaceRoute,
          };
  const previewItems = isAuthenticated
    ? [
        {
          title: 'Open your workspace',
          description: 'Continue with the tools and information for your active role.',
          action: 'Continue',
          to: workspaceRoute,
        },
        roleTask,
        accountTask,
      ]
    : [
        {
          title: 'Remote jobs',
          description: 'Browse roles with remote or hybrid workplace options.',
          action: 'View remote',
          to: '/jobs?workplace=Remote',
        },
        {
          title: 'Engineering roles',
          description: 'Explore software, platform, and product engineering openings.',
          action: 'View engineering',
          to: '/jobs?keyword=engineer',
        },
        {
          title: 'Fresher opportunities',
          description: 'Discover early-career roles suited to new graduates.',
          action: 'View fresher jobs',
          to: '/jobs?keyword=fresher',
        },
      ];

  const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const keyword = new FormData(form).get('keyword')?.toString().trim() ?? '';
    const location = new FormData(form).get('location')?.toString().trim() ?? '';
    const params = new URLSearchParams();

    if (keyword) params.set('keyword', keyword);
    if (location) params.set('location', location);

    navigate(`/jobs${params.toString() ? `?${params.toString()}` : ''}`);
  };

  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash.includes('#about')) {
        scrollToElementId('about');
      } else if (hash.includes('#services')) {
        scrollToElementId('services');
      }
    };

    handleHashScroll();
    window.addEventListener('hashchange', handleHashScroll);
    return () => window.removeEventListener('hashchange', handleHashScroll);
  }, [location]);

  return (
    <PageTransition>
      <SEO
        title="Recruitzaa — Job Search and Hiring Workspaces"
        description="Explore jobs or manage a structured hiring workflow in Recruitzaa."
        schema={[organizationSchema, websiteSchema, faqSchema]}
      />
      <div className={styles.page}>
        <section className={styles.hero} aria-labelledby="landing-hero-title">
          <div className={styles.heroInner}>
            <div className={styles.badge}>{content.hero.badge}</div>
            <h1 id="landing-hero-title" className={styles.title}>
              {content.hero.titlePrefix} <span>{content.hero.titleHighlight}</span>
            </h1>
            <p className={styles.subtitle}>{content.hero.subtitle}</p>

            <form
              className={styles.searchBox}
              role="search"
              aria-label="Job search"
              onSubmit={handleSearchSubmit}
            >
              <div className={styles.field}>
                <label htmlFor={keywordId}>Job Title or Keyword</label>
                <input
                  id={keywordId}
                  name="keyword"
                  defaultValue=""
                  placeholder="Job title, company, or skills"
                  autoComplete="off"
                />
              </div>
              <div className={styles.field}>
                <label htmlFor={locationId}>Location</label>
                <input
                  id={locationId}
                  name="location"
                  defaultValue=""
                  placeholder="City or Remote"
                  autoComplete="off"
                />
              </div>
              <button type="submit" className={styles.searchButton}>
                <Search size={16} /> Search Jobs
              </button>
            </form>

            <ul className={styles.metrics}>
              {content.hero.metrics.map((metric) => (
                <li key={`${metric.label}-${metric.value}`}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.preview}>
            <div className={styles.previewHeader}>
              <span>
                {isAuthenticated
                  ? `Welcome back${appUser?.displayName ? `, ${appUser.displayName.split(' ')[0]}` : ''}`
                  : 'Explore Recruitzaa'}
              </span>
              <Link to={isAuthenticated ? workspaceRoute : ROUTES.AUTH.REGISTER_CANDIDATE}>
                {isAuthenticated ? 'Open workspace' : 'Create your workspace'}
              </Link>
            </div>
            <ul className={styles.previewList}>
              {previewItems.map((item) => (
                <li key={item.title}>
                  <Link to={item.to} className={styles.previewCard}>
                    <div>
                      <strong>{item.title}</strong>
                      <p>{item.description}</p>
                    </div>
                    <span>{item.action}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <LandingPageSections content={content} />
      </div>
    </PageTransition>
  );
};
