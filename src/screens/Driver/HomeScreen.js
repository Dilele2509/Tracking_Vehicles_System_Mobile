import React, { useState, useCallback } from "react";
import { SafeAreaView, FlatList, StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { Categories, Header, VehicleList, SliderShow, MenuBar, CartNoti, SplashScreen } from "../../components";
import GlobalStyles, { primaryColor } from "../../../assets/styles/GlobalStyles";
import axios from "../../API/axios";
import { AntDesign, Feather } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { BASEURL } from '@env'

function HomeScreen({ navigation }) {
    const [vehicles, setVehicles] = useState([]);
    const [userInfo, setUserInfo] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [hasResult, setHasResult] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const [searchData, setSearchData] = useState('');
    const [isLoading, setIsLoading] = useState(false)
    const [isShowing, setIsShowing] = useState(false);
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


    const showBalance = () => {
        return isShowing ? '750.000' : '*****';
    };

    /* fetch all data about recent, product, cart length, user info */
    const fetchData = useCallback(() => {
        setSearchData('')
        axios.post('/vehicles/user-id')
            .then((response) => {
                if (Array.isArray(response.data)) {
                    setVehicles(response.data);
                } else {
                    console.error('API response does not contain an array:', response.data);
                }
            })
            .catch((error) => {
                console.error('Error fetching vehicle data:', error);
            });

        axios.get(`/user/get-info`)
            .then((response) => {
                const userData = response.data;
                setUserInfo(userData);
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

    const renderItem = ({ item }) => {
        switch (item.type) {
            case 'slider':
                return <SliderShow />;
            case 'categories':
                return <Categories navigation={navigation} productAllList={vehicles} />;
            case 'dashboard':
                return (
                    <View style={[GlobalStyles.padScreen20, GlobalStyles.mt10, styles.dashboard, { backgroundColor: primaryColor.whitePrimary }]}>
                        <View style={[GlobalStyles.flexRow, { alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }]}>
                            <TouchableOpacity
                                onPress={ () => navigation.navigate('Account')}
                                style={styles.accountContainer}>
                                <Image style={styles.userAva} source={{ uri: `${BASEURL}${userInfo.avatar}` }} />
                                {/* {console.log(`${BASEURL}${userInfo.avatar}`)} */}
                                <View style={styles.userContent}>
                                    <Text style={[styles.userName]}>{userInfo.fullname}</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Feather name="bell" size={24} color={primaryColor.yellowPrimary} />
                                {quantNotification > 0 && <View style={styles.bellNotifications}>
                                    <Text style={[GlobalStyles.h6, styles.bellValue]}>{quantNotification}</Text>
                                </View>}
                            </TouchableOpacity>
                        </View>
                        <View style={[GlobalStyles.flexRow, { alignItems: "center", justifyContent: "space-between" }]}>
                            <Text style={[GlobalStyles.h5, { color: primaryColor.blackPrimary }]}>
                                Wallet balance
                            </Text>
                            <View style={[GlobalStyles.flexRow]}>
                                <Text style={[GlobalStyles.h5, { color: primaryColor.blackPrimary }]}>{showBalance()} VND</Text>
                                <TouchableOpacity onPress={() => { setIsShowing(!isShowing) }}>
                                    <Feather name={!isShowing ? 'eye' : 'eye-off'} style={{ marginLeft: 10 }} color={primaryColor.yellowPrimary} size={20} />
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View
                            style={[GlobalStyles.flexRow, GlobalStyles.pad10, GlobalStyles.mt15, { justifyContent: 'space-between' }]}>
                            <View style={[GlobalStyles.flex]}>
                                <Text style={[GlobalStyles.h4, { color: primaryColor.greenPrimary, marginBottom: 5 }]}>92.4%</Text>
                                <Text style={[GlobalStyles.h6, {  fontWeight: '500', color: primaryColor.blackPrimary }]}>
                                    Acceptance
                                </Text>
                            </View>
                            <View style={[GlobalStyles.flex]}>
                                <Text style={[GlobalStyles.h4, { color: primaryColor.redPrimary, marginBottom: 5 }]}>7.6%</Text>
                                <Text style={[GlobalStyles.h6, {  fontWeight: '500', color: primaryColor.blackPrimary }]}>
                                    Cancellation
                                </Text>
                            </View>
                            <View style={[GlobalStyles.flex]}>
                                <Text style={[GlobalStyles.h4, { color: primaryColor.bluePrimary, marginBottom: 5 }]}>4.9/5</Text>
                                <Text style={[GlobalStyles.h6, {  fontWeight: '500', color: primaryColor.blackPrimary }]}>
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
                                    <Text style={[GlobalStyles.h6, { fontWeight:'500', color: primaryColor.whitePrimary }]}>
                                        Number of trip
                                    </Text>
                                    <Text style={[GlobalStyles.h6, { fontWeight:'500', color: primaryColor.whitePrimary }]}>
                                        Income
                                    </Text>
                                    <Text style={[GlobalStyles.h6, { fontWeight:'500', color: primaryColor.whitePrimary }]}>
                                        Rated
                                    </Text>
                                </View>
                                <View style={styles.statisticValue}>
                                    <Text style={[GlobalStyles.h6, { fontWeight:'500', color: primaryColor.whitePrimary }]}>
                                        1
                                    </Text>
                                    <Text style={[GlobalStyles.h6, { fontWeight:'500', color: primaryColor.whitePrimary }]}>
                                        25.000 VND
                                    </Text>
                                    <Text style={[GlobalStyles.h6, { fontWeight:'500', color: primaryColor.whitePrimary }]}>
                                        5/5
                                    </Text>
                                </View>
                            </View>
                            <TouchableOpacity style={[styles.detailActivitiesBtn, GlobalStyles.h5]}>
                                <Text style={{ textAlign: 'center', fontWeight:'500' }}>More details</Text>
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
                    setHasResult={setHasResult}
                    searchResult={searchResult}
                    setSearchResult={setSearchResult}
                    searchData={searchData}
                    setSearchData={setSearchData}
                />
                {hasResult && (
                    <FlatList
                        style={styles.viewSearchBox}
                        data={searchResult}
                        contentContainerStyle={{ paddingBottom: 20 }}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => navigation.navigate("Product", { id: String(item.id) })}
                                key={item.id}
                                style={styles.recentItem}
                            >
                                <View style={[styles.imgAre]}>
                                    {item.deleted == 1 ? (<View style={[styles.disPro]}>
                                        <Text style={[styles.disProText]}>Unavailable</Text>
                                    </View>) : null}
                                    <Image style={styles.recentImg} source={{ uri: `${BASEURL}${item.thumbnail}` }} />
                                </View>
                                <View style={[GlobalStyles.pad10, styles.recentContent]}>
                                    <Text style={[GlobalStyles.h5]}>{item.vehicle_brand + ' ' + item.vehicle_line}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                    /* keyExtractor={item => item.id.toString()} */
                    />
                )}

                <FlatList
                    style={[{ marginBottom: 35 }]}
                    data={sections}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={[styles.flatList, { paddingBottom: cartCount > 0 && 80 }]}
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
        backgroundColor: primaryColor.whitePrimary,
    },
    flatList: {
        flexGrow: 1,
        paddingBottom: 30,
    },
    viewSearchBox: {
        backgroundColor: primaryColor.whitePrimary,
        width: "90%",
        minHeight: 60,
        maxHeight: 250,
        borderWidth: 1,
        borderColor: primaryColor.blackPrimary,
        borderRadius: 10,
        position: "absolute",
        top: 180,
        left: "5%",
        zIndex: 9999,
        padding: 10,
    },
    recentItem: {
        flexDirection: "row",
        marginBottom: 10,
        alignItems: "center", // Align items vertically
    },
    recentImg: {
        width: 60,
        height: 60,
        resizeMode: "cover",
    },
    imgAre: {
        width: 60,
        height: 60,
    },
    disPro: {
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        backgroundColor: "rgba(0,0,0,.5)",
        alignItems: "center",
        justifyContent: "center"
    },
    disProText: {
        fontWeight: "500",
        color: primaryColor.whitePrimary,
        fontSize: 10
    },
    recentContent: {
        flex: 1,
        flexDirection: "column",
        height: 60,
        justifyContent: "space-between",
        backgroundColor: primaryColor.whitePrimary,
        marginLeft: 10,
        padding: 10,
    },
    textContent: {
        marginTop: 5,
        color: primaryColor.blackPrimary,
        fontSize: 16,
        fontWeight: "500",
        textAlign: "center",
    },
    discountText: {
        padding: 3,
        alignSelf: "flex-start",
        borderWidth: 1,
        borderColor: "#C40C0C",
        color: "#C40C0C",
        fontSize: 12,
    },
});

export default HomeScreen;
