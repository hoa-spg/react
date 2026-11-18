import { NextRequest, NextResponse } from 'next/server';
import { getFlightById, removeFlight, updateFlight } from '@/lib/flights-db';

interface RouteParams {
  params: Promise<{ id: string }>;
}

// GET /api/flights/1
export async function GET(_request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const flight = getFlightById(Number(id));
  if (!flight) {
    return NextResponse.json({ error: `Flug ${id} nicht gefunden` }, { status: 404 });
  }
  return NextResponse.json(flight);
}

// DELETE /api/flights/1
export async function DELETE(_request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const deleted = removeFlight(Number(id));
  if (!deleted) {
    return NextResponse.json({ error: `Flug ${id} nicht gefunden` }, { status: 404 });
  }
  return NextResponse.json(deleted);
}

// PATCH /api/flights/1 – nur die mitgeschickten Felder ändern
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const body = await request.json();
  const updated = updateFlight(Number(id), body);
  if (!updated) {
    return NextResponse.json({ error: `Flug ${id} nicht gefunden` }, { status: 404 });
  }
  return NextResponse.json(updated);
}
