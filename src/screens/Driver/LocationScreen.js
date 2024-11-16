import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, View, Text, Dimensions, SafeAreaView, Linking, Alert } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { primaryColor } from '../../../assets/styles/GlobalStyles';
import axios from "../../API/axios";
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function LocationScreen() {
  const [vehicle, setVehicle] = useState([]);
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  /* fetch all data about recent, product, cart length, user info */

  const openMap = (latitude, longitude) => {
    Alert.alert(
      "Open in Maps",
      "Choose a map service",
      [
        {
          text: "Google Maps",
          onPress: () => {
            const googleMapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
            Linking.openURL(googleMapsUrl).catch(err => console.error("Error opening Google Maps", err));
          }
        },
        {
          text: "Apple Maps",
          onPress: () => {
            const appleMapsUrl = `http://maps.apple.com/?ll=${latitude},${longitude}`;
            Linking.openURL(appleMapsUrl).catch(err => console.error("Error opening Apple Maps", err));
          }
        },
        { text: "Cancel", style: "cancel" }
      ],
      { cancelable: true }
    );
  };

  const fetchData = useCallback(async () => {
    try {
      // First API call to get vehicle data
      const vehicleResponse = await axios.post('/vehicles/user-id');
      setVehicle(vehicleResponse.data);

      // Second API call to get the latest device data using the device_id from the first response
      const deviceResponse = await axios.post('/device/get-latest', { device_id: vehicleResponse.data.device_id });

      /* console.log(deviceResponse.data); */
      // Ensure the latitude and longitude are parsed as floats
      setLatitude(parseFloat(deviceResponse.data.latitude));
      setLongitude(parseFloat(deviceResponse.data.longitude));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }, []);


  /* call back when focus screen */
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  return (
    <SafeAreaView style={styles.container}>
      {latitude && longitude ? (
        <>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>
              {vehicle.vehicle_brand} {vehicle.vehicle_line}
            </Text>
            <Text style={styles.details}>License Plate: {vehicle.license_plate}</Text>
          </View>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={{ latitude, longitude }}
              title={`${vehicle.vehicle_brand} ${vehicle.vehicle_line}`}
              description={`License Plate: ${vehicle.license_plate}`}
            >
              <Callout>
                <View style={[{ width: 200, padding: 20 }]}>
                  <Text style={styles.textInfo}>{`${vehicle.vehicle_brand} ${vehicle.vehicle_line}`}</Text>
                  <Text style={styles.textInfo}>{`${vehicle.license_plate}`}</Text>
                  <Text style={styles.textInfo}>{`Latitude: ${latitude}`}</Text>
                  <Text style={styles.textInfo}>{`Longitude: ${longitude}`}</Text>
                  <TouchableOpacity
                    style={styles.buttonInfo}
                    onPress={() => openMap(latitude, longitude)}
                  >
                    <MaterialCommunityIcons name='information-outline' size={18} color={primaryColor.bluePrimary} />
                    <Text style={styles.buttonText}>More Details</Text>
                  </TouchableOpacity>
                </View>
              </Callout>
            </Marker>
          </MapView>
        </>
      ) : (
        <Text>Loading...</Text>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryColor.whitePrimary,
  },
  infoContainer: {
    padding: 16,
    backgroundColor: primaryColor.whitePrimary,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: primaryColor.darkPrimary,
  },
  details: {
    fontSize: 16,
    color: primaryColor.darkPrimary,
    marginTop: 4,
  },
  map: {
    width: width,
    height: height,
  },
  textInfo: {
    fontSize: 14,
    fontWeight: '500',
    color: primaryColor.darkPrimary,
    marginBottom: 4,
  },
  buttonInfo: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 8,
    marginTop: 8,
    fontWeight: 'bold',
  },
  buttonText: {
    marginLeft: 5,
    color: primaryColor.bluePrimary,
    fontSize: 16,
  },
});
