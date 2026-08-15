import { Link, useLocation } from 'react-router-dom';
import { Construction } from 'lucide-react';
import { SEO } from '../../components/seo/SEO';

interface FeatureUnavailablePageProps {
  title?: string;
  description?: string;
  backTo?: string;
}

const getWorkspaceFallback = (pathname: string) => {
  if (pathname.startsWith('/employer')) {
    return { to: '/employer/dashboard', label: 'Return to employer workspace' };
  }
  if (pathname.startsWith('/candidate')) {
    return { to: '/candidate/dashboard', label: 'Return to candidate workspace' };
  }
  if (pathname.startsWith('/expert')) {
    return { to: '/expert/dashboard', label: 'Return to tutor workspace' };
  }
  if (pathname.startsWith('/employee')) {
    return { to: '/employee/dashboard', label: 'Return to employee workspace' };
  }
  if (pathname.startsWith('/admin')) {
    return { to: '/admin/dashboard', label: 'Return to admin workspace' };
  }
  return { to: '/launchpad', label: 'Choose workspace' };
};

export const FeatureUnavailablePage = ({
  title = 'Feature Not Available',
  description = 'We are working on bringing this capability to your workspace.',
  backTo,
}: FeatureUnavailablePageProps) => {
  const { pathname } = useLocation();
  const fallback = getWorkspaceFallback(pathname);
  const destination = backTo ?? fallback.to;

  return (
    <>
      <SEO title={`${title} | Recruitzaa`} description={description} />
      <section
        className="min-h-[55vh] grid place-content-center px-4 text-center"
        aria-labelledby="feature-title"
      >
        <div className="max-w-lg rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#131924] p-8 shadow-sm">
          <Construction className="mx-auto mb-4 text-brand-primary" size={32} aria-hidden="true" />
          <p className="text-xs font-bold uppercase tracking-widest text-brand-primary">
            Not yet available
          </p>
          <h1
            id="feature-title"
            className="mt-2 text-2xl font-extrabold text-slate-900 dark:text-white"
          >
            {title}
          </h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">{description}</p>
          <Link
            to={destination}
            className="mt-6 inline-flex min-h-11 items-center rounded-lg bg-brand-primary px-4 py-2 text-sm font-bold text-white hover:bg-brand-primary-hover"
          >
            {backTo ? 'Go Back' : fallback.label}
          </Link>
        </div>
      </section>
    </>
  );
};
