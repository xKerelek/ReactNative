import { Button } from '@react-navigation/elements';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View,} from 'react-native';

export default function HomeScreen({navigation}: any) {
  return (
    <View>
      <View style={styles.title}>
          <Text style={styles.txt}>Devices</Text>
      </View>
      <View style={styles.addButtonContainer}>
        <TouchableOpacity style={styles.addButton}>
            <Text style={styles.plus}>+</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    title: {
      padding: 20,
      borderWidth: 3,
      borderTopWidth: 0,
      borderLeftWidth: 0,
      borderRightWidth: 0
    },
    txt: {
      textAlign: 'center',
      fontSize: 24,
      fontWeight: 'bold',
  
    },
    addButtonContainer: {
      borderWidth: 2,
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 20,
        marginTop: 20
      },
    addButton: {

    },
    plus: {
      textAlign: 'center',
      fontSize: 50,
    },

  });