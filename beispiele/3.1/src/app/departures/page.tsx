import Link from 'next/link';

export default function DeparturePage() {
  return (
    <main className="page-wrap">
      <h1 className="board-page-title">Abflüge</h1>
      <p className="text-muted">Kommt in Lektion 3.2.</p>
      <Link href="/" className="detail-back">
        ← Startseite
      </Link>
    </main>
  );
}
