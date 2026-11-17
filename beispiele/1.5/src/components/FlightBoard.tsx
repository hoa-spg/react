import { Flight } from '../types/flight';
import FlightCard from './FlightCard';
import EmptyState from './EmptyState';
import './FlightBoard.css';

interface FlightBoardProps {
  flights: Flight[];
  title: string;
  selectedFlightId?: number;
  onFlightSelect: (flight: Flight) => void;
}

/**
 * Renders a titled section containing a table of selectable flight rows.
 * Shows EmptyState when the list is empty.
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
    <section className="board-section">
      <h2 className="board-title">{title}</h2>
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
      )}
    </section>
  );
};

export default FlightBoard;
