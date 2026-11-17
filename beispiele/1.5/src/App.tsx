import React, { useState } from 'react';
import { sampleFlights } from './data/flights';
import { Flight } from './types/flight';
import AirportHeader from './components/AirportHeader';
import FlightBoard from './components/FlightBoard';
import FlightDetail from './components/FlightDetail';
import './App.css';

type ViewFilter = 'all' | 'departure' | 'arrival';

/** Sorts flights by scheduledTime string (HH:MM). */
const sortByTime = (flights: Flight[]): Flight[] =>
  [...flights].sort((a, b) => a.scheduledTime.localeCompare(b.scheduledTime));

/**
 * Root application component — includes sorting, filtering, and conditional rendering.
 */
const App = () => {
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [filterType, setFilterType] = useState<ViewFilter>('all');

  const departures = sortByTime(
    sampleFlights.filter((f) => f.type === 'departure'),
  );
  const arrivals = sortByTime(
    sampleFlights.filter((f) => f.type === 'arrival'),
  );

  const showDepartures = filterType === 'all' || filterType === 'departure';
  const showArrivals = filterType === 'all' || filterType === 'arrival';

  return (
    <div className="app-page">
      <AirportHeader airportName="Flughafen Wien-Schwechat" />

      <div className="filter-bar">
        {(['all', 'departure', 'arrival'] as ViewFilter[]).map((v) => (
          <button
            key={v}
            className={filterType === v ? 'filter-btn filter-btn-active' : 'filter-btn'}
            onClick={() => setFilterType(v)}
          >
            {v === 'all' ? 'Alle' : v === 'departure' ? 'Abflüge' : 'Ankünfte'}
          </button>
        ))}
      </div>

      {showDepartures && (
        <FlightBoard
          flights={departures}
          title="Abflüge"
          selectedFlightId={selectedFlight?.id}
          onFlightSelect={setSelectedFlight}
        />
      )}
      {showArrivals && (
        <FlightBoard
          flights={arrivals}
          title="Ankünfte"
          selectedFlightId={selectedFlight?.id}
          onFlightSelect={setSelectedFlight}
        />
      )}

      {selectedFlight && (
        <FlightDetail
          flight={selectedFlight}
          onClose={() => setSelectedFlight(null)}
        />
      )}
    </div>
  );
};

export default App;
