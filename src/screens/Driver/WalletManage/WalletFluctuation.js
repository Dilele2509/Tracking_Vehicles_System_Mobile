import React, { useCallback, useState } from 'react'
import { Dimensions, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import GlobalStyles, { primaryColor } from '../../../../assets/styles/GlobalStyles';
import { TouchableOpacity } from 'react-native';
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import axios from '../../../API/axios';
import { MoneyFormat } from '../../../components';

const { width } = Dimensions.get('window');

export default function WalletFluctuation({ navigation }) {
    const [fluctuation, setFluctuation] = useState([])
    const [balance, setBalance] = useState()

    function mergeAndSortFluctuation(incomeData, violatedData) {
        // Gắn thuộc tính "type" cho từng phần tử trong mảng
        const incomeArray = incomeData.map(item => ({ ...item, type: 'income' }));
        const violatedArray = violatedData.map(item => ({ ...item, type: 'violate' }));

        // Gộp hai mảng lại thành một
        const combinedArray = [...incomeArray, ...violatedArray];

        // Sắp xếp mảng theo ngày và giờ giảm dần
        combinedArray.sort((a, b) => {
            const dateTimeA = new Date(`${a.date}T${a.time}`);
            const dateTimeB = new Date(`${b.date}T${b.time}`);
            return dateTimeB - dateTimeA; // Sắp xếp giảm dần
        });

        return combinedArray;
    }

    const fetchData = useCallback(() => {
        Promise.all([
            axios.post('/income/driver-income'),
            axios.post('/violate/driver-violate'),
            axios.post('/wallet/get-balance')
        ])
            .then(([incomeResponse, violateResponse, balanceResponse]) => {
                // console.log('income: ', incomeResponse.data, ' violate: ', violateResponse.data);
                const incomeData = Array.isArray(incomeResponse.data) ? incomeResponse.data : [];
                const violatedData = Array.isArray(violateResponse.data) ? violateResponse.data : [];
                setBalance(balanceResponse.data.balance)
                // Gọi hàm gộp và sắp xếp mảng
                const combinedData = mergeAndSortFluctuation(incomeData, violatedData);
                setFluctuation(combinedData);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });

    }, []);

    /* call back when focus screen */
    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [fetchData])
    );

    const renderItem = ({ item }) => (
        <View style={styles.itemFluctuation}>
            <View style={styles.dateTimeArea}>
                <Text style={styles.itemDateTime}>{item.date} . {item.time}</Text>
                <Ionicons name='checkmark-done-sharp' color={primaryColor.darkGreen} size={20} />
            </View>
            <Text style={styles.itemContent}>Ví của bạn
                <Text style={{ color: primaryColor.redPrimary }}>
                    {item.type === 'income' ? (
                        <> +<MoneyFormat value={item.total} isShowing={true} /> </>
                    ) : (
                        <> -<MoneyFormat value={item.punishment} isShowing={true} /> </>
                    )}
                </Text>
                vào lúc {item.time}. Số dư hiện tại là
                <Text style={{ color: primaryColor.darkGreen }}> <MoneyFormat value={balance} isShowing={true} /></Text>
                . Nội dung:
                <Text style={{ fontWeight: '500' }}>
                    {item.type === 'income' ? (
                        <> Hoàn thành chuyến đi</>
                    ) : (
                        <> Có hành vi vi phạm trong lúc lái xe, kiểm tra mail để xem và phản hồi thông tin vi phạm</>
                    )}
                </Text></Text>
        </View>
    );
    return (
        <>
            <FlatList
                style={styles.contentArea}
                data={fluctuation}
                renderItem={renderItem}
                keyExtractor={(item, index) => (item.id ? `${item.id}-${index}` : `${index}`)}
                contentContainerStyle={{ paddingBottom: 30 }}
            />


        </>
    )
}

const styles = StyleSheet.create({
    contentArea: {
        width: '100%',
        padding: 15,
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