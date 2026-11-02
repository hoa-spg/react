import { FlatList, View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { Flight } from '../types/flight';
import FlightCard from './FlightCard';

interface FlightListProps {
  flights: Flight[];
  title: string;
  onFlightPress: (flight: Flight) => void;
  selectedFlightId?: number;
  isLoading?: boolean;
  onRefresh?: () => void;
  refreshing?: boolean;
}

const FlightList = ({
  flights,
  title,
  onFlightPress,
  selectedFlightId,
  isLoading = false,
  onRefresh,
  refreshing = false,
}: FlightListProps) => (
  <FlatList
    data={flights}
    keyExtractor={item => item.id.toString()}
    renderItem={({ item }) => (
      <FlightCard
        flight={item}
        onPress={() => onFlightPress(item)}
        isSelected={item.id === selectedFlightId}
      />
    )}
    ListHeaderComponent={
      <View style={styles.listHeader}>
        <Text style={styles.listTitle}>{title} ({flights.length})</Text>
      </View>
    }
    ListEmptyComponent={
      <View style={styles.empty}>
        {isLoading ? (
          <>
            <ActivityIndicator size="large" color="#61dafb" />
            <Text style={styles.emptyText}>Flugdaten werden geladen...</Text>
          </>
        ) : (
          <>
            <Text style={styles.emptyIcon}>✈</Text>
            <Text style={styles.emptyText}>Keine Flüge gefunden</Text>
          </>
        )}
      </View>
    }
    onRefresh={onRefresh}
    refreshing={refreshing}
    style={styles.list}
  />
);

const styles = StyleSheet.create({
  list: { flex: 1 },
  listHeader: {
    backgroundColor: '#161b22',
    padding: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#30363d',
  },
  listTitle: { fontSize: 16, fontWeight: '600', color: '#61dafb' },
  empty: { padding: 48, alignItems: 'center' },
  emptyIcon: { fontSize: 32, marginBottom: 12 },
  emptyText: { color: '#8b949e', fontSize: 15, marginTop: 12 },
});

export default FlightList;
