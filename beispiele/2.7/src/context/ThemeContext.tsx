import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'dark' | 'light';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  colors: {
    bg: string;
    bgCard: string;
    bgSidebar: string;
    text: string;
    textMuted: string;
    border: string;
    accent: string;
  };
}

const ThemeContext = createContext<ThemeContextType | null>(null);

const DARK = {
  bg: '#0d1117',
  bgCard: '#1c2128',
  bgSidebar: '#161b22',
  text: '#e6edf3',
  textMuted: '#8b949e',
  border: '#30363d',
  accent: '#61dafb',
};

const LIGHT = {
  bg: '#f6f8fa',
  bgCard: '#ffffff',
  bgSidebar: '#f0f2f5',
  text: '#1c2128',
  textMuted: '#57606a',
  border: '#d0d7de',
  accent: '#0969da',
};

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    return (localStorage.getItem('flugboard-theme') as Theme) ?? 'dark';
  });

  useEffect(() => {
    localStorage.setItem('flugboard-theme', theme);
    document.body.style.background = theme === 'dark' ? DARK.bg : LIGHT.bg;
    document.body.style.color      = theme === 'dark' ? DARK.text : LIGHT.text;
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));
  const colors = theme === 'dark' ? DARK : LIGHT;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colors }}>
      {children}
    </ThemeContext.Provider>
  );
};

/** Hook to consume the ThemeContext; throws if used outside ThemeProvider. */
export const useTheme = (): ThemeContextType => {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme muss innerhalb von ThemeProvider verwendet werden');
  return ctx;
};
