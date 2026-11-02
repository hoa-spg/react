import { sampleFlights } from './data/flights';
import AirportHeader from './components/AirportHeader';
import FlightBoard from './components/FlightBoard';
import './App.css';

/**
 * Root application component — renders departure and arrival boards.
 */
const App = () => {
  const departures = sampleFlights.filter((f) => f.type === 'departure');
  const arrivals = sampleFlights.filter((f) => f.type === 'arrival');

  return (
    <div className="app-page">
      <AirportHeader airportName="Flughafen Wien-Schwechat" />
      <FlightBoard flights={departures} title="Abflüge" />
      <FlightBoard flights={arrivals} title="Ankünfte" />
    </div>
  );
};

export default App;
