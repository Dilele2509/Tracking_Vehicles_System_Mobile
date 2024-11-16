import React from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import GlobalStyles, { primaryColor } from '../../../../assets/styles/GlobalStyles'
import { TouchableOpacity } from 'react-native'
import { FontAwesome6 } from '@expo/vector-icons'

function OnGoingAct() {
  const activities = 
      {
        id: 1,
        time: '08:20PM',
        address: 'Ton Duc Thang University, Gate 7',
        status: 'OnGoing',
        date: '07/11/2024',
      }
  return (
    <View style={styles.container}>
      {activities !== null ? (
        <TouchableOpacity id={activities.id} style={styles.actItem}>
          <View style={styles.actInfo}>
            <Text>{activities.date} . {activities.time}</Text>
            <Text style={styles.actStatus}>{activities.status}</Text>
          </View>
          <View style={styles.actAddress}>
            <FontAwesome6 name='location-dot' size={24} color={primaryColor.redPrimary} />
            <Text style={[GlobalStyles.h4, { fontWeight: '500' }]}>{activities.address}</Text>
          </View>
        </TouchableOpacity>
      ) : (
        <>
          <View>
            <View style={styles.imgArea}>
              <Image style={styles.noActImg} source={require('../../../../assets/Images/car.png')} />
            </View>
            <Text style={[GlobalStyles.h4, { fontWeight: '500', textAlign:'center' }]}>Oops! No OnGoing Activities</Text>
          </View>
        </>
      )}
    </View>
  )
}

export default OnGoingAct

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
    height: 90
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