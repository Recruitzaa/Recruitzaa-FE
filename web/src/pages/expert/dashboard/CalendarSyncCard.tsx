import React from 'react';
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { updateExpertSettings } from '../../../store/slices/expertSlice';
import { useToast } from '../../../hooks/useToast';
import { Calendar, ShieldAlert } from 'lucide-react';

export const CalendarSyncCard: React.FC = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const settings = useAppSelector((state) => state.expert.settings);

  const handleToggleCalendar = (key: 'googleCalendarConnected' | 'outlookCalendarConnected') => {
    const nextState = !settings[key];
    dispatch(updateExpertSettings({ [key]: nextState }));
    toast.success(
      `${key === 'googleCalendarConnected' ? 'Google' : 'Outlook'} Calendar connection ${
        nextState ? 'enabled' : 'disabled'
      }.`
    );
  };

  const handleCapacityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const limit = parseInt(e.target.value, 10);
    dispatch(updateExpertSettings({ maxSessionsPerWeek: limit }));
    toast.success(`Weekly session capacity limit updated to ${limit}.`);
  };

  return (
    <>
      <div className="bg-white dark:bg-[#131924] border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-sm space-y-6">
        <div>
          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Calendar size={16} className="text-[#c14f16]" /> Calendar Sync & Availability
          </h3>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
            Connect your calendar to automatically block booked slot schedules.
          </p>
        </div>

        {/* Sync Toggles */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                Sync Google Calendar
              </span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">
                Auto-block slots matching GCal appointments.
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleToggleCalendar('googleCalendarConnected')}
              aria-label="Toggle Google Calendar sync connection"
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c14f16] focus-visible:outline-offset-2 ${
                settings.googleCalendarConnected ? 'bg-[#c14f16]' : 'bg-slate-250 dark:bg-slate-800'
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
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                Sync Outlook Calendar
              </span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">
                Sync slots matching Microsoft Exchange bookings.
              </span>
            </div>
            <button
              type="button"
              onClick={() => handleToggleCalendar('outlookCalendarConnected')}
              aria-label="Toggle Outlook Calendar sync connection"
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#c14f16] focus-visible:outline-offset-2 ${
                settings.outlookCalendarConnected
                  ? 'bg-[#c14f16]'
                  : 'bg-slate-250 dark:bg-slate-800'
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

        {/* Capacity limit dropdown */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-850 flex items-center justify-between gap-4">
          <div className="flex items-start gap-2">
            <ShieldAlert size={14} className="text-[#c14f16] shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                Max Sessions / Week
              </span>
              <span className="text-[10px] text-slate-400 dark:text-slate-500">
                Throttle intake capacity to prevent burn-out.
              </span>
            </div>
          </div>
          <select
            value={settings.maxSessionsPerWeek}
            onChange={handleCapacityChange}
            aria-label="Set maximum mentorship sessions per week"
            className="border border-slate-200 dark:border-slate-850 rounded-lg px-2.5 py-1.5 text-xs bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none focus-visible:outline-2 focus-visible:outline-[#c14f16] min-h-[44px] min-w-[80px]"
          >
            {[3, 5, 8, 10, 15].map((count) => (
              <option key={count} value={count}>
                {count}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
};
