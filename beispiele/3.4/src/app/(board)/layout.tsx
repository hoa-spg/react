import Link from 'next/link';

export default function BoardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <nav className="board-nav">
        <Link href="/departures" className="board-nav-link">
          ✈ Abflüge
        </Link>
        <Link href="/arrivals" className="board-nav-link">
          🛬 Ankünfte
        </Link>
      </nav>
      <main className="page-wrap">
        {children}
      </main>
    </div>
  );
}
