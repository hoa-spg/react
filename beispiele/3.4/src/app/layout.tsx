import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '✈ FlugBoard 3.4 – Flughafen Wien',
  description: 'Aktuelle Abflüge und Ankünfte – Flughafen Wien-Schwechat',
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ctext y='50' font-size='48'%3E%E2%9C%88%EF%B8%8F%3C/text%3E%3C/svg%3E",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de">
      <body>
        <header className="app-header">
          <a href="/" className="app-brand">
            ✈ FlugBoard 3.4
          </a>
          <nav className="app-nav">
            <a href="/departures" className="app-nav-link">
              ✈ Abflüge
            </a>
            <a href="/arrivals" className="app-nav-link">
              🛬 Ankünfte
            </a>
          </nav>
        </header>
        {children}
      </body>
    </html>
  );
}
