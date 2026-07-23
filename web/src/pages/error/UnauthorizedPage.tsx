import { Link } from 'react-router-dom';

export const UnauthorizedPage = () => (
  <main className="min-h-screen grid place-content-center gap-4 bg-slate-50 dark:bg-slate-950 px-4 text-center">
    <p className="text-sm font-bold uppercase tracking-widest text-brand-primary">
      Access restricted
    </p>
    <h1 className="text-3xl font-black text-slate-900 dark:text-white">
      This workspace is not assigned to you
    </h1>
    <p className="max-w-lg text-sm text-slate-600 dark:text-slate-300">
      Choose an assigned workspace or contact an administrator if you believe your role is
      incorrect.
    </p>
    <Link
      to="/launchpad"
      className="mx-auto inline-flex min-h-11 items-center rounded-lg bg-brand-primary px-4 py-2 text-sm font-bold text-white"
    >
      Choose workspace
    </Link>
  </main>
);
