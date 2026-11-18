import type { Metadata } from 'next';
import Link from 'next/link';
import './globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | FlugBoard',
    default: 'FlugBoard – Flughafen Wien',
  },
  description: 'Aktuelle Abflüge und Ankünfte – Flughafen Wien-Schwechat',
  keywords: ['Flug', 'Abflug', 'Ankunft', 'Wien', 'Airport'],
  icons: {
    icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ctext y='50' font-size='48'%3E%E2%9C%88%EF%B8%8F%3C/text%3E%3C/svg%3E",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <body>
        {/* Kopfzeile erscheint auf jeder Seite */}
        <header className="app-header">
          <Link href="/" className="app-brand">✈ FlugBoard 3.5</Link>
        </header>
        {children}
      </body>
    </html>
  );
}
