import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { safeLocalStorage } from '../../../lib/safeStorage';

export interface UserProfile {
  userId: string;
  basicInfo: {
    name: string;
    phone: string;
    email: string;
    location: string;
    avatarUrl?: string;
  };
  education: Array<{
    institution: string;
    degree: string;
    fieldOfStudy: string;
    startDate: string;
    endDate?: string;
  }>;
  experience: Array<{
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    description?: string;
  }>;
  skills: string[];
  preferences: {
    desiredRole: string;
    locations: string[];
    salaryRange: { min: number; max: number };
    workMode: 'remote' | 'hybrid' | 'onsite';
  };
}

/**
 * Profile API Service — Handles RTK Query server state for candidate profiles.
 * Features caching and cache invalidation via the 'Profile' tag type.
 */
export const profileApi = createApi({
  reducerPath: 'profileApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1',
    prepareHeaders: (headers) => {
      // Retrieve JWT tokens from localStorage or MMKV equivalent
      const token = safeLocalStorage.getItem('accessToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['Profile'],
  endpoints: (builder) => ({
    getProfile: builder.query<UserProfile, void>({
      query: () => '/profile/me',
      providesTags: ['Profile'],
    }),
    updateProfile: builder.mutation<UserProfile, Partial<UserProfile>>({
      query: (patch) => ({
        url: '/profile/me',
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation } = profileApi;
