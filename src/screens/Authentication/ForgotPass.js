import React, { useState } from "react";
import GlobalStyles, { primaryColor } from "../../../assets/styles/GlobalStyles";
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { InputBox, FillButton } from "../../components";
import axios from "../../API/axios";


function ForgotPass({ navigation }) {
    const [email, setEmail] = useState('');

    const handleForgot = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        };

        if (email === '') {
            Alert.alert('Warning', 'Please fill in your email then try again');
            return;
        }

        try {
            const response = await axios.post('/login/forgot-sendmail', { to: email }, config);
            console.log('response: ', response.data.status);
            if (response.data.status === 'Success') {
                navigation.navigate("OTPScreen", {email: email});
            } else {
                Alert.alert(response.data.message);
            }
        } catch (error) {
            console.error('Forgot password request failed:', error);
            Alert.alert("Failed to send reset password email, please try again");
        }
    }

    return (
        <SafeAreaView style={[GlobalStyles.heighFullScreen, { backgroundColor: primaryColor.whitePrimary }]}>
            <View style={[GlobalStyles.padScreen20]}>
                <Text style={[GlobalStyles.h1, { color: primaryColor.yellowPrimary }]}>FORGOT PASSWORD</Text>
                <View style={[styles.mTop25]}>
                    <Text style={[GlobalStyles.basicText]}>
                        Enter the email associated with your account and we'll send an email instruction to reset your password.
                    </Text>
                    <InputBox
                        text="Email"
                        textColor={primaryColor.darkPrimary}
                        placeholder="Enter your email"
                        value={email}
                        onChangeText={setEmail}
                    />

                    <View style={[styles.mTop25, GlobalStyles.alightItemCenter]}>
                        <FillButton onPress={handleForgot} color={primaryColor.whitePrimary} backgroundColor={primaryColor.yellowPrimary} text={"Continue"} />
                        <TouchableOpacity onPress={() => navigation.navigate("Login")} style={[styles.mTop25]}>
                            <Text style={[GlobalStyles.basicText, { color: primaryColor.blackPrimary }]}>Back to Sign In</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
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
})

export default ForgotPass;