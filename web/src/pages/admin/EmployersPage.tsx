import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import styles from './UsersPage.module.css';

export const EmployersPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Employer Accounts</h1>
          <p className={styles.subtitle}>
            Manage individual recruiter and hiring manager accounts.
          </p>
        </div>
      </div>

      <Card className={styles.card}>
        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <Input placeholder="Search by name, email, or company..." />
          </div>
          <div className={styles.filters}>
            <select className={styles.select}>
              <option>All Statuses</option>
              <option>Active</option>
              <option>Pending Invite</option>
              <option>Suspended</option>
            </select>
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Employer Account</th>
                <th>Company</th>
                <th>Active Jobs</th>
                <th>Joined Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className={styles.userInfo}>
                    <div className={`${styles.avatar} bg-[#1e2229] text-white`}>IN</div>
                    <div>
                      <div className={styles.roleText}>Infosys HR</div>
                      <div className={styles.subText}>hr@infosys.com</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={styles.subTextDark}>Infosys Limited</span>
                </td>
                <td>
                  <span className={styles.subTextDark}>4</span>
                </td>
                <td>
                  <span className={styles.subText}>May 28, 2025</span>
                </td>
                <td>
                  <Badge variant="success">Active</Badge>
                </td>
                <td>
                  <Button size="sm" variant="outline">
                    Manage
                  </Button>
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles.userInfo}>
                    <div className={`${styles.avatar} bg-red-600 text-white`}>JP</div>
                    <div>
                      <div className={styles.roleText}>John Patel</div>
                      <div className={styles.subText}>john.p@zomato.com</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={styles.subTextDark}>Zomato Media</span>
                </td>
                <td>
                  <span className={styles.subTextDark}>1</span>
                </td>
                <td>
                  <span className={styles.subText}>Jul 10, 2025</span>
                </td>
                <td>
                  <Badge variant="warning">Pending Invite</Badge>
                </td>
                <td>
                  <Button size="sm" variant="outline">
                    Resend
                  </Button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};
