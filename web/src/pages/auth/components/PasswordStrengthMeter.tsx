import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';
import styles from './PasswordStrengthMeter.module.css';
import { evaluatePasswordStrength } from './passwordUtils';

interface PasswordStrengthMeterProps {
  password: string;
  showCriteria?: boolean;
}

const STRENGTH_CLASS = {
  weak: styles.weak,
  fair: styles.fair,
  good: styles.good,
  strong: styles.strong,
} as const;

export const PasswordStrengthMeter = ({
  password,
  showCriteria = true,
}: PasswordStrengthMeterProps) => {
  const { strength, label, percent, criteria } = evaluatePasswordStrength(password);

  if (!password) {
    return null;
  }

  const criteriaItems = [
    { key: 'minLength', label: 'At least 8 characters', met: criteria.minLength },
    { key: 'hasUppercase', label: 'One uppercase letter', met: criteria.hasUppercase },
    { key: 'hasLowercase', label: 'One lowercase letter', met: criteria.hasLowercase },
    { key: 'hasNumber', label: 'One number', met: criteria.hasNumber },
    { key: 'hasSpecial', label: 'One special character', met: criteria.hasSpecial },
  ];

  return (
    <div className={styles.wrapper} aria-live="polite">
      <div className={styles.header}>
        <span className={styles.title}>Password strength</span>
        <span className={[styles.badge, STRENGTH_CLASS[strength]].join(' ')}>{label}</span>
      </div>

      <div
        className={styles.track}
        role="meter"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
        aria-label={`Password strength: ${label}`}
      >
        <motion.div
          className={[styles.fill, STRENGTH_CLASS[strength]].join(' ')}
          initial={false}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        />
      </div>

      {showCriteria && (
        <ul className={styles.criteria}>
          {criteriaItems.map((item) => (
            <li key={item.key} className={item.met ? styles.criteriaMet : styles.criteriaUnmet}>
              {item.met ? (
                <Check size={14} aria-hidden="true" />
              ) : (
                <X size={14} aria-hidden="true" />
              )}
              <span>{item.label}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
