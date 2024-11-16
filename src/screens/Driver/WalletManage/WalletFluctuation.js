import React, { useState } from 'react'
import { Dimensions, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import GlobalStyles, { primaryColor } from '../../../../assets/styles/GlobalStyles';
import { TouchableOpacity } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

export default function WalletFluctuation({ navigation }) {
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
        <>
            <FlatList
                style={styles.contentArea}
                data={listFluctuations}
                renderItem={renderItem} />
        </>
    )
}

const styles = StyleSheet.create({
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