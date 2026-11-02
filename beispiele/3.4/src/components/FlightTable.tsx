import Link from 'next/link';
import { Flight } from '@/types/flight';
import FlightStatusBadge from './FlightStatusBadge';

export default function FlightTable({ flights }: { flights: Flight[] }) {
  if (flights.length === 0) {
    return <p className="empty-table">Keine Flüge gefunden.</p>;
  }

  return (
    <table className="table-base">
      <thead>
        <tr>
          {['Flug', 'Airline', 'Ziel', 'Zeit', 'Status', 'Gate'].map((h) => (
            <th key={h}>
              {h}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {flights.map((f) => (
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
              <FlightStatusBadge status={f.status} />
            </td>
            <td className="text-muted">{f.gate ?? '—'}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
