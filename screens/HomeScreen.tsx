import React, { useEffect, useRef } from 'react';
import { View, Text, Button, StyleSheet, Animated, ImageBackground } from 'react-native';
import SplashScreen from 'react-native-splash-screen';

const HomeScreen = ({ navigation }: any) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    SplashScreen.hide();
    startAnimation();
  }, []);

  const startAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  };

  const animatedStyle = {
    transform: [
      {
        scale: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 1.1],
        }),
      },
    ],
  };

  return (
    <ImageBackground source={require('../assets/homeBackground.png')} style={styles.backgroundImage} imageStyle={styles.backgroundImageStyle}>
      <View style={styles.container}>
        <Animated.Text style={[styles.title, animatedStyle]}>Quiz App</Animated.Text>
        <Button title="Rozpocznij Quiz" onPress={() => navigation.navigate('Test')} />
        <View style={styles.footer}>
          <Button title="Wyniki" onPress={() => navigation.navigate('Result')} />
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    justifyContent: 'center',
  },
  backgroundImageStyle: {
    resizeMode: 'contain',
    top: 300,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
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
