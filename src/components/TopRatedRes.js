import React from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import GlobalStyles, { primaryColor } from "../../assets/styles/GlobalStyles";
import { AntDesign } from '@expo/vector-icons';

/* Nguyen Le Giang Ha do this task */
function TopRatedRes(props) {
    const { onPress, listTitle, itemList, navigation } = props;

    return (
        <View style={[GlobalStyles.padScreen20, GlobalStyles.mt10, { backgroundColor: primaryColor.whitePrimary }]}>
            <View style={[GlobalStyles.flexRow, { alignItems: "center", justifyContent: "space-between" }]}>
                <Text style={[GlobalStyles.h4, { color: primaryColor.blackPrimary }]}>
                    {listTitle}
                </Text>
                <TouchableOpacity onPress={onPress} style={[GlobalStyles.flexRow, { alignItems: "center" }]}>
                    <Text style={[{ color: primaryColor.yellowPrimary }]}>View All</Text>
                    <AntDesign name="right" size={18} color={primaryColor.yellowPrimary} />
                </TouchableOpacity>
            </View>
            <FlatList data={itemList}
                style={[GlobalStyles.mt15]}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        key={item.product_id} 
                        onPress={() => navigation.navigate("Product" , {id: item.product_id, title: item.title, img: item.thumbnail})}
                        style={[styles.recentItem]}>
                        <Image style={[styles.recentImg]} source={{ uri: item.thumbnail }} />
                        <View style={[GlobalStyles.pad10, styles.recentContent]}>
                            <Text style={[GlobalStyles.h5]}>{item.title}</Text>
                            <Text style={[styles.discountText]}>sold: {item.sold}</Text>
                        </View>
                    </TouchableOpacity>
                )} />
        </View>
    );
}

const styles = StyleSheet.create({
    recentItem: {
        display: "flex",
        flexDirection: "column",
        marginRight: 10
    },
    recentImg: {
        width: 150,
        height: 150,
        resizeMode: "center",
        objectFit: "cover"
    },
    recentContent: {
        backgroundColor: "#F5F7F8",
        justifyContent: "space-between",
        width: 150,
        height: 100
    },
    discountText: {
        marginTop: 20,
        padding: 3,
        alignSelf: "flex-start",
        borderWidth: 1,
        borderColor: "#C40C0C",
        borderStyle: "solid",
        color: "#C40C0C",
        fontSize: 12
    }
});

export default TopRatedRes;
