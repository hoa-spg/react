import { Flight } from '../types/flight';

export const sampleFlights: Flight[] = [
  { id: 1, flightNumber: 'OS123', airline: 'Austrian Airlines', type: 'departure', scheduledTime: '10:30', status: 'boarding',  airport: 'London Heathrow (LHR)', terminal: 'T3', gate: 'B12' },
  { id: 2, flightNumber: 'LH456', airline: 'Lufthansa',         type: 'departure', scheduledTime: '11:15', expectedTime: '11:45', status: 'delayed',  airport: 'Frankfurt (FRA)',  terminal: 'T2', gate: 'A07' },
  { id: 3, flightNumber: 'EK789', airline: 'Emirates',          type: 'arrival',   scheduledTime: '09:45', status: 'landed',   airport: 'Dubai (DXB)',            terminal: 'T1' },
  { id: 4, flightNumber: 'BA234', airline: 'British Airways',   type: 'departure', scheduledTime: '12:00', status: 'on-time',  airport: 'London Heathrow (LHR)', terminal: 'T3', gate: 'C22' },
  { id: 5, flightNumber: 'TK567', airline: 'Turkish Airlines',  type: 'arrival',   scheduledTime: '13:20', expectedTime: '14:05', status: 'delayed',  airport: 'Istanbul (IST)',  terminal: 'T2' },
  { id: 6, flightNumber: 'FR890', airline: 'Ryanair',           type: 'departure', scheduledTime: '14:50', status: 'on-time',  airport: 'Dublin (DUB)',           terminal: 'T1', gate: 'D05' },
  { id: 7, flightNumber: 'WZ112', airline: 'Wizz Air',          type: 'arrival',   scheduledTime: '15:30', status: 'on-time',  airport: 'Budapest (BUD)',         terminal: 'T2' },
  { id: 8, flightNumber: 'VY334', airline: 'Vueling',           type: 'departure', scheduledTime: '16:10', status: 'cancelled', airport: 'Barcelona (BCN)',       terminal: 'T1' },
];
