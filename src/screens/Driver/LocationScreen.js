import React, { useState, useCallback, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { StyleSheet, View, Text, Dimensions, Linking, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, Callout } from 'react-native-maps';
import { primaryColor } from '../../../assets/styles/GlobalStyles';
import axios, { axiosDifferentAPI } from "../../API/axios";
import { TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

export default function LocationScreen() {
  const baseIP = '192.168.1.56';
  const [vehicle, setVehicle] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dateTime, setDateTime] = useState({
    date: null,
    time: null,
    speed: null
    //locationName: ''
  });
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
      setDateTime({
        date: deviceResponse.data.date,
        time: deviceResponse.data.time,
        speed: deviceResponse.data.speed
        //locationName: getLocationName(parseFloat(deviceResponse.data.latitude), parseFloat(deviceResponse.data.longitude)) ?? 'No data'
      })
      //console.log(deviceResponse.data);
      setLatitude(parseFloat(deviceResponse.data.latitude));
      setLongitude(parseFloat(deviceResponse.data.longitude));
      setIsLoading(false);
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

  const getLocationName = async (latitude, longitude) => {
    try {
      const apiKey = 'bfedebb2152e40e4814d669c38304aad'; // Replace with your OpenCage API key
      const url = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${apiKey}`;

      const response = await axiosDifferentAPI.get(url);
      const data = response.data;

      if (data.results && data.results.length > 0) {
        const location = data.results[0].formatted; // Get the formatted location name
        console.log('Location:', location);
        return location;
      } else {
        console.log('No results found for the given coordinates.');
      }
    } catch (error) {
      console.error('Error fetching location:', error.message);
    }
  };

  // Kết nối WebSocket
  useEffect(() => {
    const ws = new WebSocket(`ws://${baseIP}:3002`);

    ws.onopen = () => {
      console.log('WebSocket connected');
    };

    ws.onmessage = (message) => {
      const data = JSON.parse(message.data);
      //console.log(data);
      if (data.event === 'newData') {
        // Cập nhật tọa độ mới từ WebSocket
        setLatitude(parseFloat(data.data.latitude));
        setLongitude(parseFloat(data.data.longitude));
      }
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      ws.close();
    };
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {!isLoading ? (
        <>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>
              {vehicle.vehicle_brand} {vehicle.vehicle_line}
            </Text>
            <Text style={styles.details}>License Plate: {vehicle.license_plate}</Text>
            <Text style={styles.details}>Speed: <Text style={{color: primaryColor.redPrimary}}>{dateTime.speed}</Text> Km/h</Text>
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
                  <Text style={[styles.textInfo, { fontWeight: '800', color: primaryColor.redPrimary }]}>{vehicle.vehicle_brand} {vehicle.vehicle_line}</Text>
                  <Text style={[styles.textInfo, { fontWeight: '800', color: primaryColor.redPrimary }]}>{vehicle.license_plate}</Text>
                  <Text style={styles.textInfo}><Text style={{ fontWeight: '700' }}>Latitude:</Text> {latitude}</Text>
                  <Text style={styles.textInfo}><Text style={{ fontWeight: '700' }}>Longitude:</Text> {longitude}</Text>
                  <Text style={styles.textInfo}><Text style={{ fontWeight: '700' }}>Update at:</Text> {dateTime.date} . {dateTime.time}</Text>
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
