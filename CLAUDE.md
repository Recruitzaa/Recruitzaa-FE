# Recruitzaa-FE: AI Development Context

## What This Codebase Does

React + TypeScript web app for job seekers, employers, and admins. Features:

- Job discovery with AI filtering
- Resume builder + AI parsing
- Candidate profiles + AI autofill
- Interview prep with AI mock interviews
- Employer company management & job posting
- Admin user/company provisioning

**Current Version:** v0.5.0 (2026-08-15) — Brand refresh + avatar system

## Project Structure (web/)

```
src/
├── components/       # Reusable UI (ui/, layout/, auth/, seo/)
├── features/        # Feature slices (auth, jobs, profile, ai-hub, etc.)
├── pages/           # Route pages (candidate/, employer/, admin/, public/)
├── hooks/           # Custom React hooks
├── store/           # Redux + slices (auth, jobs, profile, ui, etc.)
├── services/        # API clients + Firebase auth
├── config/          # Firebase, env, type definitions
├── lib/             # Utilities (validation, formatting, types)
├── data/            # Demo data & fixtures
└── assets/          # Images, logos, icons
```

## Key Technology Stack

- **State:** Redux Toolkit (RTK) + RTK Query for API caching
- **Forms:** React Hook Form + Zod validation
- **Auth:** Firebase + custom role guard (candidate/employer/admin)
- **Styling:** Tailwind CSS + module CSS (hybrid)
- **Testing:** Vitest + React Testing Library (256 tests)
- **Build:** Vite (5173 port)
- **Type Safety:** TypeScript strict mode + Zod schemas

## Critical Routing Map

```
/                    → Landing (auth-aware navbar)
/auth/*              → Login/Register (social + email)
/candidate/*         → Job seeker workspace
  /jobs              → Listings + search
  /jobs/:id          → Detail + apply
  /profile           → Resume builder
  /dashboard         → Saved jobs + applications
/employer/*          → Recruiter workspace
  /dashboard         → Posted jobs + candidates
  /companies         → Company management
  /profile           → Company settings
/admin/*             → Super-user only
  /users             → User provisioning
  /companies         → Approval + deletion
```

## Redux Store Shape

```typescript
auth; // Firebase user, role, token
profile; // Candidate resume, skills, experience
jobs; // Job listings, sorting, filters
applications; // Job applications + status
employer; // Employer profile, posted jobs
ui; // Dark mode, modals, toasts, sidebar
```

**Pattern:** Slices export selectors for efficient component subscriptions.

## API Layer Pattern

- **RTK Query** for GET (jobs, user profile, company data)
- **Axios** for POST/PUT (auth, applications, profile updates)
- **Retry Logic:** 3 attempts, exponential backoff for 408/429/503
- **Token Refresh:** Automatic on 401, prevents auth loops
- **Validation:** All responses validated with Zod at fetch boundary

**Entry Point:** `src/services/api.service.ts` + `apiSlice.ts`

## Common Tasks & Their Paths

| Task                 | Key Files                                                      |
| -------------------- | -------------------------------------------------------------- |
| Add job filter       | `features/jobs/jobsSlice.ts` + `JobFilterPanel.tsx`            |
| New dashboard card   | `features/profile/CareerProfileCard.tsx` + `DashboardPage.tsx` |
| Add auth role        | `auth.slice.ts` + `RoleGuard.tsx` + `routes.meta.ts`           |
| Connect API endpoint | `api.service.ts` → RTK Query or Axios → store slice → hook     |
| Fix form validation  | `lib/validation.ts` (Zod schemas) + React Hook Form            |

## v0.5.0 Key Additions

- **UserAvatar component** — Real photos from Google auth, degrades to initials
- **Zod schema widening** — `photoUrl: null | undefined` (backend alignment)
- **Logo refresh** — New PNG set (32/192/512px) + apple-touch-icon
- **Route narrowing** — Candidate jobs through `/candidate/jobs` (not `/jobs`)
- **Dark mode fixes** — Contrast sweep on Select, ProfileBannerCard, ProfileQuickLinks
- **CI fix** — vitest.config.ts has non-secret env defaults (Firebase, API URL)

## Testing Pattern

- Unit tests in `__tests__` sibling to source
- Redux slices tested via selectors + dispatch
- API services mocked with `msw` (Mock Service Worker)
- Run: `npm run verify` (duplicate guard, lint, tests, build)

## Do's & Don'ts

✅ **Do:**

- Use selectors for store subscriptions (prevents re-renders)
- Validate at API boundary with Zod
- Check `graphify query "<question>"` for patterns
- Test form flows + authentication
- Run `npm run verify` before pushing

❌ **Don't:**

- Store tokens in localStorage
- Import directly from Redux; use slices + selectors
- Add endpoints without Zod validation
- Bypass TypeScript strict mode
- Skip tests before pushing

## Quick Commands

```bash
npm run dev              # Start dev server (5173)
npm run verify          # Lint + test + build
npm run test            # Vitest watch mode
npm run build           # Production build
graphify update .       # Refresh graph (no API cost)
graphify query "..."    # Search graph
```

## Recent Incidents & Solutions

### Token Refresh Loop (v0.2.2)

- **Problem:** RoleGuard compared Firebase UID to SQL UUID infinitely
- **Fix:** Compare email + firebaseUid instead
- **Location:** `components/RoleGuard.tsx`

### CI Failure on Firebase Secrets (v0.5.0)

- **Problem:** Tests failed in CI but passed locally
- **Fix:** vitest.config.ts has deterministic non-secret defaults
- **Lesson:** Tests must never depend on secrets

### React Router Vulnerability (v0.2.1)

- **Problem:** GHSA-qwww-vcr4-c8h2
- **Fix:** package.json overrides force react-router@8.3.0+
- **Location:** `web/package.json`

## Graphify Integration

```bash
graphify query "where are API calls validated?"
# → Returns subgraph of Zod schemas + api.service.ts

graphify path "LoginForm" "auth.service.ts"
# → Shows dependency chain

graphify query "what components render profiles?"
# → Returns ProfilePage, ProfileWizardContainer, CareerProfileCard subgraph
```

## Files Not to Edit (Usually)

- `web/tsconfig*.json` — Affects all type checking
- `.eslintrc.json` — Lint rules; needs team alignment
- `package.json` — Coordinate before changing

## Troubleshooting Fast Path

| Symptom                           | Check                                              |
| --------------------------------- | -------------------------------------------------- |
| Build fails with type error       | `npm run verify`                                   |
| Tests fail locally but pass in CI | `.env` present? (needs Firebase/API secrets)       |
| Dark mode colors wrong            | Missing `dark:` prefixes on component              |
| Redux selector not working        | Confirm selector exported + using `useAppSelector` |
| API calls hang                    | Check `api.service.ts` timeout (3s default)        |

## Quick Links

- **Graphify Graph:** `graphify query "<question>"` (no API cost after first run)
- **Full Report:** `graphify-out/GRAPH_REPORT.md` (487 lines, community structure)
- **Navigation:** `graphify-out/wiki/INDEX.md` (by-role + by-feature guide)
- **Changelog:** `README.md` (detailed v0.5.0 summary)
- **Dev Launch:** `.claude/launch.json` (npm run dev on 5173)

## File Ownership & History

- **v0.5.0:** Avatar system, logo refresh, CI fix (2026-08-15)
- **v0.4.0:** Storage hardening, auth guard, jobs data model (2026-08-15)
- **v0.3.0:** Registration flow, role resolution, admin (2026-07-30)
- **v0.2.2:** Feature integration, infinite loop fix (2026-07-30)
- **v0.2.1:** Router vulnerability, navbar improvements (2026-07-29)
- **v0.2.0:** CI/CD pipeline, UI refactor (2026-07-23)
- **v0.1.0:** SEO enhancements, Vitest setup (2026-07-11)

## Next Steps for New Contributors

1. Read the **Routing Map** section
2. Pick a feature area (auth, jobs, profile, etc.)
3. Use `graphify query "what does [feature] need?"` for entry points
4. Run `npm run verify` before pushing
5. Check this doc for the pattern you're implementing

---

**Last Updated:** 2026-08-15 (v0.5.0)  
**Graph Status:** Current (commit 8015b9b4)  
**Maintenance:** Run `graphify update .` after major refactors
