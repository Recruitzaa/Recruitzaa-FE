import { safeLocalStorage } from '../lib/safeStorage';

type AnalyticsValue = string | number | boolean;

export type AnalyticsEvent =
  'job_search_submitted' | 'job_detail_viewed' | 'job_alert_saved' | 'auth_intent_viewed';

/** Emits privacy-safe product events and forwards them only after explicit consent. */
export const trackEvent = (
  name: AnalyticsEvent,
  properties: Record<string, AnalyticsValue> = {}
) => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('recruitzaa:analytics', { detail: { name, properties } }));

  const analyticsWindow = window as Window & { gtag?: (...args: unknown[]) => void };
  if (safeLocalStorage.getItem('recruitzaa:analytics-consent') === 'granted') {
    analyticsWindow.gtag?.('event', name, properties);
  }
};
