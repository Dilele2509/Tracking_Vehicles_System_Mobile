import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps'; 
import { primaryColor } from '../../../../assets/styles/GlobalStyles';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const { width, height } = Dimensions.get('window');

export default function DrivingModeScreen({ route }) {
  const { vehicle } = route.params; // Retrieve vehicle information from params

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{vehicle.vehicle_brand} {vehicle.vehicle_line}</Text>
        <Text style={styles.details}>License Plate: {vehicle.license_plate}</Text>
      </View>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: vehicle.location.y, // Use 'y' for latitude
          longitude: vehicle.location.x, // Use 'x' for longitude
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {/* Add Marker */}
        <Marker
          coordinate={{
            latitude: vehicle.location.y, // Use 'y' for latitude
            longitude: vehicle.location.x, // Use 'x' for longitude
          }}
          title={`${vehicle.vehicle_brand} ${vehicle.vehicle_line}`}
          description={`License Plate: ${vehicle.license_plate}`}
        >
          <View style={styles.marker}>
            <FontAwesome name="map-marker" size={42} color={primaryColor.redPrimary}/>
          </View>
        </Marker>
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryColor.lightPrimary,
  },
  infoContainer: {
    padding: 16,
    backgroundColor: primaryColor.whitePrimary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
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
  marker: {
    backgroundColor: 'transparent',
  },
});
