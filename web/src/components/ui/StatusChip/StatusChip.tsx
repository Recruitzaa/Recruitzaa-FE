import styles from './StatusChip.module.css';

type Status = 'PENDING' | 'APPROVED' | 'REJECTED' | 'EXPIRED' |
              'SAVED' | 'APPLIED' | 'SCREENING' | 'INTERVIEW' | 'OFFER';

interface StatusChipProps {
  status: Status;
}

const LABELS: Record<Status, string> = {
  PENDING:   'Pending',
  APPROVED:  'Approved',
  REJECTED:  'Rejected',
  EXPIRED:   'Expired',
  SAVED:     'Saved',
  APPLIED:   'Applied',
  SCREENING: 'Screening',
  INTERVIEW: 'Interview',
  OFFER:     'Offer',
};

export const StatusChip = ({ status }: StatusChipProps) => (
  <span className={`${styles.chip} ${styles[status.toLowerCase()]}`}>
    {LABELS[status]}
  </span>
);
