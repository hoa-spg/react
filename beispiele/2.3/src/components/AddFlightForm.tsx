import React, { useState } from 'react';
import { Flight, FlightType } from '../types/flight';
import './AddFlightForm.css';

interface AddFlightFormProps {
  onAdd: (flight: Flight) => void;
  onCancel: () => void;
}

type FormErrors = Record<string, string>;

const FLIGHT_NUMBER_PATTERN = /^[A-Z]{2}\d{3,4}$/;

/**
 * Controlled form for adding a new flight entry.
 * @param onAdd    - Called with the completed Flight object on successful submit.
 * @param onCancel - Called when the user dismisses the form without submitting.
 */
const AddFlightForm = ({ onAdd, onCancel }: AddFlightFormProps) => {
  const [flightNumber, setFlightNumber] = useState('');
  const [airline, setAirline] = useState('');
  const [type, setType] = useState<FlightType>('departure');
  const [scheduledTime, setScheduledTime] = useState('');
  const [airport, setAirport] = useState('');
  const [terminal, setTerminal] = useState('T1');
  const [gate, setGate] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    const normalizedFlightNumber = flightNumber.trim().toUpperCase();

    if (!normalizedFlightNumber) {
      errs.flightNumber = 'Flugnummer ist erforderlich.';
    } else if (!FLIGHT_NUMBER_PATTERN.test(normalizedFlightNumber)) {
      errs.flightNumber =
        'Flugnummer muss genau 2 Buchstaben und 3 oder 4 Ziffern enthalten (z.B. OS123).';
    }

    if (!airline.trim()) errs.airline = 'Airline ist erforderlich.';
    if (!scheduledTime) errs.scheduledTime = 'Zeit ist erforderlich.';
    if (!airport.trim()) errs.airport = 'Ziel/Herkunft ist erforderlich.';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    const newFlight: Flight = {
      id: Date.now(),
      flightNumber: flightNumber.trim().toUpperCase(),
      airline: airline.trim(),
      type,
      scheduledTime,
      airport: airport.trim(),
      terminal,
      gate: gate.trim() || undefined,
      status: 'on-time',
    };
    onAdd(newFlight);
  };

  const inputClass = (field: string) => {
    return `form-input${errors[field] ? ' form-input--error' : ''}`;
  };

  return (
    <form className="add-form" onSubmit={handleSubmit} noValidate>
      <h3 className="add-form-title">Flug hinzufügen</h3>

      <div className="add-form-grid">
        <div className="form-field">
          <label className="form-label">Flugnummer *</label>
          <input
            className={inputClass('flightNumber')}
            value={flightNumber}
            onChange={(e) => setFlightNumber(e.target.value)}
            placeholder="z.B. OS123"
          />
          {errors.flightNumber && (
            <span className="form-error">{errors.flightNumber}</span>
          )}
        </div>

        <div className="form-field">
          <label className="form-label">Airline *</label>
          <input
            className={inputClass('airline')}
            value={airline}
            onChange={(e) => setAirline(e.target.value)}
            placeholder="z.B. Austrian Airlines"
          />
          {errors.airline && (
            <span className="form-error">{errors.airline}</span>
          )}
        </div>

        <div className="form-field">
          <label className="form-label">Typ</label>
          <select
            className="form-select"
            value={type}
            onChange={(e) => setType(e.target.value as FlightType)}
          >
            <option value="departure">Abflug</option>
            <option value="arrival">Ankunft</option>
          </select>
        </div>

        <div className="form-field">
          <label className="form-label">Abflugzeit *</label>
          <input
            type="time"
            className={inputClass('scheduledTime')}
            value={scheduledTime}
            onChange={(e) => setScheduledTime(e.target.value)}
          />
          {errors.scheduledTime && (
            <span className="form-error">{errors.scheduledTime}</span>
          )}
        </div>

        <div className="form-field">
          <label className="form-label">Ziel / Herkunft *</label>
          <input
            className={inputClass('airport')}
            value={airport}
            onChange={(e) => setAirport(e.target.value)}
            placeholder="z.B. London Heathrow (LHR)"
          />
          {errors.airport && (
            <span className="form-error">{errors.airport}</span>
          )}
        </div>

        <div className="form-field">
          <label className="form-label">Terminal</label>
          <select
            className="form-select"
            value={terminal}
            onChange={(e) => setTerminal(e.target.value)}
          >
            <option value="T1">T1</option>
            <option value="T2">T2</option>
            <option value="T3">T3</option>
          </select>
        </div>

        <div className="form-field">
          <label className="form-label">Gate (optional)</label>
          <input
            className="form-input"
            value={gate}
            onChange={(e) => setGate(e.target.value)}
            placeholder="z.B. B12"
          />
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="btn-submit">
          Hinzufügen
        </button>
        <button type="button" className="btn-cancel" onClick={onCancel}>
          Abbrechen
        </button>
      </div>
    </form>
  );
};

export default AddFlightForm;
