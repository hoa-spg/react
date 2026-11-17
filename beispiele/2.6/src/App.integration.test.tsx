import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import App from './App';
import { ThemeProvider } from './context/ThemeContext';
import { Flight } from './types/flight';

const testFlights: Flight[] = [
  {
    id: 1, flightNumber: 'OS123', airline: 'Austrian Airlines', type: 'departure',
    scheduledTime: '10:30', status: 'boarding', airport: 'London Heathrow (LHR)', terminal: 'T3',
  },
  {
    id: 2, flightNumber: 'LH456', airline: 'Lufthansa', type: 'departure',
    scheduledTime: '11:15', status: 'on-time', airport: 'Frankfurt (FRA)', terminal: 'T2',
  },
  {
    id: 3, flightNumber: 'EK789', airline: 'Emirates', type: 'arrival',
    scheduledTime: '09:45', status: 'landed', airport: 'Dubai (DXB)', terminal: 'T1',
  },
];

beforeEach(() => {
  localStorage.clear(); // gespeicherte Filter aus useLocalStorage entfernen
  // fetch durch eine Attrappe ersetzen: Statt des Backends kommen immer die Testflüge
  vi.stubGlobal('fetch', vi.fn(async () => new Response(JSON.stringify(testFlights))));
});

afterEach(() => {
  vi.unstubAllGlobals();
});

// App braucht den ThemeProvider – wie in main.tsx
const renderApp = () =>
  render(
    <ThemeProvider>
      <App />
    </ThemeProvider>,
  );

test('zeigt die Flüge aus dem Backend an', async () => {
  renderApp();

  // findBy… wartet, bis die Daten geladen sind
  expect(await screen.findByText('OS123')).toBeInTheDocument();
  expect(screen.getByText('EK789')).toBeInTheDocument();
});

test('Suche filtert die Tabelle, ohne Treffer erscheint der Empty State', async () => {
  const user = userEvent.setup();
  renderApp();
  await screen.findByText('OS123');

  const search = screen.getByRole('searchbox', { name: 'Flüge suchen' });
  await user.type(search, 'Frankfurt');

  expect(screen.getByText('LH456')).toBeInTheDocument();
  expect(screen.queryByText('OS123')).not.toBeInTheDocument();

  await user.clear(search);
  await user.type(search, 'xyz');

  // Abflüge und Ankünfte sind leer → zwei Empty States mit Reset-Button
  expect(screen.getAllByText('Keine Flüge gefunden')).toHaveLength(2);

  await user.click(screen.getAllByRole('button', { name: 'Filter zurücksetzen' })[0]);

  expect(screen.getByText('OS123')).toBeInTheDocument();
});
