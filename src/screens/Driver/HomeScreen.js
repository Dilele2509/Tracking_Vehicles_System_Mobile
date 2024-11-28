import React, { useState, useCallback } from "react";
import { SafeAreaView, FlatList, StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { Categories, Header, SliderShow, MenuBar, SplashScreen, MoneyFormat } from "../../components";
import GlobalStyles, { primaryColor } from "../../../assets/styles/GlobalStyles";
import axios from "../../API/axios";
import { Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { BASEURL } from '@env'

function HomeScreen({ navigation }) {
    const [userInfo, setUserInfo] = useState([]);
    const [isLoading, setIsLoading] = useState(false)
    const [isShowing, setIsShowing] = useState(false);
    const [balance, setBalance] = useState();
    const [statistic, setStatistic] = useState({})
    const [statisticToday, setStatisticToday] = useState({
        trips: null,
        average_income: null,
        violates: null,
        average_rate: null,
    });

    const [quantNotification, setQuantNotification] = useState(0);

    const recommend = [
        {
            id: 1,
            title: 'Hướng dẫn bảo trì xe',
            thumbnail: require('../../../assets/Images/carMaintenance.png'),
        },
        {
            id: 2,
            title: 'Chính sách cần lưu ý cho tài xế',
            thumbnail: require('../../../assets/Images/driverPolicy.png'),
        },
        {
            id: 3,
            title: 'Quy định chung cho tài xế',
            thumbnail: require('../../../assets/Images/driverRule.png'),
        },
    ]

    const fetchData = useCallback(() => {
        axios.get(`/user/get-info`)
            .then((response) => {
                const userData = response.data;
                setUserInfo(userData);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });

        axios.post('/wallet/get-balance')
            .then((response) => {
                setBalance(response.data.balance);
            })
            .catch((error) => {
                console.error('Error fetching balance data:', error);
            });

        // Array of API requests
        const requests = [
            axios.post('/trip/driver-completed'),
            axios.post('/trip/driver-cancelled'),
            axios.post('/trip/driver-rated'),
        ];

        // Execute all requests concurrently
        Promise.all(requests)
            .then((responses) => {
                const [completedResponse, cancelledResponse, ratedResponse] = responses;

                // Update state with the combined results
                setStatistic({
                    success_rate_percentage: completedResponse.data.success_rate_percentage,
                    cancelled_rate_percentage: cancelledResponse.data.cancelled_rate_percentage,
                    average_rated: ratedResponse.data.average_rated,
                });

                // Log individual responses (for debugging)
                console.log('Successfully completed: ', parseFloat(completedResponse.data.success_rate_percentage).toFixed(1));
                console.log('Cancelled completed: ', parseFloat(cancelledResponse.data.cancelled_rate_percentage).toFixed(1));
                console.log('Rated completed: ', ratedResponse.data);
            })
            .catch((error) => {
                console.error('Error fetching statistics:', error);
            });

        const today = new Date().toISOString().split('T')[0];
        axios.post('/income/date-driver', { date: today })
            .then((response) => {
                console.log('Statistic Today:', response.data);
                setStatisticToday(response.data);
            })
            .catch((error) => {
                console.error('Error fetching statistic today data:', error);
            });

    }, []);

    /* call back when focus screen */
    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [fetchData])
    );

    const renderItem = ({ item }) => {
        switch (item.type) {
            case 'slider':
                return <SliderShow />;
            case 'categories':
                return <Categories navigation={navigation} />;
            case 'dashboard':
                return (
                    <View style={[GlobalStyles.padScreen20, GlobalStyles.mt10, styles.dashboard, { backgroundColor: primaryColor.whitePrimary }]}>
                        <View style={[GlobalStyles.flexRow, { alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }]}>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('Account')}
                                style={styles.accountContainer}>
                                <Image style={styles.userAva} source={{ uri: `${BASEURL}${userInfo.avatar}` }} />
                                {/* {console.log(`${BASEURL}${userInfo.avatar}`)} */}
                                <View style={styles.userContent}>
                                    <Text style={[styles.userName]}>{userInfo.fullname}</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                        <View style={[GlobalStyles.flexRow, { alignItems: "center", justifyContent: "space-between" }]}>
                            <Text style={[GlobalStyles.h5, { color: primaryColor.blackPrimary }]}>
                                Wallet balance
                            </Text>
                            <View style={[GlobalStyles.flexRow]}>
                                <Text style={[GlobalStyles.h5, { color: primaryColor.blackPrimary }]}><MoneyFormat value={balance} isShowing={isShowing} /></Text>
                                <TouchableOpacity onPress={() => { setIsShowing(!isShowing) }}>
                                    <Feather name={!isShowing ? 'eye' : 'eye-off'} style={{ marginLeft: 10 }} color={primaryColor.yellowPrimary} size={20} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View
                            style={[GlobalStyles.flexRow, GlobalStyles.pad10, GlobalStyles.mt15, { justifyContent: 'space-between' }]}>
                            <View style={[GlobalStyles.flex]}>
                                <Text style={[GlobalStyles.h4, { color: primaryColor.greenPrimary, marginBottom: 5 }]}>{statistic.success_rate_percentage}%</Text>
                                <Text style={[GlobalStyles.h6, { fontWeight: '500', color: primaryColor.blackPrimary }]}>
                                    Acceptance
                                </Text>
                            </View>
                            <View style={[GlobalStyles.flex]}>
                                <Text style={[GlobalStyles.h4, { color: primaryColor.redPrimary, marginBottom: 5 }]}>{parseFloat(statistic.cancelled_rate_percentage).toFixed(1)}%</Text>
                                <Text style={[GlobalStyles.h6, { fontWeight: '500', color: primaryColor.blackPrimary }]}>
                                    Cancellation
                                </Text>
                            </View>
                            <View style={[GlobalStyles.flex]}>
                                <Text style={[GlobalStyles.h4, { color: primaryColor.bluePrimary, marginBottom: 5 }]}>{statistic.average_rated}/5</Text>
                                <Text style={[GlobalStyles.h6, { fontWeight: '500', color: primaryColor.blackPrimary }]}>
                                    Rated
                                </Text>
                            </View>
                        </View>
                        <View style={[GlobalStyles.pad10, GlobalStyles.mt15, styles.dashboardActivity]}>
                            <Text style={[GlobalStyles.h4, { color: primaryColor.yellowPrimary, marginBottom: 10 }]}>
                                Today
                            </Text>
                            <View style={[GlobalStyles.flexRow, styles.statisticToday, { justifyContent: 'space-between' }]}>
                                <View style={styles.statisticTitle}>
                                    <Text style={[GlobalStyles.h6, { fontWeight: '500', color: primaryColor.whitePrimary }]}>
                                        Number of trip
                                    </Text>
                                    <Text style={[GlobalStyles.h6, { fontWeight: '500', color: primaryColor.whitePrimary }]}>
                                        Income
                                    </Text>
                                    <Text style={[GlobalStyles.h6, { fontWeight: '500', color: primaryColor.whitePrimary }]}>
                                        Violates
                                    </Text>
                                    <Text style={[GlobalStyles.h6, { fontWeight: '500', color: primaryColor.whitePrimary }]}>
                                        Rated
                                    </Text>
                                </View>
                                <View style={styles.statisticValue}>
                                    <Text style={[GlobalStyles.h6, { fontWeight: '500', color: primaryColor.whitePrimary }]}>
                                        {statisticToday.trips ?? 'No Data'}
                                    </Text>
                                    <Text style={[GlobalStyles.h6, { fontWeight: '500', color: primaryColor.whitePrimary }]}>
                                        {statisticToday.average_income ? <MoneyFormat value={statisticToday.average_income} isShowing={true} /> : 'No Data'}
                                    </Text>
                                    <Text style={[GlobalStyles.h6, { fontWeight: '500', color: primaryColor.whitePrimary }]}>
                                        {statisticToday.violates ? `${statisticToday.violates}` : 'No Data'}
                                    </Text>
                                    <Text style={[GlobalStyles.h6, { fontWeight: '500', color: primaryColor.whitePrimary }]}>
                                        {statisticToday.average_rate ? `${statisticToday.average_rate}/5` : 'No Data'}
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity
                                onPress={() => navigation.navigate('wallet')}
                                style={[styles.detailActivitiesBtn, GlobalStyles.h5]}>
                                <Text style={{ textAlign: 'center', fontWeight: '500' }}>More details</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            case 'recommend':
                return <MenuBar listTitle="Recommend" itemList={recommend} navigation={navigation} />;
            default:
                return null;
        }
    };

    const sections = [
        { id: 'slider', type: 'slider' },
        { id: 'categories', type: 'categories' },
        { id: 'dashboard', type: 'dashboard' },
        { id: 'recommend', type: 'recommend' },
    ];


    return (
        <SafeAreaView style={styles.safeArea}>
            {isLoading && (
                <SplashScreen isLoading={isLoading} />
            )}
            {!isLoading && (<>
                <Header
                    setIsLoading={setIsLoading}
                    navigation={navigation}
                    userName={userInfo.fullname}
                />
                <FlatList
                    style={[{ marginBottom: 35 }]}
                    data={sections}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={[styles.flatList]}
                />
            </>)}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    dashboardActivity: {
        backgroundColor: primaryColor.darkPrimary,
        borderColor: primaryColor.darkPrimary,
        borderRadius: 20,
        paddingHorizontal: 20,
        paddingVertical: 15
    },
    accountContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        flexWrap: 'nowrap'
    },
    dashboard: {
        borderColor: primaryColor.darkPrimary,
        borderWidth: 1,
        borderRadius: 20,
        padding: 15,
        margin: 10,
        marginTop: 20
    },
    userAva: {
        width: 45,
        height: 45,
        resizeMode: "cover",
        borderRadius: 100,
        backgroundColor: '#FFFFFF',
        borderColor: primaryColor.whitePrimary,
        zIndex: 1
    },
    userContent: {
        paddingHorizontal: 15,
        backgroundColor: primaryColor.yellowPrimary,
        height: 30,
        marginLeft: -25,
        borderRadius: 40,
    },
    userName: {
        fontSize: 16,
        textTransform: "uppercase",
        marginHorizontal: 20,
        fontWeight: "600",
        lineHeight: 30,
        color: primaryColor.blackPrimary
    },
    statisticTitle: {
        rowGap: 8,
    },
    statisticValue: {
        rowGap: 8,
    },
    bellNotifications: {
        position: "absolute",
        top: -10,
        right: -5,
        minWidth: 15,
        backgroundColor: primaryColor.redPrimary,
        padding: .3,
        borderRadius: 100,
    },
    bellValue: {
        textAlign: 'center',
        color: primaryColor.whitePrimary,
        lineHeight: 20,
        fontSize: 12,
    },
    detailActivitiesBtn: {
        padding: 10,
        backgroundColor: primaryColor.yellowPrimary,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: primaryColor.yellowPrimary,
        color: primaryColor.darkPrimary,
        marginTop: 20,
    },
    safeArea: {
        flex: 1,
        marginBottom: -35,
        backgroundColor: primaryColor.whitePrimary,
    },
    flatList: {
        flexGrow: 1
    },
});

export default HomeScreen;
