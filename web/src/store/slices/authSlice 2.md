# authSlice Context

Global state slice to manage authenticated user session, multi-role workspace authorization details, and loading states.

## Interfaces

- State Schema: `AuthState`
  ```typescript
  interface AuthState {
    appUser: AppUser | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
  }
  ```
- Multi-Role Properties in `AppUser`:
  - `availableRoles: UserRole[]`: Array of roles the user possesses.
  - `activeRole: UserRole`: Current active workspace role.
  - `role: UserRole`: Copy of activeRole for backward-compatibility.
- Actions:
  - `setUser(AppUser)`: Pure reducer action. Boots state with user credentials, seeding available roles (e.g. Candidates also get Expert workspace) if not already set.
  - `clearUser()`: Resets authentication parameters.
  - `updateUserProfile(Partial<AppUser>)`: Pure reducer action. Updates internal profile state.
  - `switchActiveRole(UserRole)`: Safely mutates `activeRole` and `role` to toggle workspace states.
  - `setAuthLoading(boolean)`: Toggles loading indicator.
  - `setAuthError(string)`: Logs authentication failure states.

## Persistence

Reducers are pure and side-effect free. State updates (except the volatile Firebase auth session role payload token claims) are serialized to `profile_override_[userId]` localStorage asynchronously and non-blockingly via store subscription `store.subscribe()` inside `src/store/index.ts`.

## Mini-Payload Example

```json
{
  "appUser": {
    "id": "u1",
    "email": "candidate@recruitzaa.com",
    "role": "CANDIDATE",
    "activeRole": "CANDIDATE",
    "availableRoles": ["CANDIDATE", "EXPERT"],
    "displayName": "Candidate User"
  },
  "isAuthenticated": true,
  "isLoading": false,
  "error": null
}
```
