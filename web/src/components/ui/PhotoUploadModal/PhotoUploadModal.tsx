import { useCallback, useEffect, useRef, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Minus, Plus, RotateCcw, Trash2, UploadCloud } from 'lucide-react';
import { Modal } from '../Modal';
import { readImageAsDataUrl, ImageUploadError } from '../../../lib/imageUpload';
import {
  clampCenter,
  cropToDataUrl,
  cropToImageStyle,
  getCropSide,
  getMinZoom,
  type Point,
} from '../../../lib/imageCrop';
import { useToast } from '../../../hooks/useToast';
import styles from './PhotoUploadModal.module.css';

// The editor "stage" is bigger than the actual crop window so the rest of the
// photo stays visible (dimmed) around it — this is the classic LinkedIn/
// Twitter/Naukri cropper pattern, which makes it obvious what gets cut off.
const STAGE_SIZE = 300;
const CROP_SIZE = 220;
const STAGE_OFFSET = (STAGE_SIZE - CROP_SIZE) / 2;
const OUTPUT_SIZE = 480;
// 1 = the image fills the crop window exactly ("fit"), used as the default
// zoom on load/reset. Actual minimum (how far you can zoom *out*) depends on
// the image's aspect ratio and is computed per-image via getMinZoom().
const DEFAULT_ZOOM = 1;
const MAX_ZOOM = 3;

export interface PhotoPreviewContext {
  label: string;
  size: number;
}

interface PhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (dataUrl: string) => void;
  onRemove?: () => void;
  currentImage?: string;
  initialFile?: File | null;
  shape?: 'circle' | 'rounded';
  title: string;
  description?: string;
  previewContexts: PhotoPreviewContext[];
}

export const PhotoUploadModal = ({
  isOpen,
  onClose,
  onSave,
  onRemove,
  currentImage,
  initialFile,
  shape = 'circle',
  title,
  description,
  previewContexts,
}: PhotoUploadModalProps) => {
  const toast = useToast();
  const imgElRef = useRef<HTMLImageElement | null>(null);
  const frameRef = useRef<HTMLDivElement>(null);

  const [imgSrc, setImgSrc] = useState<string | null>(null);
  const [imgSize, setImgSize] = useState<{ width: number; height: number } | null>(null);
  const [zoom, setZoom] = useState(DEFAULT_ZOOM);
  const [center, setCenter] = useState<Point>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  // Tracked manually (rather than relying on e.movementX/Y, which some
  // browsers/environments report unreliably) so dragging is always smooth.
  const lastPointerRef = useRef<Point | null>(null);

  const loadFile = useCallback(
    async (file: File) => {
      try {
        const dataUrl = await readImageAsDataUrl(file);
        setImgSrc(dataUrl);
        setZoom(DEFAULT_ZOOM);
      } catch (err) {
        const message = err instanceof ImageUploadError ? err.message : 'Could not read that file.';
        toast.error(message);
      }
    },
    [toast]
  );

  useEffect(() => {
    if (!isOpen) return;
    if (initialFile) {
      loadFile(initialFile);
    } else {
      setImgSrc(currentImage || null);
    }
    // Reset editor state each time the modal opens fresh.
    setZoom(DEFAULT_ZOOM);
    setImgSize(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, initialFile, currentImage]);

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const el = e.currentTarget;
    imgElRef.current = el;
    const width = el.naturalWidth;
    const height = el.naturalHeight;
    setImgSize({ width, height });
    setCenter({ x: width / 2, y: height / 2 });
  };

  const side = imgSize ? getCropSide(imgSize.width, imgSize.height, zoom) : 0;
  const minZoom = imgSize ? getMinZoom(imgSize.width, imgSize.height) : DEFAULT_ZOOM;

  const onDrop = useCallback(
    (accepted: File[]) => {
      if (accepted[0]) loadFile(accepted[0]);
    },
    [loadFile]
  );

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    open: openFilePicker,
  } = useDropzone({
    onDrop,
    accept: { 'image/*': ['.png', '.jpg', '.jpeg', '.webp', '.gif'] },
    maxSize: 5 * 1024 * 1024,
    multiple: false,
    noClick: !!imgSrc,
    noKeyboard: !!imgSrc,
  });

  const handleZoomChange = (nextZoom: number) => {
    if (!imgSize) return;
    const clamped = clamp(nextZoom, minZoom, MAX_ZOOM);
    const nextSide = getCropSide(imgSize.width, imgSize.height, clamped);
    setZoom(clamped);
    setCenter((prev) => clampCenter(imgSize.width, imgSize.height, nextSide, prev));
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    const last = lastPointerRef.current;
    lastPointerRef.current = { x: e.clientX, y: e.clientY };
    if (!isDragging || !imgSize || !side || !last) return;
    const dx = e.clientX - last.x;
    const dy = e.clientY - last.y;
    const scale = CROP_SIZE / side;
    setCenter((prev) =>
      clampCenter(imgSize.width, imgSize.height, side, {
        x: prev.x - dx / scale,
        y: prev.y - dy / scale,
      })
    );
  };

  const handleReset = () => {
    if (!imgSize) return;
    setZoom(DEFAULT_ZOOM);
    setCenter({ x: imgSize.width / 2, y: imgSize.height / 2 });
  };

  const handleSave = () => {
    if (!imgElRef.current || !imgSize) return;
    const dataUrl = cropToDataUrl(imgElRef.current, side, center, OUTPUT_SIZE);
    onSave(dataUrl);
    onClose();
  };

  const showEditor = !!imgSrc && !!imgSize;
  const radiusClass = shape === 'circle' ? styles.circle : styles.rounded;

  return (
    <Modal
      isOpen={isOpen}
      title={title}
      description={description}
      onClose={onClose}
      className={styles.modal}
    >
      {/* Hidden file input is always mounted so "Choose a different photo" can re-trigger it. */}
      <input {...getInputProps()} className={styles.hiddenInput} tabIndex={-1} aria-hidden="true" />

      {!imgSrc ? (
        <div
          {...getRootProps()}
          className={`${styles.dropzone} ${isDragActive ? styles.dropzoneActive : ''}`}
        >
          <UploadCloud size={32} className={styles.dropIcon} />
          <p className={styles.dropLabel}>Drag a photo here, or click to browse</p>
          <p className={styles.dropHint}>JPG, PNG, WEBP or GIF · max 5MB</p>
          <p className={styles.dropHint}>Recommended: a square photo, at least 400×400px</p>
        </div>
      ) : (
        <>
          {/* Offscreen image used purely to read natural dimensions + as the canvas source.
              `crossOrigin` is only needed (and only safe) for remote http(s) sources — data
              URLs are already same-origin and some browsers fail to decode them otherwise. */}
          <img
            src={imgSrc}
            alt=""
            className={styles.hiddenSource}
            onLoad={onImageLoad}
            onError={() => toast.error('Could not load that image.')}
            crossOrigin={imgSrc.startsWith('data:') ? undefined : 'anonymous'}
          />

          {showEditor && (
            <>
              <div className={styles.editorCol}>
                <div
                  ref={frameRef}
                  className={styles.stage}
                  style={{ width: STAGE_SIZE, height: STAGE_SIZE }}
                  onPointerDown={(e) => {
                    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
                    lastPointerRef.current = { x: e.clientX, y: e.clientY };
                    setIsDragging(true);
                  }}
                  onPointerMove={handlePointerMove}
                  onPointerUp={() => {
                    setIsDragging(false);
                    lastPointerRef.current = null;
                  }}
                  onPointerLeave={() => {
                    setIsDragging(false);
                    lastPointerRef.current = null;
                  }}
                  role="slider"
                  aria-label="Drag to reposition photo"
                  aria-valuemin={0}
                  aria-valuemax={1}
                  aria-valuenow={0.5}
                  tabIndex={0}
                >
                  {/* Full photo, dimmed outside the crop window so it's clear what gets cut off. */}
                  <img
                    src={imgSrc}
                    alt=""
                    draggable={false}
                    className={styles.stageImg}
                    style={(() => {
                      const s = cropToImageStyle(
                        imgSize.width,
                        imgSize.height,
                        side,
                        center,
                        CROP_SIZE
                      );
                      return {
                        width: s.width,
                        height: s.height,
                        left: s.left + STAGE_OFFSET,
                        top: s.top + STAGE_OFFSET,
                      };
                    })()}
                  />
                  <div
                    className={`${styles.cropMask} ${radiusClass}`}
                    style={{
                      width: CROP_SIZE,
                      height: CROP_SIZE,
                      top: STAGE_OFFSET,
                      left: STAGE_OFFSET,
                    }}
                  />
                </div>

                <p className={styles.stageHint}>
                  {shape === 'circle'
                    ? 'Drag to reposition. Aim for your face filling about 60% of the circle.'
                    : 'Drag to reposition your logo within the frame.'}
                </p>

                <div className={styles.zoomRow}>
                  <button
                    type="button"
                    onClick={() => handleZoomChange(zoom - 0.1)}
                    aria-label="Zoom out"
                    className={styles.zoomBtn}
                    disabled={zoom <= minZoom}
                  >
                    <Minus size={14} />
                  </button>
                  <input
                    type="range"
                    min={minZoom}
                    max={MAX_ZOOM}
                    step={0.01}
                    value={zoom}
                    onChange={(e) => handleZoomChange(Number(e.target.value))}
                    aria-label="Zoom"
                    className={styles.zoomSlider}
                  />
                  <button
                    type="button"
                    onClick={() => handleZoomChange(zoom + 0.1)}
                    aria-label="Zoom in"
                    className={styles.zoomBtn}
                    disabled={zoom >= MAX_ZOOM}
                  >
                    <Plus size={14} />
                  </button>
                  <span className={styles.zoomValue}>{Math.round(zoom * 100)}%</span>
                </div>

                <div className={styles.controlsActions}>
                  <button type="button" onClick={handleReset} className={styles.linkBtn}>
                    <RotateCcw size={13} /> Reset
                  </button>
                  <button type="button" onClick={openFilePicker} className={styles.linkBtn}>
                    Choose a different photo
                  </button>
                </div>
              </div>

              {previewContexts.length > 0 && (
                <div className={styles.previewSection}>
                  <p className={styles.previewLabel}>How it will appear</p>
                  <div className={styles.previewRow}>
                    {previewContexts.map((ctx) => (
                      <div key={ctx.label} className={styles.previewItem}>
                        <div
                          className={`${styles.frame} ${radiusClass} ${styles.previewFrame}`}
                          style={{ width: ctx.size, height: ctx.size }}
                        >
                          <img
                            src={imgSrc}
                            alt=""
                            draggable={false}
                            className={styles.cropImg}
                            style={cropToImageStyle(
                              imgSize.width,
                              imgSize.height,
                              side,
                              center,
                              ctx.size
                            )}
                          />
                        </div>
                        <span className={styles.previewCaption}>{ctx.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}

      <div className={styles.footer}>
        {onRemove && currentImage && (
          <button type="button" onClick={onRemove} className={styles.removeBtn}>
            <Trash2 size={14} /> Remove photo
          </button>
        )}
        <div className={styles.footerRight}>
          <button type="button" onClick={onClose} className={styles.cancelBtn}>
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            disabled={!showEditor}
            className={styles.saveBtn}
          >
            Save photo
          </button>
        </div>
      </div>
    </Modal>
  );
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}
