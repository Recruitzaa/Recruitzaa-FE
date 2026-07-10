import { Link } from 'react-router-dom';
import { Button } from '../../ui/Button';
import styles from './AdminTopbar.module.css';

export const AdminTopbar = () => {
  return (
    <div className={styles.topbar}>
      <div>
        <div className={styles.breadcrumbs}>
          <Link to="/">Home</Link> <span>/</span> <Link to="/admin/dashboard">Super Admin</Link>
        </div>
        <div className={styles.greeting}>RecruitZaa Admin Control</div>
      </div>
      <div className={styles.actions}>
        <Button variant="outline">Generate Report</Button>
      </div>
    </div>
  );
};
