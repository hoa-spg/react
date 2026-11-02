import { useRoute } from '@react-navigation/native';
import { NativeStackRouteProp } from '@react-navigation/native-stack';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { DepartureStackParamList } from '../navigation/types';
import StatusBadge from '../components/StatusBadge';

type Route = NativeStackRouteProp<DepartureStackParamList, 'FlightDetail'>;

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <View style={styles.row}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const FlightDetailScreen = () => {
  const route = useRoute<Route>();
  const { flight } = route.params;

  return (
    <ScrollView style={styles.container}>
      {/* Header card */}
      <View style={styles.headerCard}>
        <Text style={styles.flightNumber}>{flight.flightNumber}</Text>
        <Text style={styles.airline}>{flight.airline}</Text>
        <View style={styles.headerBadgeWrap}>
          <StatusBadge status={flight.status} />
        </View>
      </View>

      {/* Details */}
      <View style={styles.detailsCard}>
        <DetailRow
          label="Richtung"
          value={flight.type === 'departure' ? '↑ Abflug' : '↓ Ankunft'}
        />
        <DetailRow
          label={flight.type === 'departure' ? 'Ziel' : 'Herkunft'}
          value={flight.airport}
        />
        <DetailRow label="Geplante Zeit" value={flight.scheduledTime} />
        {flight.expectedTime && (
          <DetailRow label="Erwartete Zeit" value={flight.expectedTime} />
        )}
        <DetailRow label="Terminal" value={flight.terminal} />
        {flight.gate && <DetailRow label="Gate" value={flight.gate} />}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0d1117' },
  headerCard: {
    backgroundColor: '#161b22',
    padding: 24,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#30363d',
  },
  flightNumber: { fontSize: 36, fontWeight: 'bold', color: '#61dafb' },
  airline: { fontSize: 16, color: '#8b949e', marginTop: 4 },
  headerBadgeWrap: { marginTop: 12 },
  detailsCard: {
    backgroundColor: '#1c2128',
    margin: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#30363d',
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#30363d',
  },
  label: { color: '#8b949e', fontSize: 14 },
  value: {
    color: '#e6edf3',
    fontSize: 14,
    fontWeight: '500',
    maxWidth: '60%',
    textAlign: 'right',
  },
});

export default FlightDetailScreen;
