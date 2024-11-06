import React, { useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import GlobalStyles, { primaryColor } from "../../assets/styles/GlobalStyles";

function InputBox(props) {
    const [isFocus, setIsFocus] = useState(false);
    const { text, textColor, placeholder, secureTextEntry, value, onChangeText, type } = props;

    return (
        <View style={{ marginTop: 15 }}>
            {text && (<Text style={[GlobalStyles.h4, { color: textColor }]}>{text}</Text>)}
            <TextInput
                keyboardType={type ? type : "default"}
                secureTextEntry={secureTextEntry}
                style={[styles.inputStyle, styles.mt15, GlobalStyles.alightSelfCenter, isFocus && styles.inputFocus]}
                placeholder={placeholder}
                placeholderTextColor={"#999"}
                value={value}
                onChangeText={onChangeText}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    mt15: {
        marginTop: 15,
    },
    inputStyle: {
        width: 350,
        height: 50,
        borderColor: primaryColor.yellowPrimary,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderRadius: 20,
        borderWidth: 1,
        paddingHorizontal: 15,
        color: primaryColor.blackPrimary,
    },
    inputFocus: {
        borderColor: primaryColor.darkPrimary,
        backgroundColor: primaryColor.whitePrimary,
        color: primaryColor.yellowPrimary,
    }
})

export default InputBox;
