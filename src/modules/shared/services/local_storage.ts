// src/modules/shared/services/local_storage.ts

/**
 * Simple typed wrapper around window.localStorage.
 * All values are stored as JSON strings.
 */
export const localStorageService = {
  /** Get a typed value from localStorage */
  getItem<T>(key: string): T | null {
    if (typeof window === "undefined") return null;
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as T;
    } catch {
      console.warn(`[localStorageService] Failed to parse value for key ${key}`);
      return null;
    }
  },
  /** Set a typed value in localStorage */
  setItem<T>(key: string, value: T): void {
    if (typeof window === "undefined") return;
    try {
      const json = JSON.stringify(value);
      window.localStorage.setItem(key, json);
    } catch {
      console.warn(`[localStorageService] Failed to serialize value for key ${key}`);
    }
  },
  /** Remove an entry */
  removeItem(key: string): void {
    if (typeof window === "undefined") return;
    window.localStorage.removeItem(key);
  },
};
