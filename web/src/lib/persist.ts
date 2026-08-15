import type { z } from 'zod';
import { safeLocalStorage } from './safeStorage';

/**
 * Versioned, schema-validated JSON persistence on top of `safeLocalStorage`.
 *
 * Every persisted slice in this app has, at some point, been a bare
 * `JSON.parse(localStorage.getItem(key))` with no shape check and no version
 * marker — one manual edit in devtools, one shipped schema change, or one
 * half-written value from a previous release corrupts the read and can crash
 * the app at boot. This wraps values in a `{ version, data }` envelope,
 * validates `data` against a Zod schema before handing it back, and lets
 * callers migrate or discard data written under an older version.
 */
interface PersistEnvelope<T> {
  version: number;
  data: T;
}

interface LoadPersistedOptions<T> {
  key: string;
  version: number;
  schema: z.ZodType<T>;
  /** Migrate a payload written under an older (or absent, version 0) schema version. Return null to discard it. */
  migrate?: (data: unknown, fromVersion: number) => unknown | null;
}

const isEnvelope = (value: unknown): value is PersistEnvelope<unknown> =>
  typeof value === 'object' &&
  value !== null &&
  'version' in value &&
  'data' in value &&
  typeof (value as { version: unknown }).version === 'number';

export function loadPersisted<T>({
  key,
  version,
  schema,
  migrate,
}: LoadPersistedOptions<T>): T | null {
  const raw = safeLocalStorage.getItem(key);
  if (!raw) return null;

  try {
    const parsed: unknown = JSON.parse(raw);
    // Payloads written before versioning was introduced are bare data, not an envelope.
    const envelope = isEnvelope(parsed) ? parsed : { version: 0, data: parsed };

    const candidate =
      envelope.version === version
        ? envelope.data
        : (migrate?.(envelope.data, envelope.version) ?? null);

    if (candidate === null || candidate === undefined) return null;

    const result = schema.safeParse(candidate);
    return result.success ? result.data : null;
  } catch {
    return null;
  }
}

export function savePersisted<T>(key: string, version: number, data: T): boolean {
  try {
    const envelope: PersistEnvelope<T> = { version, data };
    return safeLocalStorage.setItem(key, JSON.stringify(envelope));
  } catch {
    return false;
  }
}

export function removePersisted(key: string): boolean {
  return safeLocalStorage.removeItem(key);
}
