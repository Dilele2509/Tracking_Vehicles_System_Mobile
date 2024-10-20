import React, { useState } from "react";
import GlobalStyles, { primaryColor } from "../../../../assets/styles/GlobalStyles";
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, ScrollView } from "react-native";
import { InputBox, FillButton } from "../../../components";

/* Tran Binh Phuoc do this task */
function SignUpInfo({ navigation }) {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');

    const handlePhoneChange = (input) => {
        // Remove non-numeric characters from input
        const formattedInput = input.replace(/\D/g, '');
        setPhone(formattedInput);
    };

    const handleNextStep = () => {
        try {
            if (fullName === '' || email === '' || address === '' || phone === '') {
                Alert.alert("Need to fill them all out");
                return;
            }
            navigation.navigate("Signup", { fullName: fullName, email: email, address: address, phone: phone });
        } catch (error) {
            Alert.alert('Error:', error.message);
        }
    };

    return (
        <SafeAreaView style={[GlobalStyles.heighFullScreen, { backgroundColor: primaryColor.creamPrimary }]}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView 
                    style={[GlobalStyles.padScreen20, { flex: 1 }]} 
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={{ flex: 1, justifyContent: 'space-between' }}>
                            <View style={{ flex: 9 }}>
                                <Text style={[GlobalStyles.h1, { color: primaryColor.yellowPrimary }]}>CREATE NEW ACCOUNT</Text>
                                <View style={styles.mTop25}>
                                    <InputBox
                                        text="Username"
                                        textColor={primaryColor.darkPrimary}
                                        placeholder="Enter your username"
                                        value={fullName}
                                        onChangeText={setFullName}
                                    />
                                    <InputBox
                                        text="Email"
                                        textColor={primaryColor.darkPrimary}
                                        placeholder="Enter your email"
                                        value={email}
                                        onChangeText={setEmail}
                                    />
                                    <InputBox
                                        text="Address"
                                        textColor={primaryColor.darkPrimary}
                                        placeholder="Enter your address"
                                        value={address}
                                        onChangeText={setAddress}
                                    />
                                    <InputBox
                                        text="Phone Number"
                                        type="numeric"
                                        textColor={primaryColor.darkPrimary}
                                        placeholder="Enter your phone number"
                                        value={phone}
                                        onChangeText={handlePhoneChange}
                                    />
                                    <View style={[styles.mTop25, GlobalStyles.alightItemCenter]}>
                                        <FillButton onPress={handleNextStep} color={primaryColor.whitePrimary} backgroundColor={primaryColor.yellowPrimary} text={"Next Step"} />
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
                    </ScrollView>
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    mTop25: {
        marginTop: 25,
    },
    mt15: {
        marginTop: 15,
    },
});

export default SignUpInfo;
