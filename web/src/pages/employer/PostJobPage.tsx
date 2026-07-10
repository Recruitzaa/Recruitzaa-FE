import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import styles from './PostJobPage.module.css';

export const PostJobPage = () => {
  return (
    <div className={styles.page}>
      
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Post a New Job</h1>
          <p className={styles.subtitle}>Fill out the details below to create a new job listing.</p>
        </div>

        <div className={styles.contentLayout}>
          
          <div className={styles.mainCol}>
            <Card className={styles.sectionCard}>
              <h2 className={styles.sectionTitle}>Basic Details</h2>
              <div className={styles.formGrid}>
                <Input label="Job Title" placeholder="e.g. Senior React Developer" />
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Employment Type</label>
                  <select className={styles.select}>
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                  </select>
                </div>
                <Input label="Location" placeholder="e.g. Remote, Bangalore" />
                <div className={styles.inputGroup}>
                  <label className={styles.label}>Work Mode</label>
                  <select className={styles.select}>
                    <option>Remote</option>
                    <option>Hybrid</option>
                    <option>On-Site</option>
                  </select>
                </div>
                <Input label="Salary Range (Min)" placeholder="e.g. ₹18,00,000" />
                <Input label="Salary Range (Max)" placeholder="e.g. ₹26,00,000" />
              </div>
            </Card>

            <Card className={styles.sectionCard}>
              <h2 className={styles.sectionTitle}>Job Description</h2>
              <div className={styles.inputGroup}>
                <label className={styles.label}>About the Role</label>
                <textarea 
                  className={styles.textarea} 
                  rows={6}
                  placeholder="Describe the responsibilities and expectations..."
                />
              </div>
              <div className={styles.inputGroup} style={{ marginTop: '1.25rem' }}>
                <label className={styles.label}>Requirements (comma separated skills)</label>
                <Input placeholder="e.g. React Native, TypeScript, Redux" />
              </div>
            </Card>
            
            <div className={styles.actionRow}>
              <Button variant="outline" style={{ marginRight: '1rem' }}>Save as Draft</Button>
              <Button>Publish Job Listing</Button>
            </div>
          </div>

          <div className={styles.sideCol}>
            <Card className={styles.sectionCard}>
              <h2 className={styles.sectionTitle}>Posting Guidelines</h2>
              <ul className={styles.guidelineList}>
                <li>Be specific about the role responsibilities.</li>
                <li>Clearly define the expected salary range to attract better candidates.</li>
                <li>Add comma separated skills to ensure our AI accurately matches candidates.</li>
              </ul>
            </Card>
          </div>
          
        </div>
      </div>
    </div>
  );
};
