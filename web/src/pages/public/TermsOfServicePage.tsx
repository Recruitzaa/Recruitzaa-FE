import { PageTransition } from '../../components/layout/PageTransition';
import { SEO } from '../../components/seo/SEO';
import { Link } from 'react-router-dom';

export const TermsOfServicePage = () => {
  return (
    <PageTransition>
      <SEO
        title="Terms of Service | recruitZaa Enterprise"
        description="Read the recruitZaa platform Terms of Service regulating candidate workspace applications and employer job postings."
      />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12 px-6">
        <div className="max-w-3xl mx-auto bg-white dark:bg-[#131924] border border-slate-200 dark:border-slate-800 p-8 rounded-xl shadow-sm">
          <div className="mb-6">
            <Link
              to="/"
              className="text-sm font-bold text-brand-primary hover:text-brand-primary-hover transition-colors"
            >
              &larr; Back to Home
            </Link>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white mt-3">
              Terms of Service
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Last Updated: July 14, 2026
            </p>
          </div>

          <div className="prose dark:prose-invert text-sm text-slate-600 dark:text-slate-300 space-y-5 leading-relaxed">
            <p>
              Welcome to recruitZaa. By creating a job seeker or employer account on our workspace
              platform, you agree to comply with and be bound by the following Terms of Service.
            </p>

            <h2 className="text-sm font-bold text-slate-900 dark:text-white pt-2">
              1. Acceptable Platform Use
            </h2>
            <p>
              You agree to provide accurate, up-to-date information, including notice period
              timelines and salary details. Impersonation of other candidates, submitting corrupted
              resume files, or inputting fraudulent job openings is strictly prohibited and subject
              to account suspension.
            </p>

            <h2 className="text-sm font-bold text-slate-900 dark:text-white pt-2">
              2. Intellectual Property
            </h2>
            <p>
              All assets, logos, styles, and automated matchmaking matching systems are the sole
              property of recruitZaa Technologies Pvt. Ltd. You may not scrape, clone, or reverse
              engineer any elements of our workspace.
            </p>

            <h2 className="text-sm font-bold text-slate-900 dark:text-white pt-2">
              3. Limitation of Liability
            </h2>
            <p>
              recruitZaa provides resume analysis and job matching suggestions based on client-side
              AI simulations. We do not guarantee job interviews or hiring success. All employer
              hiring commitments are handled outside of the platform.
            </p>

            <h2 className="text-sm font-bold text-slate-900 dark:text-white pt-2">
              4. Service Adjustments
            </h2>
            <p>
              We reserve the right to modify, adjust, or suspend candidate portal tools, Kanban
              boards, or resume services at any time without notice.
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
