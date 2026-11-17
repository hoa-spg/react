import { render, screen } from '@testing-library/react';

import FlightStatusBadge from './FlightStatusBadge';

test('zeigt das deutsche Label zum Status', () => {
  render(<FlightStatusBadge status="delayed" />);

  expect(screen.getByText('Verspätet')).toBeInTheDocument();
});
