import './App.css';
import AirportHeader from './components/AirportHeader';
import FlightRow from './components/FlightRow';
import Welcome from './components/Welcome';

const App = () => {
  return (
    <div className="app-page">
      <AirportHeader airportName="Flughafen Wien-Schwechat" />
      <Welcome name="Max" />

      <h2 className="section-heading">Abflüge</h2>
      <table className="flight-table">
        <thead>
          <tr>
            <th>Flug</th>
            <th>Airline</th>
            <th>Ziel</th>
            <th>Zeit</th>
          </tr>
        </thead>
        <tbody>
          <FlightRow
            flightNumber="OS123"
            airline="Austrian Airlines"
            destination="London Heathrow (LHR)"
            time="10:30"
          />
          <FlightRow
            flightNumber="LH456"
            airline="Lufthansa"
            destination="Frankfurt (FRA)"
            time="11:15"
          />
          <FlightRow
            flightNumber="BA234"
            airline="British Airways"
            destination="London Heathrow (LHR)"
            time="12:00"
          />
        </tbody>
      </table>
    </div>
  );
};

export default App;
