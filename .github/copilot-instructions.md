# GitHub Copilot Instructions — Recruitzaa-FE

**Full documentation:** See [CLAUDE.md](../CLAUDE.md) in project root.

## Project Summary

Recruitzaa-FE v0.5.0 | React 18 + TypeScript | Redux Toolkit + Tailwind | Token-optimized

---

## When You See This Code...

**Redux state access:**

```
❌ BAD: store.getState().profile
✅ GOOD: useAppSelector(selectProfileData)
```

**Why:** Selectors prevent unnecessary re-renders.

**API call:**

```
❌ BAD: fetch('/api/jobs').then()
✅ GOOD: useQuery() or axios with Zod validation
```

**Why:** RTK Query caches, Zod validates types.

**Form input:**

```
❌ BAD: <input onChange={(e) => setEmail(e.target.value)} />
✅ GOOD: React Hook Form + Zod validation
```

**Why:** Type-safe, error handling built-in.

**Dark mode styling:**

```
❌ BAD: className="bg-white text-black"
✅ GOOD: className="bg-white dark:bg-slate-900 text-gray-900 dark:text-white"
```

**Why:** Supports dark mode toggle from ui.slice.ts.

---

## Stack Snapshot

| Layer   | Tech                    | Location                                             |
| ------- | ----------------------- | ---------------------------------------------------- |
| UI      | React 18 + TypeScript   | `src/components/`, `src/pages/`                      |
| State   | Redux Toolkit           | `src/features/*/`                                    |
| API     | RTK Query + Axios + Zod | `src/services/`, `src/lib/validation.ts`             |
| Styling | Tailwind + CSS modules  | `src/**/*.tsx` + `src/**/*.module.css`               |
| Auth    | Firebase + custom roles | `src/features/auth/`, `src/components/RoleGuard.tsx` |
| Testing | Vitest + RTL            | `src/**/__tests__/`                                  |

---

## Key Files

```
auth:     src/features/auth/auth.slice.ts
jobs:     src/features/jobs/jobsSlice.ts
profile:  src/features/profile/profile.slice.ts
api:      src/services/api.service.ts
types:    src/config/types.ts
routes:   src/config/routes.meta.ts
```

---

## Common Patterns

**Fetching data (RTK Query):**

- See: `src/features/*/api/apiSlice.ts`
- Pattern: Define query → component uses `useQuery()` → auto caches

**Updating Redux:**

- See: `src/features/*/` slice
- Pattern: Dispatch action → reducer updates state → selectors in components

**Validating forms:**

- See: `src/lib/validation.ts`
- Pattern: Define Zod schema → use in form + API response validation

**Protecting routes:**

- See: `src/components/RoleGuard.tsx`
- Pattern: Wrap route → checks role + backend permissions → redirects if unauthorized

---

## Commands

```bash
npm run dev      # Start dev server
npm run verify   # Lint + test + build
npm run test     # Watch tests
```

---

## Critical Rules

1. ✅ Use Redux selectors (`useAppSelector`)
2. ✅ Validate at API boundary (Zod)
3. ✅ Add `dark:` prefixes for dark mode
4. ✅ Test auth + form flows
5. ✅ Run `npm run verify` before pushing

---

## References

- **Full Context:** [CLAUDE.md](../CLAUDE.md)
- **Navigation:** [graphify-out/wiki/INDEX.md](../graphify-out/wiki/INDEX.md)
- **Routing Map:** [CLAUDE.md#routing](../CLAUDE.md#critical-routing-map)
- **Redux Patterns:** [CLAUDE.md#redux](../CLAUDE.md#redux-store-shape)

---

**Last Updated:** 2026-08-15
