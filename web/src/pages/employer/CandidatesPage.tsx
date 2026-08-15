import { FeatureUnavailablePage } from '../shared/FeatureUnavailablePage';
import { SEO } from '../../components/seo/SEO';
import styles from './CandidatesPage.module.css';

export const CandidatesPage = () => {
  return (
    <div className={styles.page}>
      <SEO
        title="Candidate Pipeline | Recruitzaa"
        description="Review and manage applicants across all your active job postings."
      />
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Candidate Pipeline</h1>
          <p className={styles.subtitle}>
            Review and manage applicants across all your active job postings.
          </p>
        </div>
      </div>

      <FeatureUnavailablePage
        title="Candidate Reviews Coming Soon"
        description="Candidate profiles will appear here once application services and profile consent integrations are connected."
      />
    </div>
  );
};
