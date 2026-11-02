import { NextRequest, NextResponse } from 'next/server';
import { getFlightById, removeFlight, updateFlight } from '@/lib/flights-db';

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const flight = getFlightById(Number(id));
  if (!flight) {
    return NextResponse.json(
      { error: `Flug ${id} nicht gefunden` },
      { status: 404 }
    );
  }
  return NextResponse.json(flight);
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const deleted = removeFlight(Number(id));
  if (!deleted) {
    return NextResponse.json({ error: 'Nicht gefunden' }, { status: 404 });
  }
  return NextResponse.json(deleted);
}

export async function PATCH(request: NextRequest, { params }: RouteParams) {
  const { id } = await params;
  const body = await request.json();
  const updated = updateFlight(Number(id), body);
  if (!updated) {
    return NextResponse.json({ error: 'Nicht gefunden' }, { status: 404 });
  }
  return NextResponse.json(updated);
}
