import React, { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { StyleSheet, Text, View, Image, Dimensions, TouchableOpacity, FlatList, SafeAreaView, TextInput, KeyboardAvoidingView, Platform, ScrollView, Alert } from "react-native";
import GlobalStyles, { primaryColor } from "../../../assets/styles/GlobalStyles";
import { AntDesign, Ionicons } from '@expo/vector-icons';
import axios from "../../API/axios";
import { AddCartBox, CartView, SplashScreen } from "../../components";

const { width } = Dimensions.get('window');

function ProductScreen({ route, navigation }) {
    const { id } = route.params;
    const [productInfo, setProductInfo] = useState(null);
    const [cartCount, setCartCount] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [note, setNote] = useState('');
    const [fbList, setFbList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    /* fetch data of product and feedback */
    const fetchData = useCallback(() => {
        setIsLoading(true)
        axios.post('/product/id', { product_id: Number(id) })
            .then((response) => {
                if (Array.isArray(response.data) && response.data.length > 0) {
                    setProductInfo(response.data[0]);
                } else {
                    console.error('API response does not contain an array or is empty:', response.data);
                }
            })
            .catch((error) => {
                console.error('Error fetching product data:', error);
            })
            .finally(() => {
                setIsLoading(false); // Set loading state to false after fetching data
            });

        axios.get('/cart')
            .then((response) => {
                setCartCount(response.data.length);
            })
            .catch((error) => {
                console.error('Error fetching cart data:', error);
            });

        axios.post('/feedback', { product_id: Number(id) })
            .then((response) => {
                //console.log('res: ', response.data);
                setFbList(response.data);
            })
            .catch((error) => {
                console.error('Error fetching product data:', error);
            });
    }, [id]);

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [fetchData])
    );

    /* Tran Binh Phuoc call axios to add feedback to firebase */
    const handleAddFeedback = () => {
        setIsLoading(true)
        const fbData = {
            note: note,
            product_id: id
        }
        //console.log(fbData);
        axios.post("/feedback/send", fbData)
            .then((response) => {
                //console.log(response.data);
                if (response.data.status != 'Error') {
                    fetchData()
                    setNote('')
                } else {
                    Alert.alert(response.data.message)
                }
            })
            .catch((error) => {
                console.error('Error fetching product data:', error);
            })
            .finally(() => {
                setIsLoading(false); // Set loading state to false after fetching data
            });
    }

    /* Le Thuy Tuong Vy call axios to add product to cart */
    const handleAddToCart = () => {
        setIsLoading(true)
        axios.post('/cart/add', { product_id: productInfo.product_id, quantity: quantity })
            .then(() => {
                fetchData(); // Fetch updated cart data to update cartCount
                setIsOpen(false);
            })
            .catch(error => {
                console.error('Error adding item to cart:', error);
            })
            .finally(() => {
                setIsLoading(false); // Set loading state to false after fetching data
            });
    };

    /* change quantity of product */
    const incrementQuantity = () => {
        setQuantity(quantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    if (!productInfo) {
        return <SplashScreen isLoading={isLoading}/>;
    }

    return (
        <View style={[GlobalStyles.heighFullScreen, { backgroundColor: primaryColor.creamPrimary }]}>
            <SplashScreen isLoading={isLoading}/>
            {!isLoading && (<>
                <View style={[]}>
                    <Image style={styles.prodImg} source={{ uri: productInfo.thumbnail }} />
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <AntDesign name="arrowleft" size={28} color="#fff" />
                    </TouchableOpacity>
                </View>
    
                {/* content */}
                <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                >
                    <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
                        <View style={[{ paddingHorizontal: 20 }]}>
                            <Text style={GlobalStyles.h2}>{productInfo.title}</Text>
                            {productInfo.deleted == 1 && <Text style={[GlobalStyles.h5, GlobalStyles.mt10, {color:primaryColor.redPrimary}]}>This product is unavailable</Text>}
                            <Text style={[GlobalStyles.basicText, GlobalStyles.mt15]}>{productInfo.description}</Text>
                            <Text style={[GlobalStyles.basicText, styles.description]}>Quantity Sold: <Text style={[{fontWeight: "700", color: primaryColor.greenPrimary}]}>{productInfo.sold}</Text>
                            </Text>
                            <Text style={GlobalStyles.basicText}>In Stock: <Text style={[{fontWeight: "700",color: productInfo.quantity <= 3 ? primaryColor.redPrimary : primaryColor.greenPrimary}]}>{productInfo.quantity}</Text>
                            </Text>
                            <View style={styles.desContainer}>
                                <View>
                                    <Text style={styles.price}>{productInfo.price} VND</Text>
                                </View>
                                <View style={styles.addBtn}>
                                    <TouchableOpacity onPress={() => {
                                        productInfo.deleted == 1 ? (
                                            Alert.alert("Oops! This product is unavailable")
                                        ) : setIsOpen(true)
                                    }}>
                                        <AntDesign name="plussquare" size={28} color={primaryColor.yellowPrimary} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        <View style={[GlobalStyles.padScreen20]}>
                            <View style={[styles.fbArea, { paddingBottom: 10 }]}>
                                <Text style={GlobalStyles.h3}>Feedbacks</Text>
                            </View>
                            {productInfo.deleted != 1 && (<View
                                style={styles.desContainer}
                                behavior={Platform.OS === "ios" ? "padding" : "height"}
                            >
                                <View style={{ width: "90%" }}>
                                    <TextInput
                                        style={styles.inputFeedback}
                                        value={note}
                                        onChangeText={setNote}
                                        placeholder="Write your feedback..."
                                        placeholderTextColor="999"
                                    />
                                </View>
                                <View>
                                    <TouchableOpacity onPress={handleAddFeedback}>
                                        <Ionicons name="send" size={28} color={primaryColor.yellowPrimary} />
                                    </TouchableOpacity>
                                </View>
                            </View>)}
                            {fbList.map((item) => (
                                <View key={item.feedback_id} style={styles.recentItem}>
                                    <Image style={styles.recentImg} source={{ uri: item.avatar }} />
                                    <View style={[GlobalStyles.pad10, styles.recentContent]}>
                                        <Text style={GlobalStyles.h5}>{item.full_name}</Text>
                                        <Text style={styles.discountText}>{item.note}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
                <SafeAreaView>
                    {isOpen && (
                        <AddCartBox
                            handleAddToCart={handleAddToCart}
                            quantity={quantity}
                            incrementQuantity={incrementQuantity}
                            decrementQuantity={decrementQuantity}
                            setIsOpen={setIsOpen}
                            item={productInfo}
                        />
                    )}
                    {cartCount > 0 && <CartView cartCount={cartCount} navigation={navigation} style={styles.cartView} />}
                </SafeAreaView>
            </>)}
        </View>
    );
}

const styles = StyleSheet.create({
    prodImg: {
        width: width,
        height: 320,
        resizeMode: "cover"
    },
    description: {
        marginTop: 10,
    },
    desContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginTop: 15
    },
    backBtn: {
        backgroundColor: "rgba(0, 0, 0, 0.45)",
        textAlign: "center",
        width: 40,
        height: 40,
        position: "absolute",
        top: "15%",
        left: "5%",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 20,
    },
    price: {
        fontSize: 20,
        fontWeight: "600",
        color: primaryColor.yellowPrimary
    },
    fbArea: {
        borderStyle: "solid",
        borderBottomWidth: 1,
        borderBottomColor: primaryColor.yellowPrimary
    },
    recentItem: {
        flexDirection: 'row',
        marginTop: 15,
        alignItems: "center"
    },
    recentImg: {
        width: 40,
        height: 40,
        borderRadius: 100,
    },
    recentContent: {
        flex: 1,
        marginLeft: 10,
        minHeight: 50,
        justifyContent: 'space-between',
    },
    discountText: {
        color: primaryColor.blackPrimary,
        maxWidth: "95%",
        flexWrap: "wrap",
    },
    cartView: {
        position: 'absolute',
        bottom: 10,
        right: 10,
    },
    inputFeedback: {
        marginRight: 10,
        height: 30,
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: primaryColor.whitePrimary,
        borderStyle: "solid",
        paddingHorizontal: 15
    }
});

export default ProductScreen;
