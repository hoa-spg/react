import React from 'react';
import { Flight } from '../types/flight';
import FlightCard from './FlightCard';
import EmptyState from './EmptyState';
import './FlightBoard.css';

interface FlightBoardProps {
  flights: Flight[];
  title: string;
  selectedFlightId?: number;
  onFlightSelect: (flight: Flight) => void;
  onDeleteFlight?: (id: number) => void;
  count?: number;
}

/**
 * Renders a titled, filterable section of flight rows with delete support.
 */
const FlightBoard = ({
  flights,
  title,
  selectedFlightId,
  onFlightSelect,
  onDeleteFlight,
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
              {onDeleteFlight && <th></th>}
            </tr>
          </thead>
          <tbody>
            {flights.map((flight) => (
              <FlightCard
                key={flight.id}
                flight={flight}
                isSelected={flight.id === selectedFlightId}
                onSelect={onFlightSelect}
                onDelete={onDeleteFlight}
              />
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default FlightBoard;
