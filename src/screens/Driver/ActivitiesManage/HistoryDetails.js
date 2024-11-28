import React, { useEffect, useState, useRef, useCallback } from 'react';
import { StyleSheet, View, Text, Dimensions, ScrollView, Alert } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import { useFocusEffect } from '@react-navigation/native';
import axios from '../../../API/axios';
import GlobalStyles, { primaryColor } from '../../../../assets/styles/GlobalStyles';
import { MoneyFormat, RatingStars } from '../../../components';
import { MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function HistoryDetails({ route }) {
    const { id } = route.params;
    /* console.log(id); */
    const mapRef = useRef(null);

    const [tripInfo, setTripInfo] = useState({
        fromLocation: { x: 0, y: 0 },
        toLocation: { x: 0, y: 0 },
    });

    const [routeData, setRouteData] = useState({
        distance: 0,
        duration: 0,
        coordinates: [],
    });

    const [isLoadingTripInfo, setIsLoadingTripInfo] = useState(true);
    const [isLoadingRouteData, setIsLoadingRouteData] = useState(true);

    // Fetch Trip Information
    const fetchTripInfo = useCallback(() => {
        setIsLoadingTripInfo(true);
        axios
            .post('/trip/trip-completed', { tripId: id })
            .then((response) => {
                setTripInfo(response.data);
                setIsLoadingTripInfo(false);
            })
            .catch((err) => {
                console.error(err);
                setIsLoadingTripInfo(false);
                Alert.alert('Error', 'Failed to load trip details');
            });
    }, [id]);

    // Fetch Route Data (after tripInfo is populated)
    useEffect(() => {
        if (
            tripInfo.fromLocation.x !== 0 &&
            tripInfo.fromLocation.y !== 0 &&
            tripInfo.toLocation.x !== 0 &&
            tripInfo.toLocation.y !== 0
        ) {
            setIsLoadingRouteData(true);

            fetch(
                `https://router.project-osrm.org/route/v1/driving/${tripInfo.fromLocation.y},${tripInfo.fromLocation.x};${tripInfo.toLocation.y},${tripInfo.toLocation.x}?overview=full&geometries=geojson`
            )
                .then((response) => response.json())
                .then((data) => {
                    if (data.routes && data.routes.length > 0) {
                        const { distance, duration, geometry } = data.routes[0];
                        const coordinates = geometry.coordinates.map(([lng, lat]) => ({
                            latitude: lat,
                            longitude: lng,
                        }));

                        setRouteData({
                            distance: (distance / 1000).toFixed(2), // Convert meters to kilometers
                            duration: (duration / 60).toFixed(1),  // Convert seconds to minutes
                            coordinates,
                        });
                    }
                    setIsLoadingRouteData(false);
                })
                .catch((err) => {
                    console.error(err);
                    setIsLoadingRouteData(false);
                    Alert.alert('Error', 'Failed to load route details');
                });
        }
    }, [tripInfo]);

    // Automatically fetch data when screen is focused
    useFocusEffect(
        useCallback(() => {
            fetchTripInfo();
        }, [fetchTripInfo])
    );

    useEffect(() => {
        if (mapRef.current && routeData.coordinates.length > 0) {
            mapRef.current.fitToCoordinates(routeData.coordinates, {
                edgePadding: { top: 50, right: 50, bottom: 50, left: 50 },
                animated: true,
            });
        }
    }, [routeData]);

    return (
        <ScrollView style={styles.container}>
            <View style={styles.infoArea}>
                <Text style={{ marginBottom: 15, fontWeight: '500' }}>Booking ID: {tripInfo.id}</Text>
                <View style={styles.infoItem}>
                    <Text>Time:</Text>
                    <Text>{tripInfo.date} . {tripInfo.timeOrdered}</Text>
                </View>
                <View style={styles.infoItem}>
                    <Text>Customer:</Text>
                    <Text>{tripInfo.customer_fullname}</Text>
                </View>
                <View style={styles.infoItem}>
                    <Text>Price:</Text>
                    <Text><MoneyFormat value={tripInfo.price} isShowing={true} /></Text>
                </View>
                <View style={styles.infoItem}>
                    <Text>Status:</Text>
                    <Text style={{ color: tripInfo.status === 'Completed'? primaryColor.darkGreen : primaryColor.darkRed}}>{tripInfo.status}</Text>
                </View>
            </View>
            {tripInfo.status === 'Completed' && <View style={styles.infoArea}>
                <Text style={{ marginBottom: 15, fontWeight: '500' }}>Rated:</Text>
                <RatingStars rating={tripInfo.rate} />
            </View>}
            <View style={styles.infoArea}>
                <Text style={{ marginBottom: 15, fontWeight: '500' }}>Route Details:</Text>
                <View style={styles.infoItem}>
                    <Text>Distance:</Text>
                    <Text>{isLoadingRouteData ? 'Loading...' : `${routeData.distance} km`}</Text>
                </View>
                <View style={styles.infoItem}>
                    <Text>Duration:</Text>
                    <Text>{isLoadingRouteData ? 'Loading...' : `${routeData.duration} minutes`}</Text>
                </View>
            </View>
            <View style={styles.mapArea}>
                <MapView
                    ref={mapRef}
                    style={styles.map}
                    initialRegion={{
                        latitude: tripInfo.fromLocation.x || 0,
                        longitude: tripInfo.fromLocation.y || 0,
                        latitudeDelta: 0.01,
                        longitudeDelta: 0.01,
                    }}
                >
                    {!isLoadingTripInfo && tripInfo.fromLocation.x !== 0 && tripInfo.fromLocation.y !== 0 && (
                        <Marker
                            coordinate={{
                                latitude: tripInfo.fromLocation.x,
                                longitude: tripInfo.fromLocation.y,
                            }}
                            title="From"
                            description={tripInfo.from || 'Start Location'}
                            pinColor={primaryColor.bluePrimary}
                        />
                    )}

                    {!isLoadingTripInfo && tripInfo.toLocation.x !== 0 && tripInfo.toLocation.y !== 0 && (
                        <Marker
                            coordinate={{
                                latitude: tripInfo.toLocation.x,
                                longitude: tripInfo.toLocation.y,
                            }}
                            title="To"
                            description={tripInfo.to || 'End Location'}
                            pinColor="red"
                        />
                    )}

                    {!isLoadingRouteData && routeData.coordinates.length > 0 && (
                        <Polyline
                            coordinates={routeData.coordinates}
                            strokeColor={primaryColor.bluePrimary}
                            strokeWidth={4}
                        />
                    )}
                </MapView>
                <View style={{padding: 20}}>
                    <View style={[GlobalStyles.flexRow, {alignItems: 'center', marginBottom: 20, width: '100%'}]}>
                        <MaterialIcons name='my-location' size={24} color={primaryColor.bluePrimary} />
                        <Text style={[GlobalStyles.h6 ,{marginLeft: 10, width: '90%'}]}>{tripInfo.from}</Text>
                    </View>
                    <View style={[GlobalStyles.flexRow, {alignItems: 'center', width: '100%'}]}>
                        <MaterialIcons name='my-location' size={24} color={primaryColor.redPrimary} />
                        <Text style={[GlobalStyles.h6 ,{marginLeft: 10, width: '90%'}]}>{tripInfo.to}</Text>
                    </View>
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    map: {
        height: height * 0.4,
    },
    infoArea: {
        margin: 20,
        padding: 15,
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#F1F1F1',
    },
    infoItem: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 8,
    },
    mapArea: {
        margin: 20,
        overflow: 'hidden',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: '#F1F1F1',
        marginBottom: 30
    },
});
