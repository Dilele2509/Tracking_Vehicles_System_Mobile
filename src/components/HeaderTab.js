import React, { useState, useRef, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Animated,
    TouchableOpacity,
} from 'react-native';
import { useFocusEffect } from "@react-navigation/native";
import { primaryColor } from '../../assets/styles/GlobalStyles';

const HeaderTab = ({ tab1, tab2, setCurrentTab }) => {
    const [activeTab, setActiveTab] = useState(tab1);
    const translateX = useRef(new Animated.Value(0)).current;
    const [containerWidth, setContainerWidth] = useState(0);

    // Handle tab switch with animation
    const handleTabPress = (tab) => {
        setCurrentTab(tab);
        setActiveTab(tab);
        const toValue = tab === tab2 ? containerWidth * 0.46 : 0; // Adjust this value based on your layout
        Animated.timing(translateX, {
            toValue,
            duration: 300,
            useNativeDriver: true,
        }).start();
    };

    return (
        <View style={styles.headerTab}>
            <View
                style={styles.buttonTabArea}
                onLayout={(event) => {
                    const { width } = event.nativeEvent.layout;
                    setContainerWidth(width);
                }}
            >
                <TouchableOpacity
                    style={styles.tabButton}
                    onPress={() => handleTabPress(tab1)}>
                    <Text style={styles.tabButtonText}>{tab1}</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.tabButton}
                    onPress={() => handleTabPress(tab2)}>
                    <Text style={styles.tabButtonText}>{tab2}</Text>
                </TouchableOpacity>
                <Animated.View
                    style={[
                        styles.focusButton,
                        { transform: [{ translateX }] },
                    ]}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    headerTab: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTabArea: {
        display: 'flex',
        height: 45,
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '90%',
        flexDirection: 'row',
        backgroundColor: primaryColor.greyPrimary,
        borderRadius: 20,
        padding: 13,
    },
    tabButton: {
        width: '50%',
    },
    tabButtonText: {
        textAlign: 'center',
    },
    focusButton: {
        position: 'absolute',
        width: '58%',
        height: 45,
        backgroundColor: primaryColor.yellowPrimary,
        borderRadius: 20,
        zIndex: -1,
    },
});

export default HeaderTab;
