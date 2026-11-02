import { listFlights } from '@/lib/flights-db';
import SearchWrapper from '@/components/SearchWrapper';

// Simuliert serverseitigen Datenabruf (in L14 wird hier fetch() verwendet)
async function getDepartures() {
  // Kurze Verzögerung simuliert echten Datenabruf
  await new Promise((resolve) => setTimeout(resolve, 100));
  return [...listFlights()]
    .filter((f) => f.type === 'departure')
    .sort((a, b) => a.scheduledTime.localeCompare(b.scheduledTime));
}

export default async function DeparturePage() {
  const departures = await getDepartures();
  return (
    <div>
      <h1 className="board-page-title">
        Abflüge ({departures.length})
      </h1>
      <SearchWrapper flights={departures} />
    </div>
  );
}
