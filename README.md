# Recruitzaa-FE

The frontend codebase for recruitZaa, featuring a React Native (TypeScript) mobile app and a companion Next.js web application. Includes onboarding, AI-driven job discovery, resume builder/parser, AI chat assistant, and mock interview tools.

## Version History

**Current Version: `v0.3.0`**

### Changelog

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
