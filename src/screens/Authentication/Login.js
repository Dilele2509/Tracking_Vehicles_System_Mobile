import React, { useState } from "react";
import { Alert, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView } from "react-native";
import GlobalStyles, { primaryColor } from "../../../assets/styles/GlobalStyles";
import { InputBox, CheckBox, FillButton } from "../../components";
import axios from "../../API/axios";

function Login({ navigation }) {
    const [secureText, setSecureText] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    /* show pass or hide pass */
    const handleToggle = () => setSecureText(!secureText);

    /* call axios to check info to login */
    const handleLogin = async () => {
        const config = {
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        };

        try {
            if (email === '' || password === '') {
                Alert.alert("Need to fill them all out");
                return;
            }

            const response = await axios.post('/login/user-login', { email, password }, config);

            if (response.data.status !== 'Error') {
                const userInfo = response.data;
                // Convert buffer to integer
                const deleted = userInfo.deleted.data[0];
                console.log('deleted: ', deleted);
                if (deleted !== 1) {
                    Alert.alert('login successful');
                    navigation.replace('Main');
                } else {
                    Alert.alert("Your account has been disabled");
                }
            } else {
                Alert.alert(response.data.message);
            }
        } catch (error) {
            console.error('Login failed:', error);
            Alert.alert("Login failed, please try again");
        }
    }; 

/*     const handleLogin = ()=>{
        navigation.navigate("Main");
    } */
    return (
        <SafeAreaView style={[GlobalStyles.heighFullScreen, { backgroundColor: primaryColor.whitePrimary }]}>
            <ScrollView contentContainerStyle={[GlobalStyles.padScreen20, styles.flex1]}>
                <View style={{ flex: 9 }}>
                    <Text style={[GlobalStyles.h1, { color: primaryColor.yellowPrimary }]}>SIGN IN</Text>
                    <View style={styles.mTop25}>
                        <InputBox
                            text="Email"
                            textColor={primaryColor.darkPrimary}
                            placeholder="Enter your email"
                            value={email}
                            onChangeText={setEmail}
                        />
                        <InputBox
                            text="Password"
                            textColor={primaryColor.darkPrimary}
                            placeholder="Enter your password"
                            secureTextEntry={secureText}
                            value={password}
                            onChangeText={setPassword}
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
                            <TouchableOpacity onPress={() => navigation.navigate("forgotPass")}>
                                <Text style={[GlobalStyles.basicText, { color: primaryColor.blackPrimary }]}>Forgot Password?</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={[styles.mTop25, GlobalStyles.alightItemCenter]}>
                            <FillButton onPress={handleLogin} color={primaryColor.whitePrimary} backgroundColor={primaryColor.yellowPrimary} text={"Sign In"} />
                            <TouchableOpacity onPress={() => navigation.navigate("SignUpInfo")} style={styles.mTop25}>
                                <Text style={[GlobalStyles.basicText, { color: primaryColor.blackPrimary }]}>Don't have an account?</Text>
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

export default Login;
