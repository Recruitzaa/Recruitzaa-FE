import { Link, useLocation, useNavigate } from 'react-router-dom';
import type { FormEvent } from 'react';
import { Search } from 'lucide-react';
import { useEffect, useId } from 'react';
import { PageTransition } from '../../components/layout/PageTransition';
import { SEO } from '../../components/seo/SEO';
import styles from './LandingPage.module.css';
import { SITE_CONTENT } from '../../config/content';
import { LandingPageSections } from './components/LandingPageSections';

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
  const location = useLocation();
  const navigate = useNavigate();
  const keywordId = useId();
  const locationId = useId();

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
        const el = document.getElementById('about');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else if (hash.includes('#services')) {
        const el = document.getElementById('services');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }
    };

    handleHashScroll();
    window.addEventListener('hashchange', handleHashScroll);
    return () => window.removeEventListener('hashchange', handleHashScroll);
  }, [location]);

  return (
    <PageTransition>
      <SEO
        title="Recruitzaa — AI-Powered Enterprise Recruitment Platform"
        description="Precision AI candidate matching, ATS resume optimizations, and staffing services for IT, Healthcare, and Finance companies."
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
                  required
                  aria-required="true"
                  defaultValue=""
                  placeholder="e.g. React Native Developer, Data Engineer"
                  autoComplete="off"
                />
              </div>
              <div className={styles.field}>
                <label htmlFor={locationId}>Location</label>
                <input
                  id={locationId}
                  name="location"
                  required
                  aria-required="true"
                  defaultValue=""
                  placeholder="City or Remote"
                  autoComplete="off"
                />
              </div>
              <button type="submit" className={styles.searchButton} aria-label="Explore all jobs">
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
              <span>Top AI-Matched Roles for You</span>
              <span>86%–92% Match Range</span>
            </div>
            <ul className={styles.previewList}>
              {content.featuredJobs.map((job) => (
                <li key={job.title}>
                  <Link to="/jobs" className={styles.previewCard}>
                    <div>
                      <strong>{job.title}</strong>
                      <p>{job.meta}</p>
                    </div>
                    <span>{job.match}</span>
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
