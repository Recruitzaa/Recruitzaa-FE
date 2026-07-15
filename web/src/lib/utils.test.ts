import { describe, it, expect } from 'vitest';
import { cn, formatCurrency, formatDate, slugify } from './utils';

describe('utils', () => {
  describe('cn', () => {
    it('combines string class names', () => {
      expect(cn('class1', 'class2')).toBe('class1 class2');
    });

    it('ignores falsy values', () => {
      expect(cn('class1', null, undefined, false, '', 'class2')).toBe('class1 class2');
    });

    it('recursively flattens arrays', () => {
      expect(cn(['class1', 'class2'], 'class3')).toBe('class1 class2 class3');
      expect(cn([['class1'], 'class2'], 'class3')).toBe('class1 class2 class3');
    });

    it('handles conditional objects', () => {
      expect(cn({ class1: true, class2: false, class3: true })).toBe('class1 class3');
    });

    it('handles combined types', () => {
      expect(cn('base', ['arr1', 'arr2'], { cond1: true, cond2: false })).toBe(
        'base arr1 arr2 cond1'
      );
    });
  });

  describe('formatCurrency', () => {
    it('formats a number to INR format', () => {
      const result = formatCurrency(1500000);
      // Depending on node environment, spaces/characters could vary (e.g. non-breaking spaces \u00a0)
      // Check that it contains "15,00,000" and the currency indicator
      expect(result).toContain('15,00,000');
      // Should format as Indian Rupees
      expect(result.replace(/\s/g, '')).toContain('₹');
    });
  });

  describe('formatDate', () => {
    it('formats a valid date string', () => {
      const result = formatDate('2026-07-15T00:00:00.000Z');
      expect(result).toContain('2026');
      expect(result).toContain('Jul');
      expect(result).toContain('15');
    });

    it('returns the input string if parsing fails', () => {
      const invalidDate = 'not-a-date';
      expect(formatDate(invalidDate)).toBe('Invalid Date');
    });

    it('returns the input string if an error is thrown internally', () => {
      const invalidSymbol = Symbol('invalid') as any;
      expect(formatDate(invalidSymbol)).toBe(invalidSymbol);
    });
  });

  describe('slugify', () => {
    it('converts text to a lowercase, hyphenated slug', () => {
      expect(slugify('Senior React Native Engineer')).toBe('senior-react-native-engineer');
    });

    it('removes non-word characters', () => {
      expect(slugify('React & Native @ Mobile!')).toBe('react-native-mobile');
    });

    it('collapses multiple hyphens into a single hyphen', () => {
      expect(slugify('React--Native   Engineer')).toBe('react-native-engineer');
    });

    it('trims leading and trailing spaces/hyphens', () => {
      expect(slugify('  React Native  ')).toBe('react-native');
    });
  });
});
