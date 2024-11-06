import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { primaryColor } from '../../assets/styles/GlobalStyles'
import { FontAwesome6 } from '@expo/vector-icons';


/* Tran Binh Phuoc do this task */
const CartNoti = (props) => {
    const {cartCount, navigation} = props
    return (
        <View style={styles.container}>
            <View style={[{flexDirection: "row", alignItems: "center"}]}>
                <FontAwesome6 style={styles.cart} name="basket-shopping" size={28} color={primaryColor.yellowPrimary} />
                <Text style={[{color: primaryColor.yellowPrimary, fontWeight: "500", fontSize: 16, lineHeight: 50}]}>x{cartCount}</Text>
            </View>
            <TouchableOpacity onPress={()=>navigation.navigate("Cart")} style={styles.cartBtn}>
                <Text style={[{color: primaryColor.whitePrimary, fontWeight: "500", fontSize: 16, lineHeight: 50}]}>View Cart</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CartNoti

const styles = StyleSheet.create({
    container: {
        width: "90%%",
        alignSelf: "center",
        height: 55,
        flexDirection: "row",
        backgroundColor: primaryColor.whitePrimary,
        alignItems: "center",
        justifyContent: "space-between",
        position: "absolute",
        bottom: 100,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: primaryColor.brownPrimary,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: .05,
        shadowRadius: .9
    },
    cart: {
        marginLeft: 20,
        marginRight: 10
    },
    cartBtn: {
        backgroundColor: primaryColor.yellowPrimary,
        height: 50,
        paddingHorizontal: 10,
        marginRight: 2,
        borderRadius: 10
    }
})