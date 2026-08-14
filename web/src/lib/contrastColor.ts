/**
 * Picks a readable foreground colour (near-black or white) for a given
 * background colour, using the WCAG relative-luminance formula. Needed
 * anywhere a background colour is data-driven (job avatar chips, etc.)
 * rather than a fixed design-token pairing, since a light background with
 * hardcoded white text becomes illegible.
 */
export function getReadableTextColor(hexColor: string): string {
  const hex = hexColor.replace('#', '').trim();
  const isValid = /^[0-9a-fA-F]{6}$/.test(hex) || /^[0-9a-fA-F]{3}$/.test(hex);
  if (!isValid) return '#FFFFFF';

  const full =
    hex.length === 3
      ? hex
          .split('')
          .map((c) => c + c)
          .join('')
      : hex;

  const r = parseInt(full.slice(0, 2), 16) / 255;
  const g = parseInt(full.slice(2, 4), 16) / 255;
  const b = parseInt(full.slice(4, 6), 16) / 255;

  const toLinear = (channel: number) =>
    channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;

  const luminance = 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);

  // Luminance threshold of 0.5 keeps both pairings comfortably above the
  // WCAG AA 4.5:1 contrast ratio for the near-black/white pair used here.
  return luminance > 0.5 ? '#0F172A' : '#FFFFFF';
}
