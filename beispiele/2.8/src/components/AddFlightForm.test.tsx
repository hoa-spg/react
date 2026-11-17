import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import AddFlightForm from './AddFlightForm';

test('zeigt Fehler und ruft onAdd nicht auf, wenn Pflichtfelder fehlen', async () => {
  const user = userEvent.setup();
  const onAdd = vi.fn();

  render(<AddFlightForm onAdd={onAdd} onCancel={vi.fn()} />);

  await user.click(screen.getByRole('button', { name: 'Hinzufügen' }));

  expect(screen.getByText('Flugnummer ist erforderlich.')).toBeInTheDocument();
  expect(onAdd).not.toHaveBeenCalled();
});

test('ruft onAdd mit den eingegebenen Daten auf', async () => {
  const user = userEvent.setup();
  const onAdd = vi.fn();

  render(<AddFlightForm onAdd={onAdd} onCancel={vi.fn()} />);

  await user.type(screen.getByLabelText(/flugnummer/i), 'os123');
  await user.type(screen.getByLabelText(/airline/i), 'Austrian Airlines');
  await user.type(screen.getByLabelText(/abflugzeit/i), '10:30');
  await user.type(screen.getByLabelText(/ziel/i), 'London Heathrow (LHR)');
  await user.click(screen.getByRole('button', { name: 'Hinzufügen' }));

  expect(onAdd).toHaveBeenCalledWith(
    expect.objectContaining({
      flightNumber: 'OS123', // wird in Großbuchstaben umgewandelt
      airline: 'Austrian Airlines',
      type: 'departure',
      scheduledTime: '10:30',
      airport: 'London Heathrow (LHR)',
    }),
  );
});
