import React from "react";//-
import { StyleSheet, ImageBackground, Animated, Text, TouchableOpacity } from "react-native";//-
import { SafeAreaView } from 'react-native-safe-area-context';
import GlobalStyles, { primaryColor } from "../../../assets/styles/GlobalStyles";//-
import { FillButton, AppLogo } from '../../components';//-
import { useState, useEffect } from "react";//-

function WelcomeScreen({ navigation }) {
    const [isVisible, setIsVisible] = useState(false);
    const [logoAnimation] = useState(new Animated.Value(0));
    const [buttonAnimation] = useState(new Animated.Value(0));

    const showButton = () => {
        setIsVisible(true);
        Animated.timing(logoAnimation, {
            toValue: 1,
            duration: 1800,
            useNativeDriver: true,
        }).start();
        Animated.timing(buttonAnimation, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        showButton()
    }, []);
    return (
        <ImageBackground
            source={require("../../../assets/Images/welcome.jpeg")}
            style={styles.container}
        >
            <SafeAreaView style={[styles.content]}>
                {/* <Animated.View style={[styles.logoLayout, {
                    opacity: logoAnimation, transform: [{
                        translateY: logoAnimation.interpolate({
                            inputRange: [0, 1],
                            outputRange: [100, 0]
                        })
                    }]
                }]}>
                    <AppLogo/>
                    <Text style={[GlobalStyles.h4, { color: primaryColor.darkPrimary }]}>Delivery Food App</Text>
                </Animated.View> */}

                {isVisible && (
                    <Animated.View style={[styles.buttonLayout, { opacity: buttonAnimation }]}>
                        <FillButton onPress={() => navigation.navigate("Login")} text={'Sign In To Start'}
                            color={primaryColor.whitePrimary}
                            backgroundColor={primaryColor.darkPrimary} />

                        <TouchableOpacity onPress={() => navigation.navigate("SignUpInfo")}>
                            <Text style={[styles.commonText]}>Do not have account?</Text>
                        </TouchableOpacity>
                    </Animated.View>
                )}
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    content: {
//-
        flexDirection: "column",//-
        justifyContent: "center",//-
        flex: 1,//+
        justifyContent: "flex-end",//+
        alignItems: "center",
    },
    logoLayout: {
        flex: 7,
        top: "9%",
        alignItems: "center",
    },
    buttonLayout: {
        justifyContent: "flex-end",
        alignItems: "center",
        marginBottom: 50, // Adjust this value to position the button higher or lower//+
    },
    commonText: {
        color: primaryColor.blackPrimary,
        fontSize: 16,
        textAlign: "center",
        lineHeight: 50,
    }
});

export default WelcomeScreen;