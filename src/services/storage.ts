/**
 * Storage service for handling localStorage and sessionStorage
 * with type safety and error handling
 */

type StorageType = "local" | "session";

export const StorageService = {
  /**
   * Set an item in storage with type safety
   * @param key Storage key
   * @param value Value to store
   * @param type Storage type ('local' or 'session')
   */
  setItem<T>(key: string, value: T, type: StorageType = "local"): void {
    try {
      const storage = type === "local" ? localStorage : sessionStorage;
      const serialized = JSON.stringify(value);
      storage.setItem(key, serialized);
    } catch (error) {
      console.error(`Error setting ${type}Storage item:`, error);
    }
  },

  /**
   * Get an item from storage with type safety
   * @param key Storage key
   * @param type Storage type ('local' or 'session')
   * @returns The stored value or null if not found
   */
  getItem<T>(key: string, type: StorageType = "local"): T | null {
    try {
      const storage = type === "local" ? localStorage : sessionStorage;
      const item = storage.getItem(key);

      if (item === null) {
        return null;
      }

      return JSON.parse(item) as T;
    } catch (error) {
      console.error(`Error getting ${type}Storage item:`, error);
      return null;
    }
  },

  /**
   * Remove an item from storage
   * @param key Storage key
   * @param type Storage type ('local' or 'session')
   */
  removeItem(key: string, type: StorageType = "local"): void {
    try {
      const storage = type === "local" ? localStorage : sessionStorage;
      storage.removeItem(key);
    } catch (error) {
      console.error(`Error removing ${type}Storage item:`, error);
    }
  },

  /**
   * Clear all items from storage
   * @param type Storage type ('local' or 'session')
   */
  clear(type: StorageType = "local"): void {
    try {
      const storage = type === "local" ? localStorage : sessionStorage;
      storage.clear();
    } catch (error) {
      console.error(`Error clearing ${type}Storage:`, error);
    }
  },
};
