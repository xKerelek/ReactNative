import { View, Text, Button, StyleSheet, TouchableOpacity } from 'react-native';


const ResultScreen = ({navigation}: any) => {
return (
        <View style={styles.container}>
            <Text style={styles.title}>BACK</Text>
            <Button title="Back to home" onPress={() => navigation.navigate('Home')} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    title: {
        fontSize:24,
        marginBottom: 20,
    }
});

export default ResultScreen;