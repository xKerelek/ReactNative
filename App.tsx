import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import SplashScreen from 'react-native-splash-screen';
import { initializeDatabase, loadOfflineTests, loadTestsFromDatabase } from './src/database';
import { fetchAndStoreTests } from './src/fetchAndStoreTest';
import HomeScreen from './screens/HomeScreen';
import TestScreen from './screens/TestScreen';
import ResultScreen from './screens/ResultScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import DrawerActivity from './screens/DrawerActivity';
import TestQuestionScreen from './screens/TestQuestionScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator
    initialRouteName="Home"
    drawerContent={(props) => <DrawerActivity {...props} />}
  >
    <Drawer.Screen name="Home" component={HomeScreen} />
    <Drawer.Screen name="Test" component={TestScreen} />
    <Drawer.Screen name="Result" component={ResultScreen} />
  </Drawer.Navigator>
);

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasAccept, setAccept] = useState(false);
  const [hasShowScreen, setShowScreen] = useState(false);

  useEffect(() => {
    const initApp = async () => {
      try {
        await initializeDatabase();
        const netInfo = await NetInfo.fetch();
        let tests = [];

        if (netInfo.isConnected) {
          console.log('Connected to the internet. Fetching data...');
          await fetchAndStoreTests();
          tests = await loadTestsFromDatabase();
          await AsyncStorage.removeItem('offlineDataLoaded');
        } else {
          console.log('No internet connection. Loading offline data...');
          tests = await loadOfflineTests();
          await AsyncStorage.setItem('offlineDataLoaded', 'true');
        }

        console.log('Tests available in app:', tests);
        const accepted = await AsyncStorage.getItem('hasAccept');
        if (accepted === 'true') {
          setAccept(true);
        } else {
          setShowScreen(true);
        }
      } catch (error) {
        console.error('Error during app initialization:', error);
      } finally {
        setIsLoading(false);
        SplashScreen.hide();
      }
    };

    initApp();
  }, []);

  const handleAccept = async () => {
    try {
      await AsyncStorage.setItem('hasAccept', 'true');
      setShowScreen(false);
      setAccept(true);
    } catch (error) {
      console.error('Error saving AsyncStorage:', error);
    }
  };

  if (isLoading) return null;
  if (hasShowScreen) {
    return <WelcomeScreen onFinish={handleAccept} />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!hasAccept ? (
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
        ) : (
          <Stack.Screen name="Main" component={DrawerNavigator} />
        )}
        <Stack.Screen name="TestQuestionScreen" component={TestQuestionScreen} />
        <Stack.Screen name="Result" component={ResultScreen} />
        <Stack.Screen name="DrawerActivity" component={DrawerActivity} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;