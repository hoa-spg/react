import { StatusBar } from 'expo-status-bar';
import { Alert, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { sampleFlights } from './src/data/flights';

export default function App() {
  const handleRefresh = () => {
    Alert.alert('FlugBoard 4.1', 'Daten werden aktualisiert...');
  };

  return (
    <SafeAreaProvider>
      {/* SafeAreaView hält Abstand zu Notch, Statusleiste und Home-Balken */}
      <SafeAreaView style={styles.container}>
        <StatusBar style="light" />

        {/* Kopfzeile */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>✈ FlugBoard 4.1</Text>
          <Text style={styles.headerSubtitle}>Flughafen Wien-Schwechat</Text>
        </View>

        {/* ScrollView: Inhalt lässt sich scrollen, wenn er nicht auf den Bildschirm passt */}
        <ScrollView style={styles.content}>
          <Text style={styles.sectionTitle}>Abflüge & Ankünfte ({sampleFlights.length})</Text>

          {sampleFlights.map((flight) => (
            <View key={flight.id} style={styles.card}>
              <View style={styles.cardRow}>
                <Text style={styles.flightNumber}>{flight.flightNumber}</Text>
                <Text style={styles.flightType}>
                  {flight.type === 'departure' ? '↑ Abflug' : '↓ Ankunft'}
                </Text>
              </View>
              <Text style={styles.airline}>{flight.airline}</Text>
              <View style={styles.cardRow}>
                <Text style={styles.airport}>{flight.airport}</Text>
                <Text style={styles.time}>{flight.scheduledTime}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        {/* Button: TouchableOpacity wird beim Drücken durchsichtiger */}
        <TouchableOpacity style={styles.refreshButton} onPress={handleRefresh} activeOpacity={0.7}>
          <Text style={styles.refreshButtonText}>Aktualisieren</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

// Schatten: iOS kennt shadow*-Eigenschaften, Android nur elevation
const shadowStyle = Platform.select({
  ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.3, shadowRadius: 4 },
  android: { elevation: 4 },
  default: {},
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0d1117',
  },
  header: {
    backgroundColor: '#161b22',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#30363d',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#61dafb',
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#8b949e',
    marginTop: 2,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e6edf3',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#1c2128',
    borderRadius: 8,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#30363d',
    ...shadowStyle,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  flightNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#61dafb',
  },
  flightType: {
    fontSize: 12,
    color: '#8b949e',
  },
  airline: {
    fontSize: 12,
    color: '#8b949e',
    marginBottom: 6,
  },
  airport: {
    fontSize: 14,
    color: '#e6edf3',
    flex: 1,
  },
  time: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e6edf3',
  },
  refreshButton: {
    backgroundColor: '#1c2128',
    borderTopWidth: 1,
    borderTopColor: '#30363d',
    padding: 16,
    alignItems: 'center',
  },
  refreshButtonText: {
    color: '#61dafb',
    fontWeight: '600',
    fontSize: 15,
  },
});
