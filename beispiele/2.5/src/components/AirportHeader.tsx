import React from 'react';
import { useTheme } from '../context/ThemeContext';
import './AirportHeader.css';

interface AirportHeaderProps {
  airportName: string;
  lastUpdated?: Date | null;
  isRefreshing?: boolean;
  onRefresh?: () => void;
  children?: React.ReactNode;
}

/**
 * Page-level header that reads colors from ThemeContext.
 * Shows last-updated timestamp and a theme toggle button.
 */
const AirportHeader = ({
  airportName,
  lastUpdated,
  isRefreshing,
  onRefresh,
  children,
}: AirportHeaderProps) => {
  const { theme, toggleTheme } = useTheme();

  const formatTime = (d: Date) =>
    d.toLocaleTimeString('de-AT', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

  return (
    <header className="airport-header">
      <div className="airport-header-title-group">
        <h1 className="airport-header-title">✈ FlugBoard 2.5</h1>
        <span className="airport-header-subtitle">{airportName}</span>
        {lastUpdated && (
          <span className="airport-header-updated">
            Aktualisiert: {formatTime(lastUpdated)}
            {isRefreshing && ' (wird aktualisiert...)'}
          </span>
        )}
        {!lastUpdated && isRefreshing && (
          <span className="airport-header-updated">(wird aktualisiert...)</span>
        )}
      </div>
      <div className="airport-header-actions">
        {children}
        {onRefresh && (
          <button
            onClick={onRefresh}
            disabled={isRefreshing}
            className="airport-header-action-btn"
          >
            {isRefreshing ? 'Lädt...' : 'Aktualisieren'}
          </button>
        )}
        <button
          onClick={toggleTheme}
          title="Theme wechseln"
          className="airport-header-theme-btn"
        >
          {theme === 'dark' ? '☀️' : '🌙'}
        </button>
      </div>
    </header>
  );
};

export default AirportHeader;
