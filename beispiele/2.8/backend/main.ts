import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import {
  createFlight,
  deleteFlight,
  getFlightById,
  initializeDatabase,
  listFlights,
  updateFlightStatus,
} from './db.ts';

const app = new Hono();
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

app.use('*', cors({
  // Entwicklung: jedes Frontend auf localhost erlauben, egal auf welchem Port
  // (Vite weicht auf 5174, 5175, ... aus, wenn 5173 schon belegt ist)
  origin: (origin) =>
    /^http:\/\/(localhost|127\.0\.0\.1):\d+$/.test(origin) ? origin : null,
}));

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

app.patch('/api/flights/:id', async (c) => {
  const id = Number(c.req.param('id'));
  const body = await c.req.json();
  if (!body.status) return c.json({ error: 'status fehlt' }, 400);
  const updated = await updateFlightStatus(id, body.status);
  if (!updated) return c.json({ error: 'Nicht gefunden' }, 404);
  return c.json(updated);
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
