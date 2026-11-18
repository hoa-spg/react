import { addFlight } from '@/actions/flight-actions';

// Kein 'use client' nötig: Das Formular ist eine Server Component
export default function AddFlightForm() {
  return (
    <form action={addFlight} className="add-flight-form">
      <div className="form-group">
        <label htmlFor="flightNumber">Flugnummer *</label>
        <input
          id="flightNumber"
          name="flightNumber"
          placeholder="z.B. OS123"
          pattern="[A-Za-z]{2}\d{3,4}"
          title="2 Buchstaben und 3 oder 4 Ziffern, z.B. OS123"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="airline">Airline *</label>
        <input id="airline" name="airline" placeholder="z.B. Lufthansa" required />
      </div>
      <div className="form-group">
        <label htmlFor="airport">Ziel *</label>
        <input id="airport" name="airport" placeholder="z.B. Paris (CDG)" required />
      </div>
      <div className="form-group">
        <label htmlFor="scheduledTime">Abflugzeit *</label>
        <input id="scheduledTime" name="scheduledTime" type="time" required />
      </div>
      <div className="form-group">
        <label htmlFor="gate">Gate</label>
        <input id="gate" name="gate" placeholder="z.B. B12" />
      </div>
      <button type="submit" className="btn-primary">
        Flug hinzufügen
      </button>
    </form>
  );
}
