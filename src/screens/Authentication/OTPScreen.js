import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, SafeAreaView } from "react-native";
import GlobalStyles, { primaryColor } from "../../../assets/styles/GlobalStyles";
import FillButton from "../../components/FillButton"; // Assuming you have this component
import OTPInput from "../../components/OTPInput";
import axios from "../../API/axios";

/* Tran Binh Phuoc do this task */
function OTPScreen({ navigation, route }) {
  const { email } = route.params;
  const otpLength = 6;
  const [OTPValue, setOTPValue] = useState(new Array(otpLength).fill("")); // Initialize with empty strings
  const config = {
    headers: {
      "Content-Type": "application/json"
    },
    withCredentials: true
  };

  /* call axios to check otp input with otp that user received */
  const handleContinue = async () => {
    console.log("OTP Value:", OTPValue.join("")); // Combine array to form OTP string
    try {
      //check rỗng
      if(OTPValue.join("") ===''){
          showToast('warning', 'Need to fill them all out');
          return;
      }
      const response = await axios.post('/login/check-code', { inputCode: OTPValue.join("") },config);
      console.log(response.data);
      if(response.data.status === 'Error'){
          showToast('error', 'Incorrect Confirm Code')
      }else{
          navigation.navigate("ResetPass", {email: email})
      }
    } catch (error) {
      // Handle login error, show error message, etc.
      console.error('Login failed:', error);
    }
  };

  const handleResend = async () => {
    try {
      const response = await axios.post('/login/forgot-sendmail', { to: email }, config);
      //console.log(email);
      //console.log('response: ', response.data);
      if (response.data.status === 'Success') {
        Alert.alert('Resend Success');
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
        <Text style={[GlobalStyles.h1, { color: primaryColor.yellowPrimary }, GlobalStyles.mb20]}>Verification</Text>
        <View style={[GlobalStyles.mt10]}>
          <Text style={[GlobalStyles.basicText, GlobalStyles.alightSelfCenter, GlobalStyles.mb20]}>
            Enter 6 digits code that you received on your email.
          </Text>
          <OTPInput length={otpLength} value={OTPValue} onChange={setOTPValue} />
          <View style={[GlobalStyles.flex, { flexDirection: "row" }, GlobalStyles.alightSelfCenter, GlobalStyles.mt20]}>
            <Text style={[GlobalStyles.basicText]}>Didn't received OTP code? </Text>
            <TouchableOpacity onPress={handleResend}>
              <Text style={[GlobalStyles.basicText, { color: primaryColor.yellowPrimary }]}>Resend OTP code</Text>
            </TouchableOpacity>
          </View>
          <View style={[GlobalStyles.alightItemCenter, GlobalStyles.mt20]}>
            <FillButton backgroundColor={primaryColor.yellowPrimary} color={primaryColor.whitePrimary} text="Continue" onPress={handleContinue} />
          </View>
          <TouchableOpacity style={[{ alignItems: "center" }, GlobalStyles.mt20]} onPress={() => navigation.navigate("Login")}>
            <Text style={[GlobalStyles.basicText, { color: primaryColor.blackPrimary }]}>Back To Login</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default OTPScreen;
