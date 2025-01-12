import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useDevicesStore } from '../store/storeZustand';
import { useNavigation } from '@react-navigation/native';
import NewDeviceScreen from './NewDeviceScreen';

export default function DeviceScreen() {
    const { devices, addDevice } = useDevicesStore();
    const [isAdding, setIsAdding] = useState(false);
    const [newDevice, setNewDevice] = useState({
        name: '',
        place: '',
        command: '',
        color: '#ffffcc',
    });

    const navigation = useNavigation();

    useEffect(() => {
        if (isAdding) {
            navigation.setOptions({ tabBarStyle: { display: 'none' }, title: 'New Device' });
        } else {
            navigation.setOptions({ tabBarStyle: { display: 'flex' }, title: 'Devices' });
        }
    }, [isAdding, navigation]);

    const handleAddDevice = () => {
        if (!newDevice.name || !newDevice.place) {
            Alert.alert('Error', 'Please fill in all required fields.');
            return;
        }
        addDevice(newDevice);
        setNewDevice({ name: '', place: '', command: '', color: '#ffffcc' });
        setIsAdding(false);
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Devices</Text>
            <View style={styles.separator}></View>
            {isAdding ? (
                <NewDeviceScreen
                    newDevice={newDevice}
                    setNewDevice={setNewDevice}
                    handleAddDevice={handleAddDevice}
                    handleCancel={() => setIsAdding(false)}
                />
            ) : (
                <FlatList
                    data={[...devices, { isAddButton: true }]}
                    keyExtractor={(item, index) => index.toString()}
                    numColumns={2}
                    renderItem={({ item }) => {
                        if ('isAddButton' in item) {
                            return (
                                <TouchableOpacity
                                    style={styles.addDeviceContainer}
                                    onPress={() => setIsAdding(true)}
                                >
                                    <Text style={styles.addDeviceContainerPlus}>+</Text>
                                </TouchableOpacity>
                            );
                        }
                        return (
                            <View style={[styles.newContainer, { backgroundColor: item.color }]}>
                                <Text style={styles.deviceName}>{item.name}</Text>
                                <Text style={styles.devicePlace}>{item.place}</Text>
                            </View>
                        );
                    }}
                />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5',
        paddingHorizontal: 10,
    },
    text: {
        fontSize: 40,
        textAlign: 'center',
        fontWeight: 'bold',
        padding: 20,
    },
    separator: {
        borderWidth: 1,
        marginVertical: 10,
        borderColor: '#ccc',
    },
    newContainer: {
        flex: 1,
        margin: 10,
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 150,
    },
    addDeviceContainer: {
        flex: 1,
        margin: 10,
        borderWidth: 3,
        borderStyle: 'dashed',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        aspectRatio: 1,
    },
    addDeviceContainerPlus: {
        fontSize: 50,
        fontWeight: 'bold',
        color: '#ff0000',
    },
    deviceName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#000',
    },
    devicePlace: {
        fontSize: 16,
        color: '#555',
        marginTop: 5,
    },
});

