import React, { useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

const HomeScreen = ({ navigation }: any) => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Quiz App</Text>
      <Button title="Rozpocznij Quiz" onPress={() => navigation.navigate('Test')} />
      <View style={styles.footer}>
        <Button title="Wyniki" onPress={() => navigation.navigate('Result')} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
  },
});

export default HomeScreen;
