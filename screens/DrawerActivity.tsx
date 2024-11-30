import { createDrawerNavigator } from "@react-navigation/drawer";
import { StyleSheet, View, Text, Image } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';


const Drawer = createDrawerNavigator();

const DrawerActivity = (props: any) => {
    return (
        <DrawerContentScrollView {...props}>
            <View style={styles.drawerHeader}>
                <Text style={styles.title}>Quiz App</Text>
                <Image source={require('../assets/quiz.png')} style={styles.image} />
            </View>
            <DrawerItemList {...props} />
        </DrawerContentScrollView>

    )
}

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
    }
})

export default DrawerActivity;