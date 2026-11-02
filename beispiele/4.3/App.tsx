import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { FlightProvider } from './src/context/FlightContext';
import DepartureStack from './src/navigation/DepartureStack';
import ArrivalStack from './src/navigation/ArrivalStack';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <FlightProvider>
      <NavigationContainer>
        <StatusBar style="light" />
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: {
              backgroundColor: '#161b22',
              borderTopColor: '#30363d',
              borderTopWidth: 1,
            },
            tabBarActiveTintColor: '#61dafb',
            tabBarInactiveTintColor: '#8b949e',
            tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
          }}
        >
          <Tab.Screen
            name="DepartureTab"
            component={DepartureStack}
            options={{
              title: 'Abflüge',
              tabBarIcon: ({ color, size }) => (
                <Text style={{ color, fontSize: size - 4 }}>✈</Text>
              ),
            }}
          />
          <Tab.Screen
            name="ArrivalTab"
            component={ArrivalStack}
            options={{
              title: 'Ankünfte',
              tabBarIcon: ({ color, size }) => (
                <Text style={{ color, fontSize: size - 4 }}>🛬</Text>
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </FlightProvider>
  );
}
