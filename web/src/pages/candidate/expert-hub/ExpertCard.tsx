import React from 'react';
import type { ExpertProfile } from '../../../data/mockExperts';
import { Star, Building2, Calendar, Award } from 'lucide-react';

interface ExpertCardProps {
  expert: ExpertProfile;
  onBookClick: () => void;
}

export const ExpertCard: React.FC<ExpertCardProps> = ({ expert, onBookClick }) => {
  const startingPrice = Math.min(...expert.serviceTiers.map((t) => t.price));

  return (
    <>
      <article
        className="bg-white dark:bg-[#131924] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
        aria-labelledby={`expert-name-${expert.id}`}
      >
        <div>
          {/* Avatar and Top Badge */}
          <div className="flex items-start justify-between gap-4">
            <img
              src={expert.avatar}
              alt=""
              className="w-14 h-14 rounded-xl object-cover border border-slate-105 dark:border-slate-800"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=256';
              }}
            />
            <span className="inline-flex items-center gap-1 text-[9px] font-black text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 px-2 py-0.5 rounded-full uppercase tracking-wider">
              <Award size={10} className="text-[#c14f16]" aria-hidden="true" /> Top Mentor
            </span>
          </div>

          {/* Core Info */}
          <div className="mt-3.5 space-y-1">
            <h3
              id={`expert-name-${expert.id}`}
              className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight"
            >
              {expert.name}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
              {expert.headline}
            </p>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-1.5 mt-4">
            <span className="inline-flex items-center gap-1 text-[9px] font-extrabold text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-950/20 px-2 py-0.5 rounded">
              {expert.reviewsCount} Sessions Conducted
            </span>
            <span className="inline-flex items-center gap-1 text-[9px] font-extrabold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/20 px-2 py-0.5 rounded">
              <Star size={9} className="fill-amber-500 stroke-amber-500" aria-hidden="true" />{' '}
              {expert.rating.toFixed(1)} Rating
            </span>
            <span className="inline-flex items-center gap-1 text-[9px] font-extrabold text-[#c14f16] bg-[#fef3ee] dark:bg-[#c14f16]/10 px-2 py-0.5 rounded">
              <Building2 size={9} aria-hidden="true" /> {expert.targetCompany}
            </span>
          </div>
        </div>

        <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
          {/* Price & Booking Footer */}
          <div className="flex items-center justify-between gap-4">
            <div>
              <span className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                Starting from
              </span>
              <span className="text-sm font-black text-slate-900 dark:text-white">
                ₹{startingPrice}
              </span>
            </div>
            <button
              type="button"
              onClick={onBookClick}
              aria-label={`Book mentorship session with ${expert.name}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#c14f16] hover:bg-[#a94210] text-white rounded-lg text-sm font-bold transition-colors min-h-[44px] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c14f16] focus-visible:outline-offset-2"
            >
              <Calendar size={13} aria-hidden="true" /> Book Session
            </button>
          </div>
        </div>
      </article>
    </>
  );
};
