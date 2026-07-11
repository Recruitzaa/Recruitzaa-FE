import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { UploadCloud, FileText, X } from 'lucide-react';
import styles from './FileDropZone.module.css';

interface FileDropZoneProps {
  value?: File | null;
  onChange: (file: File | null) => void;
  accept?: Record<string, string[]>;
  maxSizeMB?: number;
  label?: string;
}

const DEFAULT_ACCEPT = {
  'application/pdf': ['.pdf'],
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
};

export const FileDropZone = ({
  value, onChange,
  accept = DEFAULT_ACCEPT,
  maxSizeMB = 5,
  label = 'Drop your resume here',
}: FileDropZoneProps) => {
  const onDrop = useCallback(
    (accepted: File[]) => { if (accepted[0]) onChange(accepted[0]); },
    [onChange]
  );

  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop,
    accept,
    maxSize: maxSizeMB * 1024 * 1024,
    multiple: false,
  });

  const error = fileRejections[0]?.errors[0]?.message;

  if (value) {
    return (
      <div className={styles.filePreview}>
        <FileText size={20} />
        <span className={styles.fileName}>{value.name}</span>
        <span className={styles.fileSize}>({(value.size / 1024 / 1024).toFixed(2)} MB)</span>
        <button type="button" className={styles.removeBtn} onClick={() => onChange(null)} aria-label="Remove file">
          <X size={16} />
        </button>
      </div>
    );
  }

  return (
    <div>
      <div
        {...getRootProps()}
        className={`${styles.zone} ${isDragActive ? styles.active : ''}`}
      >
        <input {...getInputProps()} />
        <UploadCloud size={32} className={styles.uploadIcon} />
        <p className={styles.label}>{label}</p>
        <p className={styles.hint}>PDF or DOCX · max {maxSizeMB}MB</p>
      </div>
      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};
