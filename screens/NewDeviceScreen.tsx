import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import ColorPicker from 'react-native-wheel-color-picker';

interface NewDeviceScreenProps {
    newDevice: {
        name: string;
        place: string;
        command: string;
        color: string;
    };
    setNewDevice: React.Dispatch<React.SetStateAction<{
        name: string;
        place: string;
        command: string;
        color: string;
    }>>;
    handleAddDevice: () => void;
    handleCancel: () => void;
}

export default function NewDeviceScreen({newDevice, setNewDevice, handleAddDevice, handleCancel,}: NewDeviceScreenProps) {
    const [showColorPicker, setShowColorPicker] = useState(false);

    return (
        <SafeAreaView style={styles.fullScreenContainer}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.modalTitle}>Add New Device</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Device Name"
                    value={newDevice.name}
                    onChangeText={(text) => setNewDevice({ ...newDevice, name: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Location"
                    value={newDevice.place}
                    onChangeText={(text) => setNewDevice({ ...newDevice, place: text })}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Command"
                    value={newDevice.command}
                    onChangeText={(text) => setNewDevice({ ...newDevice, command: text })}
                />
                <TouchableOpacity
                    style={styles.colorButton}
                    onPress={() => setShowColorPicker((prev) => !prev)}
                >
                    <Text style={styles.colorButtonText}>
                        {showColorPicker ? 'Hide Color Picker' : 'Change Color'}
                    </Text>
                </TouchableOpacity>
                {showColorPicker && (
                    <ColorPicker
                        color={newDevice.color}
                        onColorChange={(selectedColor) => setNewDevice({ ...newDevice, color: selectedColor })}
                        thumbSize={30}
                        sliderSize={40}
                        noSnap
                        row={false}
                    />
                )}

                <View style={styles.modalButtons}>
                    <View style={styles.buttonWrapper}>
                        <Button title="Cancel" color="#d9534f" onPress={handleCancel} />
                    </View>
                    <View style={styles.buttonWrapper}>
                        <Button title="Save" color="#5cb85c" onPress={handleAddDevice} />
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    fullScreenContainer: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f7f7f7',
    },
    scrollContainer: {
        paddingBottom: 50,
    },
    modalTitle: {
        fontSize: 26,
        fontWeight: '600',
        color: '#333',
        marginBottom: 20,
        textAlign: 'center',
    },
    input: {
        backgroundColor: '#e9ecef',
        padding: 15,
        marginBottom: 20,
        borderRadius: 8,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ced4da',
    },
    colorButton: {
        backgroundColor: '#007bff',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    colorButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
    colorPicker: {
        marginVertical: 20,
    },
    modalButtons: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 30,
    },
    buttonWrapper: {
        flex: 1,
        marginHorizontal: 5,
    },
});
