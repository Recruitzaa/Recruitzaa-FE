# Frontend Architecture & Technical Debt Audit Report

This report provides a brutal, line-by-line code review of the `src/` directory in `Recruitzaa-FE/web`. It highlights critical design system escapes, accessibility (WCAG) failures, and architectural layout issues.

---

## ## /features/auth

### [RoleGuard.tsx](file:///Users/sumanthbilla/Desktop/Recruitzaa/Recruitzaa-FE/web/src/features/auth/guards/RoleGuard.tsx)

- **File Path:** `src/features/auth/guards/RoleGuard.tsx`
- **Line Number(s):** 59, 60
- **Severity:** [MODERATE]
- **The Issue:** Inline styles are used for loading spinner dimensions and colors instead of standard Tailwind styling.
- **The Required Fix:** Replace `style={{ width: 36, height: 36, border: '3px solid #C14F16' }}` with Tailwind utilities such as `w-9 h-9 border-3 border-brand-primary`.

---

## ## /components/layout

### [AdminSidebar.tsx](file:///Users/sumanthbilla/Desktop/Recruitzaa/Recruitzaa-FE/web/src/components/layout/AdminLayout/AdminSidebar.tsx)

- **File Path:** `src/components/layout/AdminLayout/AdminSidebar.tsx`
- **Line Number(s):** 35, 86
- **Severity:** [CRITICAL]
- **The Issue:** Hardcoded HEX values (`#DC2626`) are used inline to style logo sub-text and user avatar elements.
- **The Required Fix:** Remove the inline style elements and replace them with standard design token utilities such as `text-red-600` or custom classes matching our theme variables.

### [AdminLayoutV2.tsx](file:///Users/sumanthbilla/Desktop/Recruitzaa/Recruitzaa-FE/web/src/components/layout/AdminLayout/AdminLayoutV2.tsx)

- **File Path:** `src/components/layout/AdminLayout/AdminLayoutV2.tsx`
- **Line Number(s):** 8, 10, 12
- **Severity:** [MODERATE]
- **The Issue:** CSS flex layout definitions and hardcoded margins are defined via inline styles on layout containers.
- **The Required Fix:** Migrate inline properties to Tailwind grid/flex container classes (e.g. `flex min-h-screen bg-surface`, `ml-64`).

### [PortalSidebar.tsx](file:///Users/sumanthbilla/Desktop/Recruitzaa/Recruitzaa-FE/web/src/components/layout/PortalLayout/PortalSidebar.tsx)

- **File Path:** `src/components/layout/PortalLayout/PortalSidebar.tsx`
- **Line Number(s):** 37, 63, 96
- **Severity:** [CRITICAL]
- **The Issue:** Hardcoded badges styling uses static hex colors (`#2563EB`, `#fff`) instead of brand variables.
- **The Required Fix:** Replace custom badge inline blocks with our shared `<Badge>` component or use standard color utilities.

---

## ## /pages/candidate

### [ProfilePage.tsx](file:///Users/sumanthbilla/Desktop/Recruitzaa/Recruitzaa-FE/web/src/pages/candidate/ProfilePage.tsx)

- **File Path:** `src/pages/candidate/ProfilePage.tsx`
- **Line Number(s):** 1-801
- **Severity:** [CRITICAL]
- **The Issue:** The profile page is a massive file exceeding 800 lines of code, completely violating the Micro-Component Rule.
- **The Required Fix:** Extract individual form tabs, headers, sidebar quick links, and sections into modular components inside a `components/` directory.

### [DashboardPage.tsx](file:///Users/sumanthbilla/Desktop/Recruitzaa/Recruitzaa-FE/web/src/pages/candidate/DashboardPage.tsx)

- **File Path:** `src/pages/candidate/DashboardPage.tsx`
- **Line Number(s):** 188, 194, 254, 260, 299, 323, 332, 341
- **Severity:** [CRITICAL]
- **The Issue:** Heavy use of inline styles for table alignments (`textAlign: 'center'`) and meter bars (`width: '78%'`) instead of Tailwind classes.
- **The Required Fix:** Use class attributes like `text-center`, `p-8`, and dynamic style width bindings using Tailwind background colors.

---

## ## /pages/employer

### [EmployerProfilePage.tsx](file:///Users/sumanthbilla/Desktop/Recruitzaa/Recruitzaa-FE/web/src/pages/employer/EmployerProfilePage.tsx)

- **File Path:** `src/pages/employer/EmployerProfilePage.tsx`
- **Line Number(s):** 177, 183, 190, 197, 199, 201, 208, 281, 338, 393
- **Severity:** [CRITICAL]
- **The Issue:** Heavy layout code bloating (exceeds 390 lines) combined with hardcoded transparency values and pixel widths.
- **The Required Fix:** Break down the profile into smaller widgets and use Tailwind background opacities (`bg-white/10`) and widths (`w-[120px]` replacement).

### [AnalyticsPage.tsx](file:///Users/sumanthbilla/Desktop/Recruitzaa/Recruitzaa-FE/web/src/pages/employer/AnalyticsPage.tsx)

- **File Path:** `src/pages/employer/AnalyticsPage.tsx`
- **Line Number(s):** 3, 4, 5
- **Severity:** [MODERATE]
- **The Issue:** The component is built entirely using inline styling rules instead of utilizing utility classes.
- **The Required Fix:** Replace custom inline properties with class names like `p-8`, `text-2xl font-bold`, and `text-slate-500`.

### [CandidatesPage.tsx](file:///Users/sumanthbilla/Desktop/Recruitzaa/Recruitzaa-FE/web/src/pages/employer/CandidatesPage.tsx)

- **File Path:** `src/pages/employer/CandidatesPage.tsx`
- **Line Number(s):** 74, 92, 110
- **Severity:** [MINOR]
- **The Issue:** Avatar initials containers use inline background-color overrides (`#059669`, `#3B82F6`) instead of themed class names.
- **The Required Fix:** Standardize avatar backgrounds using predefined utility colors or global avatar configurations.
