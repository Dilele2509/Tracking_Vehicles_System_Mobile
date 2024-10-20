// Footer.js
import React, { useContext } from "react";
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { FooterContext } from "../provider/FooterProvider";
import GlobalStyles, { primaryColor } from "../../assets/styles/GlobalStyles";
import { MaterialCommunityIcons, FontAwesome5, Ionicons, FontAwesome } from '@expo/vector-icons';

/* Le Thuy Tuong Vy do this task */
const iconComponents = {
    MaterialCommunityIcons,
    FontAwesome5,
    Ionicons,
    FontAwesome,
};

function Footer({ navigation }) {
    const { btnType, handlePress } = useContext(FooterContext);

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {btnType.map((btn, index) => {
                    const IconComponent = iconComponents[btn.iconBtn];
                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => handlePress(index, navigation)}
                            style={styles.taskBarItem}
                        >
                            <IconComponent 
                                name={btn.iconBtnName} 
                                size={26} 
                                color={btn.isSelected ? primaryColor.yellowPrimary : primaryColor.brownPrimary} 
                            />
                            <Text style={[styles.titleTaskBar, btn.isSelected && styles.isChoose]}>
                                {btn.titleBtn}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        justifyContent: 'flex-end', // Ensures the footer is at the bottom
        backgroundColor: primaryColor.creamPrimary,
    },
    container: {
        backgroundColor: primaryColor.creamPrimary,
        width: "100%",
        height: 55,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        position: 'absolute',
        bottom: 0,
    },
    taskBarItem: {
        alignItems: "center",
        marginTop: 10
    },
    titleTaskBar: {
        fontSize: 14,
        fontWeight: "500", 
        color: primaryColor.brownPrimary
    },
    isChoose: {
        color: primaryColor.yellowPrimary 
    }
});

export default Footer;
