# Recruitzaa production integration checklist

The frontend now avoids presenting unavailable integrations as completed actions. The items below require backend, hosting, analytics, legal, or business input and cannot be safely manufactured in UI code.

## Required before a public production launch

1. **Jobs and applications API**
   - Replace `localStorage` job persistence and demo catalogue data with authenticated API queries and mutations.
   - Return stable job IDs, source attribution, employer identity, full descriptions, posted/closing dates, application questions, and explicit application status.
   - Make application submission idempotent and return a server confirmation/reference. Never set `APPLIED` from an optimistic local-only action.

2. **Authorization**
   - Set roles with Firebase Admin custom claims on a trusted server. Client state and `localStorage` must never grant a role.
   - Enforce the same role and resource-ownership checks on every backend endpoint.
   - Remove the development multi-role override from production builds and add emulator/integration tests for every role boundary.

3. **AI and automated scoring governance**
   - Do not ship candidate rankings until the scoring inputs, limitations, explanations, human-review process, bias testing, appeal path, logging, and retention policy are approved.
   - Separate resume guidance from hiring decisions. Never infer protected attributes or use generated text as evidence that a candidate has a skill.
   - Publish a plain-language disclosure beside every automated score.

4. **Public URLs and SEO**
   - The router supports clean URLs with `VITE_ROUTER_MODE=browser`; hash mode remains the default because the current deployment target is GitHub Pages.
   - Robots and a starter sitemap are included. Configure the production host to rewrite unknown routes to `index.html` (or server-render them), switch the environment flag, then validate direct navigation, refreshes, social previews, job-specific canonicals and expired job URLs.

5. **Evidence and claims**
   - Add customer counts, job counts, time-to-hire improvements, security claims, partner logos, and service-level promises only when an owner supplies dated evidence and legal approval.
   - Replace demo company names and catalogue entries with licensed production data before launch.

6. **Privacy, security, and compliance**
   - Obtain legal review for the privacy policy, terms, consent language, data retention/deletion, cookies, candidate export, and applicable employment/privacy laws.
   - Define resume upload malware scanning, encryption, access logging, signed downloads, deletion, and incident response.
   - Keep provider secrets server-side. Add CSP, security headers, rate limiting, audit logs, dependency scanning, and secret scanning in CI.

7. **Measurement and operations**
   - A privacy-safe, consent-gated frontend event boundary now covers search, job detail, auth intent and saved alerts without free-text or PII. Configure the approved analytics provider and add server-confirmed application events only after the application API exists.
   - Add production error reporting, uptime monitoring, performance budgets, and Web Vitals dashboards without recording resume or message content.

## Frontend architecture boundary

- `src/components/ui`: generic accessible primitives only; no domain copy, routes, store access, or network calls.
- `src/components/layout`: application shells and navigation only.
- `src/features/<feature>`: domain components, hooks, schemas, and feature services.
- `src/pages`: route composition; pages should not own reusable primitives or duplicate domain models.
- `src/styles/tokens.css`: the source of truth for brand color, spacing, radii, elevation, layout, motion, and tap targets. Tailwind aliases must resolve to these variables.
- `src/data`: demo fixtures only. Importing this directory from a production API adapter should fail review.

Run `npm run verify` before merging. The first step rejects filenames such as `Component 2.tsx` so numbered copies cannot silently return.
