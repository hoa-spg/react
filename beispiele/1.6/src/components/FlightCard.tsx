import { Flight } from '../types/flight';
import FlightStatusBadge from './FlightStatusBadge';
import './FlightCard.css';

interface FlightCardProps {
  flight: Flight;
  isSelected: boolean;
  onSelect: (flight: Flight) => void;
}

/**
 * A table row for a single flight with conditional time and style rendering.
 * - Cancelled: flight number struck through, muted colour.
 * - Delayed: shows original time struck through + expected time in yellow.
 * - On-time / Boarding: scheduled time in cyan.
 *
 * @param flight     - The flight data to render.
 * @param isSelected - Whether this row is currently selected.
 * @param onSelect   - Callback invoked when the row is clicked.
 */
const FlightCard = ({ flight, isSelected, onSelect }: FlightCardProps) => {
  const isCancelled = flight.status === 'cancelled';
  const isDelayed = flight.status === 'delayed';
  const isBoarding = flight.status === 'boarding';

  const rowClassName = [
    'flight-row',
    isSelected ? 'is-selected' : '',
    isCancelled ? 'is-cancelled' : '',
  ].filter(Boolean).join(' ');

  const flightNumberClassName = ['flight-number', isCancelled ? 'is-cancelled' : '']
    .filter(Boolean)
    .join(' ');

  const renderTime = () => {
    if (isDelayed && flight.expectedTime) {
      return (
        <span>
          <span className="flight-time-original">
            {flight.scheduledTime}
          </span>
          <span className="flight-time-delayed">→ {flight.expectedTime}</span>
        </span>
      );
    }
    if (isBoarding) {
      return <span className="flight-time-boarding">{flight.scheduledTime}</span>;
    }
    return <span>{flight.scheduledTime}</span>;
  };

  return (
    <tr className={rowClassName} onClick={() => onSelect(flight)}>
      <td className="flight-cell">
        <span className={flightNumberClassName}>{flight.flightNumber}</span>
      </td>
      <td className="flight-cell">{flight.airline}</td>
      <td className="flight-cell">{flight.airport}</td>
      <td className="flight-cell">{renderTime()}</td>
      <td className="flight-cell">
        <FlightStatusBadge status={flight.status} />
      </td>
      <td className="flight-cell">{flight.terminal}</td>
      <td className="flight-cell">{flight.gate ?? '—'}</td>
    </tr>
  );
};

export default FlightCard;
