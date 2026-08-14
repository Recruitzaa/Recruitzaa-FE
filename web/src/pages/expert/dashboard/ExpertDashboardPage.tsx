import React, { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { cancelSession, completeSession } from '../../../store/slices/expertSlice';
import { EarningsWidget } from './EarningsWidget';
import { ServiceTiersCard } from './ServiceTiersCard';
import { SEO } from '../../../components/seo/SEO';
import { BRAND } from '../../../config/content';
import { PageTransition } from '../../../components/layout/PageTransition';
import { useToast } from '../../../hooks/useToast';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { Calendar, User, Compass } from 'lucide-react';
import { ConfirmDialog } from '../../../components/ui/ConfirmDialog/ConfirmDialog';

export const ExpertDashboardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const bookings = useAppSelector((state) => state.expert.bookings);
  const [pendingCancellation, setPendingCancellation] = useState<{
    id: string;
    name: string;
  } | null>(null);

  const handleComplete = (id: string, name: string) => {
    dispatch(completeSession(id));
    toast.success(`Completed session with ${name}!`);
  };

  const handleCancel = (id: string, name: string) => {
    setPendingCancellation({ id, name });
  };

  return (
    <>
      <PageTransition>
        <SEO
          title={`Mentor Dashboard | ${BRAND.name} Hub`}
          description="Manage pending mentorship sessions, timezone sync schedules, and track monthly mentoring earnings."
        />
        <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 w-full">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                <Compass className="text-[#c14f16]" size={20} /> Mentorship Control Room
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Track live bookings, completed sessions, and payouts.
              </p>
            </div>
          </div>

          {/* Earnings Analytics */}
          <EarningsWidget />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            {/* Bookings Queue */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-[#131924] border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm">
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2 mb-4">
                  <Calendar size={16} className="text-[#c14f16]" /> Mentorship Bookings Queue
                </h3>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 dark:border-slate-850 text-slate-450 uppercase text-xs font-bold tracking-wider">
                        <th className="pb-3 font-semibold">Job Seeker</th>
                        <th className="pb-3 font-semibold">Service Type</th>
                        <th className="pb-3 font-semibold">Scheduled Date</th>
                        <th className="pb-3 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-850">
                      {bookings.length === 0 ? (
                        <tr>
                          <td colSpan={4} className="py-6 text-center text-slate-500">
                            No mentorship sessions booked yet.
                          </td>
                        </tr>
                      ) : (
                        bookings.map((booking) => (
                          <tr key={booking.id} className="group">
                            <td className="py-4">
                              <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                                <User size={12} className="text-slate-400" />{' '}
                                {booking.preSessionBrief ? 'Arjun Kumar' : 'Mentee'}
                              </div>
                              <div
                                className="text-sm text-slate-400 dark:text-slate-500 mt-0.5 max-w-xs truncate"
                                title={booking.preSessionBrief}
                              >
                                {booking.preSessionBrief}
                              </div>
                            </td>
                            <td className="py-4 font-semibold text-slate-700 dark:text-slate-350">
                              <div>{booking.serviceTierName}</div>
                              <div className="text-xs text-[#c14f16] mt-0.5">₹{booking.price}</div>
                            </td>
                            <td className="py-4">
                              <div className="text-slate-800 dark:text-slate-200 font-medium">
                                {new Date(booking.dateTimeISO).toLocaleDateString(undefined, {
                                  month: 'short',
                                  day: 'numeric',
                                  year: 'numeric',
                                })}
                              </div>
                              <div className="text-sm text-slate-400 mt-0.5">
                                {new Date(booking.dateTimeISO).toLocaleTimeString(undefined, {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}{' '}
                                ({booking.timezone})
                              </div>
                            </td>
                            <td className="py-4 text-right">
                              <div className="flex justify-end items-center gap-1.5">
                                {booking.status === 'Pending' ? (
                                  <>
                                    <Button
                                      size="sm"
                                      onClick={() => handleComplete(booking.id, 'Arjun Kumar')}
                                      className="bg-green-600 hover:bg-green-700 font-semibold px-2.5 min-h-[36px]"
                                    >
                                      Complete
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => handleCancel(booking.id, 'Arjun Kumar')}
                                      className="font-semibold px-2.5 min-h-[36px] hover:text-red-600 hover:border-red-300"
                                    >
                                      Cancel
                                    </Button>
                                  </>
                                ) : (
                                  <Badge
                                    variant={booking.status === 'Completed' ? 'success' : 'neutral'}
                                  >
                                    {booking.status}
                                  </Badge>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Sidebar Column Settings */}
            <div className="lg:col-span-1">
              <ServiceTiersCard />
            </div>
          </div>
        </div>
      </PageTransition>
      <ConfirmDialog
        isOpen={pendingCancellation !== null}
        title="Cancel this session?"
        message={`The session with ${pendingCancellation?.name ?? 'this person'} will be marked as cancelled.`}
        confirmLabel="Cancel session"
        variant="warning"
        onCancel={() => setPendingCancellation(null)}
        onConfirm={() => {
          if (!pendingCancellation) return;
          dispatch(cancelSession(pendingCancellation.id));
          toast.info(`Session with ${pendingCancellation.name} cancelled.`);
          setPendingCancellation(null);
        }}
      />
    </>
  );
};
export default ExpertDashboardPage;
