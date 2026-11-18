import { FlightStatus } from '@/types/flight';

const STATUS_CONFIG: Record<FlightStatus, { label: string; className: string }> = {
  'on-time': { label: 'Pünktlich', className: 'status-on-time' },
  'delayed': { label: 'Verspätet', className: 'status-delayed' },
  'boarding': { label: 'Boarding', className: 'status-boarding' },
  'departed': { label: 'Gestartet', className: 'status-departed' },
  'landed': { label: 'Gelandet', className: 'status-landed' },
  'cancelled': { label: 'Gestrichen', className: 'status-cancelled' },
};

export default function FlightStatusBadge({ status }: { status: FlightStatus }) {
  const cfg = STATUS_CONFIG[status];
  return <span className={`status-pill ${cfg.className}`}>{cfg.label}</span>;
}
