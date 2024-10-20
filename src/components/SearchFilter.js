import React, { useState } from "react";
import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { Fontisto, Feather } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { primaryColor } from "../../assets/styles/GlobalStyles";

/* Nguyen Le Giang Ha do this task */
function SearchFilter(props) {
    const [isFocus, setIsFocus] = useState(false);
    const { placeholder, iconColor, value, onChangeText, onFileChosen } = props;

    const handleChooseFile = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const fileUri = result.assets[0].uri;
            onFileChosen(fileUri);
        }
    };

    return ( 
        <View style={[{alignItems: "center"}]}>
            <View style={[styles.inputContainer, isFocus && styles.inputFocus]}>
                <Fontisto name="search" size={24} color={iconColor} style={styles.icon} />
                <TextInput
                    keyboardType={"default"}
                    placeholder={placeholder}
                    placeholderTextColor={"#999"}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    value={value}
                    onChangeText={onChangeText}
                    style={styles.input}
                />
                <TouchableOpacity onPress={handleChooseFile}>
                    <Feather name="camera" size={24} color={iconColor} style={styles.icon} />
                </TouchableOpacity>
            </View>
        </View>
     );
}

const styles = StyleSheet.create({
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "90%",
        height: 50,
        backgroundColor: primaryColor.whitePrimary,
        borderRadius: 10,
        paddingHorizontal: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: .1,
        shadowRadius: .7
    },
    input: {
        flex: 1,
        marginLeft: 10,
        color: primaryColor.blackPrimary,
    },
    icon: {
        marginRight: 10,
    },
    inputFocus: {
        borderColor: primaryColor.blackPrimary,
        borderWidth: 1.5,
        borderStyle: "solid",
        backgroundColor: primaryColor.whitePrimary,
        color: primaryColor.yellowPrimary,
    }
});

export default SearchFilter;
