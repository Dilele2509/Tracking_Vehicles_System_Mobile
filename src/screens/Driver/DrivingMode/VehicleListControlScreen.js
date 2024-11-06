import React, { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import GlobalStyles, { primaryColor } from '../../../../assets/styles/GlobalStyles';
import axios from '../../../API/axios';
import { AntDesign } from '@expo/vector-icons';
import {BASEURL} from '@env'

export default function VehicleListControlScreen({ navigation }) {
    const [vehicles, setVehicles] = useState([]);

    const fetchData = useCallback(() => {
        axios.post('/vehicles/user-id')
            .then((response) => {
                if (Array.isArray(response.data)) {
                    // Filter out only the data with status == 0
                    const filteredData = response.data.filter(vehicle => vehicle.status === 0);
                    /* console.log(filteredData); */
                    setVehicles(filteredData);
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

    const handleVehicleSelect = (vehicle) => {
        navigation.navigate('Driving Mode', { vehicle });
    };

    const handleAddVehicle = () => {
        navigation.navigate("AddVehicle");
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.vehicleItem} onPress={() => handleVehicleSelect(item)}>
            <Text style={styles.vehicleText}>
                {item.vehicle_brand} {item.vehicle_line}
            </Text>
            <Text style={styles.licenseText}>
                {item.license_plate}
            </Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {vehicles.length === 0 ? (
                <View style={[GlobalStyles.padScreen20, GlobalStyles.mt10, { backgroundColor: primaryColor.whitePrimary }]}>
                    <TouchableOpacity
                        onPress={handleAddVehicle}
                        style={[GlobalStyles.flex, GlobalStyles.mt15]}>
                        <AntDesign name='pluscircleo' size={32} color={primaryColor.yellowPrimary} />
                        <Text style={[GlobalStyles.h4, styles.textContent, { color: primaryColor.blackPrimary }]}>
                            Have no vehicles{'\n'}
                            Click here to add more
                        </Text>
                    </TouchableOpacity>
                </View>
            ) :
                (
                    <FlatList
                        data={vehicles}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                    />
                )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: primaryColor.whitePrimary,
        paddingHorizontal: 16,
        paddingTop: 14
    },
    textContent: {
        marginTop: 5,
        color: primaryColor.blackPrimary,
        fontSize: 16,
        fontWeight: "500",
        textAlign: "center",
    }, 
    vehicleItem: {
        padding: 16,
        backgroundColor: primaryColor.darkPrimary,
        borderRadius: 10,
        marginBottom: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    vehicleText: {
        fontSize: 18,
        fontWeight: '600',
        color: primaryColor.yellowPrimary,
    },
    licenseText: {
        fontSize: 14,
        color: primaryColor.whitePrimary,
        marginTop: 4,
    },
});
