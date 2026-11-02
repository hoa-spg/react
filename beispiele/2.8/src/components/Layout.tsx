import { Link, NavLink, Outlet } from 'react-router-dom';
import { CSSProperties } from 'react';
import { useTheme } from '../context/ThemeContext';
import './Layout.css';

/**
 * Shared layout with top navigation bar.
 * NavLinks highlight the active route; theme toggle is always visible.
 */
const Layout = () => {
  const { colors, theme, toggleTheme } = useTheme();
  const themeVars = {
    '--bg': colors.bg,
    '--bg-card': colors.bgCard,
    '--bg-sidebar': colors.bgSidebar,
    '--text': colors.text,
    '--text-muted': colors.textMuted,
    '--border': colors.border,
    '--accent': colors.accent,
  } as CSSProperties;

  return (
    // Inline style remains for runtime theme token injection into CSS variables.
    <div className="app-root" style={themeVars}>
      <header className="top-nav">
        <Link to="/" className="brand-link">
          ✈ FlugBoard 2.8
        </Link>

        <NavLink
          to="/departures"
          className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
        >
          Abflüge
        </NavLink>

        <NavLink
          to="/arrivals"
          className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
        >
          Ankünfte
        </NavLink>

        <div className="top-nav-actions">
          <button onClick={toggleTheme} className="theme-toggle">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      <main className="page-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
