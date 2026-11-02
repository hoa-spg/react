import Link from 'next/link';
import { listFlights } from '@/lib/flights-db';
import { Flight, FlightStatus } from '@/types/flight';

// Inline StatusBadge – wird in L13 in eine eigene Komponente ausgelagert
function StatusBadge({ status }: { status: FlightStatus }) {
  const config: Record<FlightStatus, { label: string; className: string }> = {
    'on-time': { label: 'Pünktlich', className: 'status-on-time' },
    'delayed': { label: 'Verspätet', className: 'status-delayed' },
    'boarding': { label: 'Boarding', className: 'status-boarding' },
    'departed': { label: 'Gestartet', className: 'status-departed' },
    'landed': { label: 'Gelandet', className: 'status-landed' },
    'cancelled': { label: 'Gestrichen', className: 'status-cancelled' },
  };
  const cfg = config[status];
  return <span className={`status-pill ${cfg.className}`}>{cfg.label}</span>;
}

export default function ArrivalPage() {
  const arrivals = [...listFlights()]
    .filter((f: Flight) => f.type === 'arrival')
    .sort((a, b) => a.scheduledTime.localeCompare(b.scheduledTime));

  return (
    <div>
      <h1 className="board-page-title">
        Ankünfte ({arrivals.length})
      </h1>
      <table className="table-base">
        <thead>
          <tr>
            {['Flug', 'Airline', 'Herkunft', 'Zeit', 'Status', 'Terminal'].map((h) => (
              <th key={h}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {arrivals.map((f) => (
            <tr key={f.id}>
              <td>
                <Link href={`/flight/${f.id}`} className="table-link">
                  {f.flightNumber}
                </Link>
              </td>
              <td className="text-muted">{f.airline}</td>
              <td className="text-main">{f.airport}</td>
              <td className="text-main">
                {f.scheduledTime}
                {f.expectedTime && (
                  <span className="time-delayed">→ {f.expectedTime}</span>
                )}
              </td>
              <td>
                <StatusBadge status={f.status} />
              </td>
              <td className="text-muted">{f.terminal}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
