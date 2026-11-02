import { useMemo, useState } from 'react';

interface FlightSearchPanelProps {
  flights: string[];
  onFilterChange?: (query: string, matches: number) => void;
}

const FlightSearchPanel = ({ flights, onFilterChange }: FlightSearchPanelProps) => {
  const [query, setQuery] = useState('');

  const filteredFlights = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) {
      return flights;
    }

    return flights.filter((flight) => flight.toLowerCase().includes(q));
  }, [flights, query]);

  const handleQueryChange = (value: string) => {
    setQuery(value);

    const q = value.trim().toLowerCase();
    const matches = q
      ? flights.filter((flight) => flight.toLowerCase().includes(q)).length
      : flights.length;
    onFilterChange?.(value, matches);
  };

  return (
    <section>
      <label htmlFor="flight-search">Suche</label>
      <input
        id="flight-search"
        type="search"
        value={query}
        onChange={(event) => handleQueryChange(event.target.value)}
      />
      <p>Treffer: {filteredFlights.length}</p>
      <ul aria-label="Flugliste">
        {filteredFlights.map((flight) => (
          <li key={flight}>{flight}</li>
        ))}
      </ul>
    </section>
  );
};

export default FlightSearchPanel;
