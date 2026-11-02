import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { DepartureStackParamList } from './types';
import DepartureListScreen from '../screens/DepartureListScreen';
import FlightDetailScreen from '../screens/FlightDetailScreen';

const Stack = createNativeStackNavigator<DepartureStackParamList>();

const DepartureStack = () => (
  <Stack.Navigator
    screenOptions={{
      headerStyle: { backgroundColor: '#161b22' },
      headerTintColor: '#e6edf3',
      contentStyle: { backgroundColor: '#0d1117' },
    }}
  >
    <Stack.Screen
      name="DepartureList"
      component={DepartureListScreen}
      options={{ title: '✈ Abflüge' }}
    />
    <Stack.Screen
      name="FlightDetail"
      component={FlightDetailScreen}
      options={({ route }) => ({ title: route.params.flight.flightNumber })}
    />
  </Stack.Navigator>
);

export default DepartureStack;
