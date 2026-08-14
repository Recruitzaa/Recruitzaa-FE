import { PageTransition } from '../../components/layout/PageTransition';
import { SEO } from '../../components/seo/SEO';
import { Link } from 'react-router-dom';
import { BRAND } from '../../config/content';

export const PrivacyPolicyPage = () => {
  return (
    <PageTransition>
      <SEO
        title={`Privacy Policy | ${BRAND.name}`}
        description={`Review how ${BRAND.name} collects, uses, and safeguards candidate credentials and parsed resume data.`}
      />
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-8 sm:py-12 px-4 sm:px-6">
        <div className="max-w-3xl mx-auto bg-white dark:bg-[#131924] border border-slate-200 dark:border-slate-800 p-5 sm:p-8 rounded-xl shadow-sm">
          <div className="mb-6">
            <Link
              to="/"
              className="text-sm font-bold text-brand-primary hover:text-brand-primary-hover transition-colors"
            >
              &larr; Back to Home
            </Link>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white mt-3">
              Privacy Policy
            </h1>
            <p className="text-sm text-slate-500 mt-1">Last Updated: July 14, 2026</p>
          </div>

          <div className="prose dark:prose-invert text-sm text-slate-600 space-y-5 leading-relaxed">
            <p>
              At recruitZaa, we take your privacy and the security of your professional data
              seriously. This Privacy Policy details how we handle candidate profile data, resume
              documents, and parsed job details.
            </p>

            <h2 className="text-sm font-bold text-slate-900 dark:text-white pt-2">
              1. Information We Collect
            </h2>
            <p>
              We collect information you provide directly during registration and workspace usage:
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Personal identifiers (Name, Email address, Phone number).</li>
              <li>Resume and CV documents uploaded for ATS scoring.</li>
              <li>Employment preferences, notice periods, and target CTC expectations.</li>
            </ul>

            <h2 className="text-sm font-bold text-slate-900 dark:text-white pt-2">
              2. AI Resume Parsing Consent
            </h2>
            <p>
              When you upload a CV or use our One-Click AI Autofill feature, we process the document
              contents to extract core capabilities, experiences, and notice terms. By uploading
              these files, you consent to our automated semantic parsing engines processing your
              details to match you against employer listings.
            </p>

            <h2 className="text-sm font-bold text-slate-900 dark:text-white pt-2">
              3. Data Retention & Deletion
            </h2>
            <p>
              Your credentials are held securely within our Firebase Auth database. Local workspace
              states synced to your local storage can be cleared at any time by resetting your
              browser session or logging out.
            </p>

            <h2 className="text-sm font-bold text-slate-900 dark:text-white pt-2">4. Contact Us</h2>
            <p>
              If you have any questions or data removal requests regarding this Privacy Policy,
              contact us at:
              <br />
              <a
                href="mailto:privacy@recruitzaa.com"
                className="text-brand-primary font-bold mt-1 inline-block"
              >
                privacy@recruitzaa.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </PageTransition>
  );
};
