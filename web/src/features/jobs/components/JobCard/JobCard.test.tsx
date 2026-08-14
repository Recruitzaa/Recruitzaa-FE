import { fireEvent, render, screen } from '@testing-library/react';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it, vi } from 'vitest';

import authReducer from '../../../../store/slices/auth.slice';
import type { AppUser } from '../../../../types/auth.types';
import { JobCard } from './JobCard';

vi.mock('../../../../hooks/useToast', () => ({
  useToast: () => ({ info: vi.fn(), success: vi.fn(), error: vi.fn() }),
}));

const candidateUser: AppUser = {
  id: '1',
  email: 'alex@example.com',
  role: 'CANDIDATE',
  availableRoles: ['CANDIDATE'],
  activeRole: 'CANDIDATE',
  displayName: 'Alex',
};

const renderCard = (authenticated = false) => {
  const store = configureStore({
    reducer: { auth: authReducer },
    preloadedState: {
      auth: {
        isAuthenticated: authenticated,
        isLoading: false,
        error: null,
        appUser: authenticated ? candidateUser : null,
      },
    },
  });

  return render(
    <HelmetProvider>
      <Provider store={store}>
        <MemoryRouter>
          <JobCard
            id="job-1"
            title="Staff Engineer"
            company="Acme"
            location="Remote"
            type="Remote"
            salary="₹20 LPA"
            postedAt="Today"
            matchScore={90}
            tags={['React']}
            avatarText="AC"
            avatarColor="#000"
            listOrigin="/jobs"
          />
        </MemoryRouter>
      </Provider>
    </HelmetProvider>
  );
};

describe('JobCard', () => {
  it('allows authenticated candidates to toggle saved state', () => {
    renderCard(true);
    fireEvent.click(screen.getByRole('button', { name: /save staff engineer/i }));
    expect(screen.getByRole('button', { name: /remove staff engineer/i })).toBeInTheDocument();
  });
});
