import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Flight } from '../types/flight';
import FlightDetail from '../components/FlightDetail';

const API_URL = 'http://localhost:8000';

/**
 * Detail page for a single flight, loaded by ID from the URL parameter.
 * Uses useParams to get the flight ID and fetches from the backend.
 */
const FlightDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [flight, setFlight]     = useState<Flight | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError]       = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();

    const load = async () => {
      let isAborted = false;

      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch(`${API_URL}/api/flights/${id}`, {
          signal: controller.signal,
        });
        if (!res.ok) throw new Error(`Flug ${id} nicht gefunden`);
        const data: Flight = await res.json();
        setFlight(data);
      } catch (err) {
        if (err instanceof Error && err.name === 'AbortError') {
          isAborted = true;
        } else if (err instanceof Error) {
          setError(err.message);
        }
      } finally {
        if (!isAborted) {
          setIsLoading(false);
        }
      }
    };

    load();
    return () => controller.abort();
  }, [id]);

  if (isLoading) {
    return <p className="state-block state-block--muted">Laden...</p>;
  }

  if (error || !flight) {
    return (
      <div>
        <p className="error-text">{error ?? 'Flug nicht gefunden'}</p>
        <button
          onClick={() => navigate(-1)}
          className="action-btn action-btn--neutral action-btn--small"
        >
          ← Zurück
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="action-btn action-btn--neutral action-btn--small back-link"
      >
        ← Zurück
      </button>
      <FlightDetail flight={flight} onClose={() => navigate(-1)} />
    </div>
  );
};

export default FlightDetailPage;
