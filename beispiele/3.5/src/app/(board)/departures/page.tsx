import { Flight } from '@/types/flight';
import SearchWrapper from '@/components/SearchWrapper';

async function getDepartures(): Promise<Flight[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/flights?type=departure`, {
    next: { revalidate: 30 },
  });
  if (!res.ok) throw new Error('Fehler beim Laden der Abflüge');
  return res.json();
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
