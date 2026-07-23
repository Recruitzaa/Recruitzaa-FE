import { Link } from 'react-router-dom';

export const NotFoundPage = () => (
  <main className="min-h-screen grid place-content-center gap-4 bg-slate-50 dark:bg-slate-950 px-4 text-center">
    <p className="text-sm font-bold uppercase tracking-widest text-brand-primary">404</p>
    <h1 className="text-3xl font-black text-slate-900 dark:text-white">Page not found</h1>
    <p className="text-sm text-slate-600 dark:text-slate-300">
      The page may have moved or the address may be incorrect.
    </p>
    <Link
      to="/"
      className="mx-auto inline-flex min-h-11 items-center rounded-lg bg-brand-primary px-4 py-2 text-sm font-bold text-white"
    >
      Return home
    </Link>
  </main>
);
