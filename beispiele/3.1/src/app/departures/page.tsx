import type { Metadata } from 'next';
import Link from 'next/link';
import { listFlights } from '@/lib/flights-db';

export const metadata: Metadata = {
  title: 'Abflüge',
};

export default function DeparturePage() {
  const departures = listFlights('departure');

  return (
    <main className="page-wrap">
      <h1 className="board-page-title">Abflüge – {departures.length} Flüge</h1>
      <ul>
        {departures.map((flight) => (
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
