import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WelcomeScreen = ({ onFinish }: any) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Regulamin Aplikacji</Text>
      <Text style={styles.content}>
        Akceptując regulamin, zgadzasz się na warunki korzystania z aplikacji.
      </Text>
      <Button title="Akceptuj i kontynuuj" onPress={onFinish} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  content: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default WelcomeScreen;
