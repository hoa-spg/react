import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import {
  createFlight,
  deleteFlight,
  getFlightById,
  initializeDatabase,
  listFlights,
} from './db.ts';

const app = new Hono();
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

app.use('*', cors({ origin: 'http://localhost:5173' }));

app.get('/api/flights', async (c) => {
  await sleep(1000);
  const type = c.req.query('type');
  const status = c.req.query('status');
  const result = await listFlights(type ?? undefined, status ?? undefined);
  return c.json(result);
});

app.get('/api/flights/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const flight = await getFlightById(id);
  if (!flight) return c.json({ error: 'Flug nicht gefunden' }, 404);
  return c.json(flight);
});

app.post('/api/flights', async (c) => {
  const body = await c.req.json();
  if (!body.flightNumber || !body.airline || !body.scheduledTime) {
    return c.json({ error: 'Pflichtfelder fehlen' }, 400);
  }
  const newFlight = await createFlight({
    flightNumber: body.flightNumber,
    airline: body.airline,
    type: body.type ?? 'departure',
    scheduledTime: body.scheduledTime,
    expectedTime: body.expectedTime,
    airport: body.airport,
    terminal: body.terminal ?? 'T1',
    gate: body.gate,
  });
  return c.json(newFlight, 201);
});

app.delete('/api/flights/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const deleted = await deleteFlight(id);
  if (!deleted) return c.json({ error: 'Nicht gefunden' }, 404);
  return c.json(deleted);
});

await initializeDatabase();

Deno.serve({ port: 8000 }, app.fetch);
console.log('FlugBoard API (Drizzle + SQLite) läuft auf http://localhost:8000');
