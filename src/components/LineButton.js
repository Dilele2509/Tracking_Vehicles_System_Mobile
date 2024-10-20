import {primaryColor} from "../../assets/styles/GlobalStyles";
import React,{ Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";

/* Nguyen Le Giang Ha do this task */
function LineButton(props) {
    const {onPress, text} = props
    return (
        <TouchableOpacity
            onPress={onPress}
            style={styles.startButton} activeOpacity={0.7}>
            <Text style={styles.buttonText}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    startButton: {
        width: 250,
        height: 50,
        borderRadius: 20,
        borderColor: primaryColor.yellowPrimary,
        borderWidth: 1,
        backgroundColor: "transparent",
    },
    buttonText: {
        color: primaryColor.darkPrimary,
        fontSize: 18,
        textAlign: "center",
        lineHeight: 50,
        fontWeight: "600",
    },
});

export default LineButton;