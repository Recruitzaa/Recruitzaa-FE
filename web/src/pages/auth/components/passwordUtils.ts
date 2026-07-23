export type PasswordStrength = 'weak' | 'fair' | 'good' | 'strong';

export interface PasswordCriteria {
  minLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecial: boolean;
}

export interface PasswordStrengthResult {
  score: number;
  strength: PasswordStrength;
  criteria: PasswordCriteria;
  label: string;
  percent: number;
}

const SPECIAL_CHAR_PATTERN = /[^A-Za-z0-9]/;

export const evaluatePasswordStrength = (password: string): PasswordStrengthResult => {
  const criteria: PasswordCriteria = {
    minLength: password.length >= 8,
    hasUppercase: /[A-Z]/.test(password),
    hasLowercase: /[a-z]/.test(password),
    hasNumber: /\d/.test(password),
    hasSpecial: SPECIAL_CHAR_PATTERN.test(password),
  };

  const score = Object.values(criteria).filter(Boolean).length;

  let strength: PasswordStrength = 'weak';
  let label = 'Weak';
  let percent = 25;

  if (score >= 5) {
    strength = 'strong';
    label = 'Strong';
    percent = 100;
  } else if (score >= 4) {
    strength = 'good';
    label = 'Good';
    percent = 75;
  } else if (score >= 3) {
    strength = 'fair';
    label = 'Fair';
    percent = 50;
  }

  return { score, strength, criteria, label, percent };
};

export const isPasswordValid = (password: string) => {
  const { criteria } = evaluatePasswordStrength(password);
  return criteria.minLength && criteria.hasLowercase && criteria.hasNumber;
};
