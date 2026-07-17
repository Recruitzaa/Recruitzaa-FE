import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import styles from './CompaniesPage.module.css';

export const CompaniesPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Company Directory</h1>
          <p className={styles.subtitle}>
            Manage verified enterprise and agency companies on the platform.
          </p>
        </div>
        <Button>+ Add Company</Button>
      </div>

      <Card className={styles.card}>
        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <Input placeholder="Search by company name or domain..." />
          </div>
          <div className={styles.filters}>
            <select className={styles.select}>
              <option>All Statuses</option>
              <option>Verified</option>
              <option>Pending Verification</option>
              <option>Suspended</option>
            </select>
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Company</th>
                <th>Plan Level</th>
                <th>Active Jobs</th>
                <th>Admin Users</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className={styles.companyInfo}>
                    <div className={styles.avatar}>TCS</div>
                    <div>
                      <div className={styles.roleText}>TCS Digital</div>
                      <div className={styles.subText}>tcs.com</div>
                    </div>
                  </div>
                </td>
                <td>
                  <Badge variant="primary">Enterprise</Badge>
                </td>
                <td>
                  <span className={styles.subTextDark}>14</span>
                </td>
                <td>
                  <span className={styles.subTextDark}>3</span>
                </td>
                <td>
                  <Badge variant="success">Verified</Badge>
                </td>
                <td>
                  <Button size="sm" variant="outline">
                    Manage
                  </Button>
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles.companyInfo}>
                    <div className={`${styles.avatar} bg-emerald-600 text-white`}>INF</div>
                    <div>
                      <div className={styles.roleText}>Infosys Limited</div>
                      <div className={styles.subText}>infosys.com</div>
                    </div>
                  </div>
                </td>
                <td>
                  <Badge variant="primary">Enterprise</Badge>
                </td>
                <td>
                  <span className={styles.subTextDark}>4</span>
                </td>
                <td>
                  <span className={styles.subTextDark}>1</span>
                </td>
                <td>
                  <Badge variant="success">Verified</Badge>
                </td>
                <td>
                  <Button size="sm" variant="outline">
                    Manage
                  </Button>
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles.companyInfo}>
                    <div className={`${styles.avatar} bg-red-600 text-white`}>ZOM</div>
                    <div>
                      <div className={styles.roleText}>Zomato Media</div>
                      <div className={styles.subText}>zomato.com</div>
                    </div>
                  </div>
                </td>
                <td>
                  <Badge variant="warning">Pro</Badge>
                </td>
                <td>
                  <span className={styles.subTextDark}>1</span>
                </td>
                <td>
                  <span className={styles.subTextDark}>2</span>
                </td>
                <td>
                  <Badge variant="warning">Pending Verification</Badge>
                </td>
                <td>
                  <Button size="sm" variant="outline">
                    Manage
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
