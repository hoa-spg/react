import React from 'react';
import { Flight, FlightStatus } from '../types/flight';
import FlightStatusBadge from './FlightStatusBadge';
import './FlightCard.css';

interface FlightCardProps {
  flight: Flight;
  isSelected: boolean;
  onSelect: (flight: Flight) => void;
  onDelete?: (id: number) => void;
  onStatusChange: (id: number, status: FlightStatus) => void;
}

/**
 * A table row for a single flight.
 * Includes a status-change dropdown and an optional delete button.
 */
const FlightCard = ({
  flight,
  isSelected,
  onSelect,
  onDelete,
  onStatusChange,
}: FlightCardProps) => {
  const isCancelled = flight.status === 'cancelled';
  const isDelayed = flight.status === 'delayed';
  const isBoarding = flight.status === 'boarding';

  const rowClasses = [
    'flight-row',
    isSelected ? 'is-selected' : '',
    isCancelled ? 'is-cancelled' : '',
  ].filter(Boolean).join(' ');

  const numberClasses = ['flight-num', isCancelled ? 'is-cancelled' : '']
    .filter(Boolean)
    .join(' ');

  const renderTime = () => {
    if (isDelayed && flight.expectedTime) {
      return (
        <span>
          <span className="time-old">{flight.scheduledTime}</span>
          <span className="time-delayed">→ {flight.expectedTime}</span>
        </span>
      );
    }
    if (isBoarding) {
      return <span className="time-boarding">{flight.scheduledTime}</span>;
    }
    return <span>{flight.scheduledTime}</span>;
  };

  return (
    <tr className={rowClasses} onClick={() => onSelect(flight)}>
      <td className="flight-cell">
        <span className={numberClasses}>{flight.flightNumber}</span>
      </td>
      <td className="flight-cell">{flight.airline}</td>
      <td className="flight-cell">{flight.airport}</td>
      <td className="flight-cell">{renderTime()}</td>
      <td className="flight-cell">
        <FlightStatusBadge status={flight.status} />
      </td>
      <td className="flight-cell">{flight.terminal}</td>
      <td className="flight-cell">{flight.gate ?? '—'}</td>
      <td className="flight-cell" onClick={(e) => e.stopPropagation()}>
        <select
          className="mini-select"
          value={flight.status}
          onChange={(e) => onStatusChange(flight.id, e.target.value as FlightStatus)}
        >
          <option value="on-time">Pünktlich</option>
          <option value="delayed">Verspätet</option>
          <option value="boarding">Boarding</option>
          <option value="departed">Gestartet</option>
          <option value="landed">Gelandet</option>
          <option value="cancelled">Gestrichen</option>
        </select>
      </td>
      <td className="flight-cell">
        {onDelete && (
          <button
            className="delete-btn"
            title="Flug löschen"
            onClick={(e) => {
              e.stopPropagation();
              onDelete(flight.id);
            }}
          >
            ✕
          </button>
        )}
      </td>
    </tr>
  );
};

export default FlightCard;
