import logo from '../../assets/logo.png';
import logoDark from '../../assets/logo-dark.svg';
import { useTheme } from '../../hooks/useTheme';

interface BrandLogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export const BrandLogo = ({ width = 140, height = 36, className }: BrandLogoProps) => {
  const { isDark } = useTheme();

  return (
    <img
      src={isDark ? logoDark : logo}
      alt="Recruitzaa"
      width={width}
      height={height}
      className={className}
    />
  );
};
