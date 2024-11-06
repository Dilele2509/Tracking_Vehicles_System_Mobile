import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Driver/HomeScreen';
import DrivingModeScreen from '../screens/Driver/DrivingMode/DrivingModeScreen'
import ActivitiesList from '../screens/Driver/ActivitiesManage/ActivitiesList';
import VehicleListControlScreen from '../screens/Driver/DrivingMode/VehicleListControlScreen';
import ActivityDetails from '../screens/Driver/ActivitiesManage/ActivityDetails';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { primaryColor } from '../../assets/styles/GlobalStyles';
import { CustomTabBar } from '../components';
import AccountScreen from '../screens/General/Account/AccountScreen';
// Create the tab navigator
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function DrivingModeStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Vehicle List" component={VehicleListControlScreen} />
            <Stack.Screen name="Driving Mode" component={DrivingModeScreen} />
        </Stack.Navigator>
    );
}

function ActivitiesStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen 
                name="Activities" 
                component={ActivitiesList} 
            />
            <Stack.Screen 
                name="Create Post"
                component={ActivityDetails}
                options={({ navigation }) => ({
                    animationEnabled: true,
                    presentation: 'modal', // Sử dụng modal cho hiệu ứng slide-up
                    headerRight: () => (
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <Text style={{ marginRight: 10, color: primaryColor.bluePrimary }}>Cancel</Text>
                        </TouchableOpacity>
                    ),
                })}
            />
        </Stack.Navigator>
    );
}

function AppTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{ headerShown: false }} // Hide the default header
            tabBar={(props) => <CustomTabBar {...props} />} // Use custom tab bar
        >
            <Tab.Screen name="HomeScreen" component={HomeScreen} />
            {/* Use the stack for driving mode */}
            <Tab.Screen name="DrivingMode" component={DrivingModeStack} />
            <Tab.Screen name="ActivitiesStack" component={ActivitiesStack} />
            <Tab.Screen name="Account" component={AccountScreen} />
        </Tab.Navigator>
    );
}

export default AppTabNavigator;
