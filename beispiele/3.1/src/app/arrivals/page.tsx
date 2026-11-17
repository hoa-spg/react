import type { Metadata } from 'next';
import Link from 'next/link';
import { listFlights } from '@/lib/flights-db';

export const metadata: Metadata = {
  title: 'Ankünfte',
};

export default function ArrivalPage() {
  const arrivals = listFlights('arrival');

  return (
    <main className="page-wrap">
      <h1 className="board-page-title">Ankünfte – {arrivals.length} Flüge</h1>
      <ul>
        {arrivals.map((flight) => (
          <li key={flight.id} className="text-main">
            {flight.flightNumber} – {flight.airport} – {flight.status}
          </li>
        ))}
      </ul>
      <Link href="/" className="detail-back">
        ← Startseite
      </Link>
    </main>
  );
}
