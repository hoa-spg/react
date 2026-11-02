import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Flight } from '../types/flight';
import StatusBadge from './StatusBadge';

interface FlightCardProps {
  flight: Flight;
  onPress: () => void;
  isSelected?: boolean;
}

const FlightCard = ({ flight, onPress, isSelected = false }: FlightCardProps) => (
  <TouchableOpacity
    style={[styles.card, isSelected && styles.cardSelected]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <View style={styles.row}>
      {/* Left column */}
      <View style={styles.leftCol}>
        <Text style={[styles.flightNumber, flight.status === 'cancelled' && styles.strikethrough]}>
          {flight.flightNumber}
        </Text>
        <Text style={styles.airline}>{flight.airline}</Text>
      </View>
      {/* Center column */}
      <View style={styles.centerCol}>
        <Text style={styles.airport} numberOfLines={1}>{flight.airport}</Text>
        <View style={styles.timeRow}>
          <Text style={[styles.time, flight.status === 'cancelled' && styles.strikethrough]}>
            {flight.scheduledTime}
          </Text>
          {flight.expectedTime && (
            <Text style={styles.expectedTime}>→ {flight.expectedTime}</Text>
          )}
        </View>
      </View>
      {/* Right column */}
      <View style={styles.rightCol}>
        <StatusBadge status={flight.status} />
      </View>
    </View>
    {(flight.gate || flight.terminal) && (
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {flight.terminal}{flight.gate ? ` · Gate ${flight.gate}` : ''}
        </Text>
      </View>
    )}
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1c2128',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#30363d',
  },
  cardSelected: {
    backgroundColor: '#1f3a4a',
    borderLeftWidth: 3,
    borderLeftColor: '#61dafb',
  },
  row: { flexDirection: 'row', alignItems: 'center' },
  timeRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  leftCol:   { flex: 2 },
  centerCol: { flex: 3 },
  rightCol:  { flex: 2, alignItems: 'flex-end' },
  flightNumber: { fontSize: 15, fontWeight: 'bold', color: '#e6edf3' },
  airline:      { fontSize: 11, color: '#8b949e', marginTop: 2 },
  airport:      { fontSize: 13, color: '#e6edf3' },
  time:         { fontSize: 14, fontWeight: '600', color: '#61dafb', marginTop: 2 },
  expectedTime: { fontSize: 12, color: '#d29922' },
  strikethrough:{ textDecorationLine: 'line-through', color: '#8b949e' },
  footer: { marginTop: 8, paddingTop: 8, borderTopWidth: 1, borderTopColor: '#30363d' },
  footerText: { fontSize: 11, color: '#8b949e' },
});

export default FlightCard;
