import React, { useState, useRef } from 'react';
import { useAppDispatch } from '../../../store/hooks';
import { bookSession, type BookedSession } from '../../../store/slices/expertSlice';
import type { ExpertProfile, ServiceTier } from '../../../data/mockExperts';
import { useToast } from '../../../hooks/useToast';
import { useFocusTrap } from '../../../hooks/useFocusTrap';
import { X, Calendar, Globe } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  expert: ExpertProfile;
}

const TIME_SLOTS = ['10:00 AM', '11:30 AM', '2:00 PM', '4:30 PM'];
const TIMEZONES = ['Asia/Kolkata', 'America/New_York', 'Europe/London', 'Singapore'];

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, expert }) => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const modalRef = useRef<HTMLDivElement>(null);

  const [selectedTier, setSelectedTier] = useState<ServiceTier>(expert.serviceTiers[0]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [timezone, setTimezone] = useState('Asia/Kolkata');
  const [brief, setBrief] = useState('');

  useFocusTrap(isOpen, modalRef);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedDate || !selectedTime || !brief.trim()) {
      toast.error('Please select date, time and fill out the pre-session brief.');
      return;
    }

    const session: BookedSession = {
      id: `bk_${Date.now()}`,
      expertId: expert.id,
      expertName: expert.name,
      serviceTierId: selectedTier.id,
      serviceTierName: selectedTier.name,
      price: selectedTier.price,
      dateTimeISO: new Date(
        `${selectedDate}T${selectedTime === '10:00 AM' ? '10:00' : selectedTime === '11:30 AM' ? '11:30' : selectedTime === '2:00 PM' ? '14:00' : '16:30'}:00`
      ).toISOString(),
      timezone,
      preSessionBrief: brief.trim(),
      status: 'Pending',
      bookedAtISO: new Date().toISOString(),
    };

    dispatch(bookSession(session));
    toast.success(`Successfully booked session with ${expert.name}!`);
    onClose();
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      <div
        ref={modalRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="booking-modal-title"
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-[#131924] border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl w-full max-w-lg z-[60] overflow-hidden focus:outline-none max-h-[90vh] flex flex-col"
      >
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-slate-100 dark:border-slate-800 shrink-0">
          <h2
            id="booking-modal-title"
            className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2"
          >
            <Calendar className="text-[#c14f16]" size={16} /> Book Mentorship Session
          </h2>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close booking modal"
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-850 dark:hover:text-white transition-colors focus-visible:outline-2 focus-visible:outline-[#c14f16]"
          >
            <X size={16} />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
          {/* Service Tier selection */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-400 uppercase tracking-wider block">
              Select Session Type
            </label>
            <select
              value={selectedTier.id}
              onChange={(e) =>
                setSelectedTier(
                  expert.serviceTiers.find((t) => t.id === e.target.value) || expert.serviceTiers[0]
                )
              }
              className="w-full border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none focus-visible:outline-2 focus-visible:outline-[#c14f16] min-h-[44px]"
            >
              {expert.serviceTiers.map((tier) => (
                <option key={tier.id} value={tier.id}>
                  {tier.name} (₹{tier.price})
                </option>
              ))}
            </select>
          </div>

          {/* Date & Time slots */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label
                htmlFor="booking-date"
                className="text-sm font-bold text-slate-400 uppercase tracking-wider block"
              >
                Date
              </label>
              <input
                id="booking-date"
                type="date"
                required
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none focus-visible:outline-2 focus-visible:outline-[#c14f16] min-h-[44px]"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-400 uppercase tracking-wider block">
                Time Slot
              </label>
              <select
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                required
                className="w-full border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none focus-visible:outline-2 focus-visible:outline-[#c14f16] min-h-[44px]"
              >
                <option value="">Select slot</option>
                {TIME_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>
                    {slot}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Timezone */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-400 uppercase tracking-wider block flex items-center gap-1">
              <Globe size={11} /> Timezone
            </label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none focus-visible:outline-2 focus-visible:outline-[#c14f16] min-h-[44px]"
            >
              {TIMEZONES.map((tz) => (
                <option key={tz} value={tz}>
                  {tz}
                </option>
              ))}
            </select>
          </div>

          {/* Brief */}
          <div className="space-y-2">
            <label
              htmlFor="booking-brief"
              className="text-sm font-bold text-slate-400 uppercase tracking-wider block"
            >
              Pre-Session Brief <span className="text-[#c14f16]">*</span>
            </label>
            <textarea
              id="booking-brief"
              required
              rows={3}
              value={brief}
              onChange={(e) => setBrief(e.target.value)}
              placeholder="What questions or goals do you want to cover during this mentorship session?"
              className="w-full border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-100 outline-none focus-visible:outline-2 focus-visible:outline-[#c14f16] resize-none"
            />
          </div>

          {/* Action Footer */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-450 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-lg text-sm font-semibold transition-colors min-h-[44px] focus-visible:outline-2 focus-visible:outline-[#c14f16]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-[#c14f16] hover:bg-[#a94210] text-white rounded-lg text-sm font-bold transition-colors min-h-[44px] focus-visible:outline-2 focus-visible:outline-[#c14f16]"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </>
  );
};
