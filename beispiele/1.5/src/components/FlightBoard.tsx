import { Flight } from '../types/flight';
import FlightCard from './FlightCard';
import './FlightBoard.css';

interface FlightBoardProps {
  flights: Flight[];
  title: string;
  selectedFlightId?: number;
  onFlightSelect: (flight: Flight) => void;
}

/**
 * Renders a titled section containing a table of selectable flight rows.
 * @param flights          - Array of flight objects to display.
 * @param title            - Section heading text.
 * @param selectedFlightId - ID of the currently selected flight (for highlighting).
 * @param onFlightSelect   - Callback invoked when a row is clicked.
 */
const FlightBoard = ({
  flights,
  title,
  selectedFlightId,
  onFlightSelect,
}: FlightBoardProps) => {
  return (
    <section className="flight-board-section">
      <h2 className="flight-board-title">{title}</h2>
      <table className="flight-board-table">
        <thead>
          <tr>
            <th className="flight-board-heading">Flug</th>
            <th className="flight-board-heading">Airline</th>
            <th className="flight-board-heading">Ziel</th>
            <th className="flight-board-heading">Geplant</th>
            <th className="flight-board-heading">Status</th>
            <th className="flight-board-heading">Terminal</th>
            <th className="flight-board-heading">Gate</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight) => (
            <FlightCard
              key={flight.id}
              flight={flight}
              isSelected={flight.id === selectedFlightId}
              onSelect={onFlightSelect}
            />
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default FlightBoard;
