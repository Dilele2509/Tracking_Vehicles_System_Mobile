import React, { useState } from "react";
import GlobalStyles, { primaryColor } from "../../../../assets/styles/GlobalStyles";
import { Alert, StyleSheet, Text, TouchableOpacity, View, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, ScrollView } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { InputBox, FillButton } from "../../../components";

function SignUpInfo({ navigation }) {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [birthday, setBirthday] = useState(new Date().toISOString().split('T')[0]);

    const handlePhoneChange = (input) => {
        const formattedInput = input.replace(/\D/g, '');
        setPhone(formattedInput);
    };

    const handleBirthdayChange = (event, selectedDate) => {
        if (selectedDate) {
            setBirthday(new Date(selectedDate).toISOString().split('T')[0]); // Format the date
        }
    };

    const handleNextStep = () => {
        try {
            if (fullName === '' || email === '' || phone === '' || birthday === '') {
                Alert.alert("Need to fill them all out");
                return;
            }
            navigation.navigate("Signup", { fullName, email, phone, birthday});
        } catch (error) {
            Alert.alert('Error:', error.message);
        }
    };

    return (
        <SafeAreaView style={[GlobalStyles.heighFullScreen, { backgroundColor: primaryColor.whitePrimary }]}>
            {console.log(birthday)}
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView
                    style={[GlobalStyles.padScreen20, { flex: 1 }]}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                >
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={{ flex: 1, justifyContent: 'space-between' }}>
                            <View style={{ flex: 9 }}>
                                <Text style={[GlobalStyles.h1, { color: primaryColor.yellowPrimary }]}>CREATE NEW DRIVER ACCOUNT</Text>
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
                                        text="Phone Number"
                                        type="numeric"
                                        textColor={primaryColor.darkPrimary}
                                        placeholder="Enter your phone number"
                                        value={phone}
                                        onChangeText={handlePhoneChange}
                                    />
                                    <View style={[GlobalStyles.flex, { alignItems: 'flex-start', marginTop: 15 }]}>
                                        <Text style={[GlobalStyles.h4, { marginBottom: 15 }]}>Birthday</Text>
                                        <DateTimePicker
                                            value={new Date(birthday)} // Use the current state
                                            mode="date"
                                            display="default"
                                            onChange={handleBirthdayChange}
                                        />
                                    </View>

                                    {/* User Type Selection */}
                                    <View style={[styles.mTop25, GlobalStyles.alightItemCenter]}>
                                        <FillButton
                                            onPress={handleNextStep}
                                            color={primaryColor.whitePrimary}
                                            backgroundColor={primaryColor.yellowPrimary}
                                            text={"Next Step"}
                                        />

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
    userTypeContainer: {
        flexDirection: 'row',
        marginTop: 15,
        marginBottom: 30
    },
    userTypeButton: {
        padding: 10,
        borderWidth: 1,
        borderColor: primaryColor.darkPrimary,
        borderRadius: 5,
        marginHorizontal: 10,
        backgroundColor: primaryColor.whitePrimary,
    },
    selectedButton: {
        borderColor: 'transparent',
        backgroundColor: primaryColor.yellowPrimary,
    },
});

export default SignUpInfo;
