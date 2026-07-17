import React from 'react';
import { useAppSelector } from '../../../store/hooks';
import { IndianRupee, CheckCircle2, AlertCircle } from 'lucide-react';

export const EarningsWidget: React.FC = () => {
  const bookings = useAppSelector((state) => state.expert.bookings);

  const completedSessions = bookings.filter((b) => b.status === 'Completed');
  const pendingSessions = bookings.filter((b) => b.status === 'Pending');

  const totalEarnings = completedSessions.reduce((acc, curr) => acc + curr.price, 0);
  const pendingPayouts = pendingSessions.reduce((acc, curr) => acc + curr.price, 0);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Earnings */}
        <div className="bg-white dark:bg-[#131924] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm flex items-center gap-4">
          <div className="p-3.5 bg-[#c14f16]/10 text-[#c14f16] rounded-xl" aria-hidden="true">
            <IndianRupee size={22} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-450 uppercase tracking-wider block">
              Total Earnings
            </span>
            <span className="text-xl font-black text-slate-900 dark:text-white mt-0.5 block">
              ₹{totalEarnings.toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Completed Sessions */}
        <div className="bg-white dark:bg-[#131924] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm flex items-center gap-4">
          <div
            className="p-3.5 bg-green-50 dark:bg-green-950/20 text-green-600 rounded-xl"
            aria-hidden="true"
          >
            <CheckCircle2 size={22} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-450 uppercase tracking-wider block">
              Completed Sessions
            </span>
            <span className="text-xl font-black text-slate-900 dark:text-white mt-0.5 block">
              {completedSessions.length}
            </span>
          </div>
        </div>

        {/* Pending Payouts */}
        <div className="bg-white dark:bg-[#131924] border border-slate-200 dark:border-slate-800 rounded-xl p-5 shadow-sm flex items-center gap-4">
          <div
            className="p-3.5 bg-amber-50 dark:bg-amber-950/20 text-amber-600 rounded-xl"
            aria-hidden="true"
          >
            <AlertCircle size={22} />
          </div>
          <div>
            <span className="text-[10px] font-bold text-slate-450 uppercase tracking-wider block">
              Pending Payouts
            </span>
            <span className="text-xl font-black text-slate-900 dark:text-white mt-0.5 block">
              ₹{pendingPayouts.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>
    </>
  );
};
