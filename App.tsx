import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';  
import HomeScreen from './screens/HomeScreen';
import TestScreen from './screens/TestScreen';
import ResultScreen from './screens/ResultScreen';
import './gesture-handler';
import DrawerActivity from './screens/DrawerActivity';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNavigator = () => (
  <Drawer.Navigator initialRouteName="Home" drawerContent={(props) => <DrawerActivity {...props} /> }> 
  <Drawer.Screen name="Home" component={HomeScreen} />
  <Drawer.Screen name="Test" component={TestScreen} />
  <Drawer.Screen name="Result" component={ResultScreen} />
</Drawer.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <DrawerNavigator />
    </NavigationContainer>
  )
}

export default App;