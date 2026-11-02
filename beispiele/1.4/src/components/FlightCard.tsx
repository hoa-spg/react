import { Flight } from '../types/flight';
import FlightStatusBadge from './FlightStatusBadge';
import './FlightCard.css';

interface FlightCardProps {
  flight: Flight;
}

/**
 * Renders a single table row for one flight entry.
 * @param flight - The flight data object to display.
 */
const FlightCard = ({ flight }: FlightCardProps) => {
  return (
    <tr>
      <td className="flight-cell">{flight.flightNumber}</td>
      <td className="flight-cell">{flight.airline}</td>
      <td className="flight-cell">{flight.airport}</td>
      <td className="flight-cell">{flight.scheduledTime}</td>
      <td className="flight-cell">
        <FlightStatusBadge status={flight.status} />
      </td>
      <td className="flight-cell">{flight.terminal}</td>
      <td className="flight-cell">{flight.gate ?? '—'}</td>
    </tr>
  );
};

export default FlightCard;
