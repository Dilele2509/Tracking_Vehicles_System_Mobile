import React, { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import GlobalStyles, { primaryColor } from '../../../../assets/styles/GlobalStyles';
import { TouchableOpacity } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { HeaderTab, MoneyFormat } from '../../../components';
import WalletStatistic from './WalletStatistic';
import WalletFluctuation from './WalletFluctuation';
import axios from '../../../API/axios';

const { width } = Dimensions.get('window');

export default function WalletScreen({ navigation }) {
    const tab1 = 'Statistic';
    const tab2 = 'Fluctuation';
    const [currentTab, setCurrentTab] = useState(tab1);
    const [balance, setBalance] = useState();

    const fetchData = useCallback(() => {
        axios.post('/wallet/get-balance')
            .then((response) => {
                setBalance(response.data.balance);
            })
            .catch((error) => {
                console.error('Error fetching balance data:', error);
            });
    }, []);

    /* call back when focus screen */
    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [fetchData])
    );
    return (
        <SafeAreaView style={styles.container}>
            <View style={[styles.headerContainer]}>
                <View style={[GlobalStyles.padScreen20, styles.headerPage]}>
                    <TouchableOpacity onPress={() => { navigation.goBack() }}>
                        <AntDesign name="arrowleft" size={24} color={primaryColor.yellowPrimary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Wallet</Text>
                </View>
                <View style={styles.balanceHeader}>
                    <Text style={{ color: primaryColor.whitePrimary }}>Balance</Text>
                    <Text style={{ color: primaryColor.whitePrimary, fontSize: 20, fontWeight: '500' }}><MoneyFormat value={balance} isShowing={true}/></Text>
                </View>
                <View style={styles.backgroundHeader}></View>
                <View style={styles.headerTabArea}><HeaderTab tab1={tab1} tab2={tab2} setCurrentTab={setCurrentTab}></HeaderTab></View>
            </View>
            <View style={styles.contentContainer}>
                {currentTab === tab1 ? <WalletStatistic /> : <WalletFluctuation />}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    headerTabArea: {
        position: 'absolute',
        bottom: -10,
        left: 0,
        right: 0,
        height: 50,
        zIndex: 999,
        elevation: 5,
        paddingTop: 10, // adjust according to padding/margin
    },
    headerContainer: {
        position: 'relative',
        backgroundColor: primaryColor.darkPrimary,
        height: 200,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
    },
    backgroundHeader: {
        position: 'absolute',
        top: -100,
        left: 0,
        right: 0,
        height: 300,
        backgroundColor: primaryColor.darkPrimary,
        zIndex: -1,
        elevation: 5,
        paddingTop: 20, // adjust according to padding/margin
    },
    headerPage: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        position: "relative",
        width: width - 40, // adjust according to padding/margin
    },
    headerTitle: {
        fontSize: 24,
        fontWeight: '500',
        color: primaryColor.yellowPrimary,
        position: "absolute",
        width: width,
        textAlign: "center",
        zIndex: -999
    },
    balanceHeader: {
        width: '100%',
        display: "flex",
        alignItems: "center",
        marginTop: 20
    },
    contentContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        paddingTop: 23,
        flex: 1,
    },
    contentTitle: {
        lineHeight: 50,
        textAlign: "center",
        fontSize: 24,
        height: 50,
        width: '95%',
        fontWeight: '500',
        overflow: 'hidden',
        color: primaryColor.darkPrimary,
        backgroundColor: primaryColor.yellowPrimary,
        borderRadius: 20,
        marginTop: -30,
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    contentArea: {
        width: '100%',
        padding: 15
    },
    dateTimeArea: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    itemFluctuation: {
        width: '100%',
        borderWidth: 1,
        borderColor: primaryColor.yellowPrimary,
        borderRadius: 15,
        padding: 13,
        marginBottom: 10,
    },
    itemDateTime: {
        fontSize: 12,
        color: '#000',
        opacity: .8
    },
    itemContent: {
        width: "100%",
        marginTop: 10,
        textAlign: 'auto',
    },
});