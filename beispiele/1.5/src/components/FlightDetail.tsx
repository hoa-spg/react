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
    <div className="flight-detail-overlay" onClick={onClose}>
      <div className="flight-detail-panel" onClick={(e) => e.stopPropagation()}>
        <button className="flight-detail-close-btn" onClick={onClose}>
          Schließen
        </button>

        <div className="flight-detail-number">{flight.flightNumber}</div>

        <div className="flight-detail-row">
          <span className="flight-detail-label">Airline</span>
          <span className="flight-detail-value">{flight.airline}</span>
        </div>
        <div className="flight-detail-row">
          <span className="flight-detail-label">Typ</span>
          <span className="flight-detail-value">
            {flight.type === 'departure' ? 'Abflug' : 'Ankunft'}
          </span>
        </div>
        <div className="flight-detail-row">
          <span className="flight-detail-label">Ziel / Herkunft</span>
          <span className="flight-detail-value">{flight.airport}</span>
        </div>
        <div className="flight-detail-row">
          <span className="flight-detail-label">Geplante Zeit</span>
          <span className="flight-detail-value">{flight.scheduledTime}</span>
        </div>
        {flight.expectedTime && (
          <div className="flight-detail-row">
            <span className="flight-detail-label">Erwartete Zeit</span>
            <span className="flight-detail-time-delayed">{flight.expectedTime}</span>
          </div>
        )}
        <div className="flight-detail-row">
          <span className="flight-detail-label">Status</span>
          <span className="flight-detail-value">
            <FlightStatusBadge status={flight.status} />
          </span>
        </div>
        <div className="flight-detail-row">
          <span className="flight-detail-label">Terminal</span>
          <span className="flight-detail-value">{flight.terminal}</span>
        </div>
        {flight.gate && (
          <div className="flight-detail-row">
            <span className="flight-detail-label">Gate</span>
            <span className="flight-detail-value">{flight.gate}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlightDetail;
