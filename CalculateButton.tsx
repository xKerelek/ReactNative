import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

const CalculateButton = ({label, onPress, style, textStyle }) => {
    return (
        <TouchableOpacity style={[style.button, style]} onPress={() => onPress(label)}>
            <Text style={[styles.buttonText, textStyle]}>{label}</Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 4,
        borderRadius: 5,
      },
      buttonText: {
        color: '#ffffff',
        fontSize: 20,
      },


});

export default CalculateButton;