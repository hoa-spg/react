'use server';

import { revalidatePath } from 'next/cache';
import { insertFlight } from '@/lib/flights-db';

export async function addFlight(formData: FormData) {
  // Formularfelder über ihr name-Attribut auslesen
  const flightNumber = String(formData.get('flightNumber')).trim().toUpperCase();
  const airline = String(formData.get('airline'));
  const airport = String(formData.get('airport'));
  const scheduledTime = String(formData.get('scheduledTime'));
  const gate = String(formData.get('gate'));

  // Die Prüfung im Browser lässt sich umgehen – deshalb am Server noch einmal prüfen
  if (!/^[A-Z]{2}\d{3,4}$/.test(flightNumber)) {
    throw new Error('Flugnummer: 2 Buchstaben und 3–4 Ziffern, z. B. OS123');
  }

  insertFlight({
    flightNumber,
    airline,
    type: 'departure',
    scheduledTime,
    airport,
    terminal: 'T1',
    gate: gate || undefined,
  });

  // Abflugseite beim nächsten Aufruf neu erzeugen – der neue Flug erscheint sofort
  revalidatePath('/departures');
}
