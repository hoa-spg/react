import { Flight } from '../types/flight';
import FlightStatusBadge from './FlightStatusBadge';
import './FlightCard.css';

interface FlightCardProps {
  flight: Flight;
}

/**
 * A table row for a single flight with conditional time and style rendering.
 * - Cancelled: flight number struck through, muted colour.
 * - Delayed: shows original time struck through + expected time in yellow.
 * - Boarding: scheduled time in cyan.
 *
 * @param flight - The flight data to render.
 */
const FlightCard = ({ flight }: FlightCardProps) => {
  const isCancelled = flight.status === 'cancelled';
  const isDelayed = flight.status === 'delayed';
  const isBoarding = flight.status === 'boarding';

  const rowClassName = isCancelled ? 'flight-row is-cancelled' : 'flight-row';
  const flightNumberClassName = isCancelled
    ? 'flight-num is-cancelled'
    : 'flight-num';

  const renderTime = () => {
    if (isDelayed && flight.expectedTime) {
      return (
        <span>
          <span className="time-old">
            {flight.scheduledTime}
          </span>
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
    <tr className={rowClassName}>
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
