import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="state-screen state-screen--muted">
      <div className="not-found-code">404</div>
      <h1 className="not-found-title">Seite nicht gefunden</h1>
      <p className="not-found-text">Diese Seite existiert nicht.</p>
      <Link href="/" className="ghost-btn">
        ← Startseite
      </Link>
    </main>
  );
}
