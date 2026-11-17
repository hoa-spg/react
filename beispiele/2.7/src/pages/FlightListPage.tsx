import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flight, FlightType } from '../types/flight';
import useFlightData from '../hooks/useFlightData';
import useFlightFilters from '../hooks/useFlightFilters';
import FlightBoard from '../components/FlightBoard';
import SearchBar from '../components/SearchBar';
import FilterBar from '../components/FilterBar';
import AddFlightForm from '../components/AddFlightForm';

interface FlightListPageProps {
  type: FlightType;
}

/**
 * Page showing either departures or arrivals – one component for both routes.
 * The data comes from Layout (useFlightData); clicking a row opens the detail page.
 */
const FlightListPage = ({ type }: FlightListPageProps) => {
  const navigate = useNavigate();
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
  } = useFlightData();

  const {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    resetFilters,
    hasActiveFilters,
    filteredDepartures,
    filteredArrivals,
  } = useFlightFilters(flights);

  const visibleFlights = type === 'departure' ? filteredDepartures : filteredArrivals;
  const title = type === 'departure' ? 'Abflüge' : 'Ankünfte';

  const [showAddForm, setShowAddForm] = useState(false);

  const formatTime = (d: Date) =>
    d.toLocaleTimeString('de-AT', { hour: '2-digit', minute: '2-digit', second: '2-digit' });

  if (error) {
    return (
      <div className="state-block state-block--error">
        <p className="error-title">Fehler: {error}</p>
        <p className="error-hint">
          Ist das Backend gestartet?{' '}
          <code className="inline-code">
            deno task dev
          </code>{' '}
          im backend/-Ordner ausführen.
        </p>
        <button onClick={refetch} className="action-btn action-btn--neutral">
          Neu laden
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="page-head">
        <div>
          <h2 className="page-title">{title}</h2>
          {lastUpdated && (
            <span className="page-meta">
              Aktualisiert: {formatTime(lastUpdated)}
              {isRefreshing && ' (wird aktualisiert...)'}
            </span>
          )}
        </div>
        <div className="head-actions">
          <button
            onClick={refetch}
            disabled={isRefreshing}
            className="action-btn action-btn--neutral"
          >
            {isRefreshing ? 'Lädt...' : 'Aktualisieren'}
          </button>
          <button
            className="action-btn action-btn--primary"
            onClick={() => setShowAddForm((v) => !v)}
          >
            {showAddForm ? 'Abbrechen' : '+ Flug hinzufügen'}
          </button>
        </div>
      </div>

      {showAddForm && (
        <AddFlightForm
          onAdd={async (f) => {
            try {
              await addFlight(f);
              setShowAddForm(false);
            } catch (err) {
              console.error('Fehler beim Hinzufügen:', err);
            }
          }}
          onCancel={() => setShowAddForm(false)}
        />
      )}

      <div className="toolbar">
        <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Suche nach Flug, Airline, Ziel…" />
        <FilterBar
          statusFilter={statusFilter}
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
        <FlightBoard
          flights={visibleFlights}
          title=""
          count={visibleFlights.length}
          onFlightSelect={(flight: Flight) => navigate(`/flight/${flight.id}`)}
          onFlightDelete={deleteFlight}
          onStatusChange={updateStatus}
          onResetFilters={hasActiveFilters ? resetFilters : undefined}
        />
      )}
    </div>
  );
};

export default FlightListPage;
