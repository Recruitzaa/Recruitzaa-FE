import { describe, it, expect, vi, afterEach } from 'vitest';
import { scrollToElement, scrollToElementId } from './scrollToElement';

const mockMatchMedia = (matches: boolean) => {
  window.matchMedia = vi.fn().mockReturnValue({ matches }) as unknown as typeof window.matchMedia;
};

describe('scrollToElement', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    document.body.innerHTML = '';
  });

  it('does nothing when the element is null', () => {
    expect(() => scrollToElement(null)).not.toThrow();
  });

  it('scrolls smoothly when the user has no reduced-motion preference', () => {
    mockMatchMedia(false);
    const el = document.createElement('div');
    el.scrollIntoView = vi.fn();

    scrollToElement(el);

    expect(el.scrollIntoView).toHaveBeenCalledWith(expect.objectContaining({ behavior: 'smooth' }));
  });

  it('falls back to an instant jump when prefers-reduced-motion is set', () => {
    mockMatchMedia(true);
    const el = document.createElement('div');
    el.scrollIntoView = vi.fn();

    scrollToElement(el);

    expect(el.scrollIntoView).toHaveBeenCalledWith(expect.objectContaining({ behavior: 'auto' }));
  });

  it('scrollToElementId looks up the element by id first', () => {
    mockMatchMedia(false);
    const el = document.createElement('div');
    el.id = 'target-section';
    el.scrollIntoView = vi.fn();
    document.body.appendChild(el);

    scrollToElementId('target-section');

    expect(el.scrollIntoView).toHaveBeenCalled();
  });

  it('scrollToElementId is a no-op for an id that does not exist', () => {
    mockMatchMedia(false);
    expect(() => scrollToElementId('missing')).not.toThrow();
  });
});
