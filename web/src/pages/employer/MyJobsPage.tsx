import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import styles from './MyJobsPage.module.css';

export const MyJobsPage = () => {
  return (
    <div className={styles.page}>
      
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Active Listings</h1>
          <p className={styles.subtitle}>Manage your current and past job postings.</p>
        </div>
        <Link to="/employer/post-job" style={{ textDecoration: 'none' }}>
          <Button>+ Post New Job</Button>
        </Link>
      </div>

      <Card className={styles.card}>
        
        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <Input placeholder="Search job titles..." />
          </div>
          <div className={styles.filters}>
            <select className={styles.select}>
              <option>All Statuses</option>
              <option>Active</option>
              <option>Draft</option>
              <option>Closed</option>
            </select>
          </div>
        </div>
        
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Job Title</th>
                <th>Status</th>
                <th>Applications</th>
                <th>Posted Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className={styles.roleText}>Senior React Native Developer</div>
                  <div className={styles.subText}>Bangalore (Hybrid) &bull; ₹18 – 26 LPA</div>
                </td>
                <td><Badge variant="success">Active</Badge></td>
                <td><span className={styles.highlightText}>45 candidates</span></td>
                <td><span className={styles.subText}>Jun 15, 2025</span></td>
                <td>
                  <div className={styles.actionGroup}>
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm" variant="ghost">Close</Button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles.roleText}>Backend Engineer (Node.js)</div>
                  <div className={styles.subText}>Remote &bull; ₹20 – 30 LPA</div>
                </td>
                <td><Badge variant="success">Active</Badge></td>
                <td><span className={styles.highlightText}>28 candidates</span></td>
                <td><span className={styles.subText}>Jun 20, 2025</span></td>
                <td>
                  <div className={styles.actionGroup}>
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm" variant="ghost">Close</Button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles.roleText}>Product Designer</div>
                  <div className={styles.subText}>Mumbai (On-Site)</div>
                </td>
                <td><Badge variant="warning">Draft</Badge></td>
                <td><span className={styles.subText}>0 candidates</span></td>
                <td><span className={styles.subText}>-</span></td>
                <td>
                  <div className={styles.actionGroup}>
                    <Button size="sm" variant="outline">Edit</Button>
                    <Button size="sm" variant="ghost">Delete</Button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
      
    </div>
  );
};
