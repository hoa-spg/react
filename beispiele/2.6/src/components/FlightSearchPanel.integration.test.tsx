import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import FlightSearchPanel from './FlightSearchPanel';

test('filtert die angezeigten Fluege nach Suchbegriff', async () => {
  const user = userEvent.setup();

  render(
    <FlightSearchPanel
      flights={['LH123', 'OS404', 'LH999']}
    />
  );

  await user.type(screen.getByRole('searchbox', { name: /suche/i }), 'LH');

  expect(screen.getByText('LH123')).toBeInTheDocument();
  expect(screen.getByText('LH999')).toBeInTheDocument();
  expect(screen.queryByText('OS404')).not.toBeInTheDocument();
});
