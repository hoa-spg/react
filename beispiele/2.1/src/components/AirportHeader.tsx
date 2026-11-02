import React from 'react';
import './AirportHeader.css';

interface AirportHeaderProps {
  airportName: string;
  children?: React.ReactNode;
}

/**
 * Page-level header showing the airport name and optional action children.
 */
const AirportHeader = ({ airportName, children }: AirportHeaderProps) => {
  return (
    <header className="airport-header">
      <div className="airport-header-title-group">
        <h1 className="airport-header-title">✈ FlugBoard 2.1</h1>
        <span className="airport-header-subtitle">{airportName}</span>
      </div>
      {children && <div>{children}</div>}
    </header>
  );
};

export default AirportHeader;
