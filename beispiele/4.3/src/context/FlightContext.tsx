import {
  createContext,
  useContext,
  useState,
  useMemo,
  useEffect,
  useRef,
  ReactNode,
} from 'react';
import { Flight, FlightStatus } from '../types/flight';
import { sampleFlights } from '../data/flights';

interface FlightContextType {
  flights: Flight[];
  isLoading: boolean;
  isRefreshing: boolean;
  refetch: () => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  updateStatus: (id: number, status: FlightStatus) => void;
  departures: Flight[];
  arrivals: Flight[];
}

const FlightContext = createContext<FlightContextType | null>(null);

export const FlightProvider = ({ children }: { children: ReactNode }) => {
  const [flights, setFlights]             = useState<Flight[]>([]);
  const [isLoading, setIsLoading]         = useState(true);
  const [isRefreshing, setIsRefreshing]   = useState(false);
  const [searchQuery, setSearchQuery]     = useState('');
  const refreshTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setFlights(sampleFlights);
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  const refetch = () => {
    setIsRefreshing(true);
    if (refreshTimerRef.current) {
      clearTimeout(refreshTimerRef.current);
    }
    refreshTimerRef.current = setTimeout(() => {
      setFlights(sampleFlights);
      setIsRefreshing(false);
      refreshTimerRef.current = null;
    }, 1000);
  };

  useEffect(
    () => () => {
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current);
      }
    },
    [],
  );

  const updateStatus = (id: number, status: FlightStatus) => {
    setFlights(prev => prev.map(f => f.id === id ? { ...f, status } : f));
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
    <FlightContext.Provider
      value={{
        flights,
        isLoading,
        isRefreshing,
        refetch,
        searchQuery,
        setSearchQuery,
        updateStatus,
        departures,
        arrivals,
      }}
    >
      {children}
    </FlightContext.Provider>
  );
};

export const useFlightContext = () => {
  const ctx = useContext(FlightContext);
  if (!ctx) throw new Error('useFlightContext außerhalb von FlightProvider verwendet');
  return ctx;
};
