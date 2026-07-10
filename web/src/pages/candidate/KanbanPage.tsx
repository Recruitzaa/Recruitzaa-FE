import { Link } from 'react-router-dom';
import styles from './KanbanPage.module.css';

export const KanbanPage = () => {
  return (
    <div className={styles.boardContainer}>
      <div className={styles.board}>
        
        {/* Column 1: Saved Positions */}
        <div className={styles.column}>
          <div className={styles.colHeader}>
            <span className={styles.colTitle}>Saved Positions</span>
            <span className={styles.colCount}>12</span>
          </div>
          <div className={styles.colCards}>
            <Link to="/jobs/1" className={styles.kCard}>
              <div className={styles.kCardCompany}>Microsoft</div>
              <div className={styles.kCardTitle}>Sr. React Native Engineer</div>
              <div className={styles.kCardMeta}>₹28 – 38 LPA &middot; Remote</div>
              <div className={styles.kCardFooter}>
                <span>91% AI Match</span>
                <span>Saved 2d ago</span>
              </div>
            </Link>
            <Link to="/jobs/2" className={styles.kCard}>
              <div className={styles.kCardCompany}>Amazon</div>
              <div className={styles.kCardTitle}>Mobile App Engineer</div>
              <div className={styles.kCardMeta}>₹24 – 32 LPA &middot; Hybrid</div>
              <div className={styles.kCardFooter}>
                <span>88% AI Match</span>
                <span>Saved 4d ago</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Column 2: Applied */}
        <div className={styles.column}>
          <div className={styles.colHeader} style={{ borderTop: '3px solid #3B82F6' }}>
            <span className={styles.colTitle}>Applied</span>
            <span className={styles.colCount}>7</span>
          </div>
          <div className={styles.colCards}>
            <Link to="/jobs/3" className={styles.kCard}>
              <div className={styles.kCardCompany}>Infosys Limited</div>
              <div className={styles.kCardTitle}>Senior React Native Developer</div>
              <div className={styles.kCardMeta}>₹18 – 26 LPA &middot; Bangalore</div>
              <div className={styles.kCardFooter}>
                <span style={{ color: '#2563EB', fontWeight: 600 }}>Submitted</span>
                <span>Jul 1, 2025</span>
              </div>
            </Link>
            <Link to="/jobs/4" className={styles.kCard}>
              <div className={styles.kCardCompany}>Flipkart</div>
              <div className={styles.kCardTitle}>Mobile App Specialist</div>
              <div className={styles.kCardMeta}>₹16 – 24 LPA &middot; Bangalore</div>
              <div className={styles.kCardFooter}>
                <span style={{ color: '#2563EB', fontWeight: 600 }}>Submitted</span>
                <span>Jun 29, 2025</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Column 3: Recruiter Screening */}
        <div className={styles.column}>
          <div className={styles.colHeader} style={{ borderTop: '3px solid #D97706' }}>
            <span className={styles.colTitle}>Recruiter Screening</span>
            <span className={styles.colCount}>3</span>
          </div>
          <div className={styles.colCards}>
            <Link to="/candidate/dashboard" className={styles.kCard}>
              <div className={styles.kCardCompany}>TCS Digital</div>
              <div className={styles.kCardTitle}>React Native Lead</div>
              <div className={styles.kCardMeta}>₹22 – 32 LPA &middot; Hyderabad</div>
              <div className={styles.kCardFooter}>
                <span style={{ color: '#D97706', fontWeight: 600 }}>Call Scheduled</span>
                <span>Jul 4, 11:00 AM</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Column 4: Interview Stages */}
        <div className={styles.column}>
          <div className={styles.colHeader} style={{ borderTop: '3px solid var(--color-primary)' }}>
            <span className={styles.colTitle}>Interview Stages</span>
            <span className={styles.colCount}>2</span>
          </div>
          <div className={styles.colCards}>
            <Link to="/candidate/dashboard" className={styles.kCard} style={{ borderColor: 'var(--color-primary)' }}>
              <div className={styles.kCardCompany}>Zomato Media</div>
              <div className={styles.kCardTitle}>Senior Mobile Engineer</div>
              <div className={styles.kCardMeta}>₹20 – 30 LPA &middot; Remote</div>
              <div className={styles.kCardFooter}>
                <span style={{ color: 'var(--color-primary)', fontWeight: 700 }}>Round 2 Technical</span>
                <span>Jul 8, 2:00 PM</span>
              </div>
            </Link>
          </div>
        </div>

        {/* Column 5: Offer Extended */}
        <div className={styles.column}>
          <div className={styles.colHeader} style={{ borderTop: '3px solid #059669' }}>
            <span className={styles.colTitle}>Offer Extended</span>
            <span className={styles.colCount}>1</span>
          </div>
          <div className={styles.colCards}>
            <Link to="/candidate/dashboard" className={styles.kCard} style={{ backgroundColor: '#ECFDF5', borderColor: '#059669' }}>
              <div className={styles.kCardCompany} style={{ color: '#059669' }}>Razorpay</div>
              <div className={styles.kCardTitle}>Staff Mobile Engineer</div>
              <div className={styles.kCardMeta}>₹32,00,000 LPA Fixed</div>
              <div className={styles.kCardFooter}>
                <span style={{ color: '#059669', fontWeight: 700 }}>Offer Received</span>
                <span>Deadline Jul 10</span>
              </div>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
};
