import React, { useState } from 'react';
import { sampleFlights } from './data/flights';
import { Flight, FlightStatus } from './types/flight';
import AirportHeader from './components/AirportHeader';
import FlightBoard from './components/FlightBoard';
import FlightDetail from './components/FlightDetail';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import AddFlightForm from './components/AddFlightForm';
import './App.css';

/** Sorts flights ascending by scheduledTime (HH:MM string comparison). */
const sortByTime = (flights: Flight[]): Flight[] =>
  [...flights].sort((a, b) => a.scheduledTime.localeCompare(b.scheduledTime));

/**
 * Root application component for L05.
 * Manages the full flight list, search, filtering, add, delete, and detail panel.
 */
const App = () => {
  // ── State ────────────────────────────────────────────────────────────────
  const [flights, setFlights] = useState<Flight[]>(sampleFlights);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'departure' | 'arrival'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | FlightStatus>('all');
  const [showAddForm, setShowAddForm] = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

  // ── Handlers ─────────────────────────────────────────────────────────────
  const handleAddFlight = (flight: Flight) => {
    setFlights((prev) => [...prev, flight]);
    setShowAddForm(false);
  };

  const handleDeleteFlight = (id: number) => {
    setFlights((prev) => prev.filter((f) => f.id !== id));
    setSelectedFlight((prev) => (prev?.id === id ? null : prev));
  };

  const handleReset = () => {
    setSearchQuery('');
    setTypeFilter('all');
    setStatusFilter('all');
  };

  // ── Derived data ─────────────────────────────────────────────────────────
  const query = searchQuery.toLowerCase();

  const filtered = sortByTime(
    flights.filter((f) => {
      const matchesSearch =
        !query ||
        f.flightNumber.toLowerCase().includes(query) ||
        f.airline.toLowerCase().includes(query) ||
        f.airport.toLowerCase().includes(query);

      const matchesType =
        typeFilter === 'all' || f.type === typeFilter;

      const matchesStatus =
        statusFilter === 'all' || f.status === statusFilter;

      return matchesSearch && matchesType && matchesStatus;
    }),
  );

  const filteredDepartures = filtered.filter((f) => f.type === 'departure');
  const filteredArrivals = filtered.filter((f) => f.type === 'arrival');

  const hasActiveFilters =
    searchQuery !== '' || typeFilter !== 'all' || statusFilter !== 'all';

  const showDepartures = typeFilter === 'all' || typeFilter === 'departure';
  const showArrivals = typeFilter === 'all' || typeFilter === 'arrival';

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="app-page">
      <AirportHeader airportName="Flughafen Wien-Schwechat">
        <button className="add-btn" onClick={() => setShowAddForm((v) => !v)}>
          {showAddForm ? 'Abbrechen' : '+ Flug hinzufügen'}
        </button>
      </AirportHeader>

      {showAddForm && (
        <AddFlightForm
          onAdd={handleAddFlight}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      {/* Search + Filter toolbar */}
      <div className="toolbar">
        <SearchBar
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Suche nach Flug, Airline, Ziel…"
        />
        <FilterBar
          typeFilter={typeFilter}
          statusFilter={statusFilter}
          onTypeChange={setTypeFilter}
          onStatusChange={setStatusFilter}
          onReset={handleReset}
          hasActiveFilters={hasActiveFilters}
        />
      </div>

      {/* Flight boards */}
      {showDepartures && (
        <FlightBoard
          flights={filteredDepartures}
          title="Abflüge"
          count={filteredDepartures.length}
          selectedFlightId={selectedFlight?.id}
          onFlightSelect={setSelectedFlight}
          onDeleteFlight={handleDeleteFlight}
        />
      )}
      {showArrivals && (
        <FlightBoard
          flights={filteredArrivals}
          title="Ankünfte"
          count={filteredArrivals.length}
          selectedFlightId={selectedFlight?.id}
          onFlightSelect={setSelectedFlight}
          onDeleteFlight={handleDeleteFlight}
        />
      )}

      {/* Detail panel */}
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
