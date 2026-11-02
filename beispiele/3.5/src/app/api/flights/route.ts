import { NextRequest, NextResponse } from 'next/server';
import { insertFlight, listFlights } from '@/lib/flights-db';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;
  const type   = searchParams.get('type');
  const status = searchParams.get('status');

  const result = listFlights(type ?? undefined, status ?? undefined);

  return NextResponse.json(result);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    if (!body.flightNumber || !body.airline || !body.scheduledTime || !body.airport) {
      return NextResponse.json(
        { error: 'Pflichtfelder fehlen: flightNumber, airline, scheduledTime, airport' },
        { status: 400 }
      );
    }
    const newFlight = insertFlight({
      flightNumber: body.flightNumber,
      airline: body.airline,
      type: body.type ?? 'departure',
      scheduledTime: body.scheduledTime,
      expectedTime: body.expectedTime,
      airport: body.airport,
      terminal: body.terminal ?? 'T1',
      gate: body.gate,
    });
    return NextResponse.json(newFlight, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Ungültiger Request-Body' }, { status: 400 });
  }
}
