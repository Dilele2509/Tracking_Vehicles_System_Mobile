import React, { useState } from "react";
import GlobalStyles, { primaryColor } from "../../../../assets/styles/GlobalStyles";
import { Alert, Keyboard, KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Platform, TouchableWithoutFeedback } from "react-native";
import axios from '../../../API/axios'
import { InputBox, CheckBox, FillButton } from "../../../components";


function SignUp({ navigation, route }) {
    const [secureText, setSecureText] = useState(true)
    const { fullName, email, phone, address } = route.params
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleToggle = () => setSecureText(!secureText)

    /* const handleSignUp = async () => {
        try {
            if (password === '' || confirmPassword === '') {
                Alert.alert("Need to fill them all out")
                return;
            }
            if (password !== confirmPassword) {
                console.error('Password and Confirm Password do not match');
                Alert.alert("Password and Confirm Password do not match")
                return;
            }

            const response = await axios.post('/user/add', {
                role_id: 1, // this is hardcoded to set the default role as user
                full_name: fullName,
                email: email,
                address: address,
                phone_num: phone,
                password: password,
            });

            if (response.data.status !== 'Error') {
                Alert.alert("Signup success!")
                navigation.replace("Login");
            } else {
                Alert.alert('Error: ', response.data.message);
            }
        } catch (error) {
            console.error('Registration failed:', error);
            Alert.alert('Registration failed:', error.message || error.toString());
        }
    }; */
    const handleSignUp = async () => {
        Alert.alert("Signup success!")
        navigation.replace("Login");
    }

    return (
        <SafeAreaView style={[GlobalStyles.heighFullScreen, { backgroundColor: primaryColor.creamPrimary }]}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    style={[GlobalStyles.padScreen20, { flex: 1 }]}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <View style={{ flex: 1, justifyContent: 'space-between' }}>
                        <View style={{ flex: 9 }}>
                            <Text style={[GlobalStyles.h1, { color: primaryColor.yellowPrimary }]}>CREATE NEW ACCOUNT</Text>
                            <View style={styles.mTop25}>
                                <InputBox
                                    text="Password"
                                    textColor={primaryColor.darkPrimary}
                                    placeholder="Enter your password"
                                    secureTextEntry={secureText}
                                    value={password}
                                    onChangeText={setPassword}
                                />
                                <InputBox
                                    text="Confirm Password"
                                    textColor={primaryColor.darkPrimary}
                                    placeholder="Confirm password"
                                    secureTextEntry={secureText}
                                    value={confirmPassword}
                                    onChangeText={setConfirmPassword}
                                />
                                <View style={[styles.mt15, GlobalStyles.flex, GlobalStyles.inLine, { justifyContent: "space-between" }]}>
                                    <CheckBox
                                        onToggle={handleToggle}
                                        size={20}
                                        color={primaryColor.yellowPrimary}
                                        iconColor={primaryColor.lightPrimary}
                                        widthSize={130}
                                        text={"Show Password"}
                                    />
                                </View>
                                <View style={[styles.mTop25, GlobalStyles.alightItemCenter]}>
                                    <FillButton onPress={handleSignUp} color={primaryColor.whitePrimary} backgroundColor={primaryColor.yellowPrimary} text={"Sign Up"} />
                                    <TouchableOpacity onPress={() => navigation.navigate("Login")} style={styles.mTop25}>
                                        <Text style={[GlobalStyles.basicText, { color: primaryColor.blackPrimary }]}>Already have an account?</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={{ flex: 1, alignItems: 'center' }}>
                            <TouchableOpacity onPress={() => navigation.navigate("Welcome")}>
                                <Text style={[GlobalStyles.basicText, styles.mTop25]}>Back To Welcome</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    mTop25: {
        marginTop: 25,
    },
    mt15: {
        marginTop: 15,
    },
})

export default SignUp;
