import { useState, type CSSProperties } from 'react';
import { Flight } from './types/flight';
import { useTheme } from './context/ThemeContext';
import useFlights from './hooks/useFlights';
import useFlightFilters from './hooks/useFlightFilters';
import AirportHeader from './components/AirportHeader';
import FlightBoard from './components/FlightBoard';
import FlightDetail from './components/FlightDetail';
import SearchBar from './components/SearchBar';
import FilterBar from './components/FilterBar';
import AddFlightForm from './components/AddFlightForm';
import './App.css';

interface ErrorScreenProps { error: string; onRetry: () => void; }
const ErrorScreen = ({ error, onRetry }: ErrorScreenProps) => {
  const { colors } = useTheme();
  const themeVars: CSSProperties = {
    '--app-bg': colors.bg,
    '--app-text': colors.text,
    '--app-muted': colors.textMuted,
    '--app-card-bg': colors.bgCard,
    '--app-sidebar-bg': colors.bgSidebar,
    '--app-border': colors.border,
    '--app-accent': colors.accent,
  } as CSSProperties;

  return (
    // Inline style is required to inject live theme variables from context.
    <div className="status-screen status-screen-error" style={themeVars}>
      <p className="error-title">Fehler: {error}</p>
      <p className="error-help">
        Ist das Backend gestartet?{' '}
        <code className="backend-command">
          deno task dev
        </code>{' '}
        im backend/-Ordner ausführen.
      </p>
      <button onClick={onRetry} className="retry-btn">
        Neu laden
      </button>
    </div>
  );
};

// ── Main App ──────────────────────────────────────────────────────────────────

/**
 * Root component for lesson 2.6 — very slim thanks to custom hooks.
 * All fetch logic lives in useFlights; all filter logic in useFlightFilters.
 */
const App = () => {
  const { colors } = useTheme();
  const themeVars: CSSProperties = {
    '--app-bg': colors.bg,
    '--app-text': colors.text,
    '--app-muted': colors.textMuted,
    '--app-card-bg': colors.bgCard,
    '--app-sidebar-bg': colors.bgSidebar,
    '--app-border': colors.border,
    '--app-accent': colors.accent,
  } as CSSProperties;

  const {
    flights,
    isLoading,
    error,
    lastUpdated,
    isRefreshing,
    refetch,
    addFlight,
    deleteFlight,
    updateStatus,
  } = useFlights();

  const {
    searchQuery,
    setSearchQuery,
    typeFilter,
    setTypeFilter,
    statusFilter,
    setStatusFilter,
    resetFilters,
    hasActiveFilters,
    filteredDepartures,
    filteredArrivals,
  } = useFlightFilters(flights);

  // Nur die ID merken und den Flug aus der aktuellen Liste ableiten:
  // So zeigt das Detail-Panel immer den aktuellen Status und schließt sich,
  // sobald der Flug gelöscht wurde.
  const [selectedFlightId, setSelectedFlightId] = useState<number | null>(null);
  const selectedFlight = flights.find((f) => f.id === selectedFlightId) ?? null;
  const [showAddForm, setShowAddForm]       = useState(false);

  const handleAddFlight = async (flight: Flight) => {
    try {
      await addFlight(flight);
      setShowAddForm(false);
    } catch (err) {
      console.error('Fehler beim Hinzufügen:', err);
    }
  };

  const showDepartures = typeFilter === 'all' || typeFilter === 'departure';
  const showArrivals   = typeFilter === 'all' || typeFilter === 'arrival';

  if (error)     return <ErrorScreen error={error} onRetry={refetch} />;

  return (
    // Inline style is required to inject live theme variables from context.
    <div className="app-page" style={themeVars}>
      <AirportHeader
        airportName="Flughafen Wien-Schwechat"
        lastUpdated={lastUpdated}
        isRefreshing={isRefreshing}
        onRefresh={refetch}
      >
        <button
          className="add-btn"
          onClick={() => setShowAddForm((v) => !v)}
        >
          {showAddForm ? 'Abbrechen' : '+ Flug hinzufügen'}
        </button>
      </AirportHeader>

      {showAddForm && (
        <AddFlightForm
          onAdd={handleAddFlight}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      <p className="summary-line">
        {flights.length} Flüge gesamt &nbsp;|&nbsp;
        {flights.filter((f) => f.type === 'departure').length} Abflüge &nbsp;|&nbsp;
        {flights.filter((f) => f.type === 'arrival').length} Ankünfte
      </p>

      <div className="toolbar">
        <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Suche nach Flug, Airline, Ziel…" />
        <FilterBar
          typeFilter={typeFilter}
          statusFilter={statusFilter}
          onTypeChange={setTypeFilter}
          onStatusChange={setStatusFilter}
          onReset={resetFilters}
          hasActiveFilters={hasActiveFilters}
        />
      </div>

      {isLoading ? (
        <div className="board-loading board-loading--muted">
          <div className="loading-spinner" aria-hidden="true"></div>
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
              onFlightSelect={(flight) => setSelectedFlightId(flight.id)}
              onFlightDelete={deleteFlight}
              onStatusChange={updateStatus}
              onResetFilters={hasActiveFilters ? resetFilters : undefined}
            />
          )}
          {showArrivals && (
            <FlightBoard
              flights={filteredArrivals}
              title="Ankünfte"
              count={filteredArrivals.length}
              selectedFlightId={selectedFlight?.id}
              onFlightSelect={(flight) => setSelectedFlightId(flight.id)}
              onFlightDelete={deleteFlight}
              onStatusChange={updateStatus}
              onResetFilters={hasActiveFilters ? resetFilters : undefined}
            />
          )}
        </>
      )}

      {selectedFlight && (
        <FlightDetail flight={selectedFlight} onClose={() => setSelectedFlightId(null)} />
      )}
    </div>
  );
};

export default App;
