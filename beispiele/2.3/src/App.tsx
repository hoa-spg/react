import React, { useState, useEffect } from 'react';
import { Flight, FlightStatus } from './types/flight';
import AirportHeader from './components/AirportHeader';
import FlightBoard from './components/FlightBoard';
import FlightDetail from './components/FlightDetail';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import AddFlightForm from './components/AddFlightForm';
import './App.css';

const API_URL = 'http://localhost:8000';

/** Sorts flights ascending by scheduledTime. */
const sortByTime = (flights: Flight[]): Flight[] =>
  [...flights].sort((a, b) => a.scheduledTime.localeCompare(b.scheduledTime));

/**
 * Root application component for L07.
 * Demonstrates lifting state up: status changes and deletions bubble up via callbacks.
 */
const App = () => {
  // ── API state ─────────────────────────────────────────────────────────────
  const [flights, setFlights]           = useState<Flight[]>([]);
  const [isLoading, setIsLoading]       = useState<boolean>(true);
  const [error, setError]               = useState<string | null>(null);
  const [lastUpdated, setLastUpdated]   = useState<Date | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // ── UI state ──────────────────────────────────────────────────────────────
  const [searchQuery, setSearchQuery]   = useState('');
  const [typeFilter, setTypeFilter]     = useState<'all' | 'departure' | 'arrival'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | FlightStatus>('all');
  const [showAddForm, setShowAddForm]   = useState(false);
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);

  // ── Fetch ──────────────────────────────────────────────────────────────────
  const fetchFlights = async (signal?: AbortSignal) => {
    let isAborted = false;

    try {
      setIsRefreshing(true);
      setError(null);
      const response = await fetch(`${API_URL}/api/flights`, { signal });
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }
      const data: Flight[] = await response.json();
      setFlights(data);
      setLastUpdated(new Date());
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        isAborted = true;
        return;
      }
      setError(err instanceof Error ? err.message : 'Unbekannter Fehler');
    } finally {
      if (!isAborted) {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    fetchFlights(controller.signal);
    const intervalId = setInterval(() => fetchFlights(controller.signal), 30_000);
    return () => { clearInterval(intervalId); controller.abort(); };
  }, []);

  // ── Handlers ───────────────────────────────────────────────────────────────
  const handleAddFlight = async (flight: Flight) => {
    try {
      const res = await fetch(`${API_URL}/api/flights`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(flight),
      });
      if (!res.ok) throw new Error('Fehler beim Hinzufügen des Flugs');
      await fetchFlights();
      setShowAddForm(false);
    } catch (err) {
      console.error('Fehler beim Hinzufügen:', err);
    }
  };

  /**
   * Updates a single flight's status immutably (lifted state).
   * Demonstrates the "lifting state up" pattern: FlightCard → FlightBoard → App.
   */
  const handleStatusChange = (id: number, newStatus: FlightStatus) => {
    setFlights((prev) =>
      prev.map((f) => (f.id === id ? { ...f, status: newStatus } : f)),
    );
    setSelectedFlight((prev) =>
      prev?.id === id ? { ...prev, status: newStatus } : prev,
    );
  };

  /** Confirms and removes a flight from state. */
  const handleDeleteFlight = (id: number) => {
    if (!window.confirm('Flug wirklich löschen?')) return;
    setFlights((prev) => prev.filter((f) => f.id !== id));
    setSelectedFlight((prev) => (prev?.id === id ? null : prev));
  };

  const handleReset = () => {
    setSearchQuery('');
    setTypeFilter('all');
    setStatusFilter('all');
  };

  // ── Derived data ────────────────────────────────────────────────────────────
  const query = searchQuery.toLowerCase();

  const filtered = sortByTime(
    flights.filter((f) => {
      const matchesSearch =
        !query ||
        f.flightNumber.toLowerCase().includes(query) ||
        f.airline.toLowerCase().includes(query) ||
        f.airport.toLowerCase().includes(query);
      const matchesType   = typeFilter === 'all' || f.type === typeFilter;
      const matchesStatus = statusFilter === 'all' || f.status === statusFilter;
      return matchesSearch && matchesType && matchesStatus;
    }),
  );

  const filteredDepartures = filtered.filter((f) => f.type === 'departure');
  const filteredArrivals   = filtered.filter((f) => f.type === 'arrival');
  const hasActiveFilters   = searchQuery !== '' || typeFilter !== 'all' || statusFilter !== 'all';
  const showDepartures     = typeFilter === 'all' || typeFilter === 'departure';
  const showArrivals       = typeFilter === 'all' || typeFilter === 'arrival';

  const totalFlights     = flights.length;
  const totalDepartures  = flights.filter((f) => f.type === 'departure').length;
  const totalArrivals    = flights.filter((f) => f.type === 'arrival').length;

  // ── Error state ─────────────────────────────────────────────────────────────
  if (error) {
    return (
      <div className="status-screen status-screen-error">
        <p className="error-title">Fehler: {error}</p>
        <p className="error-help">
          Ist das Backend gestartet?{' '}
          <code className="backend-command">
            deno task dev
          </code>{' '}
          im backend/-Ordner ausführen.
        </p>
        <button onClick={() => fetchFlights()} className="retry-btn">
          Neu laden
        </button>
      </div>
    );
  }

  // ── Normal render ───────────────────────────────────────────────────────────
  return (
    <div className="app-page">
      <AirportHeader
        airportName="Flughafen Wien-Schwechat"
        lastUpdated={lastUpdated}
        isRefreshing={isRefreshing}
      >
        <button
          className="refresh-btn"
          onClick={() => fetchFlights()}
          disabled={isRefreshing}
        >
          {isRefreshing ? 'Lädt...' : 'Aktualisieren'}
        </button>
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

      {/* Summary line */}
      <p className="summary-line">
        {totalFlights} Flüge gesamt &nbsp;|&nbsp; {totalDepartures} Abflüge &nbsp;|&nbsp; {totalArrivals} Ankünfte
      </p>

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

      {isLoading ? (
        <div className="board-loading board-loading--muted">
          <div className="status-icon">✈</div>
          <p>Flugdaten werden geladen...</p>
        </div>
      ) : (
        <>
          {showDepartures && (
            <FlightBoard
              flights={filteredDepartures}
              title="Abflüge"
              count={filteredDepartures.length}
              selectedFlightId={selectedFlight?.id}
              onFlightSelect={setSelectedFlight}
              onFlightDelete={handleDeleteFlight}
              onStatusChange={handleStatusChange}
            />
          )}
          {showArrivals && (
            <FlightBoard
              flights={filteredArrivals}
              title="Ankünfte"
              count={filteredArrivals.length}
              selectedFlightId={selectedFlight?.id}
              onFlightSelect={setSelectedFlight}
              onFlightDelete={handleDeleteFlight}
              onStatusChange={handleStatusChange}
            />
          )}
        </>
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
