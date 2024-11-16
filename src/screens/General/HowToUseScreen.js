import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, Dimensions } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import GlobalStyles, { primaryColor } from '../../../assets/styles/GlobalStyles';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function HowToUseScreen({ navigation }) {
    const steps = [
        {
            id: 1,
            title: "Home",
            description: "Check your wallet balance, monitor balance fluctuations, view your driver license, vehicle information, and ratings from customers. Also, explore blog posts to gain useful insights for your job.",
            icon: () => <MaterialIcons name="home" size={30} color={primaryColor.darkPrimary} />,
        },
        {
            id: 2,
            title: "Location",
            description: "View and check your current location. Use this feature to ensure accurate navigation during trips.",
            icon: () => <MaterialIcons name="location-on" size={30} color={primaryColor.darkPrimary} />,
        },
        {
            id: 3,
            title: "Activities",
            description: "Track ongoing trips and view your trip history. This section helps you manage your completed and in-progress journeys.",
            icon: () => <MaterialIcons name="history" size={30} color={primaryColor.darkPrimary} />,
        },
        {
            id: 4,
            title: "Account",
            description: "Manage your account details, update personal information, or log out of the app.",
            icon: () => <MaterialIcons name="account-circle" size={30} color={primaryColor.darkPrimary} />,
        },
    ];

    return (
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
            <SafeAreaView>
                <View style={[GlobalStyles.padScreen20, styles.headerPage]}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <AntDesign name="arrowleft" size={24} color={primaryColor.yellowPrimary} />
                    </TouchableOpacity>
                </View>
                <Text style={styles.header}>How to Use the App</Text>
                {steps.map((step) => (
                    <View key={step.id} style={styles.stepContainer}>
                        <View style={styles.iconContainer}>{step.icon()}</View>
                        <View style={styles.textContainer}>
                            <Text style={styles.stepTitle}>{step.title}</Text>
                            <Text style={styles.stepDescription}>{step.description}</Text>
                        </View>
                    </View>
                ))}
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    titleText: {
        fontSize: 24,
        fontWeight: '500',
        color: primaryColor.yellowPrimary,
        position: "absolute",
        width: width,
        textAlign: "center",
        zIndex: -999,
    },
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        paddingHorizontal: 20,
    },
    contentContainer: {
        paddingTop: 20,
        paddingBottom: 30,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 20,
    },
    stepContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    iconContainer: {
        marginRight: 15,
    },
    textContainer: {
        flex: 1,
    },
    stepTitle: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
    },
    stepDescription: {
        fontSize: 14,
        color: '#666',
        marginTop: 4,
    },
});
