import { listFlights } from '@/lib/flights-db';
import SearchWrapper from '@/components/SearchWrapper';

// Simuliert serverseitigen Datenabruf (in L14 wird hier fetch() verwendet)
async function getArrivals() {
  // Kurze Verzögerung simuliert echten Datenabruf
  await new Promise((resolve) => setTimeout(resolve, 100));
  return [...listFlights()]
    .filter((f) => f.type === 'arrival')
    .sort((a, b) => a.scheduledTime.localeCompare(b.scheduledTime));
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
