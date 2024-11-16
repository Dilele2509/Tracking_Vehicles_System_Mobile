import React, { useContext } from "react";
import { StyleSheet, View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { FooterContext } from "../provider/FooterProvider";
import { MaterialCommunityIcons, Feather, AntDesign, Ionicons, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { primaryColor } from "../../assets/styles/GlobalStyles";

const iconComponents = {
    MaterialCommunityIcons,
    MaterialIcons,
    AntDesign,
    Feather,
    Ionicons,
    FontAwesome
};

function CustomTabBar({ navigation }) {
    const { btnType, handlePress } = useContext(FooterContext);
    
    const currentRouteName = navigation.getState().routes[navigation.getState().index].name;

    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>
                {btnType.map((btn, index) => {
                    const IconComponent = iconComponents[btn.iconBtn];

                    const isSelected = btn.nextPage === currentRouteName;

                    return (
                        <TouchableOpacity
                            key={index}
                            onPress={() => {
                                handlePress(index);
                                navigation.navigate(btn.nextPage);
                            }}
                            style={styles.taskBarItem}
                        >
                            <IconComponent
                                name={btn.iconBtnName}
                                size={22}
                                color={isSelected ? primaryColor.yellowPrimary : primaryColor.darkPrimary}
                            />
                            <Text style={[styles.titleTaskBar, isSelected && styles.isChoose]}>
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
        backgroundColor: primaryColor.whitePrimary,
    },
    container: {
        backgroundColor: primaryColor.whitePrimary,
        /* marginTop: -20, */
        paddingTop: 10,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    taskBarItem: {
        alignItems: "center",
    },
    titleTaskBar: {
        fontSize: 12,
        fontWeight: "500",
        color: primaryColor.darkPrimary
    },
    isChoose: {
        color: primaryColor.yellowPrimary
    }
});

export default CustomTabBar;
