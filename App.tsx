import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import DeviceScreen from './screens/DeviceScreen';
import ConnectionScreen from './screens/ConnectionScreen';
import SplashScreen from './screens/SplashScreen';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function DevicesStack() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Devices" component={DeviceScreen} />
        </Stack.Navigator>
    );
}

export default function App() {
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, []);

    if (loading) {
        return <SplashScreen />;
    }

    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName: string;

                        if (route.name === 'Devices') {
                            iconName = focused ? 'ios-albums' : 'ios-albums-outline';
                        } else if (route.name === 'Connection') {
                            iconName = focused ? 'ios-wifi' : 'ios-wifi-outline';
                        } else {
                            iconName = 'ios-alert';
                        }

                        return <Ionicons name={iconName} size={size} color={color} />;
                    },
                    tabBarActiveTintColor: 'blue',
                    tabBarInactiveTintColor: 'gray',
                })}
            >
                <Tab.Screen name="Devices" component={DevicesStack} />
                <Tab.Screen name="Connection" component={ConnectionScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}
