import { ReactNode } from 'react';
import './AirportHeader.css';

interface AirportHeaderProps {
  airportName: string;
  children?: ReactNode;
}

/**
 * Page-level header showing the airport name and optional action children.
 * @param airportName - The name of the airport to display.
 * @param children    - Optional elements rendered on the right side of the header.
 */
const AirportHeader = ({ airportName, children }: AirportHeaderProps) => {
  return (
    <header className="airport-header">
      <div className="airport-header-title-group">
        <h1 className="airport-header-title">✈ FlugBoard 1.4</h1>
        <span className="airport-header-subtitle">{airportName}</span>
      </div>
      {children && <div className="airport-header-actions">{children}</div>}
    </header>
  );
};

export default AirportHeader;
