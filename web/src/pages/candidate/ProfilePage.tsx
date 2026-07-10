import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Badge } from '../../components/ui/Badge';
import styles from './ProfilePage.module.css';

export const ProfilePage = () => {
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
                <Input label="First Name" defaultValue="Arjun" />
                <Input label="Last Name" defaultValue="Kumar" />
                <Input label="Email Address" defaultValue="arjun.k@example.com" type="email" />
                <Input label="Phone Number" defaultValue="+91 70972 74644" type="tel" />
                <Input label="Location" defaultValue="Bangalore, India" />
                <Input label="Current Role" defaultValue="React Native Developer" />
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
                defaultValue="Experienced Mobile Application Developer with 5+ years of expertise in building cross-platform applications using React Native. Strong background in JavaScript, TypeScript, and state management libraries like Redux."
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
                <div className={styles.resumeName}>Arjun_Kumar_Resume_2025.pdf</div>
                <div className={styles.resumeSize}>142 KB &bull; Uploaded 2 days ago</div>
                <div className={styles.resumeActions}>
                  <Button variant="outline" size="sm" className={styles.fullBtn}>Replace File</Button>
                  <Button variant="ghost" size="sm" className={styles.fullBtn}>Download</Button>
                </div>
              </div>
            </Card>

            <Card className={styles.sectionCard}>
              <h2 className={styles.sectionTitle}>Core Skills</h2>
              <div className={styles.skillsList}>
                <Badge>React Native</Badge>
                <Badge>TypeScript</Badge>
                <Badge>Redux Toolkit</Badge>
                <Badge>Expo</Badge>
                <Badge>Node.js</Badge>
                <Badge>REST APIs</Badge>
              </div>
              <Button variant="outline" size="sm" className={styles.fullBtn} style={{ marginTop: '1rem' }}>Edit Skills</Button>
            </Card>

          </div>
          
        </div>
      </div>
    </div>
  );
};
