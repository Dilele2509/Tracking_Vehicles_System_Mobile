import React, { useCallback, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Dimensions, Image } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import GlobalStyles, { primaryColor } from "../../../assets/styles/GlobalStyles";
import { BASEURL } from '@env';
import { useFocusEffect } from "@react-navigation/native";
import axios from "../../API/axios";

const { width } = Dimensions.get('window');

function LicenseScreen({ navigation }) {
    const [licenseInfo, setLicenseInfo] = useState([]);
    const fetchData = useCallback(() => {
        axios.get(`/user/get-info`)
            .then((response) => {
                const userData = response.data;

                axios.post('/licenses/get-info', { id: userData.license_id })
                    .then((response) => {
                        /* console.log(response.data.license); */
                        setLicenseInfo(response.data.license);
                    })
                    .catch((error) => {
                        console.error('Error fetching license data:', error);
                    });
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });

    }, []);

    /* call back when focus screen */
    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [fetchData])
    );
    return (
        <SafeAreaView style={[{ flex: 1, backgroundColor: primaryColor.whitePrimary }]}>
            <View style={[GlobalStyles.padScreen20, styles.headerPage]}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <AntDesign name="arrowleft" size={24} color={primaryColor.yellowPrimary} />
                </TouchableOpacity>
                <Text style={styles.titleText}>License</Text>
            </View>
            <View style={[GlobalStyles.padScreen20, GlobalStyles.mt10, { backgroundColor: primaryColor.whitePrimary }]}>
                <View style={[GlobalStyles.flex, GlobalStyles.mt15]}>
                    <View style={[GlobalStyles.pad10, styles.cardLicense]}>
                        <Image style={[styles.sign]} source={require('../../../assets/Images/sign.png')} />
                        <View style={styles.cardInfoMain}>
                            <View style={styles.imgLicense}>
                                <Image
                                    source={{ uri: `${BASEURL}${licenseInfo.id_card_photo}` }}
                                    style={styles.driverImg}
                                />
                                <Text style={{fontSize: 12}}>Class: <Text style={{fontWeight: '500'}}>{licenseInfo.license_class}</Text></Text>
                            </View>

                            <View style={styles.cardContent}>
                                <View style={styles.cardHeader}>
                                    <Text style={{color:primaryColor.redPrimary, fontSize: 16, fontWeight:'500'}}>DRIVER'S LICENSE</Text>
                                    <Text style={{color:primaryColor.redPrimary, fontSize: 12, fontWeight:'500'}}>No: {licenseInfo.license_identity}</Text>
                                </View>
                                <View style={styles.cardInfo}>
                                    <View style={styles.cardInfoTitle}>
                                        <Text style={{fontSize: 12, fontWeight:'500'}}>Full name:</Text>
                                        <Text style={{fontSize: 12, fontWeight:'500'}}>Date of Birth:</Text>
                                        <Text style={{fontSize: 12, fontWeight:'500'}}>Beginning date:</Text>
                                    </View>
                                    <View style={styles.cardInfoContent}>
                                        <Text style={{fontSize: 12}}>{licenseInfo.fullname}</Text>
                                        <Text style={{fontSize: 12}}>{licenseInfo.birthday}</Text>
                                        <Text style={{fontSize: 12}}>{new Date(licenseInfo.license_date).toLocaleDateString()}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        <Text style={{fontSize: 12}}>Expires: <Text style={{fontWeight: '500'}}>{new Date(licenseInfo.expiration_date).toLocaleDateString()}</Text></Text>
                    </View>
                </View>
            </View>


        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    headerPage: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        position: "relative",
        width: width - 40, // adjust according to padding/margin
    },
    licenseStyles: {
        fontSize: 16,
        color: primaryColor.darkPrimary,
    },
    statusText: {
        padding: 3,
        alignSelf: "flex-start",
        borderWidth: 1,
        fontSize: 12,
    },
    titleText: {
        fontSize: 24,
        fontWeight: '500',
        color: primaryColor.yellowPrimary,
        position: "absolute",
        width: width,
        textAlign: "center",
        zIndex: -999
    },
    itemContainer: {
        padding: 20,
    },
    imgLicense:{
        marginTop: 30
    },
    driverListImg: {
        width: 100,
        height: 100,
        borderRadius: 10,
        overflow: 'hidden',
        resizeMode: "cover",
    },
    cardLicense: {
        position: "relative",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundColor: primaryColor.beigePrimary,
        borderRadius: 10,
        overflow: 'hidden',
        width: 350,
        padding: 10,
    },
    sign: {
        position: 'absolute',
        bottom: -30,
        right: 0,
        width: 180,
        height: 180,
        opacity: .7,
        resizeMode: "contain",
        marginBottom: 10,
    },
    cardInfoMain: {
        display: 'flex',
        flexDirection: 'row',
    }, 
    cardContent: {
        display: 'flex',
        flexDirection: 'column',
        marginLeft: 5,
        padding: 10,
    },
    cardHeader: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 10,
    },
    cardInfo: {
        display: 'flex',
        flexDirection: 'row',
    },
    cardInfoTitle: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: 5
    },
    cardInfoContent: {
        display: 'flex',
        flexDirection: 'column',
        rowGap: 5,
        marginLeft: 6
    },
    driverImg: {
        width: 80,
        height: 120,
        marginBottom: 5,
        resizeMode: "cover",
    },
});

export default LicenseScreen;
