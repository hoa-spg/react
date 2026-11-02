import Database from 'better-sqlite3';
import { and, eq } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/better-sqlite3';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

import type { Flight } from '@/types/flight';

const flightsTable = sqliteTable('flights', {
  id: integer('id').primaryKey(),
  flightNumber: text('flight_number').notNull(),
  airline: text('airline').notNull(),
  type: text('type').notNull(),
  scheduledTime: text('scheduled_time').notNull(),
  expectedTime: text('expected_time'),
  status: text('status').notNull(),
  airport: text('airport').notNull(),
  terminal: text('terminal').notNull(),
  gate: text('gate'),
});

const seedFlights: Flight[] = [
  { id: 1, flightNumber: 'OS123', airline: 'Austrian Airlines', type: 'departure', scheduledTime: '10:30', status: 'boarding', airport: 'London Heathrow (LHR)', terminal: 'T3', gate: 'B12' },
  { id: 2, flightNumber: 'LH456', airline: 'Lufthansa', type: 'departure', scheduledTime: '11:15', expectedTime: '11:45', status: 'delayed', airport: 'Frankfurt (FRA)', terminal: 'T2', gate: 'A07' },
  { id: 3, flightNumber: 'EK789', airline: 'Emirates', type: 'arrival', scheduledTime: '09:45', status: 'landed', airport: 'Dubai (DXB)', terminal: 'T1' },
  { id: 4, flightNumber: 'BA234', airline: 'British Airways', type: 'departure', scheduledTime: '12:00', status: 'on-time', airport: 'London Heathrow (LHR)', terminal: 'T3', gate: 'C22' },
  { id: 5, flightNumber: 'TK567', airline: 'Turkish Airlines', type: 'arrival', scheduledTime: '13:20', expectedTime: '14:05', status: 'delayed', airport: 'Istanbul (IST)', terminal: 'T2' },
  { id: 6, flightNumber: 'FR890', airline: 'Ryanair', type: 'departure', scheduledTime: '14:50', status: 'on-time', airport: 'Dublin (DUB)', terminal: 'T1', gate: 'D05' },
  { id: 7, flightNumber: 'WZ112', airline: 'Wizz Air', type: 'arrival', scheduledTime: '15:30', status: 'on-time', airport: 'Budapest (BUD)', terminal: 'T2' },
  { id: 8, flightNumber: 'VY334', airline: 'Vueling', type: 'departure', scheduledTime: '16:10', status: 'cancelled', airport: 'Barcelona (BCN)', terminal: 'T1' },
];

type Row = typeof flightsTable.$inferSelect;

const mapFlight = (row: Row): Flight => ({
  id: row.id,
  flightNumber: row.flightNumber,
  airline: row.airline,
  type: row.type as Flight['type'],
  scheduledTime: row.scheduledTime,
  expectedTime: row.expectedTime ?? undefined,
  status: row.status as Flight['status'],
  airport: row.airport,
  terminal: row.terminal,
  gate: row.gate ?? undefined,
});

declare global {
  // eslint-disable-next-line no-var
  var __flugboardDb: Database.Database | undefined;
}

const sqlite = global.__flugboardDb ?? new Database('flugboard.sqlite');
if (!global.__flugboardDb) {
  global.__flugboardDb = sqlite;
}

const db = drizzle(sqlite);

sqlite.exec(`
  CREATE TABLE IF NOT EXISTS flights (
    id INTEGER PRIMARY KEY,
    flight_number TEXT NOT NULL,
    airline TEXT NOT NULL,
    type TEXT NOT NULL,
    scheduled_time TEXT NOT NULL,
    expected_time TEXT,
    status TEXT NOT NULL,
    airport TEXT NOT NULL,
    terminal TEXT NOT NULL,
    gate TEXT
  );
`);

const countRow = sqlite.prepare('SELECT COUNT(*) as count FROM flights').get() as
  | { count: number }
  | undefined;

if (!countRow || countRow.count === 0) {
  db.insert(flightsTable).values(
    seedFlights.map((flight) => ({
      id: flight.id,
      flightNumber: flight.flightNumber,
      airline: flight.airline,
      type: flight.type,
      scheduledTime: flight.scheduledTime,
      expectedTime: flight.expectedTime ?? null,
      status: flight.status,
      airport: flight.airport,
      terminal: flight.terminal,
      gate: flight.gate ?? null,
    }))
  ).run();
}

export const listFlights = (type?: string, status?: string): Flight[] => {
  const filters = [];
  if (type) filters.push(eq(flightsTable.type, type));
  if (status) filters.push(eq(flightsTable.status, status));
  const rows = filters.length
    ? db.select().from(flightsTable).where(and(...filters)).all()
    : db.select().from(flightsTable).all();
  return rows.map(mapFlight);
};

export const getFlightById = (id: number): Flight | null => {
  const row = db.select().from(flightsTable).where(eq(flightsTable.id, id)).get();
  return row ? mapFlight(row) : null;
};

export const insertFlight = (input: Omit<Flight, 'id' | 'status'>): Flight => {
  const newFlight: Flight = {
    id: Date.now(),
    status: 'on-time',
    ...input,
  };

  db.insert(flightsTable)
    .values({
      id: newFlight.id,
      flightNumber: newFlight.flightNumber,
      airline: newFlight.airline,
      type: newFlight.type,
      scheduledTime: newFlight.scheduledTime,
      expectedTime: newFlight.expectedTime ?? null,
      status: newFlight.status,
      airport: newFlight.airport,
      terminal: newFlight.terminal,
      gate: newFlight.gate ?? null,
    })
    .run();

  return newFlight;
};

export const removeFlight = (id: number): Flight | null => {
  const flight = getFlightById(id);
  if (!flight) return null;
  db.delete(flightsTable).where(eq(flightsTable.id, id)).run();
  return flight;
};

export const updateFlight = (id: number, payload: Partial<Flight>): Flight | null => {
  const current = getFlightById(id);
  if (!current) return null;

  db.update(flightsTable)
    .set({
      flightNumber: payload.flightNumber ?? current.flightNumber,
      airline: payload.airline ?? current.airline,
      type: payload.type ?? current.type,
      scheduledTime: payload.scheduledTime ?? current.scheduledTime,
      expectedTime: payload.expectedTime ?? current.expectedTime ?? null,
      status: payload.status ?? current.status,
      airport: payload.airport ?? current.airport,
      terminal: payload.terminal ?? current.terminal,
      gate: payload.gate ?? current.gate ?? null,
    })
    .where(eq(flightsTable.id, id))
    .run();

  return getFlightById(id);
};
