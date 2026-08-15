/**
 * Pure math helpers for a "center + zoom" square image cropper.
 *
 * The crop is always a square region of the source image, defined by its
 * center point (in source-image pixels) and a side length derived from
 * `zoom`. Because every value is expressed relative to the source image,
 * the exact same crop can be rendered at any on-screen frame size — which
 * is what lets the upload modal show accurate "how it will look" previews
 * at multiple sizes simultaneously.
 */

export interface Point {
  x: number;
  y: number;
}

const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value));

/** Side length (in source-image px) of the square crop region at a given zoom. */
export const getCropSide = (imgWidth: number, imgHeight: number, zoom: number): number =>
  Math.min(imgWidth, imgHeight) / zoom;

/**
 * The lowest zoom that still keeps the crop square meaningful: the point at
 * which the square exactly circumscribes the whole image (its longer side).
 * Zooming out any further wouldn't reveal anything new. For a square image
 * this is 1 (no zoom-out possible/needed — the whole photo is already
 * visible at 100%).
 */
export const getMinZoom = (imgWidth: number, imgHeight: number): number =>
  Math.min(imgWidth, imgHeight) / Math.max(imgWidth, imgHeight);

/**
 * Keeps the crop square centered over the source image. Once the square is
 * larger than one of the image's dimensions (zoomed out past that axis),
 * that axis locks to the image's true center instead of pinning to an edge,
 * so the extra space is shown as even letterboxing on both sides.
 */
export const clampCenter = (
  imgWidth: number,
  imgHeight: number,
  side: number,
  center: Point
): Point => {
  const half = side / 2;
  const clampAxis = (pos: number, dimSize: number) =>
    side >= dimSize ? dimSize / 2 : clamp(pos, half, dimSize - half);
  return {
    x: clampAxis(center.x, imgWidth),
    y: clampAxis(center.y, imgHeight),
  };
};

/** CSS box for rendering the source image inside a `frameSize`-px square viewport. */
export const cropToImageStyle = (
  imgWidth: number,
  imgHeight: number,
  side: number,
  center: Point,
  frameSize: number
) => {
  const scale = frameSize / side;
  const sx = center.x - side / 2;
  const sy = center.y - side / 2;
  return {
    width: imgWidth * scale,
    height: imgHeight * scale,
    left: -sx * scale,
    top: -sy * scale,
  };
};

/** Draws the cropped square region onto a new canvas at `outputSize`, returning a data URL. */
export const cropToDataUrl = (
  image: HTMLImageElement,
  side: number,
  center: Point,
  outputSize: number,
  mimeType = 'image/png'
): string => {
  const canvas = document.createElement('canvas');
  canvas.width = outputSize;
  canvas.height = outputSize;
  const ctx = canvas.getContext('2d');
  if (!ctx) return image.src;

  // If zoomed out past the image bounds on either axis, drawImage leaves the
  // uncovered area untouched (transparent) — fill it white first so exported
  // photos never end up with a transparent or black border.
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, outputSize, outputSize);

  const sx = center.x - side / 2;
  const sy = center.y - side / 2;
  ctx.drawImage(image, sx, sy, side, side, 0, 0, outputSize, outputSize);
  return canvas.toDataURL(mimeType, 0.92);
};
