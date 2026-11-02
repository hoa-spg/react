'use client';

import { useState, useMemo } from 'react';
import { Flight } from '@/types/flight';
import FlightTable from './FlightTable';

export default function SearchWrapper({ flights }: { flights: Flight[] }) {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    if (!query) return flights;
    const q = query.toLowerCase();
    return flights.filter(
      f =>
        f.flightNumber.toLowerCase().includes(q) ||
        f.airline.toLowerCase().includes(q) ||
        f.airport.toLowerCase().includes(q)
    );
  }, [flights, query]);

  return (
    <div>
      <div className="search-row">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Flug, Airline oder Ziel suchen..."
          className="search-input"
        />
      </div>
      <p className="search-count">
        {filtered.length} {filtered.length === 1 ? 'Flug' : 'Flüge'}
      </p>
      <FlightTable flights={filtered} />
    </div>
  );
}
