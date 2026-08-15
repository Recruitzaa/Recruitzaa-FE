import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, ChevronUp } from 'lucide-react';
import styles from '../LandingPage.module.css';
import { useAppSelector } from '../../../store/hooks';

interface PortalContent {
  title: string;
  description: string;
  bullets: string[];
  cta: string;
}
interface LandingSectionsContent {
  portals: { seekers: PortalContent; employers: PortalContent };
  services: Array<{ num: string; title: string; desc: string }>;
  aboutUs: {
    tag: string;
    title: string;
    subtitle: string;
    differentiators: Array<{ title: string; desc: string }>;
  };
  faqs: Array<{ q: string; a: string }>;
}

interface LandingPageSectionsProps {
  content: LandingSectionsContent;
}

export const LandingPageSections = ({ content }: LandingPageSectionsProps) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const audience = useAppSelector((s) => s.ui.audience);
  // Cold visitors (no stated preference) see both audiences so employers who
  // land on the candidate-facing homepage can still discover their path.
  // Once someone has self-identified via the UtilityBar toggle, stop
  // cross-promoting the other side on their own homepage.
  const showSeekerCard = audience !== 'employer';
  const showEmployerCard = audience !== 'job_seeker';
  const showBoth = showSeekerCard && showEmployerCard;

  return (
    <>
      <section className={styles.section} aria-labelledby="landing-solutions-title">
        <div className={styles.sectionHeader}>
          <p>Tailored Solutions</p>
          <h2 id="landing-solutions-title">
            {showBoth
              ? 'Built for Candidates & Enterprise Employers'
              : showSeekerCard
                ? 'Built for Candidates'
                : 'Built for Enterprise Employers'}
          </h2>
          <span>
            Whether you are scaling a technical team or advancing your career, Recruitzaa provides
            structured tools for clearer workflows.
          </span>
        </div>

        <div className={showBoth ? styles.twoCards : styles.singleCard}>
          {showSeekerCard && (
            <article className={styles.portalCard}>
              <h3>{content.portals.seekers.title}</h3>
              <p>{content.portals.seekers.description}</p>
              <ul>
                {content.portals.seekers.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <Link to="/jobs" className={styles.primaryLink} aria-label="Explore all jobs">
                {content.portals.seekers.cta}
              </Link>
            </article>
          )}

          {showEmployerCard && (
            <article className={styles.portalCard}>
              <h3>{content.portals.employers.title}</h3>
              <p>{content.portals.employers.description}</p>
              <ul>
                {content.portals.employers.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <Link to="/employers" className={styles.darkLink} aria-label="Start hiring talent">
                {content.portals.employers.cta}
              </Link>
            </article>
          )}
        </div>
      </section>

      <section id="services" className={styles.sectionAlt} aria-labelledby="landing-services-title">
        <div className={styles.sectionHeader}>
          <p>Enterprise Services</p>
          <h2 id="landing-services-title">End-to-End Staffing & Recruitment</h2>
          <span>
            Flexible engagement models designed to meet your organization's specific hiring demands.
          </span>
        </div>

        <div className={styles.servicesGrid}>
          {content.services.map((service) => (
            <article key={service.title} className={styles.serviceCard}>
              <div className={styles.serviceNum} aria-hidden="true">
                {service.num}
              </div>
              <h4>{service.title}</h4>
              <p>{service.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section id="about" className={styles.section} aria-labelledby="landing-about-title">
        <div className={styles.sectionHeader}>
          <p>{content.aboutUs.tag}</p>
          <h2 id="landing-about-title">{content.aboutUs.title}</h2>
          <span>{content.aboutUs.subtitle}</span>
        </div>

        <div className={styles.aboutGrid}>
          {content.aboutUs.differentiators.map((diff, i) => (
            <article key={`${diff.title}-${i}`} className={styles.aboutCard}>
              <div className={styles.aboutIcon} aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </div>
              <h4>{diff.title}</h4>
              <p>{diff.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.faqSection} aria-labelledby="landing-faq-title">
        <div className={styles.sectionHeader}>
          <p>Common Questions</p>
          <h2 id="landing-faq-title">Frequently Asked Questions</h2>
          <span>Everything you need to know about the product and matching process.</span>
        </div>
        <div className={styles.faqList}>
          {content.faqs.map((faq, index) => (
            <details
              key={faq.q}
              className={`${styles.faqItem} ${openFaq === index ? styles.faqOpen : ''}`}
              open={openFaq === index}
              onToggle={(event) => {
                const isOpen = event.currentTarget.open;
                setOpenFaq(isOpen ? index : null);
              }}
            >
              <summary className={styles.faqQuestion}>
                <span>{faq.q}</span>
                {openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </summary>
              <div className={styles.faqAnswer}>
                <p>{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
      </section>
    </>
  );
};
export default LandingPageSections;
