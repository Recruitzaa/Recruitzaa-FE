import { useEffect, useState } from 'react';

interface UserAvatarProps {
  photoUrl?: string | null;
  name?: string;
  fallbackText?: string;
  alt?: string;
}

const getInitials = (name?: string, fallback = 'U') => {
  if (!name) return fallback;
  const initials = name
    .split(' ')
    .map((part) => part[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();
  return initials || fallback;
};

/**
 * Renders the signed-in user's photo (e.g. from Google sign-in) when
 * available, falling back to initials — both on a missing photoUrl and on a
 * failed image load (some provider photo URLs 403 depending on referrer
 * policy, so this must degrade gracefully rather than show a broken image).
 * Fills its parent's dimensions; the parent controls size/shape/border.
 */
export const UserAvatar = ({ photoUrl, name, fallbackText = 'U', alt }: UserAvatarProps) => {
  const [errored, setErrored] = useState(false);

  useEffect(() => {
    setErrored(false);
  }, [photoUrl]);

  if (photoUrl && !errored) {
    return (
      <img
        src={photoUrl}
        alt={alt ?? (name ? `${name}’s profile photo` : 'Profile photo')}
        referrerPolicy="no-referrer"
        className="w-full h-full rounded-full object-cover"
        onError={() => setErrored(true)}
      />
    );
  }

  return <>{getInitials(name, fallbackText)}</>;
};
