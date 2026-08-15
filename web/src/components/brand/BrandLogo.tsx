import logo from '../../assets/logo.png';
import logoDark from '../../assets/logo-dark.png';
import styles from './BrandLogo.module.css';

interface BrandLogoProps {
  width?: number;
  height?: number;
  className?: string;
  /**
   * Use when the logo sits on a surface whose color doesn't follow the
   * site-wide theme (e.g. the footer, which is always dark). Overrides the
   * theme-driven choice so the wordmark stays legible against its actual
   * background rather than the current app theme.
   */
  forceVariant?: 'light' | 'dark';
}

export const BrandLogo = ({
  width = 140,
  height = 36,
  className,
  forceVariant,
}: BrandLogoProps) => {
  const containerStyle: React.CSSProperties = {
    display: 'inline-flex',
    overflow: 'hidden',
    width: `${width}px`,
    height: `${height}px`,
  };

  const imageStyle: React.CSSProperties = {
    display: 'block',
    width: '100%',
    height: 'auto',
  };

  if (forceVariant === 'dark') {
    return (
      <span style={containerStyle} className={className}>
        <img src={logoDark} alt="Recruitzaa" style={imageStyle} />
      </span>
    );
  }

  if (forceVariant === 'light') {
    return (
      <span style={containerStyle} className={className}>
        <img src={logo} alt="Recruitzaa" style={imageStyle} />
      </span>
    );
  }

  return (
    <span style={containerStyle} className={`${styles.logoWrapper} ${className || ''}`}>
      <img src={logo} alt="Recruitzaa" style={imageStyle} className={styles.logoLight} />
      <img src={logoDark} alt="Recruitzaa" style={imageStyle} className={styles.logoDark} />
    </span>
  );
};
