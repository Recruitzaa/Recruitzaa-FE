import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom';
import { describe, expect, it } from 'vitest';

import { AuthRedirect } from './AuthRedirect';

const LoginProbe = () => {
  const location = useLocation();
  return <div>Login page{location.search}</div>;
};

describe('AuthRedirect', () => {
  it('preserves query params when redirecting legacy /auth', () => {
    render(
      <MemoryRouter initialEntries={[{ pathname: '/auth', search: '?next=%2Fjobs' }]}>
        <Routes>
          <Route path="/auth" element={<AuthRedirect />} />
          <Route path="/login" element={<LoginProbe />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Login page?next=%2Fjobs')).toBeInTheDocument();
  });
});
