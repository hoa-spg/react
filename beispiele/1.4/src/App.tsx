import { sampleFlights } from './data/flights';
import { Flight } from './types/flight';
import AirportHeader from './components/AirportHeader';
import FlightBoard from './components/FlightBoard';
import './App.css';

/** Sorts flights by scheduledTime string (HH:MM) without mutating the input. */
const sortByTime = (flights: Flight[]): Flight[] =>
  [...flights].sort((a, b) => a.scheduledTime.localeCompare(b.scheduledTime));

/**
 * Root application component — renders sorted departure and arrival boards.
 */
const App = () => {
  const departures = sortByTime(
    sampleFlights.filter((f) => f.type === 'departure'),
  );
  const arrivals = sortByTime(
    sampleFlights.filter((f) => f.type === 'arrival'),
  );

  return (
    <div className="app-page">
      <AirportHeader airportName="Flughafen Wien-Schwechat" />
      <FlightBoard flights={departures} title="Abflüge" />
      <FlightBoard flights={arrivals} title="Ankünfte" />
    </div>
  );
};

export default App;
