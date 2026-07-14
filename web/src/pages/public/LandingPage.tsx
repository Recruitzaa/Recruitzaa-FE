import { Link, useLocation } from 'react-router-dom';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { useState, useEffect } from 'react';
import { PageTransition } from '../../components/layout/PageTransition';
import { SEO } from '../../components/seo/SEO';
import styles from './LandingPage.module.css';
import { SITE_CONTENT } from '../../config/content';

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
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const location = useLocation();

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
        <section className={styles.hero}>
          <div className={styles.heroInner}>
            <div className={styles.badge}>{content.hero.badge}</div>
            <h1 className={styles.title}>
              {content.hero.titlePrefix} <span>{content.hero.titleHighlight}</span>
            </h1>
            <p className={styles.subtitle}>{content.hero.subtitle}</p>

            <div className={styles.searchBox}>
              <div className={styles.field}>
                <label>Job Title or Keyword</label>
                <input defaultValue="" placeholder="e.g. React Native Developer, Data Engineer" />
              </div>
              <div className={styles.field}>
                <label>Location</label>
                <input defaultValue="" placeholder="City or Remote" />
              </div>
              <Link to="/jobs" className={styles.searchButton}>
                <Search size={16} /> Search Jobs
              </Link>
            </div>

            <div className={styles.metrics}>
              {content.hero.metrics.map((metric, i) => (
                <div key={i}>
                  <strong>{metric.value}</strong>
                  <span>{metric.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.preview}>
            <div className={styles.previewHeader}>
              <span>Top AI-Matched Roles for You</span>
              <span>90%+ Fit Score</span>
            </div>
            {content.featuredJobs.map((job) => (
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
            <span>
              Whether you are scaling a technical team or advancing your career, Recruitzaa provides
              structured tools for measurable outcomes.
            </span>
          </div>

          <div className={styles.twoCards}>
            <article className={styles.portalCard}>
              <h3>{content.portals.seekers.title}</h3>
              <p>{content.portals.seekers.description}</p>
              <ul>
                {content.portals.seekers.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              <Link to="/jobs" className={styles.primaryLink}>
                {content.portals.seekers.cta}
              </Link>
            </article>

            <article className={styles.portalCard}>
              <h3>{content.portals.employers.title}</h3>
              <p>{content.portals.employers.description}</p>
              <ul>
                {content.portals.employers.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
              <Link to="/employers" className={styles.darkLink}>
                {content.portals.employers.cta}
              </Link>
            </article>
          </div>
        </section>

        <section id="services" className={styles.sectionAlt}>
          <div className={styles.sectionHeader}>
            <p>Enterprise Services</p>
            <h2>End-to-End Staffing & Recruitment</h2>
            <span>
              Flexible engagement models designed to meet your organization's specific hiring
              demands.
            </span>
          </div>

          <div className={styles.servicesGrid}>
            {content.services.map((service) => (
              <article key={service.title} className={styles.serviceCard}>
                <div className={styles.serviceNum}>{service.num}</div>
                <h4>{service.title}</h4>
                <p>{service.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="about" className={styles.section}>
          <div className={styles.sectionHeader}>
            <p>{content.aboutUs.tag}</p>
            <h2>{content.aboutUs.title}</h2>
            <span>{content.aboutUs.subtitle}</span>
          </div>

          <div className={styles.aboutGrid}>
            {content.aboutUs.differentiators.map((diff, i) => (
              <article key={i} className={styles.aboutCard}>
                <div className={styles.aboutIcon}>{String(i + 1).padStart(2, '0')}</div>
                <h4>{diff.title}</h4>
                <p>{diff.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.faqSection}>
          <div className={styles.sectionHeader}>
            <p>Common Questions</p>
            <h2>Frequently Asked Questions</h2>
            <span>Everything you need to know about the product and matching process.</span>
          </div>
          <div className={styles.faqList}>
            {content.faqs.map((faq, index) => (
              <div
                key={index}
                className={`${styles.faqItem} ${openFaq === index ? styles.faqOpen : ''}`}
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
              >
                <div className={styles.faqQuestion}>
                  <h4>{faq.q}</h4>
                  {openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </div>
                {openFaq === index && (
                  <div className={styles.faqAnswer}>
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  );
};
