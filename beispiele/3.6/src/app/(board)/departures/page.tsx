import type { Metadata } from 'next';
import { listFlights } from '@/lib/flights-db';
import SearchWrapper from '@/components/SearchWrapper';
import AddFlightForm from '@/components/AddFlightForm';

export const metadata: Metadata = {
  title: 'Abflüge',
};

// Seite höchstens alle 30 Sekunden neu erzeugen (ISR).
// Ohne diese Zeile würde Next.js sie nur einmal beim Build rendern.
export const revalidate = 30;

export default function DeparturePage() {
  // Server Component: liest direkt aus der Datenbank – kein fetch, kein useEffect
  const departures = [...listFlights('departure')].sort((a, b) =>
    a.scheduledTime.localeCompare(b.scheduledTime),
  );

  return (
    <div>
      {/* Überschrift wird auf dem Server gerendert */}
      <h1 className="board-page-title">
        Abflüge ({departures.length})
      </h1>
      {/* Formular schickt die Daten an die Server Action addFlight */}
      <AddFlightForm />
      {/* Server Component übergibt serialisierbare Daten an die Client Component */}
      <SearchWrapper flights={departures} />
    </div>
  );
}
