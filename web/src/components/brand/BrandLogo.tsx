import logoIcon from '../../assets/logo-icon.png';
import logoIconDark from '../../assets/logo-dark-icon.png';
import { useTheme } from '../../hooks/useTheme';
import styles from './BrandLogo.module.css';

const ICON_ASPECT = 261 / 248;

interface BrandLogoProps {
  /** Icon height in px. Wordmark and tagline scale relative to this. */
  size?: number;
  /** Show the "Your Next Great Hire Starts Here" tagline beneath the wordmark. */
  tagline?: boolean;
  className?: string;
  /**
   * Use when the logo sits on a surface whose color doesn't follow the
   * site-wide theme. Overrides the theme-driven choice so the wordmark
   * stays legible against its actual background rather than the current
   * app theme.
   */
  forceVariant?: 'light' | 'dark';
}

export const BrandLogo = ({
  size = 36,
  tagline = true,
  className,
  forceVariant,
}: BrandLogoProps) => {
  const { isDark } = useTheme();
  const useDark = forceVariant ? forceVariant === 'dark' : isDark;
  const iconWidth = Math.round(size * ICON_ASPECT);
  const wordmarkSize = Math.round(size * 0.62);
  const taglineSize = Math.max(9, Math.round(size * 0.24));

  return (
    <span className={`${styles.lockup} ${className || ''}`}>
      <img
        src={useDark ? logoIconDark : logoIcon}
        alt=""
        width={iconWidth}
        height={size}
        style={{ width: `${iconWidth}px`, height: `${size}px` }}
        className={styles.icon}
      />
      <span className={styles.textGroup}>
        <span className={styles.wordmark} style={{ fontSize: `${wordmarkSize}px` }}>
          <span className={styles.recruit}>Recruit</span>
          <span className={useDark ? styles.zaaDark : styles.zaaLight}>zaa</span>
        </span>
        {tagline && (
          <span
            className={`${styles.tagline} ${useDark ? styles.taglineDark : styles.taglineLight}`}
            style={{ fontSize: `${taglineSize}px` }}
          >
            Your Next Great Hire Starts Here
          </span>
        )}
      </span>
    </span>
  );
};
