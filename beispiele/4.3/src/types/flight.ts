export type FlightType = 'arrival' | 'departure';
export type FlightStatus = 'on-time' | 'delayed' | 'boarding' | 'departed' | 'landed' | 'cancelled';

export interface Flight {
  id: number;
  flightNumber: string;
  airline: string;
  type: FlightType;
  scheduledTime: string;
  expectedTime?: string;
  status: FlightStatus;
  airport: string;
  terminal: string;
  gate?: string;
}
