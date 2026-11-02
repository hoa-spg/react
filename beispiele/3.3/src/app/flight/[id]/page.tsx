import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { listFlights } from '@/lib/flights-db';

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const flights = listFlights();
  const flight = flights.find(f => f.id === Number(id));
  if (!flight) return { title: 'Flug nicht gefunden' };
  return {
    title: `${flight.flightNumber} – FlugBoard 3.3`,
    description: `Details für Flug ${flight.flightNumber} nach ${flight.airport}`,
  };
}

export default async function FlightDetailPage({ params }: Props) {
  const { id } = await params;
  const flights = listFlights();
  const flight = flights.find(f => f.id === Number(id));
  if (!flight) notFound();

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
