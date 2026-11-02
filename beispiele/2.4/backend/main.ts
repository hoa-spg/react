import { Hono } from 'npm:hono';
import { cors } from 'npm:hono/cors';
import { flights } from './data.ts';

const app = new Hono();
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

app.use('*', cors({ origin: 'http://localhost:5173' }));

app.get('/api/flights', async (c) => {
  await sleep(1000);
  const type = c.req.query('type');
  const status = c.req.query('status');
  let result = [...flights];
  if (type)   result = result.filter((f) => f.type === type);
  if (status) result = result.filter((f) => f.status === status);
  return c.json(result);
});

app.get('/api/flights/:id', (c) => {
  const id = Number(c.req.param('id'));
  const flight = flights.find((f) => f.id === id);
  if (!flight) return c.json({ error: 'Flug nicht gefunden' }, 404);
  return c.json(flight);
});

app.post('/api/flights', async (c) => {
  const body = await c.req.json();
  if (!body.flightNumber || !body.airline || !body.scheduledTime) {
    return c.json({ error: 'Pflichtfelder fehlen' }, 400);
  }
  const newFlight = { id: Date.now(), status: 'on-time' as const, ...body };
  flights.push(newFlight);
  return c.json(newFlight, 201);
});

app.delete('/api/flights/:id', (c) => {
  const id = Number(c.req.param('id'));
  const idx = flights.findIndex((f) => f.id === id);
  if (idx === -1) return c.json({ error: 'Nicht gefunden' }, 404);
  const deleted = flights.splice(idx, 1)[0];
  return c.json(deleted);
});

Deno.serve({ port: 8000 }, app.fetch);
console.log('FlugBoard API läuft auf http://localhost:8000');
