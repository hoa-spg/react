import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Flight } from '@/types/flight';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/flights/${id}`);
  if (!res.ok) return { title: 'Flug nicht gefunden' };
  const flight: Flight = await res.json();
  return {
    title: `${flight.flightNumber} – FlugBoard 3.5`,
    description: `Details für Flug ${flight.flightNumber} nach ${flight.airport}`,
  };
}

export default async function FlightDetailPage({ params }: Props) {
  const { id } = await params;
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000';
  const res = await fetch(`${baseUrl}/api/flights/${id}`);
  if (!res.ok) notFound();
  const flight: Flight = await res.json();

  const statusLabels: Record<string, string> = {
    'on-time':   'Pünktlich',
    'delayed':   'Verspätet',
    'boarding':  'Boarding',
    'departed':  'Gestartet',
    'landed':    'Gelandet',
    'cancelled': 'Gestrichen',
  };

  const details: [string, string][] = [
    ['Richtung',      flight.type === 'departure' ? 'Abflug' : 'Ankunft'],
    ['Ziel/Herkunft', flight.airport],
    ['Geplante Zeit', flight.scheduledTime],
    ...(flight.expectedTime ? [['Erwartete Zeit', flight.expectedTime] as [string, string]] : []),
    ['Status',        statusLabels[flight.status]],
    ['Terminal',      flight.terminal],
    ...(flight.gate ? [['Gate', flight.gate] as [string, string]] : []),
  ];

  return (
    <main className="detail-wrap">
      <Link
        href={flight.type === 'departure' ? '/departures' : '/arrivals'}
        className="detail-back"
      >
        ← Zurück
      </Link>
      <div className="detail-card">
        <div className="detail-head">
          <div className="detail-number">{flight.flightNumber}</div>
          <div className="detail-airline">{flight.airline}</div>
        </div>
        <div className="detail-body">
          {details.map(([label, value]) => (
            <div key={label} className="detail-row">
              <span className="detail-label">{label}</span>
              <span className="detail-value">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
