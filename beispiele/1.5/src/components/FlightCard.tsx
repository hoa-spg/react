import { Flight } from '../types/flight';
import FlightStatusBadge from './FlightStatusBadge';
import './FlightCard.css';

interface FlightCardProps {
  flight: Flight;
  isSelected: boolean;
  onSelect: (flight: Flight) => void;
}

/**
 * A table row component for a single flight. Highlights when selected.
 * @param flight     - The flight data to render.
 * @param isSelected - Whether this row is currently selected.
 * @param onSelect   - Callback invoked when the row is clicked.
 */
const FlightCard = ({ flight, isSelected, onSelect }: FlightCardProps) => {
  const rowClassName = isSelected ? 'flight-row is-selected' : 'flight-row';

  return (
    <tr className={rowClassName} onClick={() => onSelect(flight)}>
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
