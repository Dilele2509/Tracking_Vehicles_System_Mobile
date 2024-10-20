import React, { useState, useCallback } from "react";
import { SafeAreaView, FlatList, StyleSheet, View, Text, TouchableOpacity, Image } from "react-native";
import { Categories, Header, Recommend, SliderShow, TopRatedRes, MenuBar, Footer, CartNoti, SplashScreen } from "../../components";
import GlobalStyles, { primaryColor } from "../../../assets/styles/GlobalStyles";
import axios from "../../API/axios";
import { useFocusEffect } from '@react-navigation/native';

function HomeScreen({ navigation }) {
    const [products, setProducts] = useState([]);
    const [userInfo, setUserInfo] = useState([]);
    const [recentProduct, setRecentProduct] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [bestList, setBestList] = useState([]);
    const [hasResult, setHasResult] = useState(false);
    const [searchResult, setSearchResult] = useState([]);
    const [searchData, setSearchData] = useState('');
    const [isLoading, setIsLoading] = useState(false)


    /* generate product info from product_id in recent list response */
/*     const fetchRecentProducts = async (recentList) => {
        try {
            const productList = await Promise.all(recentList.map(async (item) => {
                const productResponse = await axios.post('product/recent', { product_id: item.product_id });
                return productResponse.data[0];
            }));
            setRecentProduct(productList);
        } catch (error) {
            console.error('Error fetching recent product data:', error);
        }
    }; */

    /* fetch all data about recent, product, cart length, user info */
/*     const fetchData = useCallback(() => {
        setSearchData('')
        axios.get('/product')
            .then((response) => {
                if (Array.isArray(response.data)) {
                    setProducts(response.data);
                } else {
                    console.error('API response does not contain an array:', response.data);
                }
            })
            .catch((error) => {
                console.error('Error fetching product data:', error);
            });

        axios.get(`/user/id`)
            .then((response) => {
                const userData = response.data.user[0];
                setUserInfo(userData);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });

        axios.get(`/user/recent`)
            .then((response) => {
                fetchRecentProducts(response.data);
            })
            .catch((error) => {
                console.error('Error fetching recent data:', error);
            });

        axios.get('/cart')
            .then((response) => {
                //console.log(response.data.length, response.data);
                setCartCount(response.data.length)
            })
            .catch((error) => {
                console.log('Error fetching recent data: ', error);
            })

        axios.get('/product/bestseller')
            .then((response) => {
                setBestList(response.data)
            })
            .catch((error) => {
                console.log('Error fetching best seller data: ', error);
            })

    }, []); */

    /* call back when focus screen */
/*     useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [fetchData])
    ); */

    const renderItem = ({ item }) => {
        switch (item.type) {
            case 'slider':
                return <SliderShow />;
            case 'categories':
                return <Categories navigation={navigation} productAllList={products} />;
            case 'recommend':
                return (
                    <>
                        {recentProduct.length > 0 && (
                            <Recommend
                                listTitle="Recently Viewed"
                                itemList={recentProduct}
                                onPress={() => navigation.navigate("ViewAll", { titlePage: 'Recently Viewed', prevPage: 'Home', allList: recentProduct })}
                                navigation={navigation}
                            />
                        )}
                    </>
                );
            /* case 'recommend2':
                return (
                    <Recommend
                        listTitle="Recommend"
                        itemList={products}
                        onPress={() => navigation.navigate("ViewAll", { titlePage: 'Recommended', prevPage: 'Home', allList: products })}
                    />
                ); */
            case 'topRatedRes':
                return (
                    <TopRatedRes
                        listTitle="Best Seller"
                        itemList={bestList}
                        onPress={() => navigation.navigate("ViewAll", { titlePage: 'Top Rating Restaurant', prevPage: 'Home', allList: bestList })}
                        navigation={navigation}
                    />
                );
            case 'menuBar':
                return <MenuBar listTitle="Menu" itemList={products} navigation={navigation} />;
            default:
                return null;
        }
    };

    const sections = [
        { id: 'slider', type: 'slider' },
        { id: 'categories', type: 'categories' },
        { id: 'recommend', type: 'recommend' },
        { id: 'recommend2', type: 'recommend2' },
        { id: 'topRatedRes', type: 'topRatedRes' },
        { id: 'menuBar', type: 'menuBar' },
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
                    userName={userInfo.full_name}
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
                                onPress={() => navigation.navigate("Product", { id: String(item.product_id) })}
                                key={item.product_id}
                                style={styles.recentItem}
                            >
                                <View style={[styles.imgAre]}>
                                    {item.deleted == 1 ? (<View style={[styles.disPro]}>
                                        <Text style={[styles.disProText]}>Unavailable</Text>
                                    </View>) : null}
                                    <Image style={styles.recentImg} source={{ uri: item.thumbnail }} />
                                </View>
                                <View style={[GlobalStyles.pad10, styles.recentContent]}>
                                    <Text style={[GlobalStyles.h5]}>{item.title}</Text>
                                </View>
                            </TouchableOpacity>
                        )}
                        keyExtractor={item => item.product_id.toString()}
                    />
                )}
    
                <FlatList
                    style={[{ marginBottom: 35 }]}
                    data={sections}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    contentContainerStyle={[styles.flatList, {paddingBottom: cartCount>0 && 80}]}
                />
                {cartCount > 0 && <CartNoti cartCount={cartCount} navigation={navigation} />}
                <Footer navigation={navigation} />
            </>)}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: primaryColor.creamPrimary,
    },
    flatList: {
        flexGrow: 1,
        paddingBottom: 30,
    },
    viewSearchBox: {
        backgroundColor: primaryColor.whitePrimary,
        width: "90%",
        minHeight: 60,
        maxHeight: 200,
        borderWidth: 1,
        borderColor: primaryColor.blackPrimary,
        borderRadius: 10,
        position: "absolute",
        top: 185,
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
