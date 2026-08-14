import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { updateExpertSettings } from '../../../store/slices/expertSlice';
import { useToast } from '../../../hooks/useToast';
import { PageTransition } from '../../../components/layout/PageTransition';
import { SEO } from '../../../components/seo/SEO';
import { BRAND } from '../../../config/content';
import { Calendar, ShieldAlert, CheckSquare, Square } from 'lucide-react';

export const CalendarSettingsPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const settings = useAppSelector((state) => state.expert.settings);

  const handleToggleSetting = (
    key: 'googleCalendarConnected' | 'outlookCalendarConnected' | 'requirePreSessionBrief'
  ) => {
    const nextState = !settings[key];
    dispatch(updateExpertSettings({ [key]: nextState }));

    let label = '';
    if (key === 'googleCalendarConnected') label = 'Google Calendar Sync';
    else if (key === 'outlookCalendarConnected') label = 'Outlook Calendar Sync';
    else label = 'Require Pre-Session Brief setting';

    toast.success(`${label} ${nextState ? 'enabled' : 'disabled'}.`);
  };

  const handleCapacityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const limit = parseInt(e.target.value, 10);
    dispatch(updateExpertSettings({ maxSessionsPerWeek: limit }));
    toast.success(`Weekly session capacity limit updated to ${limit}.`);
  };

  return (
    <>
      <PageTransition>
        <SEO
          title={`Calendar Settings | ${BRAND.name} Hub`}
          description="Manage your calendar synchronization connections and session intake capacity limits."
        />
        <div className="max-w-3xl mx-auto px-4 py-8 space-y-8 w-full">
          <div>
            <h1 className="text-xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar className="text-[#c14f16]" size={20} /> Calendar & Availability Settings
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Configure how mentees book calendar time and what details they must provide.
            </p>
          </div>

          <div className="bg-white dark:bg-[#131924] border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
            {/* Calendar Connection Toggles */}
            <div className="space-y-4">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                Sync Connections
              </h2>

              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200 block">
                    Google Calendar Sync
                  </span>
                  <span className="text-sm text-slate-400 dark:text-slate-500">
                    Block slots matching your GCal appointments.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleSetting('googleCalendarConnected')}
                  aria-label="Toggle Google Calendar sync connection"
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c14f16] focus-visible:outline-offset-2 ${
                    settings.googleCalendarConnected
                      ? 'bg-[#c14f16]'
                      : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      settings.googleCalendarConnected ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>

              <div className="flex items-center justify-between gap-4">
                <div>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200 block">
                    Outlook Calendar Sync
                  </span>
                  <span className="text-sm text-slate-400 dark:text-slate-500">
                    Sync slots matching Microsoft Exchange bookings.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleSetting('outlookCalendarConnected')}
                  aria-label="Toggle Outlook Calendar sync connection"
                  className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c14f16] focus-visible:outline-offset-2 ${
                    settings.outlookCalendarConnected
                      ? 'bg-[#c14f16]'
                      : 'bg-slate-300 dark:bg-slate-700'
                  }`}
                >
                  <span
                    className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      settings.outlookCalendarConnected ? 'translate-x-5' : 'translate-x-0'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* Booking Rules Section */}
            <div className="pt-6 border-t border-slate-100 dark:border-slate-850 space-y-5">
              <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider">
                Booking Rules
              </h2>

              {/* Checkbox for pre-session briefs */}
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="text-sm font-bold text-slate-800 dark:text-slate-200 block">
                    Require Pre-Session Brief
                  </span>
                  <span className="text-sm text-slate-400 dark:text-slate-500">
                    Mentees must submit details about their objectives before completing a booking.
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => handleToggleSetting('requirePreSessionBrief')}
                  aria-label="Toggle Require Pre-Session Brief"
                  className="p-1 text-slate-500 hover:text-[#c14f16] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c14f16] focus-visible:outline-offset-2 rounded min-h-[44px]"
                >
                  {settings.requirePreSessionBrief ? (
                    <CheckSquare size={20} className="text-[#c14f16]" />
                  ) : (
                    <Square size={20} />
                  )}
                </button>
              </div>

              {/* Capacity Limit */}
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-start gap-2">
                  <ShieldAlert size={14} className="text-[#c14f16] shrink-0 mt-0.5" />
                  <div>
                    <span className="text-sm font-bold text-slate-800 dark:text-slate-200 block">
                      Max Sessions / Week
                    </span>
                    <span className="text-sm text-slate-400 dark:text-slate-500">
                      Throttle weekly intake capacity to prevent burnout.
                    </span>
                  </div>
                </div>
                <select
                  value={settings.maxSessionsPerWeek}
                  onChange={handleCapacityChange}
                  aria-label="Set maximum mentorship sessions per week"
                  className="border border-slate-200 dark:border-slate-850 rounded-lg px-2.5 py-1.5 text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none focus-visible:outline-2 focus-visible:outline-[#c14f16] min-h-[44px] min-w-[80px]"
                >
                  {[3, 5, 8, 10, 15].map((count) => (
                    <option key={count} value={count}>
                      {count}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>
      </PageTransition>
    </>
  );
};

export default CalendarSettingsPage;
