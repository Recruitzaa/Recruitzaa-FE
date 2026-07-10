import React from 'react';
import styles from './Card.module.css';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'elevated' | 'flat';
}

export const Card = ({ children, variant = 'default', className, ...props }: CardProps) => {
  return (
    <div className={[styles.card, styles[`variant-${variant}`], className].filter(Boolean).join(' ')} {...props}>
      {children}
    </div>
  );
};
