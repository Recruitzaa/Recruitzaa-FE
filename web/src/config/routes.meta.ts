export interface RouteMetaEntry {
  /** Route pattern with `:param` segments (React Router style). */
  path: string;
  label: string;
  parent?: string;
  /** When false, the Breadcrumbs component renders nothing. */
  breadcrumb?: boolean;
  public?: boolean;
}

export const ROUTE_REGISTRY: RouteMetaEntry[] = [
  { path: '/', label: 'Home', breadcrumb: false, public: true },
  { path: '/employers', label: 'For Employers', breadcrumb: false, public: true },
  { path: '/jobs', label: 'Jobs', breadcrumb: false, public: true },
  { path: '/jobs/:id', label: 'Job details', parent: '/jobs', breadcrumb: true, public: true },
  { path: '/privacy', label: 'Privacy Policy', breadcrumb: false, public: true },
  { path: '/terms', label: 'Terms of Service', breadcrumb: false, public: true },
  { path: '/login', label: 'Sign In', breadcrumb: false, public: true },
  { path: '/register', label: 'Create Account', breadcrumb: false, public: true },
  { path: '/candidate/jobs', label: 'Jobs', breadcrumb: false },
  {
    path: '/candidate/jobs/:id',
    label: 'Job details',
    parent: '/candidate/jobs',
    breadcrumb: true,
  },
];

const patternToRegex = (pattern: string) => {
  const escaped = pattern.replace(/:[^/]+/g, '[^/]+');
  return new RegExp(`^${escaped}$`);
};

export const matchRouteMeta = (pathname: string) => {
  for (const entry of ROUTE_REGISTRY) {
    if (patternToRegex(entry.path).test(pathname)) return entry;
  }
  return null;
};

export interface BreadcrumbItem {
  label: string;
  to?: string;
}

/** Build breadcrumb trail from the registry — never from raw URL segments. */
export const getBreadcrumbTrail = (pathname: string, currentLabel?: string): BreadcrumbItem[] => {
  const entry = matchRouteMeta(pathname);
  if (!entry || entry.breadcrumb === false) return [];

  const trail: BreadcrumbItem[] = [];
  let cursor: RouteMetaEntry | null | undefined = entry;

  while (cursor) {
    const isCurrent = cursor.path === entry.path;
    trail.unshift({
      label: isCurrent && currentLabel ? currentLabel : cursor.label,
      to: isCurrent ? undefined : cursor.path,
    });
    cursor = cursor.parent
      ? (ROUTE_REGISTRY.find((route) => route.path === cursor?.parent) ?? null)
      : null;
  }

  return trail;
};
