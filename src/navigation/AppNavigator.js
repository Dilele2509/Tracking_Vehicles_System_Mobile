import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FooterProvider } from '../provider/FooterProvider';

// Import screens
// Authentication screen
import WelcomeScreen from '../screens/General/WelcomeScreen';
import Login from '../screens/Authentication/Login';
import SignUp from '../screens/Authentication/SignUp/SignUp';
import SignUpInfo from '../screens/Authentication/SignUp/SignUpInfo';
import ForgotPass from '../screens/Authentication/ForgotPass';
import OTPScreen from '../screens/Authentication/OTPScreen';

// Owner screen
import HomeScreenOwner from "../screens/Owner/HomeScreen";
import AccountScreen from "../screens/General/AccountScreen";

const Stack = createNativeStackNavigator();

// Define routes for owners
const ownerRoutes = [
    { name: 'HomeScreen', component: HomeScreenOwner },
    { name: 'Account', component: AccountScreen },
];

// Define routes for drivers
const driverRoutes = [
    { name: 'HomeScreen', component: HomeScreenOwner }, // Use a separate HomeScreen for drivers if available
    { name: 'DriverAccount', component: AccountScreen },
    // Add other driver-specific screens...
];

// Function to create a stack navigator for a given role
const createStackNavigator = (routes) => (
    routes.map(route => (
        <Stack.Screen key={route.name} name={route.name} component={route.component} />
    ))
);

function AppNavigator() {
    const [userRole] = useState('owner'); // For example, use 'owner' or 'driver' to switch roles
    const useRoutes = userRole === 'owner' ? ownerRoutes : driverRoutes;

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

                    {/* Render role-specific routes */}
                    {createStackNavigator(useRoutes)}
                </Stack.Navigator>
            </NavigationContainer>
        </FooterProvider>
    );
}

export default AppNavigator;
