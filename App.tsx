import React, {useEffect} from 'react';
import {Text, View, StyleSheet} from "react-native";
import SplashScreen from "react-native-splash-screen";

function App(): React.JSX.Element {

    useEffect(() => {
        SplashScreen.hide();
    }, []);

  return (
      <View style={styles.container}>
        <Text> Kolejna próba React Native </Text>
      </View>
  )
}

const styles = StyleSheet.create({
  container: {
    margin: 50,
      alignItems: 'center',
  },
});

export default App;
