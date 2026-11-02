import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FlightSearchPanel from './FlightSearchPanel';

test('ruft den Callback mit Eingabe und Trefferzahl auf', async () => {
  const user = userEvent.setup();
  const onFilterChange = vi.fn();

  render(
    <FlightSearchPanel
      flights={['LH123', 'OS404', 'AF900']}
      onFilterChange={onFilterChange}
    />
  );

  await user.type(screen.getByRole('searchbox', { name: /suche/i }), 'LH');

  expect(onFilterChange).toHaveBeenLastCalledWith('LH', 1);
  expect(screen.getByText('Treffer: 1')).toBeInTheDocument();
});
