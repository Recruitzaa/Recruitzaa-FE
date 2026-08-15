# Recruitzaa-FE: Quick Navigation Guide

**Last Updated:** 2026-08-15 | **Graph Status:** Current (commit 8015b9b4)

---

## By Role / Workspace

### 👤 Candidate (Job Seeker)

- **Pages:** `DashboardPage.tsx`, `JobListingsPage.tsx`, `ProfilePage.tsx`
- **Main Store:** `jobs`, `profile`, `applications` slices
- **Key Routes:** `/candidate/dashboard`, `/candidate/jobs`, `/candidate/jobs/:id`, `/candidate/profile`
- **Auth Role:** `candidate`
- **Key Components:** `JobCard`, `JobFilterPanel`, `ProfileWizardContainer`, `ApplicationCard`

**Entry Points:**

- Job search: `src/pages/candidate/JobListingsPage.tsx`
- Profile builder: `src/features/profile/forms/ProfileWizardContainer.tsx`
- Dashboard: `src/pages/candidate/DashboardPage.tsx`

---

### 💼 Employer (Recruiter)

- **Pages:** `DashboardPage.tsx`, `CompaniesPage.tsx`, `EmployerProfilePage.tsx`
- **Main Store:** `employer` slice (posted jobs, candidates)
- **Key Routes:** `/employer/dashboard`, `/employer/companies`, `/employer/profile`
- **Auth Role:** `employer` (requires company verification)
- **Key Components:** `EmployerDashboard`, `CompanyCard`, `JobPostingForm`

**Entry Points:**

- Dashboard: `src/pages/employer/DashboardPage.tsx`
- Company management: `src/pages/employer/CompaniesPage.tsx`

---

### 🔑 Admin

- **Pages:** `UsersPage.tsx`, `CompaniesPage.tsx`
- **Main Store:** Direct API calls (no Redux)
- **Key Routes:** `/admin/users`, `/admin/companies`
- **Auth Role:** `admin` only
- **Permissions:** User provisioning, company approval/deletion

**Entry Points:**

- User management: `src/pages/admin/UsersPage.tsx`
- Company management: `src/pages/admin/CompaniesPage.tsx`

---

## By Feature

### 🔐 Authentication

**Flow:** `LoginForm` → `RegisterForm` → `auth.service.ts` → Firebase + Backend API

**Key Files:**

- Forms: `src/features/auth/forms/LoginForm.tsx`, `RegisterForm.tsx`
- Service: `src/services/auth.service.ts`
- Redux: `src/features/auth/auth.slice.ts`
- Guard: `src/components/RoleGuard.tsx` (role validation)

**Store Selectors:**

- `selectAuthUser` → Current Firebase user
- `selectAuthRole` → Current role (candidate/employer/admin)
- `selectIsAuthenticated` → Boolean auth status
- `selectAuthToken` → JWT for API calls

**Common Tasks:**

- Add new auth field: Update `AppUser` type in `config/types.ts` + `auth.slice.ts`
- Change login flow: Edit `LoginForm.tsx` → `auth.service.ts` → `auth.slice.ts`
- Add role: `auth.slice.ts` reducer + `RoleGuard.tsx` + `routes.meta.ts`

---

### 💼 Job Search & Discovery

**Flow:** Search form → RTK Query → Job listings → Job detail → Apply

**Key Files:**

- Pages: `src/pages/candidate/JobListingsPage.tsx`, `JobDetailPage.tsx`
- Slice: `src/features/jobs/jobsSlice.ts` (listings, filters, sort, selected)
- Component: `src/features/jobs/components/JobCard.tsx`, `JobFilterPanel.tsx`
- Types: `src/config/types.ts` (Job, Salary, Experience enums)

**API Endpoints:**

- `GET /api/jobs` — Paginated, filterable by salary/experience/type/role
- `GET /api/jobs/:id` — Single job details
- `POST /api/applications` — Apply to job

**Store Selectors:**

- `selectJobs` → Array of job listings
- `selectJobFilters` → Current filter state
- `selectSelectedJob` → Currently viewed job

**Common Tasks:**

- Add filter: Update `jobsSlice.ts` + `JobFilterPanel.tsx` UI
- Change sort: `jobsSlice.ts` sort logic + `JobListingsPage.tsx` dispatch
- New job field: `Job` type in `config/types.ts` → update RTK Query serialization

---

### 📄 Candidate Profile

**Components:** `ProfileWizardContainer`, `CareerProfileCard`, `ResumeUploadStep`

**Sections:** Personal info, skills, experience, education, projects, certifications, references

**Key Files:**

- Wizard: `src/features/profile/forms/ProfileWizardContainer.tsx`
- Cards: `src/features/profile/components/CareerProfileCard.tsx`, `EducationCard.tsx`, etc.
- Store: `src/features/profile/profile.slice.ts`
- Validation: `src/lib/validation.ts` (Zod schemas for all fields)

**Validation Pattern:**

```typescript
// In lib/validation.ts
const skillSchema = z.object({
  name: z.string().min(1),
  endorsements: z.number().optional(),
});

// In profile.slice.ts
const skill = skillSchema.parse(data); // Throws if invalid
```

**AI Feature:** "One-Click AI Autofill"

- Loads sample data (not actual parsing)
- Requires explicit confirmation before overwrite
- Located: `src/features/profile/forms/ProfileWizardContainer.tsx`

**Store Selectors:**

- `selectProfileData` → Full profile object
- `selectProfileEditStatus` → Loading/error state

**Common Tasks:**

- Add profile field: `config/types.ts` (ProfileItem type) → Zod schema → form input → store reducer
- Disable a section: `ProfileWizardContainer.tsx` conditional render
- Change validation rule: `lib/validation.ts` schema update

---

### 🤖 AI Hub

**Purpose:** Mock interview prep + resume feedback

**Key Files:**

- Page: `src/pages/candidate/AIHubPage.tsx`
- Features: Chat interface, voice input, interview scenarios

**API Calls:**

- `POST /api/ai/chat` — Send message to AI
- `POST /api/ai/interview` — Start mock interview

**Common Tasks:**

- Add new interview type: Update `AIHubPage.tsx` + backend `/api/ai/interview`
- Change chat behavior: Edit `AIHubPage.tsx` message handling

---

### 📱 UI Components (Reusable)

**Location:** `src/components/ui/`

**List:** `Button`, `Input`, `Select`, `Modal`, `Textarea`, `Checkbox`, `Avatar`, `Skeleton`, `Spinner`, `StatusChip`, `ConfirmDialog`

**Pattern:** All exported from `index.ts`, use Tailwind + optional CSS modules

**Example Usage:**

```typescript
import { Button, Input } from '@/components/ui';

<Button onClick={handleClick}>Submit</Button>
<Input placeholder="Enter name" />
```

**Testing:** Unit tests in `__tests__` sibling folder (e.g., `Button/__tests__/Button.test.tsx`)

---

## By Technology / Layer

### 🧠 Redux Store Structure

**Setup File:** `src/store/index.ts` (createStore, middleware, redux-persist)

**Slices:** All in `src/features/*/*.slice.ts`

| Slice          | Location                     | Selectors                               | Purpose                        |
| -------------- | ---------------------------- | --------------------------------------- | ------------------------------ |
| `auth`         | `src/features/auth/`         | `selectAuthUser`, `selectAuthRole`      | Firebase user + role           |
| `profile`      | `src/features/profile/`      | `selectProfileData`                     | Candidate resume data          |
| `jobs`         | `src/features/jobs/`         | `selectJobs`, `selectJobFilters`        | Job listings + filters         |
| `applications` | `src/features/applications/` | `selectApplications`                    | Job applications               |
| `employer`     | `src/features/employer/`     | `selectEmployerProfile`                 | Employer profile + posted jobs |
| `ui`           | `src/features/ui/`           | `selectDarkMode`, `selectIsSidebarOpen` | Dark mode, modals, toasts      |

**Persistence:** localStorage with redux-persist (versioned + validated via Zod)

**Common Tasks:**

- Add new slice: Create `newFeature/newFeature.slice.ts` → export selectors → add to `store/index.ts`
- Change store shape: Update slice + selector tests + components using that slice
- Clear store: Dispatch reset action from `auth.slice.ts` on logout

---

### 📡 API Layer

**Request Flow:** Component → `useQuery` / Axios call → `api.service.ts` → Axios instance → Backend

**Entry Points:**

- **RTK Query:** `src/features/*/api/apiSlice.ts` (GET requests with caching)
- **Axios:** `src/services/api.service.ts` (POST/PUT/DELETE + token refresh)

**Request Interceptor:**

```
1. Check if token is expired
2. If expired + refresh token exists → refresh silently
3. Add `Authorization: Bearer <token>` header
4. Send request
5. If 401 → redirect to login
6. If other error → retry up to 3x (408/429/503 only)
```

**Response Validation:** All responses run through Zod schema → throw on type mismatch

**Error Handling:**

- `400/422` → Validation error (show field errors)
- `401` → Token invalid/expired (redirect to login)
- `403` → Permission denied (show message)
- `404` → Not found (show 404 page)
- `500` → Server error (show error toast + retry button)

**Common Tasks:**

- Add new endpoint: `api.service.ts` create function → component `useQuery` hook → store dispatch on success
- Change retry logic: Edit `api.service.ts` axios interceptor
- Add request header: `api.service.ts` requestInterceptor

---

### 🎨 Styling

**Framework:** Tailwind CSS (utility-first)

**Dark Mode:** Stored in Redux `ui.slice.ts`, applied via `dark:` Tailwind prefixes

**Hybrid Approach:**

- Most components: Tailwind only
- Some complex layouts: CSS modules + Tailwind

**Example:**

```typescript
// Tailwind only
<div className="bg-white dark:bg-slate-900 text-gray-900 dark:text-white">

// CSS module + Tailwind
<div className={`${styles.card} dark:${styles.cardDark}`}>
```

**Design Tokens:** `src/lib/tailwind.config.js` (colors, spacing, breakpoints)

**Common Tasks:**

- Add dark mode to component: Add `dark:` prefixes to all color/bg classes
- Update color scheme: Edit `tailwind.config.js`
- Create reusable style: Extract to CSS module or Tailwind class composition

---

### ✅ Testing

**Framework:** Vitest + React Testing Library

**File Location:** `__tests__` sibling to source (e.g., `Component/__tests__/Component.test.tsx`)

**Test Types:**

- Unit: Redux slices, utilities, selectors
- Integration: Component + store interaction
- E2E: Full auth flows (not in main test suite)

**Example Test:**

```typescript
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/Button';

it('calls onClick when clicked', () => {
  const onClick = vi.fn();
  render(<Button onClick={onClick}>Click</Button>);
  screen.getByRole('button').click();
  expect(onClick).toHaveBeenCalled();
});
```

**Run Tests:**

```bash
npm run test            # Watch mode
npm run verify          # Full suite (lint + tests + build)
```

**Coverage:** Target >80% (as of v0.5.0: 256 tests passing)

**Mocking:** `msw` (Mock Service Worker) for API responses

---

## Search Commands (graphify)

**Copy-paste these for quick context:**

```bash
# Find all Redux slices and actions
graphify query "what redux slices exist and what actions do they dispatch?"

# Trace job application flow
graphify path "JobDetailPage" "ApplicationCard" "applications.slice.ts"

# Find all API endpoints
graphify query "where are API calls made and what endpoints?"

# Component dependency graph
graphify path "ProfilePage" "auth.slice.ts"

# Find validation logic
graphify query "where is user input validated?"

# Find all selectors
graphify query "what are all the Redux selectors and what do they return?"
```

---

## Common Patterns & Pitfalls

### ✅ Do's

- Use `useAppSelector(selectMyState)` for Redux subscriptions
- Add `dark:` prefix for every color/background class
- Validate with Zod at API boundary
- Check graphify for patterns before implementing

### ❌ Don'ts

- Import directly from Redux store
- Hardcode URLs/API endpoints
- Store tokens in localStorage (use sessionStorage or HttpOnly cookies)
- Bypass TypeScript strict mode
- Skip tests before pushing

### Common Pitfalls & Fixes

| Pitfall                         | Fix                                                     |
| ------------------------------- | ------------------------------------------------------- |
| Selector not updating component | Use `useAppSelector()`, not direct store access         |
| Dark mode colors wrong          | Add `dark:` Tailwind prefix to all color classes        |
| API call never resolves         | Check `api.service.ts` timeout (3s), increase if needed |
| Type mismatch on API response   | Update Zod schema or backend response                   |
| Infinite re-render loop         | Check hook dependency array, use `useMemo` if needed    |
| Component re-renders too much   | Use selectors to slice state, avoid parent re-renders   |

---

## File Size Reference

| File                                    | Lines | Purpose                     |
| --------------------------------------- | ----- | --------------------------- |
| `README.md`                             | 72    | Changelog + version history |
| `CLAUDE.md`                             | ~150  | This project context        |
| `GRAPH_REPORT.md`                       | 487   | Full community graph        |
| `.claude/launch.json`                   | 13    | Dev server config           |
| `.claude/settings.json`                 | 30    | Claude Code config          |
| `graphify-out/wiki/INDEX.md`            | ~350  | This navigation guide       |
| `src/store/index.ts`                    | ~50   | Redux setup                 |
| `src/services/api.service.ts`           | ~200  | API layer                   |
| `src/features/auth/auth.slice.ts`       | ~80   | Auth Redux                  |
| `src/features/profile/profile.slice.ts` | ~120  | Profile Redux               |

---

## Quick Reference: File Anchors

### Authentication

- `src/features/auth/forms/LoginForm.tsx` — Login UI
- `src/features/auth/forms/RegisterForm.tsx` — Registration UI
- `src/features/auth/auth.slice.ts` — Auth Redux logic
- `src/services/auth.service.ts` — Firebase + Backend integration
- `src/components/RoleGuard.tsx` — Route protection by role

### Job Search

- `src/pages/candidate/JobListingsPage.tsx` — Job list + search
- `src/pages/candidate/JobDetailPage.tsx` — Single job detail
- `src/features/jobs/jobsSlice.ts` — Jobs Redux logic
- `src/features/jobs/components/JobFilterPanel.tsx` — Filter UI

### Profile

- `src/features/profile/forms/ProfileWizardContainer.tsx` — Profile builder
- `src/features/profile/profile.slice.ts` — Profile Redux logic
- `src/lib/validation.ts` — Zod schemas for all forms

### Admin

- `src/pages/admin/UsersPage.tsx` — User management
- `src/pages/admin/CompaniesPage.tsx` — Company management

### Core

- `src/store/index.ts` — Redux setup
- `src/services/api.service.ts` — API client
- `src/config/types.ts` — TypeScript types
- `src/App.tsx` — Root component + routing
- `src/main.tsx` — Entry point

---

## Next Steps for New Contributors

1. **Read the section** for your area (Candidate, Employer, Admin, or Feature)
2. **Use graphify** to find related code: `graphify query "what does [feature] need?"`
3. **Check the patterns** in this guide for similar work
4. **Run `npm run verify`** before pushing (lint + tests + build)
5. **Reference CLAUDE.md** for quick context if needed

---

**Graph Last Refreshed:** 2026-08-15 (commit 8015b9b4)  
**To Update After Code Changes:** `graphify update .` (no API cost)
