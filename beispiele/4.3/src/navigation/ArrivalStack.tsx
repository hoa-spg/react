import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ArrivalStackParamList } from './types';
import ArrivalListScreen from '../screens/ArrivalListScreen';
import FlightDetailScreen from '../screens/FlightDetailScreen';

const Stack = createNativeStackNavigator<ArrivalStackParamList>();

const ArrivalStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#161b22' },
      headerTintColor: '#e6edf3',
      contentStyle: { backgroundColor: '#0d1117' },
    }}
  >
    <Stack.Screen
      name="ArrivalList"
      component={ArrivalListScreen}
      options={{ title: '🛬 Ankünfte' }}
    />
    <Stack.Screen
      name="FlightDetail"
      component={FlightDetailScreen}
      options={({ route }) => ({ title: route.params.flight.flightNumber })}
    />
  </Stack.Navigator>
);

export default ArrivalStack;
