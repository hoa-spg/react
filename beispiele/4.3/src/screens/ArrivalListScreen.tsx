import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { View, StyleSheet } from 'react-native';
import { useFlightContext } from '../context/FlightContext';
import { ArrivalStackParamList } from '../navigation/types';
import { Flight } from '../types/flight';
import FlightList from '../components/FlightList';
import SearchBar from '../components/SearchBar';

type Nav = NativeStackNavigationProp<ArrivalStackParamList, 'ArrivalList'>;

const ArrivalListScreen = () => {
  const navigation = useNavigation<Nav>();
  const {
    arrivals,
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
        flights={arrivals}
        title="Ankünfte"
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

export default ArrivalListScreen;
