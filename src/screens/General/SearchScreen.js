import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Dimensions, Image, FlatList } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import GlobalStyles, { primaryColor } from "../../../assets/styles/GlobalStyles";

const { width } = Dimensions.get('window');

/* Nguyen Le Giang Ha do this task */
function SearchScreen({ navigation, route }) {
    const { titlePage, allList } = route.params;

    return (
        <SafeAreaView style={[{ flex: 1 , backgroundColor: primaryColor.whitePrimary}]}>
            <View style={[GlobalStyles.padScreen20, styles.headerPage]}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <AntDesign name="arrowleft" size={24} color={primaryColor.yellowPrimary} />
                </TouchableOpacity>
                <Text style={styles.titleText}>{titlePage}</Text>
            </View>
            <FlatList data={allList}
                style={styles.itemContainer}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        onPress={()=>navigation.navigate("Product", {id: String(item.product_id)})}
                        key={item.product_id} 
                        style={styles.recentItem}>
                        <Image style={styles.recentImg} source={{ uri: item.thumbnail }} />
                        <View style={[GlobalStyles.pad10, styles.recentContent]}>
                            <Text style={[GlobalStyles.h5]}>{item.title}</Text>
                            <Text style={styles.discountText}>Sold: {item.sold}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
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
    itemContainer: {
        padding: 20,
    },
    recentItem: {
        flexDirection: "row",
        marginBottom: 10,
        alignItems: "center", // Align items vertically
    },
    recentImg: {
        width: 100,
        height: 100,
        resizeMode: "cover",
    },
    recentContent: {
        flex: 1,
        flexDirection: "column",
        height: 100,
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

export default SearchScreen;
