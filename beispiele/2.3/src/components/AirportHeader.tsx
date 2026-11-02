import React from 'react';
import './AirportHeader.css';

interface AirportHeaderProps {
  airportName: string;
  lastUpdated?: Date | null;
  isRefreshing?: boolean;
  children?: React.ReactNode;
}

/**
 * Page-level header showing airport name, last-updated time, and optional actions.
 */
const AirportHeader = ({
  airportName,
  lastUpdated,
  isRefreshing,
  children,
}: AirportHeaderProps) => {
  const formatTime = (d: Date) =>
    d.toLocaleTimeString('de-AT', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

  return (
    <header className="airport-header">
      <div className="airport-header-title-group">
        <h1 className="airport-header-title">✈ FlugBoard 2.3</h1>
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
      {children && <div className="airport-header-actions">{children}</div>}
    </header>
  );
};

export default AirportHeader;
