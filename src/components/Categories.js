import React, { useRef, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Animated } from "react-native";
import GlobalStyles, { primaryColor } from "../../assets/styles/GlobalStyles";
import { Ionicons, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import axios from "../API/axios";



/* Tran Binh Phuoc do this task */
function Categories(props) {
    const { navigation, productAllList } = props;
    const scrollViewRef = useRef(null);
    const [scrollX] = useState(new Animated.Value(0));
    const [contentWidth, setContentWidth] = useState(1);
    const [containerWidth, setContainerWidth] = useState(1);

    const handleContentSizeChange = (contentWidth) => {
        setContentWidth(contentWidth);
    };

    const handleLayout = ({ nativeEvent }) => {
        setContainerWidth(nativeEvent.layout.width);
    };

    const scrollIndicatorSize = containerWidth / contentWidth * 100; // Width of scroll indicator relative to its container
    const difference = containerWidth - scrollIndicatorSize;
    const scrollIndicatorPosition = Animated.multiply(scrollX, 100 / contentWidth).interpolate({
        inputRange: [0, Math.max(contentWidth - containerWidth, 1)],
        outputRange: [0, Math.max(difference, 1)],
        extrapolate: 'clamp',
    });

    const setListProduct = (catID, titlePage) => {
        axios.post('/product/cat', { category_id: catID })
            .then((response) => {
                if (Array.isArray(response.data)) {
                    navigation.navigate("ViewAll", { titlePage: titlePage, prevPage: 'Home', allList: response.data })
                } else {
                    console.error('API response does not contain an array:', response.data);
                }
            })
            .catch((error) => {
                console.error('Error fetching product data:', error);
            });
    }

    return (
        <View style={styles.wrapper}>
            <ScrollView
                ref={scrollViewRef}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                onContentSizeChange={handleContentSizeChange}
                onLayout={handleLayout}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                scrollEventThrottle={16}
            >
                <View style={[GlobalStyles.flexRow, styles.container]}>
                    <TouchableOpacity
                        onPress={() => {
                            setListProduct(1, "Main Dish");
                        }}
                        style={[GlobalStyles.ml20, styles.catItem]}>
                        <MaterialCommunityIcons style={{ marginBottom: 7 }} name="food-turkey" size={28} color="#FB6D48" />
                        <Text style={[{ color: "#DD5746" }]}>Main Dish</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            setListProduct(2, "Side Dish");
                        }}
                        style={[GlobalStyles.ml20, styles.catItem]}>
                        <Ionicons style={{ marginBottom: 7 }} name="fast-food" size={28} color="#FFAF45" />
                        <Text style={[{ color: "#FFAF45" }]}>Side Dish</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            setListProduct(3, "Snack");
                        }}
                        style={[GlobalStyles.ml20, styles.catItem]}>
                        <MaterialCommunityIcons style={{ marginBottom: 7 }} name="food-hot-dog" size={28} color="#ED9455" />
                        <Text style={[{ color: "#ED9455" }]}>Snack</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            setListProduct(4, "Drink");
                        }}
                        style={[GlobalStyles.ml20, styles.catItem]}>
                        <Entypo style={{ marginBottom: 7 }} name="drink" size={28} color="#40679E" />
                        <Text style={[{ color: "#40679E" }]}>Drink</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => {
                            navigation.navigate("ViewAll", { titlePage: 'Menu', prevPage: 'Home', allList: productAllList })
                        }}
                        style={[GlobalStyles.ml20, styles.catItem]}>
                        <MaterialCommunityIcons style={{ marginBottom: 7 }} name="food-fork-drink" size={28} color="#ED9455" />
                        <Text style={[{ color: "#ED9455" }]}>All Menu</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <View style={styles.scrollIndicatorContainer}>
                <Animated.View style={[styles.scrollIndicator, { width: scrollIndicatorSize, transform: [{ translateX: scrollIndicatorPosition }] }]} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 10,
        position: 'relative',
        height: 70,
    },
    scrollView: {
        flex: 1,
    },
    container: {
        flexDirection: 'row',
        paddingBottom: 10,
    },
    catItem: {
        alignItems: "center",
        minWidth: 60,
        marginRight: 20,
    },
    scrollIndicatorContainer: {
        height: 3,
        width: 140,
        backgroundColor: '#E0E0E0',
        borderRadius: 1.5,
        position: 'absolute',
        bottom: 0,
        alignSelf: "center",
    },
    scrollIndicator: {
        height: 3,
        backgroundColor: primaryColor.yellowPrimary,
        borderRadius: 1.5,
    },
});

export default Categories;
