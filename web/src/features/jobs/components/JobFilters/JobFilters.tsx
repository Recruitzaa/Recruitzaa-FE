import styles from './JobFilters.module.css';

export const JobFilters = () => {
  return (
    <div className={styles.filterPanel}>
      <div className={styles.filterHead}>
        <h3>Filter Listings</h3>
        <button className={styles.filterReset}>Reset All</button>
      </div>

      <div className={styles.filterGroup}>
        <div className={styles.groupTitle}>Work Mode</div>
        <label className={styles.option}>
          <div className={styles.checkboxWrapper}>
            <input type="checkbox" defaultChecked /> Remote
          </div>
          <span className={styles.count}>1,420</span>
        </label>
        <label className={styles.option}>
          <div className={styles.checkboxWrapper}>
            <input type="checkbox" defaultChecked /> Hybrid
          </div>
          <span className={styles.count}>2,110</span>
        </label>
        <label className={styles.option}>
          <div className={styles.checkboxWrapper}>
            <input type="checkbox" /> On-Site
          </div>
          <span className={styles.count}>1,291</span>
        </label>
      </div>

      <div className={styles.filterGroup}>
        <div className={styles.groupTitle}>Employment Type</div>
        <label className={styles.option}>
          <div className={styles.checkboxWrapper}>
            <input type="checkbox" defaultChecked /> Full-Time Permanent
          </div>
          <span className={styles.count}>3,890</span>
        </label>
        <label className={styles.option}>
          <div className={styles.checkboxWrapper}>
            <input type="checkbox" /> Contract Staffing
          </div>
          <span className={styles.count}>740</span>
        </label>
      </div>

      <div className={styles.filterGroup}>
        <div className={styles.groupTitle}>Salary Range (LPA)</div>
        <label className={styles.option}>
          <div className={styles.checkboxWrapper}>
            <input type="checkbox" /> ₹10 LPA – ₹15 LPA
          </div>
          <span className={styles.count}>820</span>
        </label>
        <label className={styles.option}>
          <div className={styles.checkboxWrapper}>
            <input type="checkbox" defaultChecked /> ₹15 LPA – ₹25 LPA
          </div>
          <span className={styles.count}>2,340</span>
        </label>
        <label className={styles.option}>
          <div className={styles.checkboxWrapper}>
            <input type="checkbox" /> ₹25 LPA+
          </div>
          <span className={styles.count}>1,660</span>
        </label>
      </div>
    </div>
  );
};
