import React from 'react';
import { Flight } from '../types/flight';
import FlightStatusBadge from './FlightStatusBadge';
import './FlightDetail.css';

interface FlightDetailProps {
  flight: Flight;
  onClose: () => void;
}

/**
 * Detail panel shown when a flight row is selected.
 * @param flight  - The selected flight to show details for.
 * @param onClose - Callback to close/dismiss the panel.
 */
const FlightDetail = ({ flight, onClose }: FlightDetailProps) => {
  return (
    <div className="detail-overlay" onClick={onClose}>
      <div className="detail-panel" onClick={(e) => e.stopPropagation()}>
        <button className="detail-close" onClick={onClose}>
          Schließen
        </button>

        <div className="detail-number">{flight.flightNumber}</div>

        <div className="detail-row">
          <span className="detail-label">Airline</span>
          <span className="detail-value">{flight.airline}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Typ</span>
          <span className="detail-value">
            {flight.type === 'departure' ? 'Abflug' : 'Ankunft'}
          </span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Ziel / Herkunft</span>
          <span className="detail-value">{flight.airport}</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Geplante Zeit</span>
          <span className="detail-value">{flight.scheduledTime}</span>
        </div>
        {flight.expectedTime && (
          <div className="detail-row">
            <span className="detail-label">Erwartete Zeit</span>
            <span className="detail-value detail-value--warning">
              {flight.expectedTime}
            </span>
          </div>
        )}
        <div className="detail-row">
          <span className="detail-label">Status</span>
          <span className="detail-value">
            <FlightStatusBadge status={flight.status} />
          </span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Terminal</span>
          <span className="detail-value">{flight.terminal}</span>
        </div>
        {flight.gate && (
          <div className="detail-row">
            <span className="detail-label">Gate</span>
            <span className="detail-value">{flight.gate}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightDetail;
