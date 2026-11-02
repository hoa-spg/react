import { useState, useMemo, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { sampleFlights } from './src/data/flights';
import { Flight } from './src/types/flight';
import FlightList from './src/components/FlightList';
import SearchBar from './src/components/SearchBar';

type TypeFilter = 'all' | 'departure' | 'arrival';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter]   = useState<TypeFilter>('all');
  const [selectedFlight, setSelectedFlight] = useState<Flight | null>(null);
  const [refreshing, setRefreshing]   = useState(false);
  const [isLoading, setIsLoading]     = useState(true);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  const filteredFlights = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return sampleFlights
      .filter(f => {
        if (typeFilter !== 'all' && f.type !== typeFilter) return false;
        if (
          q &&
          !f.flightNumber.toLowerCase().includes(q) &&
          !f.airport.toLowerCase().includes(q) &&
          !f.airline.toLowerCase().includes(q)
        ) return false;
        return true;
      })
      .sort((a, b) => a.scheduledTime.localeCompare(b.scheduledTime));
  }, [searchQuery, typeFilter]);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const TAB_FILTERS: { key: TypeFilter; label: string }[] = [
    { key: 'all',       label: 'Alle' },
    { key: 'departure', label: '↑ Abflüge' },
    { key: 'arrival',   label: '↓ Ankünfte' },
  ];

  const listTitle =
    typeFilter === 'all'
      ? 'Alle Flüge'
      : typeFilter === 'departure'
      ? 'Abflüge'
      : 'Ankünfte';

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>✈ FlugBoard 4.2</Text>
        <Text style={styles.headerSubtitle}>Flughafen Wien-Schwechat</Text>
      </View>

      {/* Search */}
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />

      {/* Type filter tabs */}
      <View style={styles.tabs}>
        {TAB_FILTERS.map(tab => (
          <TouchableOpacity
            key={tab.key}
            style={[styles.tab, typeFilter === tab.key && styles.tabActive]}
            onPress={() => setTypeFilter(tab.key)}
          >
            <Text style={[styles.tabText, typeFilter === tab.key && styles.tabTextActive]}>
              {tab.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Flight list */}
      <FlightList
        flights={filteredFlights}
        title={listTitle}
        onFlightPress={setSelectedFlight}
        selectedFlightId={selectedFlight?.id}
        isLoading={isLoading}
        onRefresh={handleRefresh}
        refreshing={refreshing}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#0d1117' },
  header: {
    backgroundColor: '#161b22',
    paddingHorizontal: 20,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#30363d',
  },
  headerTitle: { fontSize: 22, fontWeight: 'bold', color: '#61dafb' },
  headerSubtitle: { fontSize: 12, color: '#8b949e', marginTop: 2 },
  tabs: {
    flexDirection: 'row',
    backgroundColor: '#161b22',
    borderBottomWidth: 1,
    borderBottomColor: '#30363d',
  },
  tab: { flex: 1, paddingVertical: 10, alignItems: 'center' },
  tabActive: { borderBottomWidth: 2, borderBottomColor: '#61dafb' },
  tabText: { color: '#8b949e', fontSize: 13, fontWeight: '500' },
  tabTextActive: { color: '#61dafb', fontWeight: '700' },
});
