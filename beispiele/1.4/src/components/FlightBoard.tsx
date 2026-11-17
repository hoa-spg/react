import { Flight } from '../types/flight';
import FlightCard from './FlightCard';
import EmptyState from './EmptyState';
import './FlightBoard.css';

interface FlightBoardProps {
  flights: Flight[];
  title: string;
}

/**
 * Renders a titled section containing a table of flight rows.
 * Shows EmptyState when the list is empty.
 * @param flights - Array of flight objects to display.
 * @param title   - Section heading text.
 */
const FlightBoard = ({ flights, title }: FlightBoardProps) => {
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
              <FlightCard key={flight.id} flight={flight} />
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default FlightBoard;
