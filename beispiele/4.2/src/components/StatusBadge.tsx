import { View, Text, StyleSheet } from 'react-native';
import { FlightStatus } from '../types/flight';

const STATUS_CONFIG: Record<FlightStatus, { label: string; color: string; bg: string }> = {
  'on-time':   { label: 'Pünktlich',  color: '#3fb950', bg: '#1a3a1a' },
  'delayed':   { label: 'Verspätet', color: '#d29922', bg: '#3a2a0a' },
  'boarding':  { label: 'Boarding',   color: '#61dafb', bg: '#0a2a3a' },
  'departed':  { label: 'Gestartet',  color: '#8b949e', bg: '#21262d' },
  'landed':    { label: 'Gelandet',   color: '#8b949e', bg: '#21262d' },
  'cancelled': { label: 'Gestrichen', color: '#f85149', bg: '#3a0a0a' },
};

interface StatusBadgeProps { status: FlightStatus; }

const StatusBadge = ({ status }: StatusBadgeProps) => {
  const cfg = STATUS_CONFIG[status];
  return (
    <View style={[styles.badge, { backgroundColor: cfg.bg }]}>
      <Text style={[styles.text, { color: cfg.color }]}>{cfg.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: { paddingHorizontal: 8, paddingVertical: 3, borderRadius: 4 },
  text: { fontSize: 11, fontWeight: '600' },
});

export default StatusBadge;
