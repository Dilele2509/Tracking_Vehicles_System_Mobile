import React, { useCallback, useState } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import GlobalStyles, { primaryColor } from '../../../../assets/styles/GlobalStyles'
import { TouchableOpacity } from 'react-native'
import { FontAwesome6 } from '@expo/vector-icons'
import { useFocusEffect } from '@react-navigation/native'
import axios from '../../../API/axios'

function OnGoingAct(props) {
  const {navigation} = props
  const [ trip, setTrip] = useState({})

  const fetchData = useCallback(() => {
    axios.get('/trip/trip-ongoing-list')
      .then((response) => {
        setTrip(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching trips data:', error);
      });
  }, []);

  /* call back when focus screen */
  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  return (
    <View style={styles.container}>
      {trip ? (
        <TouchableOpacity
          onPress={()=> navigation.navigate('Activity Details', {id: trip.id})}
          style={styles.actItem}
        >
          <View style={styles.actInfo}>
            <Text>{trip.date} . {trip.timeOrdered}</Text>
            <Text style={styles.actStatus}>{trip.status}</Text>
          </View>
          <View style={styles.actAddress}>
            <FontAwesome6
              name="location-dot"
              size={24}
              color={primaryColor.redPrimary}
            />
            <Text style={[GlobalStyles.h4, { fontWeight: '500' }]}>
              {trip.to}
            </Text>
          </View>
        </TouchableOpacity>
      ) : (
        <View>
          <View style={styles.imgArea}>
            <Image
              style={styles.noActImg}
              source={require('../../../../assets/Images/car.png')}
            />
          </View>
          <Text style={[GlobalStyles.h4, { fontWeight: '500', textAlign: 'center' }]}>
            Oops! No OnGoing Activities
          </Text>
        </View>
      )}
    </View>
  );
}

export default OnGoingAct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopColor: primaryColor.greyPrimary,
    borderTopWidth: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  actItem: {
    backgroundColor: primaryColor.lightBeige,
    borderRadius: 10,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    width: '90%',
    height: 90,
    paddingRight: 10
  },
  actInfo: {
    display: 'flex',
    padding: 10,
    paddingBottom: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  actAddress: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    flex: 1,
    paddingTop: 0,
    padding: 10,
    overflow: 'hidden',
  },
  actStatus: {
    backgroundColor: primaryColor.lightGreen,
    color: primaryColor.darkGreen,
    padding: 3.5,
    paddingHorizontal: 7,
    borderRadius: 5,
    overflow: 'hidden',
  },
  imgArea: {
    width: '100%',
    justifyContent: 'center',
  },
  noActImg: {
    width: 250,
    height: 200,
    resizeMode: 'contain',
  },
})
