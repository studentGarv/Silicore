/**
 * Local Storage Persistence Utility
 * 
 * Provides safe localStorage operations with error handling for Zustand stores.
 * Handles serialization, deserialization, and graceful fallbacks.
 */

export interface StorageOptions {
  name: string;
  version?: number;
}

/**
 * Safely reads from localStorage with error handling
 */
export function loadFromStorage<T>(key: string): T | null {
  try {
    const item = localStorage.getItem(key);
    if (!item) {
      return null;
    }
    return JSON.parse(item) as T;
  } catch (error) {
    console.warn(`Failed to load from localStorage (key: ${key}):`, error);
    return null;
  }
}

/**
 * Safely writes to localStorage with error handling
 */
export function saveToStorage<T>(key: string, value: T): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (error) {
    console.error(`Failed to save to localStorage (key: ${key}):`, error);
    return false;
  }
}

/**
 * Removes an item from localStorage with error handling
 */
export function removeFromStorage(key: string): boolean {
  try {
    localStorage.removeItem(key);
    return true;
  } catch (error) {
    console.warn(`Failed to remove from localStorage (key: ${key}):`, error);
    return false;
  }
}

/**
 * Checks if localStorage is available and functional
 */
export function isStorageAvailable(): boolean {
  try {
    const testKey = '__storage_test__';
    localStorage.setItem(testKey, 'test');
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

/**
 * Clears all application storage with error handling
 */
export function clearAppStorage(prefix: string = 'semiconductor-'): boolean {
  try {
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.startsWith(prefix)) {
        localStorage.removeItem(key);
      }
    });
    return true;
  } catch (error) {
    console.error('Failed to clear application storage:', error);
    return false;
  }
}
