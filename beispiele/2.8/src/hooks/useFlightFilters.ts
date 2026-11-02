import { useMemo } from 'react';
import { Flight, FlightStatus } from '../types/flight';
import useLocalStorage from './useLocalStorage';

interface FlightFilters {
  searchQuery: string;
  statusFilter: 'all' | FlightStatus;
}

interface UseFlightFiltersReturn extends FlightFilters {
  setSearchQuery: (q: string) => void;
  setStatusFilter: (s: FlightFilters['statusFilter']) => void;
  resetFilters: () => void;
  hasActiveFilters: boolean;
  filteredDepartures: Flight[];
  filteredArrivals: Flight[];
}

/**
 * Custom hook that manages flight filtering state via localStorage.
 * Returns filtered and sorted departure/arrival lists.
 */
const useFlightFilters = (flights: Flight[]): UseFlightFiltersReturn => {
  const [searchQuery, setSearchQuery]   = useLocalStorage('fb-search', '');
  const [statusFilter, setStatusFilter] = useLocalStorage<FlightFilters['statusFilter']>('fb-status', 'all');

  const hasActiveFilters =
    searchQuery !== '' || statusFilter !== 'all';

  const resetFilters = () => {
    setSearchQuery('');
    setStatusFilter('all');
  };

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return [...flights]
      .filter((f) => {
        if (statusFilter !== 'all' && f.status !== statusFilter) return false;
        if (
          q &&
          !f.flightNumber.toLowerCase().includes(q) &&
          !f.airline.toLowerCase().includes(q) &&
          !f.airport.toLowerCase().includes(q)
        )
          return false;
        return true;
      })
      .sort((a, b) => a.scheduledTime.localeCompare(b.scheduledTime));
  }, [flights, searchQuery, statusFilter]);

  const filteredDepartures = useMemo(
    () => filtered.filter((f) => f.type === 'departure'),
    [filtered],
  );

  const filteredArrivals = useMemo(
    () => filtered.filter((f) => f.type === 'arrival'),
    [filtered],
  );

  return {
    searchQuery,
    setSearchQuery,
    statusFilter,
    setStatusFilter,
    resetFilters,
    hasActiveFilters,
    filteredDepartures,
    filteredArrivals,
  };
};

export default useFlightFilters;
