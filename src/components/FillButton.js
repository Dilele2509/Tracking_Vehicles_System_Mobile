import React,{ Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";

function FillButton(props) {
    const {onPress, text, color, backgroundColor} = props
    return (
        <TouchableOpacity
            onPress={onPress}
            style={[
                styles.startButton,
                {backgroundColor: backgroundColor}
            ]} activeOpacity={0.7}>
            <Text style={[styles.buttonText, {color: color}]}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    startButton: {
        width: 250,
        height: 50,
        borderRadius: 20,
    },
    buttonText: {
        fontSize: 18,
        textAlign: "center",
        lineHeight: 50,
        fontWeight: "600",
    },
});

export default FillButton;