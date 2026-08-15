import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { AuthRedirect } from './AuthRedirect';

const LoginProbe = () => {
  const location = useLocation();
  return (
    <div>
      Login page{location.search}
      {location.hash}
    </div>
  );
};

const RegisterProbe = () => {
  const location = useLocation();
  return (
    <div>
      Register page{location.search}
      {location.hash}
    </div>
  );
};

const renderAuthRedirect = (entry: { pathname: string; search?: string; hash?: string }) =>
  render(
    <MemoryRouter initialEntries={[entry]}>
      <Routes>
        <Route path="/auth" element={<AuthRedirect />} />
        <Route path="/login" element={<LoginProbe />} />
        <Route path="/register" element={<RegisterProbe />} />
      </Routes>
    </MemoryRouter>
  );

describe('AuthRedirect', () => {
  it('preserves query params when redirecting legacy /auth to login', () => {
    renderAuthRedirect({ pathname: '/auth', search: '?next=%2Fjobs' });

    expect(screen.getByText('Login page?next=%2Fjobs')).toBeInTheDocument();
  });

  it('preserves the hash fragment when redirecting', () => {
    renderAuthRedirect({ pathname: '/auth', search: '?next=%2Fjobs', hash: '#panel' });

    expect(screen.getByText('Login page?next=%2Fjobs#panel')).toBeInTheDocument();
  });

  it('routes candidate registration intent to /register', () => {
    renderAuthRedirect({ pathname: '/auth', search: '?intent=candidate' });

    expect(screen.getByText('Register page?intent=candidate')).toBeInTheDocument();
  });

  it('routes employer registration intent to /register', () => {
    renderAuthRedirect({ pathname: '/auth', search: '?intent=employer' });

    expect(screen.getByText('Register page?intent=employer')).toBeInTheDocument();
  });

  it('defaults to /login when there is no registration intent', () => {
    renderAuthRedirect({ pathname: '/auth' });

    expect(screen.getByText('Login page')).toBeInTheDocument();
  });
});
