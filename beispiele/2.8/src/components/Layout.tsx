import { Link, NavLink, Outlet } from 'react-router-dom';
import { CSSProperties } from 'react';
import { useTheme } from '../context/ThemeContext';
import useFlights from '../hooks/useFlights';
import './Layout.css';

/**
 * Shared layout with top navigation bar.
 * NavLinks highlight the active route; theme toggle is always visible.
 * Loads the flights once and passes them to every page via the Outlet context,
 * so switching between pages does not trigger a new request.
 */
const Layout = () => {
  const { colors, theme, toggleTheme } = useTheme();
  const flightData = useFlights();
  const themeVars = {
    '--app-bg': colors.bg,
    '--app-card-bg': colors.bgCard,
    '--app-sidebar-bg': colors.bgSidebar,
    '--app-text': colors.text,
    '--app-muted': colors.textMuted,
    '--app-border': colors.border,
    '--app-accent': colors.accent,
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
        <Outlet context={flightData} />
      </main>
    </div>
  );
};

export default Layout;
