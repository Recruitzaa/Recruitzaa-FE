import logo from '../../assets/logo.png';
import logoDark from '../../assets/logo-dark.png';
import { useTheme } from '../../hooks/useTheme';

interface BrandLogoProps {
  width?: number;
  height?: number;
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
  width = 140,
  height = 36,
  className,
  forceVariant,
}: BrandLogoProps) => {
  const { isDark } = useTheme();
  const useDark = forceVariant ? forceVariant === 'dark' : isDark;

  return (
    <img
      src={useDark ? logoDark : logo}
      alt="Recruitzaa"
      width={width}
      height={height}
      className={className}
      style={{ width: `${width}px`, height: `${height}px` }}
    />
  );
};
