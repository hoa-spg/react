import { createContext, useContext, useState, useMemo, useEffect, ReactNode } from 'react';
import { Flight } from '../types/flight';
import { sampleFlights } from '../data/flights';

interface FlightContextType {
  isLoading: boolean;
  isRefreshing: boolean;
  refetch: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  departures: Flight[];
  arrivals: Flight[];
}

const FlightContext = createContext<FlightContextType | null>(null);

export const FlightProvider = ({ children }: { children: ReactNode }) => {
  const [flights, setFlights]             = useState<Flight[]>([]);
  const [isLoading, setIsLoading]         = useState(true);
  const [isRefreshing, setIsRefreshing]   = useState(false);
  const [searchQuery, setSearchQuery]     = useState('');

  // Ladezeit simulieren wie in Lektion 4.2
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFlights(sampleFlights);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  // Pull-to-Refresh: Spinner für 1 Sekunde anzeigen
  const refetch = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    if (!q) return flights;
    return flights.filter(f =>
      f.flightNumber.toLowerCase().includes(q) ||
      f.airline.toLowerCase().includes(q) ||
      f.airport.toLowerCase().includes(q)
    );
  }, [flights, searchQuery]);

  const departures = useMemo(() =>
    [...filtered]
      .filter(f => f.type === 'departure')
      .sort((a, b) => a.scheduledTime.localeCompare(b.scheduledTime)),
    [filtered]
  );

  const arrivals = useMemo(() =>
    [...filtered]
      .filter(f => f.type === 'arrival')
      .sort((a, b) => a.scheduledTime.localeCompare(b.scheduledTime)),
    [filtered]
  );

  return (
    <FlightContext
      value={{
        isLoading,
        isRefreshing,
        refetch,
        searchQuery,
        setSearchQuery,
        departures,
        arrivals,
      }}
    >
      {children}
    </FlightContext>
  );
};

export const useFlightContext = () => {
  const ctx = useContext(FlightContext);
  if (!ctx) throw new Error('useFlightContext außerhalb von FlightProvider verwendet');
  return ctx;
};
