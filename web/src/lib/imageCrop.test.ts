import { describe, expect, it } from 'vitest';
import { clampCenter, cropToImageStyle, getCropSide, getMinZoom } from './imageCrop';

describe('imageCrop', () => {
  it('getCropSide shrinks the crop square as zoom increases', () => {
    expect(getCropSide(1000, 500, 1)).toBe(500);
    expect(getCropSide(1000, 500, 2)).toBe(250);
  });

  it('getCropSide grows the crop square as zoom decreases below 1 (zoom-out)', () => {
    expect(getCropSide(1000, 500, 0.5)).toBe(1000);
    expect(getCropSide(1000, 500, 0.8)).toBeCloseTo(625, 5);
  });

  it('getMinZoom is 1 for a square image (already fully visible, no zoom-out possible)', () => {
    expect(getMinZoom(600, 600)).toBe(1);
  });

  it('getMinZoom is <1 for a non-square image, reaching the point where the whole photo is visible', () => {
    const minZoom = getMinZoom(1000, 500);
    expect(minZoom).toBe(0.5);
    // At that zoom, the crop square exactly circumscribes the longer dimension.
    expect(getCropSide(1000, 500, minZoom)).toBe(1000);
  });

  it('clampCenter keeps the crop square fully inside the image', () => {
    const side = 200;
    expect(clampCenter(1000, 500, side, { x: -50, y: -50 })).toEqual({ x: 100, y: 100 });
    expect(clampCenter(1000, 500, side, { x: 5000, y: 5000 })).toEqual({ x: 900, y: 400 });
    expect(clampCenter(1000, 500, side, { x: 500, y: 250 })).toEqual({ x: 500, y: 250 });
  });

  it('clampCenter centers (rather than pins to an edge) once zoomed out past an axis', () => {
    // side (1000) exceeds the image height (500), so y must lock to the
    // true vertical center (250) — letterboxing evenly on both sides —
    // not to `side / 2` (500), which would pin the crop to the top edge.
    const side = 1000;
    expect(clampCenter(1000, 500, side, { x: 500, y: 0 })).toEqual({ x: 500, y: 250 });
    expect(clampCenter(1000, 500, side, { x: 500, y: 5000 })).toEqual({ x: 500, y: 250 });
  });

  it('cropToImageStyle scales consistently across different frame sizes', () => {
    const side = 200;
    const center = { x: 500, y: 250 };
    const big = cropToImageStyle(1000, 500, side, center, 220);
    const small = cropToImageStyle(1000, 500, side, center, 44);

    // A 5x smaller frame should render the source image at exactly 1/5th scale.
    expect(small.width).toBeCloseTo(big.width / 5, 5);
    expect(small.height).toBeCloseTo(big.height / 5, 5);
    expect(small.left).toBeCloseTo(big.left / 5, 5);
    expect(small.top).toBeCloseTo(big.top / 5, 5);
  });
});
