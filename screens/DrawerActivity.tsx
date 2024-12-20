import { createDrawerNavigator } from "@react-navigation/drawer";
import { StyleSheet, View, Text, Image, Alert, Button } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import _ from 'lodash';


const Drawer = createDrawerNavigator();
    const DrawerActivity = (props: any) => {
    const navigateToRandomTest = async () => {
        try {
            const response = await fetch('https://tgryl.pl/quiz/tests');
            const tests = await response.json();
            const shuffledTest = _.shuffle(tests);
            if(shuffledTest.length > 0) {
                const randomTest = shuffledTest[0];
                props.navigation.navigate('TestQuestionScreen', {testId: randomTest.id})
            } else {
                Alert.alert('Brak testów');
            }
        }catch(err) {
            console.error('Błąd podczas pobrania testu: ', err);
            Alert.alert('Nie udało się pobrać testu');
        }
    };

    const refreshTest = async () => {
        try {
            const response = await fetch('https://tgryl.pl/quiz/tests');
            if(response.ok) {
                Alert.alert('Sukces', 'Testy zostały pobrane');
            } else {
                Alert.alert('Error', 'Testy nie zostały pobrane');
            }
        } catch(err) {
            console.error('Błąd podczas pobrania testu: ', err);
            Alert.alert('Nie udało się pobrać testu');
        }
    }
    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.drawerHeader}>
                <Text style={styles.title}>Quiz App</Text>
                <Image source={require('../assets/quiz.png')} style={styles.image} />
            </View>
            <DrawerItemList {...props} />
            <View style={styles.buttonContainer}>
                <Button title="Losuj Test" onPress={navigateToRandomTest} />
            </View>
            <View style={styles.buttonContainer}>
                <Button title="Odśwież Testy" onPress={refreshTest} />
            </View>
        </DrawerContentScrollView>
    );
};



const styles = StyleSheet.create({
    drawerHeader: {
        padding: 20,
        alignItems: 'center',
        backgroundColor: 'fff'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 50,
        marginBottom: 20,
    },
    buttonContainer: {
        marginHorizontal: 20,
        marginTop: 10,
    }
})

export default DrawerActivity;