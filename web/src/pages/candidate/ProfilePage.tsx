import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import styles from './ProfilePage.module.css';

export const ProfilePage = () => {
  const { appUser } = useSelector((state: RootState) => state.auth);
  
  // Basic name splitting for demo purposes
  const [firstName, ...lastNameParts] = (appUser?.displayName || '').split(' ');
  const lastName = lastNameParts.join(' ');
  return (
    <div className={styles.page}>

      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>My Profile</h1>
          <p className={styles.subtitle}>Manage your personal information, resume, and career preferences.</p>
        </div>

        <div className={styles.contentLayout}>

          <div className={styles.mainCol}>
            <Card className={styles.sectionCard}>
              <h2 className={styles.sectionTitle}>Personal Information</h2>
              <div className={styles.formGrid}>
                <Input label="First Name" defaultValue={firstName} />
                <Input label="Last Name" defaultValue={lastName} />
                <Input label="Email Address" defaultValue={appUser?.email || ''} type="email" />
                <Input label="Phone Number" defaultValue="" type="tel" />
                <Input label="Location" defaultValue="" />
                <Input label="Current Role" defaultValue="" />
              </div>
              <div className={styles.actionRow}>
                <Button>Save Changes</Button>
              </div>
            </Card>

            <Card className={styles.sectionCard}>
              <h2 className={styles.sectionTitle}>Professional Summary</h2>
              <textarea
                className={styles.textarea}
                rows={5}
                defaultValue=""
                placeholder="Write a brief professional summary..."
              />
              <div className={styles.actionRow}>
                <Button>Update Summary</Button>
              </div>
            </Card>
          </div>

          <div className={styles.sideCol}>

            <Card className={styles.sectionCard}>
              <h2 className={styles.sectionTitle}>Resume</h2>
              <div className={styles.resumeZone}>
                <div className={styles.resumeIcon}>📄</div>
                <div className={styles.resumeName}>{appUser?.displayName ? `${appUser.displayName.replace(' ', '_')}_Resume.pdf` : 'No_Resume_Uploaded.pdf'}</div>
                <div className={styles.resumeSize}>0 KB &bull; Uploaded recently</div>
                <div className={styles.resumeActions}>
                  <Button variant="outline" size="sm" className={styles.fullBtn}>Replace File</Button>
                  <Button variant="ghost" size="sm" className={styles.fullBtn}>Download</Button>
                </div>
              </div>
            </Card>

            <Card className={styles.sectionCard}>
              <h2 className={styles.sectionTitle}>Core Skills</h2>
              <div className={styles.skillsList}>
                {/* Dynamically populated from user state in future */}
                <span style={{ fontSize: '0.85rem', color: '#9ca3af' }}>No skills added yet.</span>
              </div>
              <Button variant="outline" size="sm" className={styles.fullBtn} style={{ marginTop: '1rem' }}>Edit Skills</Button>
            </Card>

          </div>

        </div>
      </div>
    </div>
  );
};
