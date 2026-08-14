import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Input } from '../../components/ui/Input';
import styles from './CandidatesPage.module.css';

export const CandidatesPage = () => {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Candidate Pipeline</h1>
          <p className={styles.subtitle}>
            Review and manage applicants across all your active job postings.
          </p>
        </div>
      </div>

      <Card className={styles.card}>
        <form className={styles.toolbar} onSubmit={(e) => e.preventDefault()}>
          <div className={styles.searchBox}>
            <Input placeholder="Search by name or email..." aria-label="Search candidates" />
          </div>
          <div className={styles.filters}>
            <select className={styles.select} aria-label="Filter by job">
              <option>All Jobs</option>
              <option>Senior React Native Developer</option>
              <option>Backend Engineer (Node.js)</option>
            </select>
            <select className={styles.select} aria-label="Filter by stage">
              <option>All Stages</option>
              <option>New</option>
              <option>Screening</option>
              <option>Interview</option>
              <option>Offer</option>
            </select>
          </div>
        </form>

        <div className={styles.tableWrapper}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Candidate</th>
                <th>Applied For</th>
                <th>AI Match Score</th>
                <th>Stage</th>
                <th>Applied Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <div className={styles.candidateProfile}>
                    <div className={styles.avatar}>AK</div>
                    <div>
                      <div className={styles.roleText}>Arjun Kumar</div>
                      <div className={styles.subText}>React Native Developer</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={styles.subTextDark}>Senior React Native Developer</span>
                </td>
                <td>
                  <span className={styles.scoreText}>94% Match</span>
                </td>
                <td>
                  <Badge variant="warning">New</Badge>
                </td>
                <td>
                  <span className={styles.subText}>Jul 9, 2025</span>
                </td>
                <td>
                  <Button size="sm" variant="outline">
                    Review Profile
                  </Button>
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles.candidateProfile}>
                    <div className={`${styles.avatar} bg-emerald-600 text-white`}>SR</div>
                    <div>
                      <div className={styles.roleText}>Sneha Rao</div>
                      <div className={styles.subText}>Backend Developer</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={styles.subTextDark}>Backend Engineer (Node.js)</span>
                </td>
                <td>
                  <span className={styles.scoreText}>88% Match</span>
                </td>
                <td>
                  <Badge variant="success">Screening</Badge>
                </td>
                <td>
                  <span className={styles.subText}>Jul 8, 2025</span>
                </td>
                <td>
                  <Button size="sm" variant="outline">
                    Review Profile
                  </Button>
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles.candidateProfile}>
                    <div className={`${styles.avatar} bg-blue-500 text-white`}>DP</div>
                    <div>
                      <div className={styles.roleText}>David Park</div>
                      <div className={styles.subText}>Full Stack Developer</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={styles.subTextDark}>Senior React Native Developer</span>
                </td>
                <td>
                  <span className={styles.scoreText}>82% Match</span>
                </td>
                <td>
                  <Badge variant="primary">Interview</Badge>
                </td>
                <td>
                  <span className={styles.subText}>Jul 5, 2025</span>
                </td>
                <td>
                  <Button size="sm" variant="outline">
                    Review Profile
                  </Button>
                </td>
              </tr>
              <tr>
                <td>
                  <div className={styles.candidateProfile}>
                    <div className={`${styles.avatar} bg-violet-500 text-white`}>MJ</div>
                    <div>
                      <div className={styles.roleText}>Maya Johnson</div>
                      <div className={styles.subText}>Senior Engineer</div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className={styles.subTextDark}>Backend Engineer (Node.js)</span>
                </td>
                <td>
                  <span className={styles.scoreText}>97% Match</span>
                </td>
                <td>
                  <Badge variant="success">Offer Extended</Badge>
                </td>
                <td>
                  <span className={styles.subText}>Jun 28, 2025</span>
                </td>
                <td>
                  <Button size="sm" variant="outline">
                    Review Profile
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
