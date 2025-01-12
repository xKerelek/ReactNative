import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ConnectionScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Connection</Text>
            <Text style={styles.title}>Tutaj kiedyś coś powstanie :D</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
});
