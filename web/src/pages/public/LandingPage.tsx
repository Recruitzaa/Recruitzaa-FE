import { Link } from 'react-router-dom';
import { Search, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { PageTransition } from '../../components/layout/PageTransition';
import { SEO } from '../../components/seo/SEO';
import styles from './LandingPage.module.css';
import logo from '../../assets/logo.png';

const featuredJobs = [
  { title: 'Senior React Native Engineer', meta: 'Infosys Limited · Bangalore · Full-Time', match: '89% Match' },
  { title: 'Mobile App Specialist (iOS / React)', meta: 'Zomato · Gurugram · Hybrid', match: '92% Match' },
  { title: 'Lead Frontend Architect', meta: 'Flipkart · Bangalore · Remote', match: '86% Match' },
];

const faqData = [
  {
    q: "How does Recruitzaa's AI candidate matching work?",
    a: "Our AI analyzes candidate skills, experience, and preferences to find the best match for employer requirements, ensuring high-quality placements."
  },
  {
    q: "Is Recruitzaa free for job seekers?",
    a: "Yes, our core platform features, including job matching, resume scoring, and applications, are completely free for candidates."
  },
  {
    q: "How do I optimize my resume for ATS on Recruitzaa?",
    a: "Our AI Hub provides a built-in ATS resume scorer that highlights missing keywords and formatting issues compared to the job description."
  },
  {
    q: "What industries and locations do you cover?",
    a: "We specialize in IT, Engineering, Healthcare, and Finance across major global tech hubs and remote opportunities."
  },
  {
    q: "How quickly can employers hire through Recruitzaa?",
    a: "With our pre-vetted talent pool and automated screening, employers typically reduce their time-to-fill by 40%."
  }
];

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Recruitzaa",
  "url": "https://recruitzaa.com",
  "logo": "https://recruitzaa.com/logo.png"
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "url": "https://recruitzaa.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://recruitzaa.com/jobs?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqData.map(item => ({
    "@type": "Question",
    "name": item.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": item.a
    }
  }))
};

export const LandingPage = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

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

        <section className={styles.faqSection}>
          <div className={styles.sectionHeader}>
            <p>Common Questions</p>
            <h2>Frequently Asked Questions</h2>
            <span>Everything you need to know about the product and matching process.</span>
          </div>
          <div className={styles.faqList}>
            {faqData.map((faq, index) => (
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

        <section className={styles.brandStrip}>
          <img src={logo} alt="Recruitzaa" />
          <p>Recruitzaa Technologies Pvt. Ltd. | Bangalore · Hyderabad · Mumbai · Delhi NCR</p>
        </section>
      </div>
    </PageTransition>
  );
};
