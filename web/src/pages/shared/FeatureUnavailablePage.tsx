import { Link } from 'react-router-dom';
import { Construction } from 'lucide-react';

interface FeatureUnavailablePageProps {
  title?: string;
  description?: string;
  backTo?: string;
}

export const FeatureUnavailablePage = ({
  title = 'Feature Under Construction',
  description = 'We are working on bringing this capability to your workspace.',
  backTo = '/',
}: FeatureUnavailablePageProps) => (
  <section
    className="min-h-[55vh] grid place-content-center px-4 text-center"
    aria-labelledby="feature-title"
  >
    <div className="max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131924] p-8 shadow-sm">
      <Construction className="mx-auto mb-4 text-brand-primary" size={32} aria-hidden="true" />
      <p className="text-[11px] font-bold uppercase tracking-widest text-brand-primary">
        Not yet available
      </p>
      <h1
        id="feature-title"
        className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white"
      >
        {title}
      </h1>
      <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">{description}</p>
      <Link
        to={backTo}
        className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-brand-primary px-4 py-2 text-sm font-bold text-white hover:bg-brand-primary-hover"
      >
        Return to dashboard
      </Link>
    </div>
  </section>
);
