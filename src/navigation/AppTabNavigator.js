import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Driver/HomeScreen';
import LocationScreen from '../screens/Driver/LocationScreen';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { primaryColor } from '../../assets/styles/GlobalStyles';
import { CustomTabBar, HeaderTab } from '../components';
import AccountScreen from '../screens/General/Account/AccountScreen';
import ActivitiesScreen from '../screens/Driver/ActivitiesManage/ActivitiesScreen';
import ActivityDetails from '../screens/Driver/ActivitiesManage/ActivityDetails';
import { AntDesign } from '@expo/vector-icons';
import HistoryDetails from '../screens/Driver/ActivitiesManage/HistoryDetails';
// Create the tab navigator
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function ActivitiesStack() {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Activities"
          component={ActivitiesScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Activity Details"
          component={ActivityDetails}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <AntDesign name="left" size={22} color={primaryColor.yellowPrimary} />
              </TouchableOpacity>
            ),
          })}
        />
        <Stack.Screen
          name="History Trip"
          component={HistoryDetails}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <AntDesign name="left" size={22} color={primaryColor.yellowPrimary} />
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
            <Tab.Screen name="Location" component={LocationScreen} />
            <Tab.Screen name="ActivitiesStack" component={ActivitiesStack} />
            <Tab.Screen name="Account" component={AccountScreen} />
        </Tab.Navigator>
    );
}

export default AppTabNavigator;