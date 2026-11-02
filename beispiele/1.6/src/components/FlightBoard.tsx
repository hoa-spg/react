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
 * Renders a titled section with a sorted table of flights.
 * Shows EmptyState when no flights match.
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
      {flights.length === 0 ? (
        <EmptyState />
      ) : (
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
      )}
    </section>
  );
};

export default FlightBoard;
