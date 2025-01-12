import React from 'react';
import {Text, View, StyleSheet} from "react-native";

function App(): React.JSX.Element {
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
