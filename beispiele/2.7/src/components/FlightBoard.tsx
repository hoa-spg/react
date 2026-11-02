import React from 'react';
import './FlightBoard.css';
import { Flight, FlightStatus } from '../types/flight';
import FlightCard from './FlightCard';
import EmptyState from './EmptyState';

interface FlightBoardProps {
  flights: Flight[];
  title: string;
  selectedFlightId?: number;
  onFlightSelect: (flight: Flight) => void;
  onFlightDelete?: (id: number) => void;
  onStatusChange: (id: number, status: FlightStatus) => void;
  count?: number;
}

/**
 * Renders a titled section of flight rows.
 * Uses ThemeContext for background and border colors.
 */
const FlightBoard = ({
  flights,
  title,
  selectedFlightId,
  onFlightSelect,
  onFlightDelete,
  onStatusChange,
  count,
}: FlightBoardProps) => {
  return (
    <section className="board-section">
      <div className="board-title-row">
        <h2 className="board-title">{title}</h2>
        {count !== undefined && (
          <span className="board-count">{count} Einträge</span>
        )}
      </div>
      {flights.length === 0 ? (
        <EmptyState />
      ) : (
        <table className="flight-table">
          <thead>
            <tr>
              <th>Flug</th>
              <th>Airline</th>
              <th>Ziel</th>
              <th>Geplant</th>
              <th>Status</th>
              <th>Terminal</th>
              <th>Gate</th>
              <th>Ändern</th>
              {onFlightDelete && <th></th>}
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <FlightCard
                key={flight.id}
                flight={flight}
                isSelected={flight.id === selectedFlightId}
                onSelect={onFlightSelect}
                onDelete={onFlightDelete}
                onStatusChange={onStatusChange}
              />
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default FlightBoard;
