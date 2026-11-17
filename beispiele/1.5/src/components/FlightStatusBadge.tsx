import { FlightStatus } from '../types/flight';
import './FlightStatusBadge.css';

interface StatusConfig {
  label: string;
  className: string;
}

const STATUS_CONFIG: Record<FlightStatus, StatusConfig> = {
  'on-time': { label: 'Pünktlich', className: 'status-on-time' },
  delayed: { label: 'Verspätet', className: 'status-delayed' },
  boarding: { label: 'Boarding', className: 'status-boarding' },
  departed: { label: 'Gestartet', className: 'status-departed' },
  landed: { label: 'Gelandet', className: 'status-landed' },
  cancelled: { label: 'Gestrichen', className: 'status-cancelled' },
};

interface FlightStatusBadgeProps {
  status: FlightStatus;
}

/**
 * Renders a coloured pill badge for a given flight status using a Record config.
 * @param status - The flight status value.
 */
const FlightStatusBadge = ({ status }: FlightStatusBadgeProps) => {
  const config = STATUS_CONFIG[status];
  return <span className={`status-pill ${config.className}`}>{config.label}</span>;
};

export default FlightStatusBadge;
