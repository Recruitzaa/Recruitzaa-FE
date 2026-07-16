import { Link } from 'react-router-dom';
import { PageTransition } from '../../components/layout/PageTransition';
import { SEO } from '../../components/seo/SEO';
import { SITE_CONTENT } from '../../config/content';
import styles from './EmployerLandingPage.module.css';

const content = SITE_CONTENT.employerLandingPage;

export const EmployerLandingPage = () => {
  return (
    <PageTransition>
      <SEO
        title="Hire Top Talent | Recruitzaa Enterprise Staffing"
        description="Recruitzaa helps enterprise teams hire faster with structured sourcing, verified talent, and a review-first workflow. Reduce time-to-fill by 40%."
      />
      <div className={styles.page}>
        <section className={styles.hero} aria-labelledby="employer-hero-title">
          <div>
            <div className={styles.content}>
              <span className={styles.badge}>Enterprise Hiring Platform</span>
              <h1 id="employer-hero-title">{content.hero.title}</h1>
              <p>{content.hero.subtitle}</p>
              <Link to="/auth" className={styles.cta} aria-label="Start hiring talent">
                {content.hero.cta}
              </Link>
            </div>
            <div className={styles.statsBar}>
              {content.stats.map((stat, idx) => (
                <div key={`${stat.label}-${idx}`}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.heroIllustration}>
            <img
              src="/Recruitzaa-FE/employer-hero.png"
              alt="Recruitzaa hiring platform dashboard showing candidate pipeline and talent matching"
              width="600"
              height="450"
              className="w-full h-auto object-cover"
            />
          </div>
        </section>

        <section className={styles.section} aria-labelledby="employer-services-title">
          <div className={styles.sectionHeader}>
            <p>Services</p>
            <h2 id="employer-services-title">Flexible engagement models for enterprise hiring</h2>
          </div>
          <div className={styles.grid}>
            {content.services.map((service, index) => (
              <article key={service.title} className={styles.card}>
                <div className={styles.index} aria-hidden="true">
                  0{index + 1}
                </div>
                <h3>{service.title}</h3>
                <p>{service.desc}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.sectionAlt} aria-labelledby="employer-steps-title">
          <div className={styles.sectionHeader}>
            <p>How It Works</p>
            <h2 id="employer-steps-title">Three simple steps</h2>
          </div>
          <div className={styles.steps}>
            {content.steps.map((step) => (
              <div key={step.number} className={styles.step}>
                <strong>{step.number}</strong>
                <span>{step.title}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </PageTransition>
  );
};
