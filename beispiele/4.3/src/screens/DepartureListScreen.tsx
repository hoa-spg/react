import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, StyleSheet } from 'react-native';
import { useFlightContext } from '../context/FlightContext';
import { DepartureStackParamList } from '../navigation/types';
import { Flight } from '../types/flight';
import FlightList from '../components/FlightList';
import SearchBar from '../components/SearchBar';

type Nav = NativeStackNavigationProp<DepartureStackParamList, 'DepartureList'>;

const DepartureListScreen = () => {
  const navigation = useNavigation<Nav>();
  const {
    departures,
    isLoading,
    isRefreshing,
    refetch,
    searchQuery,
    setSearchQuery,
  } = useFlightContext();

  const handlePress = (flight: Flight) =>
    navigation.navigate('FlightDetail', { flight });

  return (
    <View style={styles.container}>
      <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
      <FlightList
        flights={departures}
        title="Abflüge"
        onFlightPress={handlePress}
        isLoading={isLoading}
        onRefresh={refetch}
        refreshing={isRefreshing}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0d1117' },
});

export default DepartureListScreen;
