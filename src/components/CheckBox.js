import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome"
import GlobalStyles from "../../assets/styles/GlobalStyles";


/* Le Thuy Tuong Vy do this task */
function CheckBox(props) {
    const { size, color, iconColor, text, widthSize, onToggle } = props
    const [isChecked, setIsChecked] = useState(false)

    const handleCheck = ()=>{
        setIsChecked(!isChecked)
        onToggle()
    }
    return (
        <TouchableOpacity onPress={handleCheck} style={[
            GlobalStyles.inLine,
            {width: widthSize},
            ]}>
            <View style={[
                styles.checkBoxStyle,
                { width: size },
                { height: size },
                { borderColor: color },
                { backgroundColor: isChecked ? color : "transparent" }
            ]}
            >
                {isChecked ? (
                    <>
                        <Icon name="check" size={size - 5} color={iconColor} />
                    </>
                ) : null}
            </View>
            <Text style={[GlobalStyles.basicText, GlobalStyles.ml10]}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    checkBoxStyle: {
        alignItems: "center",
        justifyContent: "center",
        padding: 1,
        borderWidth: 1,
        borderStyle: "solid",
        borderRadius: 4
    }
})

export default CheckBox;