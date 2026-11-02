import { createClient } from 'npm:@libsql/client';
import { and, eq } from 'npm:drizzle-orm';
import { drizzle } from 'npm:drizzle-orm/libsql';
import {
  integer,
  sqliteTable,
  text,
} from 'npm:drizzle-orm/sqlite-core';

import { Flight, FlightStatus, FlightType, seedFlights } from './data.ts';

const client = createClient({ url: 'file:./flugboard.db' });

export const flightsTable = sqliteTable('flights', {
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

const db = drizzle(client);

const mapFlight = (row: typeof flightsTable.$inferSelect): Flight => ({
  id: row.id,
  flightNumber: row.flightNumber,
  airline: row.airline,
  type: row.type as FlightType,
  scheduledTime: row.scheduledTime,
  expectedTime: row.expectedTime ?? undefined,
  status: row.status as FlightStatus,
  airport: row.airport,
  terminal: row.terminal,
  gate: row.gate ?? undefined,
});

export const initializeDatabase = async () => {
  await client.execute(`
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
    )
  `);

  const countResult = await client.execute('SELECT COUNT(*) as count FROM flights');
  const count = Number(countResult.rows[0]?.count ?? 0);

  if (count === 0) {
    await db.insert(flightsTable).values(
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
    );
  }
};

export const listFlights = async (type?: string, status?: string): Promise<Flight[]> => {
  const filters = [];
  if (type) {
    filters.push(eq(flightsTable.type, type));
  }
  if (status) {
    filters.push(eq(flightsTable.status, status));
  }

  const rows = filters.length
    ? await db.select().from(flightsTable).where(and(...filters))
    : await db.select().from(flightsTable);

  return rows.map(mapFlight);
};

export const getFlightById = async (id: number): Promise<Flight | null> => {
  const rows = await db.select().from(flightsTable).where(eq(flightsTable.id, id)).limit(1);
  if (rows.length === 0) {
    return null;
  }
  return mapFlight(rows[0]);
};

export const createFlight = async (input: Omit<Flight, 'id' | 'status'>): Promise<Flight> => {
  const newFlight: Flight = {
    id: Date.now(),
    status: 'on-time',
    ...input,
  };

  await db.insert(flightsTable).values({
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
  });

  return newFlight;
};

export const deleteFlight = async (id: number): Promise<Flight | null> => {
  const flight = await getFlightById(id);
  if (!flight) {
    return null;
  }

  await db.delete(flightsTable).where(eq(flightsTable.id, id));
  return flight;
};
