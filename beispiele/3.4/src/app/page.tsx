import Link from 'next/link';
import { listFlights } from '@/lib/flights-db';

export default function HomePage() {
  const departures = listFlights('departure').slice(0, 3);

  return (
    <main className="page-wrap">
      <h1 className="home-title">✈ FlugBoard 3.4</h1>
      <p className="home-subtitle">
        Flughafen Wien-Schwechat – aktuelle Abflüge und Ankünfte
      </p>

      <div className="home-links">
        <Link href="/departures" className="home-link home-link--primary">
          ✈ Abflüge anzeigen
        </Link>
        <Link href="/arrivals" className="home-link home-link--secondary">
          🛬 Ankünfte anzeigen
        </Link>
      </div>

      <h2 className="section-title">Nächste Abflüge</h2>
      <table className="table-base">
        <thead>
          <tr>
            <th>Flug</th>
            <th>Ziel</th>
            <th>Zeit</th>
          </tr>
        </thead>
        <tbody>
          {departures.map((f) => (
            <tr key={f.id}>
              <td>
                <span className="table-link">{f.flightNumber}</span>
              </td>
              <td className="text-main">{f.airport}</td>
              <td className="text-main">{f.scheduledTime}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
