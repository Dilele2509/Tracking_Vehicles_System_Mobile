import React, { useCallback, useState } from 'react';
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Image,
  StyleSheet,
} from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import GlobalStyles, { primaryColor } from '../../../../assets/styles/GlobalStyles';
import { useFocusEffect } from '@react-navigation/native';
import axios from '../../../API/axios';

function HistoryAct(props) {
  const { navigation } = props;
  const [ trip, setTrip] = useState({})

  const fetchData = useCallback(() => {
    axios.get('/trip/trip-complete-list')
      .then((response) => {
        setTrip(response.data);
        /* console.log(response.data); */
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

  // Function to render each item
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate('History Trip', { id: item.id })}
      key={item.id}
      style={styles.actItem}>
      <View style={styles.actInfo}>
        <Text>{item.date} . {item.timeOrdered}</Text>
        <Text style={[styles.actStatus, {
          backgroundColor: item.status === 'Completed' ? primaryColor.lightGreen : primaryColor.lightRed,
          color: item.status === 'Completed' ? primaryColor.darkGreen : primaryColor.darkRed
        }]}>{item.status}</Text>
      </View>
      <View style={styles.actAddress}>
        <FontAwesome6 name="location-dot" size={24} color={primaryColor.redPrimary} />
        <Text style={[GlobalStyles.h4, { fontWeight: '500' }]}>{item.to}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {trip.length > 0 ? (
        <FlatList
          style={styles.flatListStyle}
          data={trip}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatList}
        />
      ) : (
        <View>
          <View style={styles.imgArea}>
            <Image
              style={styles.noActImg}
              source={require('../../../../assets/Images/car.png')}
            />
          </View>
          <Text
            style={[
              GlobalStyles.h4,
              { fontWeight: '500', textAlign: 'center' },
            ]}
          >
            Oops! No History Activities
          </Text>
        </View>
      )}
    </View>
  );
}

export default HistoryAct;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderTopColor: primaryColor.greyPrimary,
    borderTopWidth: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  flatListStyle: {
    /* alignItems: 'center', */
    display: 'flex',
    paddingVertical: 10,
    width: '90%',
    overflow: 'hidden',
  },
  actItem: {
    backgroundColor: primaryColor.lightBeige,
    borderRadius: 10,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: 90,
    marginBottom: 10,
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
