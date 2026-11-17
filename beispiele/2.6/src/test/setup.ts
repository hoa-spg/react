import '@testing-library/jest-dom/vitest';

// Einfacher localStorage im Arbeitsspeicher für alle Tests.
// Grund: Ab Node 25 gibt es ein eigenes globales localStorage, das ohne
// Speicherdatei nicht funktioniert und das localStorage von jsdom überdeckt.
const data = new Map<string, string>();
const memoryStorage: Storage = {
  get length() { return data.size; },
  clear: () => data.clear(),
  getItem: (key) => data.get(key) ?? null,
  key: (index) => [...data.keys()][index] ?? null,
  removeItem: (key) => { data.delete(key); },
  setItem: (key, value) => { data.set(key, String(value)); },
};
Object.defineProperty(globalThis, 'localStorage', { value: memoryStorage, configurable: true });
