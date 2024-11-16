import React from 'react';
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

function HistoryAct() {
  const hisList = [
    {
      id: 1,
      time: '06:17PM',
      address: 'University Of Technology and Education, Main Gate',
      status: 'Completed',
      date: '07/11/2024',
    },
    {
      id: 2,
      time: '08:35PM',
      address: 'Ton Duc Thang University, Gate 7',
      status: 'Cancelled',
      date: '27/10/2024',
    },
  ];

  // Function to render each item
  const renderItem = ({ item }) => (
    <TouchableOpacity key={item.id} style={styles.actItem}>
      <View style={styles.actInfo}>
        <Text>{item.date} . {item.time}</Text>
        <Text style={[styles.actStatus, {
          backgroundColor: item.status === 'Completed' ? primaryColor.lightGreen:primaryColor.lightRed,
          color: item.status === 'Completed' ? primaryColor.darkGreen : primaryColor.darkRed}]}>{item.status}</Text>
      </View>
      <View style={styles.actAddress}>
        <FontAwesome6 name="location-dot" size={24} color={primaryColor.redPrimary} />
        <Text style={[GlobalStyles.h4, { fontWeight: '500' }]}>{item.address}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {hisList.length > 0 ? (
        <FlatList
          style={styles.flatListStyle}
          data={hisList}
          renderItem={renderItem}
          keyExtractor={(item) => item.id.toString()}
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
