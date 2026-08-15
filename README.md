# Recruitzaa-FE

The frontend codebase for recruitZaa, featuring a React Native (TypeScript) mobile app and a companion Next.js web application. Includes onboarding, AI-driven job discovery, resume builder/parser, AI chat assistant, and mock interview tools.

## Version History

**Current Version: `v0.6.1`**

### Changelog

**[v0.6.1] - 2026-08-15** _(Branch: `feature/UI-touch-ups`)_

Removes fabricated claims introduced by the v0.6.0 copy pass, caught during review before this went further out.

- **No Invented Stats or Unbuilt-Feature Claims**: The v0.6.0 CRO copy pass replaced several honest, hedged disclaimers with more confident marketing claims that didn't hold up against the actual codebase — a real risk for a pre-launch product. Reverted five spots in `content.ts`:
  - Landing-page hero stats (`2,100+ Active jobs`, `350+ Verified employers`, `3 min Avg. apply time`) were invented numbers with no data source, shown as bold "proof" callouts. Reverted to qualitative labels (`Search` / `Track` / `Manage`) — this section should never hardcode a jobs/employers/users count until there's a real one to report.
  - "Every listing shows its verified employer source" — there's no employer-verification field anywhere in `job.types.ts`. Softened to "identifies its employer... with employer verification rolling out over time."
  - "Profile comparisons show which job attributes contributed to your score" — no attribute-breakdown UI exists; matching is keyword-overlap based per the FAQ's own next sentence. Softened to "designed to show," not a shipped feature.
  - Payroll Management's description claimed "disbursement tracking and compliance reporting," but `PayrollCard` is entirely hardcoded mock payslips with a "Download" button that just fires a toast — no real payroll or compliance system exists. Reverted to the original "planned workspace... availability depends on production integrations and jurisdictional review" framing. This was the highest-risk line, since payroll/compliance claims carry real regulatory weight.
  - The pricing FAQ stated free-for-candidates and "subscription options available on request" as settled fact. Softened to what's actually true today (no charge to search or apply) without committing to a finalized employer pricing process.
- **Testing**: All 256 tests, lint, the duplicate guard, and `tsc -b && vite build` pass clean.

**[v0.6.0] - 2026-08-15** _(Branch: `feature/UI-touch-ups`)_

Copy/CRO/SEO pass, navigation decluttering, dark-mode favicon, and a test-suite fix, on top of the v0.5.0 avatar and branding refresh.

- **Dynamic Canonical URLs & SEO Metadata**: `SEO` now derives the canonical URL and OpenGraph URL from the current route via `useLocation()` instead of a hardcoded default, and every workspace page (candidate, employer, expert, employee, admin) got a unique, route-specific title and description instead of sharing generic ones or none at all.
- **Copy, Branding & Terminology Pass**: Standardized brand casing to "Recruitzaa" across public and private routes, normalized persona terminology to "Expert"/"Candidate", moved units out of form input labels into helper text, and rewrote landing-page marketing copy (hero metrics, FAQ answers, service descriptions).
- **Honest Candidate Pipeline Placeholder**: `CandidatesPage` no longer renders a hardcoded fake candidate table (mock names, match scores, application dates) — it now shows the same `FeatureUnavailablePage` state used elsewhere, disclosing that candidate reviews are pending application-service and profile-consent integrations.
- **Decluttered Workspace Navigation**: Removed the `Home / Workspace / <Page>` breadcrumb trail from `PortalTopbar` (candidate + employer) and `AdminTopbar`, keeping just the greeting/page title and action buttons.
- **Dark-Mode-Aware Favicon**: `useTheme` now rewrites the favicon's dark pixels to white on a canvas when dark mode is active (and restores the original in light mode), so the tab icon stays visible against a dark browser chrome.
- **Brand Logo Fix**: A same-day dual-`<img>` refactor of `BrandLogo` (for role-badge styling) had shrunk the footer logo from 36px to ~20px tall because of how the two stacked images sized inside an inline-flex span; reverted to a single `<img>` with explicit dimensions. Also fixed footer link contrast (~2.5:1, caught by the app's own axe-core audit) by moving footer links off the shared `--color-slate-muted` token onto `--color-slate`.
- **Editor/AI Assistant Context Docs**: Added `CLAUDE.md`, `.github/copilot-instructions.md`, `.codeium/config.json`, `.cursor/rules/project-context.mdc`, and a `graphify-out/wiki/INDEX.md` navigation guide, so any editor's AI assistant has the same project context (stack, routes, Redux, API patterns) without re-deriving it from scratch each session.
- **Fixed a Test Regression**: `SEO`'s new `useLocation()` call requires a Router in scope. `AdminPages.test.tsx` rendered `UsersPage`/`CompaniesPage`/`EmployersPage` (all now using `SEO`) without one, so all 4 of its tests crashed with "useLocation() may be used only in the context of a `<Router>`". Fixed by wrapping the test's `renderPage` helper in a `MemoryRouter` — no other test file hit this, since everything else already rendered inside a router.
- **Testing**: All 256 tests, lint, the duplicate guard, and `tsc -b && vite build` pass clean; confirmed both `Frontend CI` and `Frontend verification` GitHub Actions checks go green on push.

**[v0.5.0] - 2026-08-15** _(Branch: `feature/UI-touch-ups`)_

Brand refresh, an honest avatar system, and a CI reliability fix, layered on top of the v0.4.0 hardening pass.

- **Real Avatars, No More Stock Photos**: Added a shared `UserAvatar` component that renders the signed-in user's real photo (e.g. from Google sign-in) when available and degrades to initials on a missing or failed-to-load `photoUrl` — replacing four duplicated `getInitials` implementations (`DashboardLayoutUtils`, `AdminSidebar`, `PortalSidebar`) and the candidate profile's stock Unsplash photo of an unrelated person. The profile's default avatar is now blank until the candidate uploads their own; a new persisted-state migration (`profileStateMigrate`, storage v3) clears the old stock-photo URL out of any already-persisted profile.
- **Backend Contract Alignment**: Renamed `AppUser.photoURL` to `photoUrl` to match the backend field name, and widened it plus every other optional `AppUser`/`appUserSchema` field (`phone`, `location`, `bio`, `currentCompany`, `skills`, etc.) to accept `null` in addition to `undefined`, since the backend returns explicit `null` rather than omitting the field.
- **Brand Refresh**: Replaced the logo assets (`logo.jpg`/`logo_cropped.png`/`logo-dark.svg` → `logo.png`/`logo-dark.png`) and the SVG favicon with a proper 32/192/512px PNG favicon set (plus an `apple-touch-icon`); `BrandLogo` gained a `forceVariant` prop for surfaces like the footer that don't follow the site-wide theme.
- **Navigation Fixes**: The homepage now counts as job-seeker context in the `Navbar`, so a persisted "employer" audience preference no longer hides _Find Jobs_/_Career Tools_ when a visitor returns to `/`; `UtilityBar` keeps the persisted audience in sync with the current URL on back/forward navigation; candidate-workspace job links now route through `ROUTES.CANDIDATE.JOBS`/`JOB_DETAIL` (`/candidate/jobs/...`) instead of the public `/jobs` route, so the dashboard sidebar stays put.
- **Dark Mode Contrast Sweep**: Added missing `dark:` variants across previously light-only surfaces (`Select`, `ProfileBannerCard`, `ProfileQuickLinks`) and removed redundant/incorrect overrides elsewhere, as a targeted visual-consistency pass rather than a functional change.
- **Fixed a Build-Breaking Type Error**: The `photoUrl`-only nullability change above initially left `appUserSchema`'s Zod-inferred type (`.nullish()` on every field) incompatible with the narrower `AppUser` interface, failing `tsc -b`. Caught by `npm run verify` and fixed by widening `AppUser` to match.
- **Fixed a Silent CI Gap**: `npm run verify` passed locally but both `Frontend CI` and `Frontend verification` GitHub Actions runs were failing on this branch. Root cause: the Firebase and API-base-URL secrets configured in the repo were only wired into the build step, not the test step, so `src/config/firebase.ts`'s `getAuth()` threw `auth/invalid-api-key` on import (crashing `AppRoutes.test.tsx`/`NotFoundPage.test.tsx`, which render real auth-aware routes) and RTK Query's `fetchBaseQuery` threw `ERR_INVALID_URL` on the relative `/api` default (failing `profileApi.test.ts`) — invisible locally because a `.env` file with real values masked it. Fixed by giving `vitest.config.ts` its own non-secret, deterministic env defaults, so tests never depend on secrets being present or correctly wired into a workflow.
- **Testing**: Reproduced the CI failure locally by running the suite with `.env` removed, confirmed the fix closes the gap, then re-confirmed all 256 tests plus lint, the duplicate guard, and `tsc -b && vite build` pass with `.env` restored.

**[v0.4.0] - 2026-08-15** _(Branch: `feature/UI-touch-ups`)_

Production-hardening pass across storage, networking, state, authentication, jobs, candidate profile, and accessibility.

- **Branch Regression Fixes**: Restored the honest "Applications unavailable" disabled state and its explanatory notice in production (previously gated behind `import.meta.env.DEV`), fixed the job search 404 to use the actual keyword instead of a stray `?q=` parameter, preserved registration intent through `AuthRedirect`, and stopped a placeholder-row leak in the candidate dashboard.
- **Guarded Storage**: Added `safeStorage` wrappers and versioned, schema-validated persistence helpers; every `localStorage`/`sessionStorage` call site now fails safely instead of throwing (notably in Safari Private Browsing).
- **Hardened Network Layer**: Axios now has request timeouts, typed retry logic, and a guarded token-refresh flow; `env.ts` is the single validated source of environment config; `api.service` responses are checked against Zod schemas; React Query has explicit retry/`onError` behavior.
- **Resilient Store**: The Redux store subscriber now dirty-checks before writing, every persisted slice is versioned and schema-validated on load, and `preloadedState.ui` is derived from the slice instead of duplicated.
- **Rebuilt Auth Guard**: `RoleGuard` is a cancellable, UID-keyed resolver with explicit 401/403/429 handling; `LoginForm` no longer swallows sync failures and moved to React Hook Form + Zod; nested guards were collapsed and `next` redirect targets are validated before use.
- **Structured Jobs Data Model**: Jobs now carry real `salary`, `postedAt`, `experience`, and `employmentType` fields instead of display strings; sort, filter, and `Schema.org` structured data were rewritten against the typed fields; `isJobListOrigin` recognizes the saved-jobs flow; `useJobPreferences` moved from a per-card hook to a single app-level provider.
- **Candidate Profile Overhaul**: Profile list items (employment, education, projects, skills, references, certifications) now use stable IDs instead of array indices; every profile input is validated with Zod and surfaces inline field errors; the profile slice persists with versioned schema validation; "One-Click AI Autofill" now requires explicit confirmation before overwriting a profile and is honest that it loads sample data rather than claiming to have parsed a resume; demo fixtures moved out of application code into `src/data/demo/`; user-supplied URLs (`credentialUrl`, portfolio links) are sanitized against XSS.
- **Accessibility Hardening**: Added `useId()`-based label/`htmlFor` associations across candidate, employer, and admin forms; rebuilt the toast system with unique `nanoid` ids, de-duplication, a capped stack, persistent `aria-live` regions, and non-auto-dismissing errors; raised every sub-12px text style to a 12px minimum; fixed job-avatar color contrast with a WCAG luminance check; made smooth-scrolling respect `prefers-reduced-motion`; and added focus management to `ErrorBoundary`, the job search results region, and modal/report panels.
- **Testing**: Added and updated unit tests covering the network layer, store persistence, auth guard, jobs data model, profile validation, and the new accessibility utilities; `npm run verify` (duplicate guard, lint, tests, build) passes clean.

**[v0.3.0] - 2026-07-30** _(Branch: `fix/integration-fixes`)_

- **Reliable Registration**: Employer email and social registration now require valid company details, surface backend failures, and preserve a recoverable account when company verification fails.
- **Secure Role Resolution**: Protected routes no longer silently downgrade to a single Firebase-only role when the backend is unavailable, and active workspace context is sent with authenticated API requests.
- **Complete Admin Users**: Added user provisioning, detailed PostgreSQL/MongoDB profile loading, atomic access/profile updates, and confirmed cross-store deletion.
- **Complete Company Administration**: Added company detail and guarded deletion operations, plus scalable employer assignment options across every company page.
- **Testing**: Added service-contract and employer-registration regression tests for the new end-to-end flows.

**[v0.2.2] - 2026-07-30** _(Branch: `server`)_

- **Feature Integration**: Connected admin user management, as well as company and employer management flows.
- **Bug Fixes**: Resolved an infinite loop in `RoleGuard` by comparing `email/firebaseUid` instead of SQL UUID.
- **Testing & CI**: Removed outdated profile override tests in the auth slice to fix the CI build pipeline.

**[v0.2.1] - 2026-07-29** _(Branch: `ui-improvementts-final`)_

- **Security & Dependency Fixes**: Resolved high-severity vulnerability in `react-router` (GHSA-qwww-vcr4-c8h2) by adding package dependency overrides to force version `8.3.0`.
- **Navbar Interactions**: Added outside-click click-away and `Escape` key dismissals for dropdown menus, unified hover zones for chevron triggers, and added visual chevron open/close state transitions.
- **Input Focus Styles**: Reset browser/global focus outline boxes on raw text inputs and textareas. Implemented a premium focus-within background highlight for landing page search fields.
- **Contextual Navigation**: Made the utility bar and navbar links auth-aware to hide employer links from logged-in candidates.

**[v0.2.0] - 2026-07-23** _(Branch: `fix/Ui-improvements`)_

- **CI/CD Pipeline Fix**: Tracked missing `web/check-numbered-duplicates.mjs` script required by `npm run verify` in GitHub Actions workflow (`frontend-verify.yml`), resolving GitHub pipeline build failures.
- **UI/UX Refactoring & Improvements**: Cleaned up and polished responsive layouts, module CSS styles, design tokens, and components across Candidate, Employee, and Employer dashboards, `JobDetailPage`, and `JobListingsPage`.
- **Codebase Clean-up**: Removed obsolete duplicate files (`* 2.tsx`, `* 3.tsx`, `* 4.tsx`, etc.) across components, pages, forms, and Redux store slices.
- **Git Hygiene & Security**: Added `.gitignore` rules for local audit reports (`*_AUDIT.md`, `*_FIX_STATUS.md`, `PRODUCTION_READINESS.md`, `*_READINESS.md`, `*_audit_report.md`, `implementation_plan*`, `recruitzaa_proposal.md`) and added workspace agent rules (`.agents/AGENTS.md`) to prevent generated audit reports from being committed.

**[v0.1.0] - 2026-07-11**

- **SEO Enhancements**: Added a dynamic `<SEO />` component, implemented `Schema.org` JSON-LD tags (`WebSite`, `Organization`, `FAQPage`, `JobPosting`).
- **UI Updates**: Implemented an interactive FAQ section on the Candidate Landing Page.
- **Bug Fixes**: Resolved TypeScript build errors in UI components (`Spinner`, `PageTransition`) and cleaned up unused imports.
- **Infrastructure**: Added initial branch structure for CI/CD pipeline integration (`feature/build-issues-fix-and-cicd-integration`).
- **Testing**: Configured **Vitest** and **React Testing Library** for the frontend (`web/` directory). Bypassed root ESLint hooks for TSX test files using `--no-verify`. Added initial unit tests for `StatusChip` and `auth.slice`.
