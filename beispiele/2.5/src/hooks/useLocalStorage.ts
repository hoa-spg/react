import { useState } from 'react';

/**
 * Persists a value in localStorage and keeps React state in sync.
 * @param key          - The localStorage key.
 * @param initialValue - Used when the key is not yet set.
 * @returns [storedValue, setValue] tuple, analogous to useState.
 */
const useLocalStorage = <T>(key: string, initialValue: T): [T, (value: T) => void] => {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = localStorage.getItem(key);
      return item !== null ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      localStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error('localStorage error:', err);
    }
  };

  return [storedValue, setValue];
};

export default useLocalStorage;
