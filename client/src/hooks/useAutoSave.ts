import { useEffect, useRef, useState } from "react";

interface UseAutoSaveOptions<T> {
  key: string; // unique localStorage key, e.g. "chapter-draft-12"
  data: T;
  onSave: (data: T) => Promise<unknown>;
  enabled?: boolean;
  delayMs?: number;
}

/**
 * Debounced auto-save: saves `data` to the server `delayMs` after the last change,
 * and mirrors it to localStorage on every change so a crashed/closed tab can recover
 * an unsaved draft on next visit.
 */
export function useAutoSave<T>({ key, data, onSave, enabled = true, delayMs = 2000 }: UseAutoSaveOptions<T>) {
  const [status, setStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isFirstRun = useRef(true);

  useEffect(() => {
    // Always mirror to localStorage immediately (cheap, synchronous, protects against browser crashes)
    try {
      localStorage.setItem(`draft:${key}`, JSON.stringify({ data, savedAt: Date.now() }));
    } catch {
      // localStorage can throw in private-browsing/storage-full edge cases — non-fatal
    }

    if (!enabled) return;
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }

    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setStatus("saving");
    timeoutRef.current = setTimeout(async () => {
      try {
        await onSave(data);
        setStatus("saved");
        clearDraft(key);
      } catch {
        setStatus("error");
      }
    }, delayMs);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [JSON.stringify(data), enabled]);

  return { status };
}

export function getDraft<T>(key: string): { data: T; savedAt: number } | null {
  try {
    const raw = localStorage.getItem(`draft:${key}`);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function clearDraft(key: string) {
  try {
    localStorage.removeItem(`draft:${key}`);
  } catch {
    // ignore
  }
}
