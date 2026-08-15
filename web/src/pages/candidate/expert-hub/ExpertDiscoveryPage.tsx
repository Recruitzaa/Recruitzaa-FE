import React, { useState } from 'react';
import { useAppSelector } from '../../../store/hooks';
import { ExpertCard } from './ExpertCard';
import { BookingModal } from './BookingModal';
import { SEO } from '../../../components/seo/SEO';
import { PageTransition } from '../../../components/layout/PageTransition';
import type { ExpertProfile } from '../../../data/mockExperts';
import { Sparkles, GraduationCap } from 'lucide-react';

export const ExpertDiscoveryPage: React.FC = () => {
  const directory = useAppSelector((state) => state.expert.directory);
  const [selectedExpert, setSelectedExpert] = useState<ExpertProfile | null>(null);

  return (
    <>
      <PageTransition>
        <SEO
          title="Expert Hub | Recruitzaa"
          description="Book mock interviews, system design dry-runs, and portfolio evaluations from top career and engineering experts."
        />
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 w-full">
          {/* Header Banner */}
          <div className="bg-brand-primary-light/60 border border-brand-primary/20 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1 text-sm font-extrabold uppercase tracking-wider text-brand-primary">
                <Sparkles size={10} /> Live 1-on-1 Sessions
              </span>
              <h1 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <GraduationCap className="text-brand-primary" size={20} /> Expert Discovery
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 max-w-2xl">
                Prepare for technical recruitment loops by booking Mock Interviews, Resume Reviews,
                and Design Critiques from verified industry experts.
              </p>
            </div>
          </div>

          {/* Expert Directory Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {directory.map((expert) => (
              <ExpertCard
                key={expert.id}
                expert={expert}
                onBookClick={() => setSelectedExpert(expert)}
              />
            ))}
          </div>
        </div>
      </PageTransition>

      {/* Booking Modal Triggers */}
      {selectedExpert && (
        <BookingModal
          isOpen={true}
          onClose={() => setSelectedExpert(null)}
          expert={selectedExpert}
        />
      )}
    </>
  );
};
export default ExpertDiscoveryPage;
