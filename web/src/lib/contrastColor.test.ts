import { describe, it, expect } from 'vitest';
import { getReadableTextColor } from './contrastColor';

describe('getReadableTextColor', () => {
  it('returns white text for a dark background', () => {
    expect(getReadableTextColor('#0F172A')).toBe('#FFFFFF');
  });

  it('returns near-black text for a light background', () => {
    expect(getReadableTextColor('#FFF8E1')).toBe('#0F172A');
  });

  it('handles 3-digit hex shorthand', () => {
    expect(getReadableTextColor('#000')).toBe('#FFFFFF');
    expect(getReadableTextColor('#FFF')).toBe('#0F172A');
  });

  it('handles hex values without a leading #', () => {
    expect(getReadableTextColor('1E3A8A')).toBe('#FFFFFF');
  });

  it('falls back to white for an invalid/malformed colour', () => {
    expect(getReadableTextColor('not-a-color')).toBe('#FFFFFF');
    expect(getReadableTextColor('')).toBe('#FFFFFF');
  });

  it('is stable for a fully random-generated hex from PostJobPage', () => {
    // PostJobPage generates `'#' + Math.floor(Math.random() * 16777215).toString(16)`,
    // which can produce very light colours — this must never throw and must
    // always return one of the two known-safe colours.
    for (let i = 0; i < 50; i += 1) {
      const color =
        '#' +
        Math.floor(Math.random() * 16777215)
          .toString(16)
          .padStart(6, '0');
      expect(['#FFFFFF', '#0F172A']).toContain(getReadableTextColor(color));
    }
  });
});
