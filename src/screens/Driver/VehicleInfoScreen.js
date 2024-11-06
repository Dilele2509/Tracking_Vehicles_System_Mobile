import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity, StyleSheet, SafeAreaView, Dimensions } from 'react-native';
import GlobalStyles, {primaryColor} from '../../../assets/styles/GlobalStyles';
import { AntDesign } from '@expo/vector-icons';

const { width } = Dimensions.get('window');
export default function DeviceShopScreen({navigation}) {
    // State for quantity and in-stock status
    const [quantity, setQuantity] = useState(1);
    const [inStock, setInStock] = useState(10);

    // Handle quantity increment and decrement
    const incrementQuantity = () => {
        setQuantity(prevQuantity => prevQuantity + 1);
    };

    const decrementQuantity = () => {
        if (quantity > 1) {
            setQuantity(prevQuantity => prevQuantity - 1);
        }
    };

    const handleQuantChange = (value) => {
        if (!isNaN(value) && value > 0) {
            setQuantity(parseInt(value, 10));
        } else if (value === '' || value === 0) {
            setQuantity(1); // Reset to 1 if input is cleared
        }
    };

    return (
        <SafeAreaView style={styles.deviceContainer}>
            <View style={[GlobalStyles.padScreen20, styles.headerPage]}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <AntDesign name="arrowleft" size={24} color={primaryColor.yellowPrimary} />
                </TouchableOpacity>
                <Text style={styles.titleText}>Device Shop</Text>
            </View>
            <Text style={styles.deviceTitle}>HL-STM4G</Text>
            <View style={styles.deviceContent}>
                <View style={styles.deviceImg}>
                    <Image source={require('../../../assets/Images/device.png')} style={styles.image} />
                </View>
                <View style={styles.contentDevice}>
                    <View style={styles.contentBox}>
                        <View style={styles.contentItemPrice}>
                            <Text style={styles.devicePrice}>1,559,000 VND</Text>
                            <View style={styles.inStock}>
                                <Text style={styles.inStockText}>In Stock:</Text>
                                <Text style={[styles.inStockAmount, inStock < 5 && styles.lowStock]}>{inStock}</Text>
                            </View>
                            <View style={styles.quantityControls}>
                                <TouchableOpacity style={styles.quantityButton} onPress={decrementQuantity}>
                                    <Text style={styles.quantityButtonText}>-</Text>
                                </TouchableOpacity>
                                <TextInput
                                    style={styles.quantityInput}
                                    keyboardType="numeric"
                                    value={String(quantity)}
                                    onChangeText={handleQuantChange}
                                />
                                <TouchableOpacity style={styles.quantityButton} onPress={incrementQuantity}>
                                    <Text style={styles.quantityButtonText}>+</Text>
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity style={styles.buyButton}>
                                <Text style={styles.buyButtonText}>Buy Now</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
            <View style={styles.contentItem}>
                <Text style={styles.sectionTitle}>Description</Text>
                <Text style={styles.description}>The device uses 4G connectivity technology to transmit its current location. This way, it can extend the range without being limited by OS or software platform. The device is installed directly into the vehicle, ensuring a power source without frequent battery charging.</Text>
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
    titleText: {
        fontSize: 24,
        fontWeight: '500',
        color: primaryColor.yellowPrimary,
        position: "absolute",
        width: width,
        textAlign: "center",
        zIndex: -999
    },
    deviceContainer: {
        padding: 20,
        borderRadius: 10,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
    },
    deviceTitle: {
        textAlign: 'center',
        fontSize: 30,
        fontWeight: '700',
    },
    deviceContent: {
        marginTop: 20,
        flexDirection: 'row',
        height: 'auto',
    },
    deviceImg: {
        flexBasis: '40%',
        maxWidth: '40%',
        margin: 20,
    },
    image: {
        height: 280,
        width: '100%',
        resizeMode: 'cover',
        borderRadius: 10,
    },
    contentDevice: {
    },
    contentBox: {
    },
    contentItemPrice: {
        marginTop: 20,
    },
    contentItem: {
        padding: 20
    },
    sectionTitle: {
        fontSize: 18,
        textTransform: 'uppercase',
        fontWeight: '600',
        marginBottom: 5,
    },
    description: {
        textAlign: 'justify',
        fontSize: 14,
    },
    devicePrice: {
        fontWeight: '600',
        fontSize: 24,
        color: '#FF0000',
        marginBottom: 10,
    },
    inStock: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    inStockText: {
        fontWeight: '500',
        marginRight: 10,
    },
    inStockAmount: {
        fontWeight: '500',
        fontSize: 16,
    },
    lowStock: {
        color: 'red',
    },
    quantityControls: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    quantityButton: {
        borderWidth: 1,
        borderColor: '#eee',
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
    },
    quantityButtonText: {
        fontSize: 24,
    },
    quantityInput: {
        width: 50,
        height: 50,
        textAlign: 'center',
        borderWidth: 1,
        borderColor: '#eee',
        marginHorizontal: 5,
        fontSize: 18,
        color: '#909090',
    },
    buyButton: {
        backgroundColor: '#1c1c1c',
        borderRadius: 5,
        paddingVertical: 15,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    buyButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '700',
    },
});
