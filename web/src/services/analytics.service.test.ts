import { afterEach, describe, expect, it, vi } from 'vitest';
import { trackEvent } from './analytics.service';

describe('trackEvent', () => {
  afterEach(() => {
    localStorage.clear();
    delete (window as Window & { gtag?: unknown }).gtag;
  });

  it('does not forward analytics before consent', () => {
    const gtag = vi.fn();
    (window as Window & { gtag?: typeof gtag }).gtag = gtag;
    trackEvent('job_search_submitted', { hasKeyword: true });
    expect(gtag).not.toHaveBeenCalled();
  });

  it('forwards an allow-listed event after consent', () => {
    const gtag = vi.fn();
    (window as Window & { gtag?: typeof gtag }).gtag = gtag;
    localStorage.setItem('recruitzaa:analytics-consent', 'granted');
    trackEvent('job_detail_viewed', { jobId: 'rj1' });
    expect(gtag).toHaveBeenCalledWith('event', 'job_detail_viewed', { jobId: 'rj1' });
  });
});
