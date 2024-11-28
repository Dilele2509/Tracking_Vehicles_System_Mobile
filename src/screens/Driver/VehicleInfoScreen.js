import React, { useCallback, useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import GlobalStyles, { primaryColor } from '../../../assets/styles/GlobalStyles';
import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import axios from '../../API/axios';
import { BASEURL } from '@env'

const { width } = Dimensions.get('window');
export default function DeviceShopScreen({ navigation }) {
    const [vehicles, setVehicles] = useState({})
    const fetchData = useCallback(() => {
        axios.post(`/vehicles/user-id`)
            .then((response) => {
                const data = response.data;
                setVehicles(data);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });

    }, []);

    /* call back when focus screen */
    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [fetchData])
    );

    return (
        <SafeAreaView style={styles.deviceContainer}>
            <View style={[GlobalStyles.padScreen20, styles.headerPage]}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <AntDesign name="arrowleft" size={24} color={primaryColor.yellowPrimary} />
                </TouchableOpacity>
                <Text style={styles.titleText}>Vehicle's Information</Text>
            </View>
            <View style={[styles.vehicleInfoContent]}>
                <View>
                    <Image style={styles.vehicleImg} source={{ uri: `${BASEURL}${vehicles.thumbnail}` }} />
                    {console.log(`${BASEURL}${vehicles.thumbnail}`)}
                </View>
                <View style={styles.vehicleInfo}>
                    {/* Tiêu đề Xe */}
                    <Text style={styles.vehicleTitle}>
                        {vehicles.vehicle_brand} {vehicles.vehicle_line}
                    </Text>
                    <Text style={styles.licensePlate}>{vehicles.license_plate}</Text>

                    {/* Thông tin cơ bản */}
                    <View style={styles.infoSection}>
                        <Text style={styles.vehicleDetailLabel}>Odometer:</Text>
                        <Text style={styles.vehicleDetailValue}>12,000 km</Text>
                    </View>
                    <View style={styles.infoSection}>
                        <Text style={styles.vehicleDetailLabel}>Condition:</Text>
                        <Text style={styles.vehicleDetailValue}>9/10</Text>
                    </View>
                    <View style={styles.infoSection}>
                        <Text style={styles.vehicleDetailLabel}>Km per day:</Text>
                        <Text style={styles.vehicleDetailValue}>{vehicles.km_per_day ?? 0} Km</Text>
                    </View>
                    <View style={styles.infoSection}>
                        <Text style={styles.vehicleDetailLabel}>Parked time:</Text>
                        <Text style={styles.vehicleDetailValue}>{vehicles.parked_time ?? '00:00:00'}</Text>
                    </View>

                    {/* Trạng thái và ID thiết bị */}
                    <View style={styles.statusSection}>
                        <Text style={styles.vehicleDetailLabel}>Status:</Text>
                        <Text style={[styles.vehicleDetailValue, styles.statusValue]}>
                            {vehicles.status ? 'Driving' : 'Parking'}
                        </Text>
                    </View>
                    <View style={styles.infoSection}>
                        <Text style={styles.vehicleDetailLabel}>Device ID:</Text>
                        <Text style={styles.vehicleDetailValue}>{vehicles.device_id}</Text>
                    </View>
                </View>

            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    deviceContainer: {
        flex: 1,
    },
    headerPage: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 15,
        paddingHorizontal: 20,
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: primaryColor.darkPrimary,
        textAlign: "center",
        flex: 1,
        marginRight: 24, // Space for back icon
    },
    vehicleInfoContent: {
        padding: 20,
    },
    vehicleImg: {
        width: '100%',
        height: 250,
        borderRadius: 10,
        resizeMode: "cover",
        marginBottom: 20,
    },
    vehicleInfo: {
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
        marginBottom: 20,
    },
    vehicleTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: primaryColor.darkPrimary,
        marginBottom: 5,
    },
    licensePlate: {
        fontSize: 18,
        fontWeight: '600',
        color: primaryColor.yellowPrimary,
        marginBottom: 15,
    },
    infoSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 10,
    },
    vehicleDetailLabel: {
        fontSize: 16,
        color: '#666',
    },
    vehicleDetailValue: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    },
    statusSection: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 15,
        paddingTop: 10,
        borderTopWidth: 1,
        borderTopColor: '#eee',
    },
    statusValue: {
        color: primaryColor.yellowPrimary,
        fontWeight: 'bold',
    },
});


