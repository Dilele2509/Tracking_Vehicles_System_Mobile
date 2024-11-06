import React, { useCallback, useRef, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Animated } from "react-native";
import GlobalStyles, { primaryColor } from "../../assets/styles/GlobalStyles";
import { FontAwesome, Ionicons, Entypo, FontAwesome6, MaterialCommunityIcons } from '@expo/vector-icons';
import axios from "../API/axios";



function Categories({ navigation }) {
    const scrollViewRef = useRef(null);
    const [scrollX] = useState(new Animated.Value(0));
    const [contentWidth, setContentWidth] = useState(1);
    const [containerWidth, setContainerWidth] = useState(1);
    const [vehicleRental, setVehicleRental] = useState([]);

    const handleContentSizeChange = (contentWidth) => {
        setContentWidth(contentWidth);
    };

    const handleLayout = ({ nativeEvent }) => {
        setContainerWidth(nativeEvent.layout.width);
    };

    const scrollIndicatorSize = containerWidth / contentWidth * 100; // Width of scroll indicator relative to its container
    const difference = containerWidth - scrollIndicatorSize;
    const scrollIndicatorPosition = Animated.multiply(scrollX, 100 / contentWidth).interpolate({
        inputRange: [0, Math.max(contentWidth - containerWidth, 1)],
        outputRange: [0, Math.max(difference, 1)],
        extrapolate: 'clamp',
    });

    const fetchData = useCallback(() => {
        axios.post('/vehicles/user-id')
            .then((response) => {
                if (Array.isArray(response.data)) {
                    // Filter out only the data with status == 1
                    const filteredData = response.data.filter(vehicle => vehicle.status === 1);
                    /* console.log(filteredData); */
                    setVehicleRental(filteredData);
                }
            })
            .catch((error) => {
                console.error('Error fetching vehicles:', error);
            });
    }, []); // Empty dependency array so that it's only defined once

    /* call back when focus screen */
    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [fetchData])
    );

    const handleRentalVehicle = () => {
        navigation.navigate("wallet");
    }

    const handleDriver = () => {
        /* navigation.navigate("DriverList", { titlePage: 'Driver List', allList: drivers }); */
    }

    const handleBlog = () => {
        navigation.navigate("BlogScreen");
    }

    const handleDeviceShop = () => {
        navigation.navigate("DeviceShop");
    }

    const handleHowToUse = () => {
        navigation.navigate("HowToUse");
    }

    return (
        <View style={styles.wrapper}>
            <ScrollView
                ref={scrollViewRef}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                onContentSizeChange={handleContentSizeChange}
                onLayout={handleLayout}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
            >
                <View style={[GlobalStyles.flexRow, styles.container]}>
                    <TouchableOpacity
                        onPress={handleRentalVehicle}
                        style={[GlobalStyles.ml20, styles.catItem]}
                    >
                        <Ionicons name="wallet" style={{ marginBottom: 7 }} size={20} color="#399918" />
                        <Text style={[{ fontSize: 13, color: "#399918" }]}>Wallet</Text>
                    </TouchableOpacity>


                    <TouchableOpacity
                        onPress={handleDriver} // Directly call the function
                        style={[GlobalStyles.ml20, styles.catItem]}>
                        <FontAwesome6 name="drivers-license" style={{ marginBottom: 7 }} size={20} color="#FFAF45" />
                        <Text style={[{ fontSize: 13, color: "#FFAF45" }]}>License</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleDeviceShop}
                        style={[GlobalStyles.ml20, styles.catItem]}>
                        <MaterialCommunityIcons name="car-info" style={{ marginBottom: 7 }} size={20} color="#524C42" />
                        <Text style={[{ fontSize: 13, color: "#524C42" }]}>Vehicle</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleBlog}
                        style={[GlobalStyles.ml20, styles.catItem]}>
                        <FontAwesome name="newspaper-o" style={{ marginBottom: 7 }} size={20} color="#E4003A" />
                        <Text style={[{ fontSize: 13, color: "#E4003A" }]}>Blog</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={handleHowToUse}
                        style={[GlobalStyles.ml20, styles.catItem]}>
                        <Entypo name="help-with-circle" style={{ marginBottom: 7 }} size={20} color="#40679E" />
                        <Text style={[{ fontSize: 13, color: "#40679E" }]}>How to use</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View style={styles.scrollIndicatorContainer}>
                <Animated.View style={[styles.scrollIndicator, { width: scrollIndicatorSize, transform: [{ translateX: scrollIndicatorPosition }] }]} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 10,
        position: 'relative',
        height: 70,
    },
    scrollView: {
        flex: 1,
    },
    container: {
        flexDirection: 'row',
        paddingBottom: 10,
    },
    catItem: {
        alignItems: "center",
        minWidth: 60,
        marginRight: 20,
    },
    scrollIndicatorContainer: {
        height: 3,
        width: 140,
        backgroundColor: '#E0E0E0',
        borderRadius: 1.5,
        position: 'absolute',
        bottom: 0,
        alignSelf: "center",
    },
    scrollIndicator: {
        height: 3,
        backgroundColor: primaryColor.yellowPrimary,
        borderRadius: 1.5,
    },
});

export default Categories;
