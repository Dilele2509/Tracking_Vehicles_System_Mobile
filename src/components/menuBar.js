import { StyleSheet, TouchableOpacity, FlatList, Image, View, Text } from "react-native";
import React from "react";
import GlobalStyles, { primaryColor } from "../../assets/styles/GlobalStyles";

function MenuBar(props) {
    const { listTitle, itemList, navigation } = props;

    return (
        <View style={[GlobalStyles.padScreen20, GlobalStyles.mt10, { backgroundColor: primaryColor.whitePrimary }]}>
            <View style={[GlobalStyles.flexRow, { alignItems: "center", justifyContent: "space-between" }]}>
                <Text style={[GlobalStyles.h4, { color: primaryColor.blackPrimary }]}>
                    {listTitle}
                </Text>
            </View>
            <FlatList
                data={itemList}
                showsVerticalScrollIndicator={false}
                numColumns={2}
                style={[GlobalStyles.mt15]}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate("Product", { id: String(item.product_id) })}
                        style={styles.VehicleListItem}
                    >
                        <View style={styles.imgArea}>
                            {item.deleted == 1 && (
                                <View style={styles.disPro}>
                                    <Text style={styles.disProText}>Unavailable</Text>
                                </View>
                            )}
                            <Image style={styles.VehicleListImg} source={item.thumbnail} />
                        </View>
                        <View style={styles.VehicleListContent}>
                            <Text style={[GlobalStyles.h6, styles.title,{fontWeight:'500'}]}>{item.title}</Text>
                        </View>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => item.product_id ? item.product_id.toString() : index.toString()} // Fallback to index if product_id is missing
            />
        </View>
    );
}

const styles = StyleSheet.create({
    VehicleListItem: {
        flex: 1,
        margin: 5,
        backgroundColor: primaryColor.whitePrimary,
        borderRadius: 8,
        overflow: "hidden",
        elevation: 2, // For shadow on Android
        shadowColor: "#000", // Shadow on iOS
        shadowOpacity: 0.2,
        shadowOffset: { width: 0, height: 1 },
    },
    imgArea: {
        width: "100%",
        height: 150,
    },
    VehicleListImg: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    disPro: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(0,0,0,0.5)",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1,
    },
    disProText: {
        fontWeight: "500",
        color: primaryColor.whitePrimary,
        fontSize: 15,
    },
    VehicleListContent: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        paddingBottom: 10,
        backgroundColor: "#F1F1F1",
        padding: 10,
        minHeight: 70,
    },
    title: {
        maxWidth: "100%",
    },
    discountText: {
        paddingTop: 5,
        color: "#C40C0C",
        fontSize: 16,
    },
});

export default MenuBar;
