import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Image, Alert, TouchableOpacity, ImageBackground } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import _ from 'lodash';

const DrawerActivity = (props: any) => {
  const navigateToRandomTest = async () => {
    try {
      const response = await fetch('https://tgryl.pl/quiz/tests');
      const tests = await response.json();
      const shuffledTest = _.shuffle(tests);
      if (shuffledTest.length > 0) {
        const randomTest = shuffledTest[0];
        props.navigation.navigate('TestQuestionScreen', { testId: randomTest.id });
      } else {
        Alert.alert('Brak testów');
      }
    } catch (err) {
      console.error('Błąd podczas pobrania testu: ', err);
      Alert.alert('Nie udało się pobrać testu');
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require('../assets/background.png')} style={styles.background}>
        <DrawerContentScrollView {...props}>
          <View style={styles.drawerHeader}>
            <Image source={require('../assets/quiz.png')} style={styles.image} />
          </View>
          <View style={styles.drawerItemContainer}>
            <DrawerItemList
              {...props}
              itemStyle={{ ...styles.drawerItem }}
              labelStyle={{ ...styles.drawerItemText }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={navigateToRandomTest}>
              <Text style={styles.buttonText}>Losuj Test</Text>
            </TouchableOpacity>
          </View>
        </DrawerContentScrollView>
        <View style={styles.footer}>
          <Text style={styles.footerText}>Zdjęcia zapożyczone z freepik.com</Text>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  drawerHeader: {
    padding: 20,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  drawerItemContainer: {
    marginHorizontal: 10,
    marginTop: 10,
  },
  drawerItem: {
    backgroundColor: '#1E90FF',
    borderRadius: 10,
    marginVertical: 5,
    paddingVertical: 10,
  },
  drawerItemText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonContainer: {
    marginHorizontal: 20,
    marginTop: 10,
  },
  button: {
    backgroundColor: '#ff4500',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  footer: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 20,
    color: '#black',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

export default DrawerActivity;
