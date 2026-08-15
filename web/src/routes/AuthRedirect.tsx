import { Navigate, useLocation } from 'react-router-dom';
import { ROUTES } from '../config/routes';

/**
 * Legacy /auth → /login or /register, preserving the registration intent,
 * query string, and hash fragment.
 */
export const AuthRedirect = () => {
  const location = useLocation();
  const intent = new URLSearchParams(location.search).get('intent');
  const pathname =
    intent === 'candidate' || intent === 'employer' ? ROUTES.AUTH.REGISTER : ROUTES.AUTH.LOGIN;

  return <Navigate to={{ pathname, search: location.search, hash: location.hash }} replace />;
};
