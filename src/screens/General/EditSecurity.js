import React, { useState, useCallback, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Dimensions, Image, TextInput, Alert } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import GlobalStyles, { primaryColor } from "../../../assets/styles/GlobalStyles";
import axios from "../../API/axios";
import { FillButton, InputBox, CheckBox, SplashScreen } from "../../components";

const { width } = Dimensions.get('window');


/* Tran Binh Phuoc do this task */
function EditSecurity({ navigation, route }) {
    const { titlePage } = route.params;
    const [checkPass, setCheckPass] = useState(false)
    const [currentPass, setCurrentPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [secureText, setSecureText] = useState(true);
    const [isLoading, setIsLoading] = useState(false); // State to control loading state

    const handleToggle = () => setSecureText(!secureText);

    const checkCurrentPass = () => {
        //console.log(currentPass);
        axios.post("/login/check-password", { password: currentPass })
            .then((response) => {
                //console.log(response.data);
                if (response.data) {
                    console.log(response.data);
                    setCheckPass(!checkPass)
                } else {
                    Alert.alert("Incorrect Password")
                }
            })
            .catch((error) => {
                Alert.alert(error.message)
                console.error('Error check password data:', error);
            });
    }
    const handleSaveEdit = () => {
        setIsLoading(true)
        //console.log(newPass);
        axios.put("/user/security", { password: newPass })
            .then((response) => {
                console.log(response.data);
                    console.log(response.data);
                    setCheckPass(!checkPass)
                    Alert.alert("Change Password Success")
            })
            .catch((error) => {
                Alert.alert(error.message)
                console.error('Error check password data:', error);
            })
            .finally(() => {
                setIsLoading(false); // Set loading state to false after fetching data
            });
    }
    return (
        <SafeAreaView style={[{ flex: 1, backgroundColor: primaryColor.creamPrimary }]}>
            {/* Splash screen while loading */}
            <SplashScreen isLoading={isLoading} />
            {/* Page content */}
            {!isLoading && (<>
                <View style={[GlobalStyles.padScreen20, styles.headerPage]}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <AntDesign name="arrowleft" size={24} color={primaryColor.yellowPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.titleText}>{titlePage}</Text>
                </View>
                <View style={[styles.contentContainer]}>
                    {!checkPass ? (
                        <InputBox
                            text="Your current password:"
                            textColor={primaryColor.blackPrimary}
                            secureTextEntry={secureText}
                            placeholder="Enter your current password"
                            value={currentPass}
                            onChangeText={setCurrentPass}
                        />
                    ) : (
                        <>
                            <InputBox
                                text="Your new password:"
                                textColor={primaryColor.blackPrimary}
                                secureTextEntry={secureText}
                                placeholder="Enter your new password"
                                value={newPass}
                                onChangeText={setNewPass}
                            />
                        </>
                    )}
                    <View style={[styles.mt15, GlobalStyles.flex, GlobalStyles.inLine, { justifyContent: "space-between" }]}>
                        <CheckBox
                            onToggle={handleToggle}
                            size={20}
                            color={primaryColor.yellowPrimary}
                            iconColor={primaryColor.whitePrimary}
                            widthSize={130}
                            text={"Show Password"}
                        />
                    </View>
                </View>
                {checkPass ? (
                    <>
                        <View style={[{ alignItems: "center" }]}>
                            <FillButton onPress={handleSaveEdit} color={primaryColor.whitePrimary} backgroundColor={primaryColor.yellowPrimary} text="Save Change" />
                        </View>
                        <View style={[{ alignItems: "center", marginTop: 20 }]}>
                            <FillButton onPress={() => setCheckPass(!checkPass)} color={primaryColor.whitePrimary} backgroundColor={primaryColor.redPrimary} text="Cancel Change" />
                        </View>
                    </>
                ) : (
                    <View style={[{ alignItems: "center", marginTop: 20 }]}>
                        <FillButton onPress={checkCurrentPass} color={primaryColor.whitePrimary} backgroundColor={primaryColor.yellowPrimary} text="Change Password" />
                    </View>
                )}
            </>)}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mt15: {
        marginTop: 15
    },
    headerPage: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        position: "relative",
        width: width - 40, // adjust according to padding/margin
    },
    titleText: {
        fontSize: 24,
        fontWeight: '500',
        color: primaryColor.yellowPrimary,
        position: "absolute",
        width: width,
        textAlign: "center",
        zIndex: -999
    },
    contentContainer: {
        alignItems: "center",
        padding: 20
    },
    avaArea: {
        alignItems: "center",
        paddingBottom: 20
    },
    InfoArea: {
        width: "100%"
    },
    userAva: {
        width: 150,
        height: 150,
        resizeMode: "cover",
        borderRadius: 100,
        borderWidth: 2,
        borderColor: primaryColor.blackPrimary,
    },
    mt15: {
        marginTop: 15,
    },
    inputStyle: {
        width: 200,
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
});

export default EditSecurity;
