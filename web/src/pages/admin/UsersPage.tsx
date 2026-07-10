import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import styles from './UsersPage.module.css';

export const UsersPage = () => {
  return (
    <div className={styles.page}>
      
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Candidate Users</h1>
          <p className={styles.subtitle}>Manage all registered job seeker accounts on the platform.</p>
        </div>
      </div>

      <Card className={styles.card}>
        
        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <Input placeholder="Search by name, email, or role..." />
          </div>
          <div className={styles.filters}>
            <select className={styles.select}>
              <option>All Statuses</option>
              <option>Active</option>
              <option>Inactive</option>
              <option>Banned</option>
            </select>
          </div>
        </div>
        
        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Role Category</th>
                <th>Applications</th>
                <th>Joined Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className={styles.userInfo}>
                    <div className={styles.avatar}>AK</div>
                    <div>
                      <div className={styles.roleText}>Arjun Kumar</div>
                      <div className={styles.subText}>arjun@example.com</div>
                    </div>
                  </div>
                </td>
                <td><span className={styles.subTextDark}>Software Engineering</span></td>
                <td><span className={styles.subTextDark}>24</span></td>
                <td><span className={styles.subText}>May 12, 2025</span></td>
                <td><Badge variant="success">Active</Badge></td>
                <td>
                  <Button size="sm" variant="outline">View Profile</Button>
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles.userInfo}>
                    <div className={styles.avatar} style={{backgroundColor: '#059669'}}>SR</div>
                    <div>
                      <div className={styles.roleText}>Sneha Rao</div>
                      <div className={styles.subText}>sneha@example.com</div>
                    </div>
                  </div>
                </td>
                <td><span className={styles.subTextDark}>Backend Engineering</span></td>
                <td><span className={styles.subTextDark}>8</span></td>
                <td><span className={styles.subText}>Jun 01, 2025</span></td>
                <td><Badge variant="success">Active</Badge></td>
                <td>
                  <Button size="sm" variant="outline">View Profile</Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
      
    </div>
  );
};
