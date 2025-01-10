import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeScreen from './screens/HomeScreen';
import ConnectionScreen from './screens/ConnectionScreen';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ color, size }) => {
              let iconName = '';
              if (route.name === 'Devices') {
                iconName = 'poop';
              } else if (route.name === 'Connection') {
                iconName = 'recycle';
              }
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: 'blue',
            tabBarInactiveTintColor: 'gray',
          })}
        >
          <Tab.Screen name="Devices" component={HomeScreen} />
          <Tab.Screen name="Connection" component={ConnectionScreen} />
        </Tab.Navigator>
      </NavigationContainer>
  );
}
