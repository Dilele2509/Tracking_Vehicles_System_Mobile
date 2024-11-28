import React, { useState, useCallback, useRef, useMemo, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  SafeAreaView,
  Alert,
  TouchableOpacity,
  Linking,
} from 'react-native';
import MapView, { Marker, Callout, Polyline } from 'react-native-maps';
import axios from '../../../API/axios';
import GlobalStyles, { primaryColor } from '../../../../assets/styles/GlobalStyles';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import * as Clipboard from 'expo-clipboard';
import { MoneyFormat } from '../../../components';

const { width, height } = Dimensions.get('window');

export default function ActivityDetails({ navigation, route }) {
  const baseIP = '192.168.1.56';
  const { id } = route.params;
  const [vehicle, setVehicle] = useState([]);
  const [isPickUp, setIsPickUp] = useState(false);
  /* Config bottomSheet */
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ['30%', '90%'], []);
  const [tripInfo, setTripInfo] = useState({
    fromLocation: { x: 0, y: 0 },
    toLocation: { x: 0, y: 0 },
  });
  const goalLocation = !isPickUp ? tripInfo.fromLocation : tripInfo.toLocation;
  const [isLoading, setIsLoading] = useState(true)
  const [isLoadingRouteData, setIsLoadingRouteData] = useState(true);

  const [currentLocation, setCurrentLocation] = useState({
    latitude: 0,
    longitude: 0,
  })
  const [routeData, setRouteData] = useState({
    distance: 0,
    duration: 0,
    coordinates: [],
  });

  // Callback to present the bottom sheet
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const openMap = () => {
    const url = `https://www.google.com/maps?q=${goalLocation.x},${goalLocation.y}`;
    Linking.openURL(url);
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
        setCurrentLocation({
          latitude: parseFloat(data.data.latitude),
          longitude: parseFloat(data.data.longitude)
        });
      }
    };

    ws.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    handlePresentModalPress();
  }, [handlePresentModalPress]);

  // Fetch data logic
  const fetchData = useCallback(async () => {
    try {
      const tripResponse = await axios.post('/trip/trip-completed', { tripId: id });
      setTripInfo(tripResponse.data);
      const vehicleResponse = await axios.post('/vehicles/user-id');
      setVehicle(vehicleResponse.data);

      const deviceResponse = await axios.post('/device/get-latest', { device_id: vehicleResponse.data.device_id });
      setCurrentLocation({
        latitude: parseFloat(deviceResponse.data.latitude),
        longitude: parseFloat(deviceResponse.data.longitude)
      })
      //console.log('latitude:', parseFloat(deviceResponse.data.latitude), 'longitude:', parseFloat(deviceResponse.data.longitude));
    } catch (error) {
      console.error('Error fetching data:', error);
    }
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
        `https://router.project-osrm.org/route/v1/driving/${currentLocation.longitude},${currentLocation.latitude};${goalLocation.y},${goalLocation.x}?overview=full&geometries=geojson`
      )
        .then((response) => response.json())
        .then((data) => {
          /* console.log('Route data:', data);  */ // Check this log to see if the coordinates are valid
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
          setIsLoading(false);
          setIsLoadingRouteData(false);
        })
        .catch((err) => {
          console.error(err);
          setIsLoadingRouteData(false);
          Alert.alert('Error', 'Failed to load route details');
        });
    }
  }, [currentLocation, goalLocation]);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );


  // ACCESS FUNCTION
  // Function to handle phone calls
  const handlePhoneCall = (phoneNumber) => {
    const url = `tel:${phoneNumber}`;
    Linking.canOpenURL(url)
      .then((supported) => {
        if (supported) {
          Linking.openURL(url);
        } else {
          Alert.alert('Error', 'Unable to make a phone call');
        }
      })
      .catch((error) => {
        console.error('Error making phone call:', error);
      });
  };

  // Function to handle copying phone number
  const handleCopyPhone = (phoneNumber) => {
    Clipboard.setString(phoneNumber);
    Alert.alert('Copied!', 'Phone number has been copied to clipboard.');
  };

  // Function to show options for phone call or copy
  const handlePhonePress = (phoneNumber) => {
    Alert.alert(
      'Choose an action',
      `Copying or Making a phone call`,
      [
        {
          text: `Call ${phoneNumber}`,
          onPress: () => handlePhoneCall(phoneNumber),
        },
        {
          text: `Copy this number`,
          onPress: () => handleCopyPhone(phoneNumber),
        },
        {
          text: 'Cancel',
          style: 'cancel',
        },
      ],
      { cancelable: true }
    );
  };

  // Function to handle confirm pickup
  const handleConfirmPickup = () => {
    setIsPickUp(true);
  };

  const handleCompleteTrip = () => {
    setIsLoading(true);
    axios
      .put('/trip/set-complete-trip', { tripId: id })
      .then((response) => {
        setIsLoading(false);
        if (response.data.status) {
          Alert.alert('Success', 'Trip completed successfully');
          navigation.goBack();
        } else {
          Alert.alert('Error', 'Failed to complete the trip');
        }
      })
      .catch((error) => {
        console.error('Error completing trip:', error);
        setIsLoading(false);
        Alert.alert('Error', 'Failed to complete the trip');
      });
  }

  return (
    <>
      <BottomSheetModalProvider>
        <SafeAreaView style={styles.container}>
          <GestureHandlerRootView>
            <BottomSheetModal
              snapPoints={snapPoints}
              ref={bottomSheetModalRef}
              enableDismissOnClose={false}  // Disable dismiss on close
              enablePanDownToClose={false}  // Disable closing by swiping down
            >
              <BottomSheetView>
                <View style={styles.bottomSheetContainer}>
                  <View style={styles.contentItemBottom}>
                    <Text style={styles.contentTitleBottom}>Pick Up Location:</Text>
                    <View style={styles.contentRow}>
                      <View style={{ maxWidth: '65%' }}>
                        {!isPickUp ? (<Text style={{ fontSize: 18 }}>
                          {tripInfo.from}
                        </Text>) : (
                          <Text style={{ fontSize: 18 }}>
                            {tripInfo.to}
                          </Text>
                        )}
                      </View>
                      <TouchableOpacity style={styles.guideWay}><Text style={{ color: '#fff' }}>Direction</Text></TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.contentItemBottom}>
                    <View style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                      <Text style={{ marginRight: 10 }}>Customer's number:</Text>
                      <TouchableOpacity onPress={() => handlePhonePress(tripInfo.customer_phone)}>
                        <Text style={{ color: primaryColor.bluePrimary }}>{tripInfo.customer_phone}</Text>
                      </TouchableOpacity>
                    </View>
                    <View style={styles.contentRow}>
                      <Text style={{ fontSize: 16, fontWeight: '500' }}>{tripInfo.customer_fullname}</Text>
                      <TouchableOpacity
                        style={styles.customerBtn}
                        onPress={() => handlePhoneCall('+84374629474')}><Text style={{ color: '#fff' }}>Call</Text></TouchableOpacity>
                      <TouchableOpacity style={[styles.customerBtn, { backgroundColor: primaryColor.redPrimary }]}><Text style={{ color: '#fff' }}>Cancel</Text></TouchableOpacity>
                    </View>
                  </View>
                  <View style={styles.contentItemBottom}>
                    <View>
                      <Text style={[styles.contentTitleBottom, { marginBottom: 15 }]}><Text style={{ color: primaryColor.bluePrimary }}>From:</Text> {tripInfo.from}
                      </Text>
                      <Text style={[styles.contentTitleBottom, { marginBottom: 15 }]}><Text style={{ color: primaryColor.bluePrimary }}>To:</Text> {tripInfo.to}
                      </Text>
                    </View>
                    <View style={styles.contentRow}>
                      <View style={[GlobalStyles.centerScreen, { width: 80 }]}>
                        <Text style={{ fontSize: 18 }}>22</Text>
                        <Text style={{ fontSize: 18 }}>Km</Text>
                      </View>
                      <Text style={{ fontSize: 18 }}><MoneyFormat value={tripInfo.price} isShowing={true} /></Text>
                      <View style={[GlobalStyles.centerScreen, { width: 80 }]}>
                        <Text style={{ fontSize: 18 }}>43</Text>
                        <Text style={{ fontSize: 18 }}>minutes</Text>
                      </View>
                    </View>
                  </View>
                  <View style={[styles.contentItemBottom, GlobalStyles.centerScreen, { borderBottomWidth: 0 }]}>
                    <TouchableOpacity
                      onPress={() => (!isPickUp ? handleConfirmPickup() : handleCompleteTrip())}
                      style={styles.confirmBtn}>
                      {!isPickUp ? (<Text style={{ color: '#fff' }}>Confirm Pickup</Text>) : (
                        <Text style={{ color: '#fff' }}>Complete trip</Text>
                      )}
                    </TouchableOpacity>
                  </View>
                </View>
              </BottomSheetView>
            </BottomSheetModal>
          </GestureHandlerRootView>
          {/* {console.log(currentLocation.latitude, currentLocation.longitude)} */}
          {currentLocation.latitude && currentLocation.longitude ? (
            <MapView
              style={styles.map}
              initialRegion={{
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
            >
              {/* {console.log(latitude, longitude)} */}
              <Marker
                coordinate={{ latitude: currentLocation.latitude, longitude: currentLocation.longitude }}
                title={`${vehicle.vehicle_brand} ${vehicle.vehicle_line}`}
                description={`License Plate: ${vehicle.license_plate}`}
                pinColor={primaryColor.bluePrimary}
              />
              <Marker
                coordinate={{ latitude: goalLocation.x, longitude: goalLocation.y }}
                title={`${vehicle.vehicle_brand} ${vehicle.vehicle_line}`}
                description={`License Plate: ${vehicle.license_plate}`}
                pinColor={primaryColor.redPrimary}
              />
              {!isLoadingRouteData && routeData.coordinates.length > 0 && (
                <Polyline
                  coordinates={routeData.coordinates}
                  strokeColor={primaryColor.bluePrimary}
                  strokeWidth={4}
                />
              )}
            </MapView>
          ) : (
            <Text>Loading...</Text>
          )}
        </SafeAreaView>
      </BottomSheetModalProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryColor.whitePrimary,
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
  bottomSheetContainer: {
    padding: 20,
    paddingTop: 0
  },
  contentItemBottom: {
    paddingBottom: 20,
    paddingTop: 25,
    borderBottomWidth: 1,
    borderColor: primaryColor.yellowPrimary
  },
  contentTitleBottom: {
    fontWeight: '500'
  },
  contentRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10
  },
  guideWay: {
    backgroundColor: primaryColor.bluePrimary,
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  customerBtn: {
    backgroundColor: primaryColor.greenPrimary,
    width: 70,
    padding: 10,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  confirmBtn: {
    width: '90%',
    backgroundColor: primaryColor.bluePrimary,
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
