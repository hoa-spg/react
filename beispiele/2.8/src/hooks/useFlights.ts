import { useState, useEffect, useCallback } from 'react';
import { Flight } from '../types/flight';

const API_URL = 'http://localhost:8000';

interface UseFlightsReturn {
  flights: Flight[];
  isLoading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  isRefreshing: boolean;
  refetch: () => void;
  addFlight: (flight: Omit<Flight, 'id'>) => Promise<void>;
  deleteFlight: (id: number) => Promise<void>;
  updateStatus: (id: number, status: Flight['status']) => void;
}

/**
 * Custom hook that encapsulates all flight data fetching logic.
 * Provides CRUD operations and polling every 30 seconds.
 */
const useFlights = (): UseFlightsReturn => {
  const [flights, setFlights]           = useState<Flight[]>([]);
  const [isLoading, setIsLoading]       = useState(true);
  const [error, setError]               = useState<string | null>(null);
  const [lastUpdated, setLastUpdated]   = useState<Date | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [refreshKey, setRefreshKey]     = useState(0);

  const fetchData = useCallback(async (signal?: AbortSignal) => {
    let isAborted = false;

    try {
      setIsRefreshing(true);
      setError(null);
      const res = await fetch(`${API_URL}/api/flights`, { signal });
      if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      const data: Flight[] = await res.json();
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
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchData(controller.signal);
    const id = setInterval(() => fetchData(controller.signal), 30_000);
    return () => { clearInterval(id); controller.abort(); };
  }, [fetchData, refreshKey]);

  const refetch = () => setRefreshKey((k) => k + 1);

  const addFlight = async (flightData: Omit<Flight, 'id'>) => {
    const res = await fetch(`${API_URL}/api/flights`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(flightData),
    });
    if (!res.ok) throw new Error('Fehler beim Hinzufügen');
    refetch();
  };

  const deleteFlight = async (id: number) => {
    if (!window.confirm('Flug wirklich löschen?')) return;
    await fetch(`${API_URL}/api/flights/${id}`, { method: 'DELETE' });
    refetch();
  };

  const updateStatus = (id: number, status: Flight['status']) => {
    setFlights((prev) => prev.map((f) => (f.id === id ? { ...f, status } : f)));
  };

  return {
    flights,
    isLoading,
    error,
    lastUpdated,
    isRefreshing,
    refetch,
    addFlight,
    deleteFlight,
    updateStatus,
  };
};

export default useFlights;
