import { Flight } from '@/types/flight';
import SearchWrapper from '@/components/SearchWrapper';

async function getArrivals(): Promise<Flight[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/flights?type=arrival`, {
    next: { revalidate: 30 },
  });
  if (!res.ok) throw new Error('Fehler beim Laden der Ankünfte');
  return res.json();
}

export default async function ArrivalPage() {
  const arrivals = await getArrivals();
  return (
    <div>
      <h1 className="board-page-title">
        Ankünfte ({arrivals.length})
      </h1>
      <SearchWrapper flights={arrivals} />
    </div>
  );
}
