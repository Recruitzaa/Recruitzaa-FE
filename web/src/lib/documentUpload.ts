// Exported so callers (e.g. CertificationsCard's `accept` attribute and
// helper copy) read from this single source instead of duplicating the
// list as literals, which previously let the visible copy drift out of
// sync with what was actually accepted (it said PDF/JPG/PNG while WEBP
// silently worked too).
export const MAX_DOCUMENT_BYTES = 10 * 1024 * 1024; // 10 MB
export const ACCEPTED_DOCUMENT_TYPES = ['application/pdf', 'image/jpeg', 'image/png', 'image/webp'];
const ACCEPTED_TYPES = ACCEPTED_DOCUMENT_TYPES;

export class DocumentUploadError extends Error {}

export interface UploadedDocument {
  fileName: string;
  fileSizeLabel: string;
  fileDataUrl: string;
}

export const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

/**
 * Validates a proof document (certificate, ID, etc.) and reads it into a
 * base64 data URL, suitable for storing directly in Redux/localStorage until
 * a real media-upload backend exists — same approach used for avatar/logo
 * uploads in imageUpload.ts.
 */
export const readDocumentAsDataUrl = (file: File): Promise<UploadedDocument> => {
  if (!ACCEPTED_TYPES.includes(file.type)) {
    return Promise.reject(new DocumentUploadError('Please upload a PDF, JPG, PNG, or WEBP file.'));
  }
  if (file.size > MAX_DOCUMENT_BYTES) {
    return Promise.reject(new DocumentUploadError('File must be smaller than 10 MB.'));
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () =>
      resolve({
        fileName: file.name,
        fileSizeLabel: formatFileSize(file.size),
        fileDataUrl: reader.result as string,
      });
    reader.onerror = () => reject(new DocumentUploadError('Could not read the selected file.'));
    reader.readAsDataURL(file);
  });
};
