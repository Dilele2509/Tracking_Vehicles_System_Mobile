import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FooterProvider } from '../provider/FooterProvider';
import AppTabNavigator from './AppTabNavigator';

// Import screens
import WelcomeScreen from '../screens/General/WelcomeScreen';
import Login from '../screens/Authentication/Login';
import SignUp from '../screens/Authentication/SignUp/SignUp';
import SignUpInfo from '../screens/Authentication/SignUp/SignUpInfo';
import ForgotPass from '../screens/Authentication/ForgotPass';
import OTPScreen from '../screens/Authentication/OTPScreen';
import ViewAllScreen from '../screens/General/ViewAllScreen';
import LicenseScreen from '../screens/Driver/LicenseScreen';
import BlogScreen from '../screens/General/BlogScreen';
import AddVehicleScreen from '../screens/Driver/AddVehicleScreen';
import { Text, TouchableOpacity } from 'react-native';
import { primaryColor } from '../../assets/styles/GlobalStyles';
import VehicleInfoScreen from '../screens/Driver/VehicleInfoScreen';
import HowToUseScreen from '../screens/General/HowToUseScreen';
import EditUserInfo from '../screens/General/Account/EditUserInfo';
import EditSecurity from '../screens/General/Account/EditSecurity';

const Stack = createNativeStackNavigator();

function AppNavigator() {

    return (
        <FooterProvider>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{ headerShown: false }}>
                    <Stack.Screen name="Welcome" component={WelcomeScreen} />
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Signup" component={SignUp} />
                    <Stack.Screen name="SignUpInfo" component={SignUpInfo} />
                    <Stack.Screen name="forgotPass" component={ForgotPass} />
                    <Stack.Screen name="OTPScreen" component={OTPScreen} />
                    <Stack.Screen name="ViewAll" component={ViewAllScreen} />
                    <Stack.Screen name="License" component={LicenseScreen} />
                    <Stack.Screen name="BlogScreen" component={BlogScreen} />
                    <Stack.Screen
                        name="AddVehicle"
                        component={AddVehicleScreen}
                        options={({ navigation }) => ({
                            animationEnabled: true,
                            presentation: 'modal', // Use modal for slide-up effect
                            headerShown: true, // Enable header for AddVehicleScreen
                            headerRight: () => (
                                <TouchableOpacity onPress={() => navigation.goBack()}>
                                    <Text style={{ marginRight: 10, color: primaryColor.bluePrimary }}>Cancel</Text>
                                </TouchableOpacity>
                            ),
                        })}
                    />
                    <Stack.Screen name="VehicleInfo" component={VehicleInfoScreen} />
                    <Stack.Screen name="HowToUse" component={HowToUseScreen} />
                    <Stack.Screen name='EditUser' component={EditUserInfo}/>
                    <Stack.Screen name='EditSecurity' component={EditSecurity}/>
                    <Stack.Screen name="Main" component={AppTabNavigator} />
                </Stack.Navigator>
            </NavigationContainer>
        </FooterProvider>
    );
}

export default AppNavigator;