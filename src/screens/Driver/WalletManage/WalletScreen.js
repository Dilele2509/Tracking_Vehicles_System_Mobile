import React, { useState } from 'react'
import { Dimensions, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import GlobalStyles, { primaryColor } from '../../../../assets/styles/GlobalStyles';
import { TouchableOpacity } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { HeaderTab } from '../../../components';
import WalletStatistic from './WalletStatistic';
import WalletFluctuation from './WalletFluctuation';

const { width } = Dimensions.get('window');

export default function WalletScreen({ navigation }) {
    const tab1 = 'Statistic';
    const tab2 = 'Fluctuation';
    const [currentTab, setCurrentTab] = useState(tab1);
    const listFluctuations = [
        {
            date: '2024-10-3',
            time: '23:34',
            fluctuation: '-34000',
            balance: '750000',
            content: 'Vi phạm hành vi lái xe, thông tin cảnh báo đã được gửi về mail'
        },
        {
            date: '2024-10-2',
            time: '17:56',
            fluctuation: '+23000',
            balance: '773000',
            content: 'Đã thanh toán cho chuyến xe',
        },
        {
            date: '2024-10-1',
            time: '10:45',
            fluctuation: '+5000',
            balance: '778000',
            content: 'Đã thanh toán cho chuyến xe',
        }
    ]

    const renderItem = ({ item }) => (
        <View style={styles.itemFluctuation}>
            <View style={styles.dateTimeArea}>
                <Text style={styles.itemDateTime}>{item.date} . {item.time}</Text>
                <Ionicons name='checkmark-done-sharp' color={primaryColor.darkGreen} size={20} />
            </View>
            <Text style={styles.itemContent}>Your wallet
                <Text style={{ color: primaryColor.redPrimary }}>{item.fluctuation}</Text>
                when {item.time}. Balance
                <Text style={{ color: primaryColor.darkGreen }}>{item.balance}</Text>
                . Content:
                <Text style={{ fontWeight: '500' }}>{item.content}</Text></Text>
        </View>
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
                    <Text style={{color:primaryColor.whitePrimary}}>Balance</Text>
                    <Text style={{color:primaryColor.whitePrimary, fontSize: 20, fontWeight: '500'}}>760000 VND</Text>
                </View>
                <View style={styles.backgroundHeader}></View>
                <View style={styles.headerTabArea}><HeaderTab tab1={tab1} tab2={tab2} setCurrentTab={setCurrentTab}></HeaderTab></View>
            </View>
            <View style={styles.contentContainer}>
                {currentTab === tab1 ? <WalletStatistic/> : <WalletFluctuation/>}
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
        paddingTop: 23
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
    contentArea:{
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