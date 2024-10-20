import React, { useState } from "react";
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView } from "react-native";
import GlobalStyles, { primaryColor } from "../../../assets/styles/GlobalStyles";
import { InputBox, CheckBox, FillButton } from "../../components";
import axios from "../../API/axios";

function ResetPass({ navigation, route }) {
    const {email} = route.params;
    const [secureText, setSecureText] = useState(true);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleToggle = () => setSecureText(!secureText);

    /* Tran Binh Phuoc do this task */
    const HandleResetPassword = async () => {
        try {
        if (password === '' || confirmPassword === '') {
            Alert.alert("Need to fill them all out");
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert("Password and Confirm Password does not match");
            return;
        }

        const response = await axios.put('/user/reset/', {
            email: email,
            password: password,
        });
        if (response.data.status !== 'Error') {
            navigation.replace('Login');
        } else {
            Alert.alert(response.data.message)
        }
        } catch (error) {
        console.error('Registration failed:', error);
        }
    };

    return (
        <SafeAreaView style={[GlobalStyles.heighFullScreen, { backgroundColor: primaryColor.creamPrimary }]}>
            <ScrollView contentContainerStyle={[GlobalStyles.padScreen20, styles.flex1]}>
                <View style={{ flex: 9 }}>
                    <Text style={[GlobalStyles.h1, { color: primaryColor.yellowPrimary }]}>Reset Password</Text>
                    <View style={styles.mTop25}>
                        <InputBox
                            text="New Password"
                            textColor={primaryColor.darkPrimary}
                            placeholder="Enter new password"
                            secureTextEntry={secureText}
                            value={password}
                            onChangeText={setPassword}
                        />
                        <InputBox
                            text="Confirm Password"
                            textColor={primaryColor.darkPrimary}
                            placeholder="Confirm your password"
                            secureTextEntry={secureText}
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                        />
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
                        <View style={[styles.mTop25, GlobalStyles.alightItemCenter]}>
                            <FillButton onPress={HandleResetPassword} color={primaryColor.whitePrimary} backgroundColor={primaryColor.yellowPrimary} text={"Continue"} />
                            <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.mTop25}>
                                <Text style={[GlobalStyles.basicText, { color: primaryColor.blackPrimary }]}>Back to Login?</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View style={{ flex: 1, alignItems: 'center' }}>
                    <TouchableOpacity onPress={() => navigation.navigate("Welcome")}>
                        <Text style={[GlobalStyles.basicText]}>Back To Welcome</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mTop25: {
        marginTop: 25
    },
    mt15: {
        marginTop: 15,
    },
    flex1: {
        flex: 1,
    }
})

export default ResetPass;
