import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { AntDesign, Feather } from '@expo/vector-icons';
import axios from '../../../API/axios';
import { BASEURL } from '@env';
import { primaryColor } from '../../../../assets/styles/GlobalStyles';


const AccountScreen = ({ navigation }) => {
  const [userInfo, setUserInfo] = useState('');

  const fetchData = useCallback(() => {
    axios.get(`/user/get-info`)
      .then((response) => {
        /* console.log('user data: ', response.data); */
        const userData = response.data;
        setUserInfo(userData);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData])
  );

  const handleLogout = () => {
    // Show confirmation dialog
    Alert.alert(
      'Confirm',
      'Are you sure you want to log out?',
      [
        {
          text: 'No',
          onPress: () => console.log('Logout cancelled'),
          style: 'cancel'
        },
        {
          text: 'Yes',
          onPress: () => {
            axios.post("/login/logout") // Ensure the URL is correct
              .then((response) => {
                /* console.log(response.data.status); */
                if (response.data.status) {
                  navigation.replace("Welcome"); // Redirect to the Welcome screen upon successful logout
                } else {
                  Alert.alert('Logout failed', 'Unable to log out at this time. Please try again.');
                }
              })
              .catch((error) => {
                console.error('Error during logout:', error);
                Alert.alert('Error', 'An error occurred while logging out. Please try again.');
              });
          }
        }
      ],
    );
  };

  return (
    <View style={[styles.container, { backgroundColor: primaryColor.whitePrimary }]}>
      <View style={styles.headerContainer}>
        <Image style={styles.headerImg} source={require("../../../../assets/Images/main-background.png")} />
        <View style={styles.userContainer}>
          <Image style={styles.userAva} source={{ uri: `${BASEURL}${userInfo.avatar}` }} />
          <View style={styles.userContent}>
            <Text style={styles.userName} numberOfLines={2} ellipsizeMode="tail">
              {userInfo.fullname}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.contentContainer}>

        {/* edit information */}
        <TouchableOpacity onPress={() => navigation.navigate("EditUser", { titlePage: "Information & Contact" })} style={[styles.contentItem]}>
          <AntDesign name="infocirlceo" size={24} color={primaryColor.darkPrimary} />
          <Text style={[styles.contentText]}>Information & Contact</Text>
        </TouchableOpacity>

        {/* change password */}
        <TouchableOpacity onPress={() => navigation.navigate("EditSecurity", { titlePage: "Security Setting" })} style={[styles.contentItem]}>
          <Feather name="settings" size={24} color="#2A629A" />
          <Text style={[styles.contentText]}>Security Setting</Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={handleLogout} style={[styles.contentItem]}>
          <Feather name="log-out" size={24} color={primaryColor.redPrimary} />
          <Text style={[styles.contentText]}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    width: "100%",
  },
  headerImg: {
    width: "100%",
    height: 200,
  },
  contentContainer: {
    flex: 1,
    padding: 20
  },
  contentItem: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
    marginBottom: 15,
    backgroundColor: primaryColor.whitePrimary,
    borderRadius: 35,
    borderColor: primaryColor.blackPrimary,
    borderWidth: 1
  },
  contentText: {
    color: primaryColor.blackPrimary,
    fontWeight: "500",
    marginLeft: 10
  },
  userContainer: {
    flexDirection: "row",
  },
  userAva: {
    width: 150,
    height: 150,
    resizeMode: "cover",
    borderRadius: 100,
    marginTop: -75, // Adjust this value based on layout
    marginLeft: 15,
    borderWidth: 4,
    backgroundColor: '#FFFFFF',
    borderColor: primaryColor.whitePrimary,
    zIndex: 1
  },
  userContent: {
    marginLeft: -20,
    marginTop: -20,
    paddingHorizontal: 15,
    backgroundColor: primaryColor.whitePrimary,
    width: "auto",
    height: 40,
    borderRadius: 40,
    textAlign: "center"
  },
  userName: {
    marginTop: 5,
    fontSize: 18,
    marginLeft: 10,
    fontWeight: "500",
    color: primaryColor.blackPrimary,
    flexShrink: 1,       // Allow text to shrink if needed
    flexWrap: 'wrap'     // Ensure text wraps to the next line
  }
});
