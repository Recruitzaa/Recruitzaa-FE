# Recruitzaa — React Frontend Architecture Plan (v2 — Final)

> **Authored by**: Senior Frontend Architect (10 YOE perspective)
> **Stack**: React 18 + TypeScript + Redux Toolkit + React Query + React Router v6 + Vite
> **Auth**: Firebase (Google OAuth + Email/Password)
> **Scope**: Full SPA — Candidate Portal + Employer Portal + Public Site
> **Design**: Mobile-First Responsive + Modern UI (Glassmorphism accents + Corporate clean)

---

## All Decisions Resolved ✅

| Question | Answer |
|---|---|
| Employer portal in scope? | ✅ **Fully build it** |
| Next.js / SSR? | ❌ **No SSR** — Vite SPA. SEO via `react-helmet-async` |
| Auth mechanism | ✅ **Firebase** — Google OAuth + Email/Password |
| AI Hub | ✅ **OpenAI API + your custom backend API** (dual integration) |
| Responsiveness | ✅ **Mobile-first, fully responsive** — web covers iOS/Android browser users |
| File upload format | ✅ **PDF / DOCX** — multipart/form-data |
| API base URL | ✅ **`.env` with placeholders** |
| Tables library | ✅ **TanStack Table v8** (headless) + Custom CSS — no Bootstrap |
| Design style | ✅ **Modern + Classic corporate** — glassmorphism accents, clean Inter typography |

---

## Tech Stack (Final — Industry Approved 2025)

| Layer | Library | Version | Rationale |
|---|---|---|---|
| Build | **Vite** | 5.x | Fastest HMR, native ESM, optimized prod build |
| Framework | **React** | 18.x (TypeScript strict) | Concurrent features, stable ecosystem |
| Language | **TypeScript** | 5.x strict | Full type safety across all layers |
| Routing | **React Router** | v6.x | Nested routes, data loaders, lazy loading |
| Global State | **Redux Toolkit** | 2.x | Auth/UI/user state (non-server state) |
| Server State | **TanStack Query** | v5.x | Caching, pagination, optimistic updates |
| Auth | **Firebase SDK** | v10.x | Google OAuth, Email/Password, JWT tokens |
| HTTP | **Axios** | 1.x | Interceptors, token injection, error handling |
| Forms | **React Hook Form + Zod** | latest | Perf forms + schema validation |
| Data Tables | **TanStack Table** | v8.x | Headless, sort/filter/paginate — custom styled |
| Drag & Drop | **@dnd-kit/core** | latest | Kanban board (accessible, modern) |
| Icons | **Lucide React** | latest | MIT, tree-shakeable, 1000+ icons |
| SEO | **react-helmet-async** | latest | Meta tags, Open Graph, title per page |
| Date | **date-fns** | 3.x | Lightweight, tree-shakeable |
| File Upload | **react-dropzone** | latest | PDF/DOCX drag-and-drop with validation |
| AI/OpenAI | **openai** (official SDK) | 4.x | ATS score, AI chat assistant |
| Animations | **framer-motion** | 11.x | Micro-animations, page transitions |
| Styling | **CSS Modules + CSS Variables** | — | Scoped, zero runtime, design token driven |
| Testing | **Vitest + RTL** | latest | Vite-native, fast |
| Quality | **ESLint + Prettier + Husky** | (existing) | Already configured |

> ⚠️ **No Bootstrap. No Material UI. No Ant Design.** — Full custom CSS using design tokens.

---

## Why TanStack Table (Not Bootstrap Table)?

Bootstrap/Ant Design tables force their visual styles onto your brand. **TanStack Table v8 is 100% headless** — zero CSS, zero DOM opinions. You write your own `<table>`, style it with CSS Modules using your own design tokens, and TanStack Table gives you:

- Column sorting, filtering, pagination (all built-in)
- Virtual scrolling for large datasets
- Column visibility toggling
- Row selection

This is the **industry standard for enterprise React tables** (used by Vercel, Linear, etc.).

---

## Mobile-First Responsive Strategy

### Breakpoint System (CSS Variables)
```css
/* No Tailwind — our own breakpoints via CSS custom media or manual media queries */
--breakpoint-sm:  640px;   /* Large phones landscape */
--breakpoint-md:  768px;   /* Tablet portrait */
--breakpoint-lg:  1024px;  /* Tablet landscape / small laptop */
--breakpoint-xl:  1280px;  /* Desktop */
--breakpoint-2xl: 1536px;  /* Wide desktop */
```

### Responsive Approach Per Layout
| Screen | Mobile (< 768px) | Tablet (768–1024px) | Desktop (1024px+) |
|---|---|---|---|
| **Navbar** | Hamburger menu drawer | Compact nav | Full mega-menu |
| **Landing Hero** | Single column, stacked | Two-column, condensed | Two-column full |
| **Job Listings** | Filter as bottom sheet | Filter collapsible sidebar | Always-visible left panel |
| **Sidebar (Portal)** | Slide-in drawer | Collapsible (icon-only) | Full 260px fixed |
| **Kanban Board** | Horizontal scroll, touch-drag | 3-visible columns + scroll | 5 columns visible |
| **AI Hub** | Tabs stacked, chat below | Two-pane | Two-pane, fixed chat |
| **Auth Page** | Form-only (brand panel hidden) | Split 60/40 | Split 50/50 |

### iOS User Coverage
Since no React Native iOS is planned right now, the **web app must be pixel-perfect on Safari iOS**:
- Use `-webkit-` prefixes where needed
- Avoid `position: fixed` traps (use `position: sticky` instead)
- Safe area insets for notched devices (`env(safe-area-inset-*)`)
- Touch targets minimum 44×44px (Apple HIG standard)
- No hover-only interactions — touch-friendly everything

---

## Design System: Modern + Corporate Hybrid

### Design Philosophy
The UI follows a **"Corporate Precision + Modern Polish"** principle:
- **Base layer**: Clean, structured, corporate (Adecco-inspired, as per prototypes)
- **Accent layer**: Subtle glassmorphism on cards, gradient hero elements, smooth framer-motion transitions
- **No gimmicks**: Animations serve UX, not spectacle (< 300ms transitions)

### Modern UI Features Applied
| Feature | Where Used |
|---|---|
| **Glassmorphism cards** | Hero visual preview, floating action cards |
| **Gradient hero** | Landing page hero section background |
| **Smooth page transitions** | Route changes via framer-motion `AnimatePresence` |
| **Skeleton loaders** | All data-loading states (no spinner-only) |
| **Sticky topbar blur** | Navbar gets `backdrop-filter: blur()` on scroll |
| **Animated match badge** | Percentage counter animation on load |
| **Kanban drag ghost** | Custom drag overlay with shadow + scale effect |
| **Toast slide-in** | Notification toasts from bottom-right |

---

## High-Level Architecture (HLD)

```
┌────────────────────────────────────────────────────────────────────────────┐
│                    RECRUITZAA SPA (Vite + React 18 + TypeScript)           │
│                                                                            │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                    ROUTING LAYER (React Router v6)                   │  │
│  │  PUBLIC              CANDIDATE PORTAL        EMPLOYER PORTAL         │  │
│  │  /                   /candidate/dashboard    /employer/dashboard     │  │
│  │  /jobs               /candidate/applications /employer/post-job      │  │
│  │  /jobs/:id           /candidate/pipeline     /employer/candidates    │  │
│  │  /auth               /candidate/ai-hub       /employer/analytics     │  │
│  │                      /candidate/profile                              │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                            │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                    AUTH LAYER (Firebase SDK v10)                     │  │
│  │  GoogleAuthProvider → signInWithPopup → ID Token → backend verify   │  │
│  │  EmailAuthProvider  → createUser / signIn → ID Token                │  │
│  │  RoleGuard component wraps protected route trees                     │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                            │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                    STATE LAYER                                       │  │
│  │  Redux Toolkit (RTK)              TanStack Query v5                  │  │
│  │  ├── authSlice (Firebase user)    ├── useJobs (paginated + filters)  │  │
│  │  ├── uiSlice (toasts/modals)      ├── useJobDetail                   │  │
│  │  └── userSlice (profile/prefs)    ├── useApplications               │  │
│  │                                   ├── useAIScore (OpenAI)            │  │
│  │                                   ├── useCandidatePipeline           │  │
│  │                                   └── useEmployerJobs                │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                            │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                    API LAYER                                         │  │
│  │  lib/axios.ts → Axios instance (Firebase ID Token interceptor)       │  │
│  │  lib/openai.ts → OpenAI SDK client (ATS + Chat)                     │  │
│  │  services/  auth | jobs | applications | ai | profile | employer     │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
│                                                                            │
│  ┌──────────────────────────────────────────────────────────────────────┐  │
│  │                    COMPONENT LAYER                                   │  │
│  │  ui/      ← Atomic (Button, Badge, Input, Table, Modal, Toast)       │  │
│  │  layout/  ← Shell (Navbar, Sidebar, Footer, MobileDrawer)            │  │
│  │  features/← Domain (auth, jobs, candidate, kanban, ai-hub, employer) │  │
│  │  pages/   ← Route orchestrators (thin, composing feature components) │  │
│  └──────────────────────────────────────────────────────────────────────┘  │
└────────────────────────────────────────────────────────────────────────────┘
                                    │
                   REST API Backend (Django/Node) + Firebase Auth
                   OpenAI API (direct from client, key via .env)
```

---

## Feature-Sliced Project Structure (LLD)

```
src/
│
├── main.tsx                          # Entry point
├── App.tsx                           # Router + Providers (Redux, QueryClient, Firebase)
├── vite-env.d.ts
│
├── assets/
│   ├── logo.png
│   └── fonts/
│
├── styles/
│   ├── tokens.css                    # All CSS custom properties (design tokens)
│   ├── global.css                    # Reset, body, utility classes
│   ├── typography.css                # Inter font scale
│   └── breakpoints.css               # CSS media query mixins
│
├── config/
│   ├── constants.ts                  # APP_NAME, DEFAULT_PAGE_LIMIT, etc.
│   ├── routes.ts                     # ROUTES.HOME, ROUTES.JOBS, etc.
│   ├── firebase.ts                   # Firebase app init (reads VITE_FIREBASE_*)
│   ├── queryClient.ts                # TanStack Query client config
│   └── env.ts                        # Typed env vars (import.meta.env wrappers)
│
├── lib/
│   ├── axios.ts                      # Axios instance + Firebase token interceptor
│   ├── openai.ts                     # OpenAI SDK client instance
│   ├── storage.ts                    # localStorage/sessionStorage helpers
│   └── utils.ts                      # Formatters, slugify, truncate, etc.
│
├── types/
│   ├── auth.types.ts                 # FirebaseUser, AppUser, UserRole
│   ├── job.types.ts                  # Job, JobFilter, PaginatedResponse<T>
│   ├── application.types.ts          # Application, KanbanColumnId
│   ├── ai.types.ts                   # ATSScore, ChatMessage, KeywordMatch
│   ├── employer.types.ts             # Employer, PostedJob, CandidateView
│   └── api.types.ts                  # ApiError, PaginatedMeta
│
├── store/
│   ├── index.ts                      # configureStore, RootState, AppDispatch
│   ├── hooks.ts                      # useAppSelector, useAppDispatch
│   └── slices/
│       ├── auth.slice.ts             # Firebase user, role, loading, error
│       ├── ui.slice.ts               # toasts[], activeModal, sidebarCollapsed
│       └── user.slice.ts             # candidateProfile, employerProfile
│
├── services/
│   ├── auth.service.ts               # Firebase signIn, signOut, getIdToken
│   ├── jobs.service.ts               # getJobs, getJobById, searchJobs
│   ├── applications.service.ts       # applyToJob, getApplications, updateStage
│   ├── ai.service.ts                 # scoreResume (custom API), chatWithAI (OpenAI)
│   ├── profile.service.ts            # getProfile, updateProfile, uploadResume
│   └── employer.service.ts           # postJob, getPostedJobs, getCandidates
│
├── hooks/
│   ├── useAuth.ts                    # Firebase auth state + Redux sync
│   ├── useJobSearch.ts               # Debounced search + URL param sync
│   ├── usePagination.ts              # Page/limit state
│   ├── useToast.ts                   # Add/remove toasts via Redux
│   ├── useMediaQuery.ts              # Responsive breakpoint detection
│   ├── useScrollLock.ts              # Lock body scroll for modals/drawers
│   └── useFileUpload.ts              # react-dropzone wrapper (PDF/DOCX)
│
├── components/
│   │
│   ├── ui/                           # Atomic Design System Components
│   │   ├── Button/
│   │   │   ├── Button.tsx
│   │   │   ├── Button.module.css
│   │   │   └── index.ts
│   │   ├── Badge/
│   │   │   ├── Badge.tsx            # variant: primary|success|warning|error|neutral
│   │   │   └── Badge.module.css
│   │   ├── Input/
│   │   │   ├── Input.tsx            # label, error, leftIcon, rightIcon
│   │   │   └── Input.module.css
│   │   ├── Select/
│   │   │   ├── Select.tsx
│   │   │   └── Select.module.css
│   │   ├── Card/
│   │   │   ├── Card.tsx             # variant: default|glass|elevated
│   │   │   └── Card.module.css
│   │   ├── DataTable/               # TanStack Table v8 — custom styled
│   │   │   ├── DataTable.tsx        # Generic headless table wrapper
│   │   │   ├── TableHeader.tsx
│   │   │   ├── TableRow.tsx
│   │   │   ├── TablePagination.tsx
│   │   │   └── DataTable.module.css
│   │   ├── Modal/
│   │   │   ├── Modal.tsx
│   │   │   └── Modal.module.css
│   │   ├── Drawer/
│   │   │   ├── Drawer.tsx           # Mobile sidebar + filter drawer
│   │   │   └── Drawer.module.css
│   │   ├── Spinner/
│   │   │   └── Spinner.tsx
│   │   ├── Skeleton/
│   │   │   ├── Skeleton.tsx
│   │   │   └── SkeletonCard.tsx
│   │   ├── Avatar/
│   │   │   └── Avatar.tsx           # Initials fallback + image
│   │   ├── Toast/
│   │   │   ├── Toast.tsx
│   │   │   └── ToastContainer.tsx   # Fixed bottom-right
│   │   ├── ProgressBar/
│   │   │   └── ProgressBar.tsx      # Profile completion, ATS score
│   │   └── FileDropZone/
│   │       ├── FileDropZone.tsx     # react-dropzone, PDF/DOCX only
│   │       └── FileDropZone.module.css
│   │
│   └── layout/
│       ├── PublicLayout/
│       │   ├── PublicLayout.tsx     # Navbar + UtilityBar + Footer + <Outlet>
│       │   └── PublicLayout.module.css
│       ├── PortalLayout/
│       │   ├── PortalLayout.tsx     # Sidebar + Topbar + <Outlet>
│       │   └── PortalLayout.module.css
│       ├── Navbar/
│       │   ├── Navbar.tsx           # Sticky, blur on scroll
│       │   ├── NavMenu.tsx          # Desktop horizontal nav
│       │   ├── MegaMenu.tsx         # Find Jobs / Employer Services dropdowns
│       │   ├── NavActions.tsx       # Sign In / Post Job / Register
│       │   ├── MobileNavDrawer.tsx  # Hamburger → slide-in full menu
│       │   └── Navbar.module.css
│       ├── Sidebar/
│       │   ├── Sidebar.tsx          # Desktop fixed sidebar
│       │   ├── SidebarLink.tsx      # Active state + badge
│       │   ├── SidebarUser.tsx      # Avatar + name + role
│       │   ├── MobileSidebar.tsx    # Drawer variant for mobile
│       │   └── Sidebar.module.css
│       ├── Topbar/
│       │   ├── Topbar.tsx
│       │   └── Topbar.module.css
│       ├── Breadcrumb/
│       │   ├── Breadcrumb.tsx       # Auto-generates from route
│       │   └── Breadcrumb.module.css
│       ├── UtilityBar/
│       │   └── UtilityBar.tsx       # Top dark bar, portal toggle
│       └── Footer/
│           ├── Footer.tsx
│           └── Footer.module.css
│
├── features/
│   │
│   ├── auth/
│   │   ├── components/
│   │   │   ├── AuthBrandPanel.tsx   # Dark left panel with trust points
│   │   │   ├── RoleTabs.tsx         # Job Seeker / Employer toggle
│   │   │   ├── LoginForm.tsx        # Email + password + Google button
│   │   │   ├── RegisterForm.tsx     # Name + email + phone + password
│   │   │   └── GoogleSignInButton.tsx
│   │   ├── hooks/
│   │   │   └── useAuthForms.ts      # RHF + Zod login/register schemas
│   │   └── guards/
│   │       └── RoleGuard.tsx        # Route wrapper, redirect if not authed
│   │
│   ├── jobs/
│   │   ├── components/
│   │   │   ├── JobCard.tsx          # Role, company, badges, match %
│   │   │   ├── JobDetailPanel.tsx   # Slide-in detail (desktop) / modal (mobile)
│   │   │   ├── JobFilters.tsx       # Filter panel — type, location, salary, remote
│   │   │   ├── JobFilterDrawer.tsx  # Mobile bottom-sheet filter
│   │   │   ├── JobSearchBar.tsx     # Keyword + location hero search
│   │   │   ├── AIMatchBadge.tsx     # Animated score badge
│   │   │   └── JobApplyModal.tsx    # Apply confirmation modal
│   │   ├── hooks/
│   │   │   ├── useJobs.ts           # TanStack Query paginated list
│   │   │   ├── useJobDetail.ts      # Single job detail
│   │   │   └── useJobFilters.ts     # URL param synced filters
│   │   └── schemas/
│   │       └── jobFilter.schema.ts
│   │
│   ├── candidate/
│   │   ├── components/
│   │   │   ├── DashboardKPICards.tsx  # Applications, Interviews, Profile %
│   │   │   ├── ApplicationTable.tsx   # TanStack Table: status, company, role
│   │   │   ├── SkillDemandIndex.tsx   # Skill match bars
│   │   │   ├── ProfileCard.tsx        # Avatar, headline, completion ring
│   │   │   └── RecommendedJobs.tsx    # AI-matched jobs list
│   │   └── hooks/
│   │       ├── useCandidateDashboard.ts
│   │       └── useApplications.ts
│   │
│   ├── kanban/
│   │   ├── components/
│   │   │   ├── KanbanBoard.tsx        # dnd-kit DndContext wrapper
│   │   │   ├── KanbanColumn.tsx       # SortableContext per column
│   │   │   ├── KanbanCard.tsx         # useSortable draggable card
│   │   │   ├── KanbanColumnHeader.tsx # Stage label + count badge
│   │   │   └── KanbanDragOverlay.tsx  # Custom drag ghost
│   │   ├── hooks/
│   │   │   └── useKanban.ts           # Drag state + mutation + optimistic
│   │   └── constants/
│   │       └── kanban.constants.ts    # COLUMNS: SAVED|APPLIED|SCREENING|INTERVIEW|OFFER
│   │
│   ├── ai-hub/
│   │   ├── components/
│   │   │   ├── ATSScoreGauge.tsx      # SVG circular gauge, animated
│   │   │   ├── KeywordMatchList.tsx   # Found ✓ / Missing ✗ keywords
│   │   │   ├── ResumeUploadZone.tsx   # FileDropZone wrapper (PDF/DOCX)
│   │   │   ├── AIChatPanel.tsx        # OpenAI chat interface
│   │   │   ├── ChatMessage.tsx        # User / AI message bubble
│   │   │   ├── AIChatInput.tsx        # Textarea + send
│   │   │   └── ScoreBreakdownCard.tsx # Category-wise score breakdown
│   │   ├── hooks/
│   │   │   ├── useATSScore.ts         # POST to custom API → score
│   │   │   └── useAIChat.ts           # OpenAI SDK streaming chat
│   │   └── schemas/
│   │       └── resume.schema.ts       # Zod: PDF/DOCX, max 5MB
│   │
│   └── employer/
│       ├── components/
│       │   ├── PostJobForm.tsx         # Multi-step job posting form
│       │   ├── JobPostingCard.tsx      # Active job listing management
│       │   ├── CandidateTable.tsx      # TanStack Table: applicant management
│       │   ├── CandidateDetailModal.tsx
│       │   ├── EmployerKPICards.tsx    # Total applicants, shortlisted, hired
│       │   └── StaffingEnquiryForm.tsx # Enterprise enquiry form
│       └── hooks/
│           ├── useEmployerJobs.ts
│           └── useCandidatePipeline.ts
│
└── pages/
    ├── public/
    │   ├── LandingPage.tsx              # / (SEO: react-helmet-async)
    │   ├── JobListingsPage.tsx          # /jobs
    │   └── JobDetailPage.tsx            # /jobs/:id
    ├── auth/
    │   └── AuthPage.tsx                 # /auth
    ├── candidate/
    │   ├── DashboardPage.tsx            # /candidate/dashboard
    │   ├── ApplicationsPage.tsx         # /candidate/applications
    │   ├── KanbanPage.tsx               # /candidate/pipeline
    │   ├── AIHubPage.tsx                # /candidate/ai-hub
    │   └── ProfilePage.tsx              # /candidate/profile
    ├── employer/
    │   ├── EmployerDashboardPage.tsx    # /employer/dashboard
    │   ├── PostJobPage.tsx              # /employer/post-job
    │   ├── CandidatesPage.tsx           # /employer/candidates
    │   └── AnalyticsPage.tsx            # /employer/analytics
    └── error/
        ├── NotFoundPage.tsx             # 404
        └── UnauthorizedPage.tsx         # 403
```

---

## `.env` Configuration (Placeholders)

```env
# .env.example  (commit this — never commit .env with real values)

# API
VITE_API_BASE_URL=https://your-backend-api.com/api

# Firebase (replace with your Firebase project values)
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_firebase_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# OpenAI (ATS score + AI Chat)
VITE_OPENAI_API_KEY=sk-your_openai_key_here

# App
VITE_APP_NAME=Recruitzaa
VITE_APP_ENV=development
```

---

## Firebase Auth Flow (LLD)

```
User clicks "Sign in with Google"
    ↓
GoogleAuthProvider().signInWithPopup()
    ↓
Firebase returns: { uid, email, displayName, photoURL, idToken }
    ↓
Send idToken to backend: POST /api/auth/firebase-verify/
    ↓
Backend verifies token → returns { role: 'CANDIDATE'|'EMPLOYER', profile }
    ↓
Dispatch to Redux: authSlice.setUser({ firebaseUser, role, profile })
    ↓
React Router: navigate to /candidate/dashboard OR /employer/dashboard
```

**Token Refresh**: Firebase SDK handles token refresh automatically. Axios interceptor calls `firebase.auth().currentUser.getIdToken(true)` on 401.

---

## Table Architecture Decision (LLD)

### TanStack Table v8 — No Bootstrap, No Ant Design

```tsx
// components/ui/DataTable/DataTable.tsx
// Generic, fully custom-styled wrapper around TanStack Table

import { useReactTable, getCoreRowModel, getSortedRowModel, getPaginationRowModel } from '@tanstack/react-table';

// Usage in ApplicationTable.tsx:
const table = useReactTable({
  data: applications,
  columns: applicationColumns,      // Column definitions with custom cell renderers
  getCoreRowModel: getCoreRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
});
```

The `DataTable.module.css` applies the exact design tokens:
- `--color-border: #E5E7EB` table borders
- `--color-surface: #F8FAFC` alternating rows
- `--color-primary: #C14F16` sort indicators + selected rows
- Hover states, sticky header, responsive horizontal scroll on mobile

---

## Redux Store (LLD)

### `auth.slice.ts`
```ts
interface AuthState {
  firebaseUser: FirebaseUser | null;
  appUser: { id: string; email: string; role: 'CANDIDATE' | 'EMPLOYER' } | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
// Actions: setUser, clearUser, setLoading, setError
```

### `ui.slice.ts`
```ts
interface UIState {
  toasts: { id: string; type: 'success'|'error'|'info'|'warning'; message: string }[];
  activeModal: string | null;
  isSidebarCollapsed: boolean;
  isMobileDrawerOpen: boolean;
}
```

### `user.slice.ts`
```ts
interface UserState {
  candidateProfile: CandidateProfile | null;
  employerProfile: EmployerProfile | null;
  resumeUploadStatus: 'idle' | 'uploading' | 'done' | 'error';
}
```

---

## API Layer (LLD)

### Axios Instance (`lib/axios.ts`)
```ts
const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });

// REQUEST: Inject Firebase ID token on every call
api.interceptors.request.use(async (config) => {
  const user = firebase.auth().currentUser;
  if (user) {
    const token = await user.getIdToken();
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// RESPONSE: Handle 401 → refresh token → retry once
// RESPONSE: Normalize errors → dispatch UI toast
```

### AI Service (`services/ai.service.ts`)
```ts
// Custom backend API for ATS scoring
export const scoreResume = (file: File, jobDescription: string) => {
  const form = new FormData();
  form.append('resume', file);           // PDF or DOCX
  form.append('job_description', jobDescription);
  return api.post<ATSScore>('/ai/score-resume/', form);
};

// OpenAI SDK for chat
const openai = new OpenAI({ apiKey: import.meta.env.VITE_OPENAI_API_KEY, dangerouslyAllowBrowser: true });

export const streamCareerChat = async (messages: ChatMessage[], onChunk: (text: string) => void) => {
  const stream = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages,
    stream: true,
  });
  for await (const chunk of stream) {
    onChunk(chunk.choices[0]?.delta?.content || '');
  }
};
```

---

## SEO Strategy (react-helmet-async)

```tsx
// pages/public/LandingPage.tsx
import { Helmet } from 'react-helmet-async';

<Helmet>
  <title>Recruitzaa — Enterprise Staffing & AI Recruitment Platform</title>
  <meta name="description" content="Connect with top talent across IT, engineering, finance, and healthcare — powered by precision AI matching." />
  <meta property="og:title" content="Recruitzaa — Enterprise Staffing Platform" />
  <meta property="og:image" content="/og-image.png" />
  <meta name="robots" content="index, follow" />
</Helmet>

// Every page gets its own Helmet with unique title + description
```

---

## Routing Architecture (LLD)

```tsx
// App.tsx
<HelmetProvider>
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          {/* PUBLIC */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/jobs" element={<JobListingsPage />} />
            <Route path="/jobs/:id" element={<JobDetailPage />} />
          </Route>

          {/* AUTH */}
          <Route path="/auth" element={<AuthPage />} />

          {/* CANDIDATE — Firebase auth + role check */}
          <Route element={<RoleGuard allowedRole="CANDIDATE" />}>
            <Route element={<PortalLayout />}>
              <Route path="/candidate/dashboard"    element={<DashboardPage />} />
              <Route path="/candidate/applications" element={<ApplicationsPage />} />
              <Route path="/candidate/pipeline"     element={<KanbanPage />} />
              <Route path="/candidate/ai-hub"       element={<AIHubPage />} />
              <Route path="/candidate/profile"      element={<ProfilePage />} />
            </Route>
          </Route>

          {/* EMPLOYER — Firebase auth + role check */}
          <Route element={<RoleGuard allowedRole="EMPLOYER" />}>
            <Route element={<PortalLayout />}>
              <Route path="/employer/dashboard"   element={<EmployerDashboardPage />} />
              <Route path="/employer/post-job"    element={<PostJobPage />} />
              <Route path="/employer/candidates"  element={<CandidatesPage />} />
              <Route path="/employer/analytics"   element={<AnalyticsPage />} />
            </Route>
          </Route>

          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </QueryClientProvider>
  </Provider>
</HelmetProvider>
```

---

## Design Tokens (Final Mapped CSS Variables)

```css
/* src/styles/tokens.css */
:root {
  /* === BRAND === */
  --color-primary:        #C14F16;
  --color-primary-hover:  #A94210;
  --color-primary-light:  #FEF3EE;

  /* === NEUTRALS === */
  --color-dark:           #1E2229;
  --color-dark-muted:     #2D323C;
  --color-ink:            #111827;
  --color-slate:          #4B5563;
  --color-slate-muted:    #9CA3AF;
  --color-border:         #E5E7EB;
  --color-surface:        #F8FAFC;
  --color-white:          #FFFFFF;

  /* === SEMANTIC === */
  --color-success:        #059669;
  --color-success-light:  #ECFDF5;
  --color-warning:        #D97706;
  --color-warning-light:  #FFFBEB;
  --color-error:          #DC2626;
  --color-error-light:    #FEF2F2;

  /* === SPACING === */
  --radius-sm:  6px;
  --radius:     8px;
  --radius-lg:  12px;

  /* === SHADOWS === */
  --shadow-sm:  0 1px 2px 0 rgba(0,0,0,0.05);
  --shadow:     0 1px 3px 0 rgba(0,0,0,0.10), 0 1px 2px 0 rgba(0,0,0,0.06);
  --shadow-md:  0 4px 6px -1px rgba(0,0,0,0.10), 0 2px 4px -1px rgba(0,0,0,0.06);
  --shadow-lg:  0 10px 25px rgba(0,0,0,0.12);

  /* === ANIMATION === */
  --transition: 0.2s ease-in-out;

  /* === LAYOUT === */
  --sidebar-width:        260px;
  --topbar-height:        68px;
  --navbar-height:        76px;
  --container-max:        1280px;

  /* === BREAKPOINTS (used in JS via useMediaQuery) === */
  --bp-sm:  640px;
  --bp-md:  768px;
  --bp-lg:  1024px;
  --bp-xl:  1280px;
}
```

---

## Screen-to-Component Mapping (Final)

| Prototype | Route | Page | Key Components |
|---|---|---|---|
| `01_landing.html` | `/` | `LandingPage` | `UtilityBar`, `Navbar` + `MegaMenu`, `HeroSection`, `JobSearchBar`, `AIMatchedPreview`, `PortalsGrid`, `ServicesGrid`, `Footer` |
| `02_job_listings.html` | `/jobs` | `JobListingsPage` | `JobFilters` + `JobFilterDrawer (mobile)`, `JobCard`, `JobDetailPanel`, `AIMatchBadge`, `Pagination` |
| `03_dashboard.html` | `/candidate/dashboard` | `DashboardPage` | `Sidebar`, `Topbar`, `DashboardKPICards`, `ApplicationTable` (TanStack), `RecommendedJobs`, `SkillDemandIndex` |
| `04_ai_hub.html` | `/candidate/ai-hub` | `AIHubPage` | `ResumeUploadZone`, `ATSScoreGauge`, `ScoreBreakdownCard`, `KeywordMatchList`, `AIChatPanel` |
| `05_kanban.html` | `/candidate/pipeline` | `KanbanPage` | `KanbanBoard`, `KanbanColumn`, `KanbanCard` (dnd-kit), `KanbanDragOverlay` |
| `06_auth.html` | `/auth` | `AuthPage` | `AuthBrandPanel`, `RoleTabs`, `LoginForm`, `RegisterForm`, `GoogleSignInButton` |
| _(new)_ | `/employer/dashboard` | `EmployerDashboardPage` | `EmployerKPICards`, `CandidateTable` (TanStack), `JobPostingCard` |
| _(new)_ | `/employer/post-job` | `PostJobPage` | `PostJobForm` (multi-step), `RHF + Zod` |

---

## Execution Phases

| Phase | Scope | Deliverable |
|---|---|---|
| **1 — Foundation** | Vite scaffold, tokens.css, config, types, .env | App runs on localhost with design system |
| **2 — State & API** | Redux store, Firebase auth, Axios interceptors, services | Auth flow works end-to-end |
| **3 — UI Library** | All `components/ui/` + `components/layout/` | Storybook-ready component library |
| **4 — Public Pages** | Landing, Job Listings, Job Detail, Auth | All public screens match prototypes |
| **5 — Candidate Portal** | Dashboard, Applications, Kanban, Profile | Full candidate flow |
| **6 — AI Hub** | ATS score (custom API) + AI Chat (OpenAI streaming) | AI features working |
| **7 — Employer Portal** | Dashboard, Post Job, Candidate Pipeline, Analytics | Full employer flow |
| **8 — Polish** | Framer-motion animations, mobile QA, SEO audit, Vitest | Production-ready |

---

## Naming Conventions

| Element | Convention | Example |
|---|---|---|
| Components / Pages | `PascalCase.tsx` | `JobCard.tsx`, `DashboardPage.tsx` |
| Hooks | `use + PascalCase.ts` | `useJobSearch.ts`, `useATSScore.ts` |
| Services | `camelCase.service.ts` | `jobs.service.ts` |
| Types | `camelCase.types.ts` | `job.types.ts` |
| CSS Modules | `camelCase` class | `styles.cardTitle` |
| Constants | `UPPER_SNAKE_CASE` | `DEFAULT_PAGE_LIMIT` |
| Directories | `kebab-case` | `ai-hub/`, `job-listings/` |
| Branch | `feature/fe-<desc>` | `feature/fe-kanban-board` |
| Commit | `type(scope): desc` | `feat(employer): add post-job form` |

---

## Verification Plan

### Automated
```bash
npm run lint          # ESLint + Prettier (existing)
npx vitest run        # Unit tests: components, slices, hooks
npx vitest --coverage # Coverage report
```

### Manual QA Checklist
- [ ] All 6 prototype screens match pixel-to-pixel on 1280px desktop
- [ ] Full mobile layout on iPhone SE (375px) — no horizontal scroll
- [ ] Firebase Google login → role routing works (candidate vs employer)
- [ ] Kanban drag-and-drop on touch (iPad / Android)
- [ ] ATS resume upload: PDF ✓, DOCX ✓, invalid file shows error
- [ ] AI chat streaming renders tokens in real-time
- [ ] TanStack Table sort/filter/pagination on applications table
- [ ] SEO: each page has unique `<title>` and `<meta description>`
- [ ] iOS Safari: no layout breaks, safe area insets correct
- [ ] Employer portal: post job → appears in job listings
