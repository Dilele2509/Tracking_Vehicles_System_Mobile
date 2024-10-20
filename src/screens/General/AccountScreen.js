import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useContext, useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { primaryColor } from '../../../assets/styles/GlobalStyles';
import { Footer } from '../../components';
import { FooterContext } from '../../provider/FooterProvider'; // Import FooterContext
import { AntDesign, Feather } from '@expo/vector-icons';
import axios from '../../API/axios';


const AccountScreen = ({ navigation }) => {
  const { handlePress } = useContext(FooterContext); // Get handlePress from FooterContext
  const [userInfo, setUserInfo] = useState([]);

  const fetchData = useCallback(() => {
    axios.get(`/user/id`)
      .then((response) => {
        const userData = response.data.user[0];
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
          onPress: () => console.log('Logout Pressed'),
          style: 'cancel'
        },
        {
          text: 'Yes',
          onPress: () => {
            axios.get("/logout")
              .then((response) => {
                console.log(response.data.status);
                if (response.data.status == true) {
                  navigation.replace("Welcome")
                }
              })
              .catch((error) => {
                console.log(error);
              })
          }
        }
      ],
    );
  }
  return (
    <View style={[styles.container, { backgroundColor: primaryColor.creamPrimary }]}>
      <View style={styles.headerContainer}>
        <Image style={styles.headerImg} source={require("../../../assets/images/takoyaki.jpeg")} />
        <View style={styles.userContainer}>
          <Image style={styles.userAva} source={{ uri: userInfo.avatar }} />
          <View style={styles.userContent}>
            <Text style={[styles.userName]}>{userInfo.full_name}</Text>
          </View>
        </View>
      </View>
      <View style={styles.contentContainer}>
        {/* check cart */}
        <TouchableOpacity
          onPress={() => { navigation.navigate("Cart") }}
          style={[styles.contentItem]}>
          <Feather name="shopping-cart" size={24} color={primaryColor.yellowPrimary} />
          <Text style={[styles.contentText]}>My Cart</Text>
        </TouchableOpacity>

        {/* edit information */}
        <TouchableOpacity onPress={()=>navigation.navigate("EditUser", {titlePage: "Information & Contact"})} style={[styles.contentItem]}>
          <AntDesign name="infocirlceo" size={24} color={primaryColor.darkPrimary} />
          <Text style={[styles.contentText]}>Information & Contact</Text>
        </TouchableOpacity>

        {/* change password */}
        <TouchableOpacity onPress={()=>navigation.navigate("EditSecurity", {titlePage: "Security Setting"})} style={[styles.contentItem]}>
          <Feather name="settings" size={24} color="#2A629A" />
          <Text style={[styles.contentText]}>Security Setting</Text>
        </TouchableOpacity>


        <TouchableOpacity onPress={handleLogout} style={[styles.contentItem]}>
          <Feather name="log-out" size={24} color={primaryColor.redPrimary} />
          <Text style={[styles.contentText]}>Log Out</Text>
        </TouchableOpacity>
      </View>
      <SafeAreaView style={styles.footerContainer}>
        <Footer navigation={navigation} />
      </SafeAreaView>
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
    borderWidth: 5,
    borderColor: primaryColor.creamPrimary,
    zIndex: 1
  },
  userContent: {
    marginLeft: -20,
    marginTop: -20,
    paddingHorizontal: 15,
    backgroundColor: primaryColor.creamPrimary,
    width: "auto",
    height: 40,
    borderRadius: 40,
    textAlign: "center"
  },
  userName: {
    fontSize: 28,
    marginHorizontal: 20,
    fontWeight: "500",
    color: primaryColor.blackPrimary
  },
  footerContainer: {
    backgroundColor: primaryColor.creamPrimary,
  },
});
