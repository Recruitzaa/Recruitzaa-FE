import { Navigate, useLocation } from 'react-router-dom';

/** Legacy /auth → /login, preserving query string. */
export const AuthRedirect = () => {
  const location = useLocation();
  return <Navigate to={{ pathname: '/login', search: location.search }} replace />;
};
