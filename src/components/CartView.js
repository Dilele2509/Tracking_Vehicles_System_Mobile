import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { primaryColor } from '../../assets/styles/GlobalStyles'
import { FontAwesome6 } from '@expo/vector-icons';


/* Tran Binh Phuoc do this task */
const CartView = (props) => {
    const {navigation, cartCount} = props
    return (
        <View style={styles.container}>
            <View style={[{flexDirection: "row", alignItems: "center"}]}>
                <FontAwesome6 style={styles.cart} name="basket-shopping" size={28} color={primaryColor.yellowPrimary} />
                <Text style={[{color: primaryColor.yellowPrimary, fontWeight: "500", fontSize: 16, lineHeight: 55}]}>x{cartCount}</Text>
            </View>
            <TouchableOpacity onPress={()=>navigation.navigate("Cart")} style={styles.cartBtn}>
                <Text style={[{color: primaryColor.whitePrimary, fontWeight: "500", fontSize: 16, lineHeight: 55}]}>View Cart</Text>
            </TouchableOpacity>
        </View>
    )
}

export default CartView

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 55,
        flexDirection: "row",
        backgroundColor: primaryColor.whitePrimary,
        alignItems: "center",
        justifyContent: "space-between",
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
        height: 55,
        paddingHorizontal: 10
    }
})