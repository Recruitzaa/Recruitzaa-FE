const MAX_IMAGE_BYTES = 5 * 1024 * 1024; // 5 MB
const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export class ImageUploadError extends Error {}

/**
 * Validates an image file and reads it into a base64 data URL, suitable for
 * storing directly in Redux/localStorage until a real media-upload backend exists.
 */
export const readImageAsDataUrl = (file: File): Promise<string> => {
  if (!ACCEPTED_TYPES.includes(file.type)) {
    return Promise.reject(new ImageUploadError('Please choose a JPG, PNG, WEBP, or GIF image.'));
  }
  if (file.size > MAX_IMAGE_BYTES) {
    return Promise.reject(new ImageUploadError('Image must be smaller than 5 MB.'));
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new ImageUploadError('Could not read the selected file.'));
    reader.readAsDataURL(file);
  });
};
