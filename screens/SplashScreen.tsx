import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

const SplashScreen = () => {
    const { width, height } = Dimensions.get('window');
    return (
        <View style={styles.splashContainer}>
            <Image
                source={require('../assets/screen.png')}
                style={[styles.image, { width, height }]}
                resizeMode="cover"
            />
        </View>
    );
};

const styles = StyleSheet.create({
    splashContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    image: {
    },
});

export default SplashScreen;
