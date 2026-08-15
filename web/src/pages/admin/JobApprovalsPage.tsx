import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import styles from './JobApprovalsPage.module.css';
import { SEO } from '../../components/seo/SEO';

export const JobApprovalsPage = () => {
  return (
    <div className={styles.page}>
      <SEO
        title="Job Approvals | Recruitzaa Admin"
        description="Approve or reject newly submitted employer job postings."
      />
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Job Approvals</h1>
          <p className={styles.subtitle}>
            Review and approve new job postings before they go live on the platform.
          </p>
        </div>
      </div>

      <Card className={styles.card}>
        <div className={styles.toolbar}>
          <div className={styles.searchBox}>
            <Input placeholder="Search by company or job title..." />
          </div>
          <div className={styles.filters}>
            <select className={styles.select} aria-label="Filter approvals by status">
              <option>Status: Pending</option>
              <option>Status: Approved</option>
              <option>Status: Rejected</option>
            </select>
          </div>
        </div>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Company</th>
                <th>Job Details</th>
                <th>Submitted By</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className={styles.companyInfo}>
                    <div className={styles.avatar}>TCS</div>
                    <div className={styles.roleText}>TCS Digital</div>
                  </div>
                </td>
                <td>
                  <div className={styles.subTextDark}>React Native Architect</div>
                  <div className={styles.subText}>₹30 – 45 LPA &bull; Remote</div>
                </td>
                <td>
                  <div className={styles.subTextDark}>HR Admin</div>
                </td>
                <td>
                  <span className={styles.subText}>Jul 10, 2025</span>
                </td>
                <td>
                  <Badge variant="warning">Pending</Badge>
                </td>
                <td>
                  <div className={styles.actionGroup}>
                    <Button
                      size="sm"
                      className="bg-emerald-600 border-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      Approve
                    </Button>
                    <Button size="sm" variant="outline">
                      Review
                    </Button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles.companyInfo}>
                    <div className={`${styles.avatar} bg-blue-500 text-white`}>WIP</div>
                    <div className={styles.roleText}>Wipro Limited</div>
                  </div>
                </td>
                <td>
                  <div className={styles.subTextDark}>Senior Backend Engineer</div>
                  <div className={styles.subText}>₹25 – 35 LPA &bull; Bangalore</div>
                </td>
                <td>
                  <div className={styles.subTextDark}>Talent Acquisition</div>
                </td>
                <td>
                  <span className={styles.subText}>Jul 9, 2025</span>
                </td>
                <td>
                  <Badge variant="warning">Pending</Badge>
                </td>
                <td>
                  <div className={styles.actionGroup}>
                    <Button
                      size="sm"
                      className="bg-emerald-600 border-emerald-600 hover:bg-emerald-700 text-white"
                    >
                      Approve
                    </Button>
                    <Button size="sm" variant="outline">
                      Review
                    </Button>
                  </div>
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles.companyInfo}>
                    <div className={`${styles.avatar} bg-emerald-600 text-white`}>INF</div>
                    <div className={styles.roleText}>Infosys Limited</div>
                  </div>
                </td>
                <td>
                  <div className={styles.subTextDark}>Junior Developer</div>
                  <div className={styles.subText}>₹8 – 12 LPA &bull; Hybrid</div>
                </td>
                <td>
                  <div className={styles.subTextDark}>HR Admin</div>
                </td>
                <td>
                  <span className={styles.subText}>Jul 8, 2025</span>
                </td>
                <td>
                  <Badge variant="success">Approved</Badge>
                </td>
                <td>
                  <Button size="sm" variant="ghost">
                    View Details
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
