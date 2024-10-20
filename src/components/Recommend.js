import React from "react";
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import GlobalStyles, { primaryColor } from "../../assets/styles/GlobalStyles";
import { AntDesign } from '@expo/vector-icons';

/* Nguyen Le Giang Ha do this task */
function Recommend(props) {
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
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                style={[GlobalStyles.mt15]}
                renderItem={({ item }) => (
                    <TouchableOpacity 
                        key={item.product_id} 
                        style={[styles.RecommendItem]}
                        onPress={()=>navigation.navigate("Product", {id: String(item.product_id)})}>
                        <View style={[styles.imgAre]}>
                            {item.deleted == 1 ? (<View style={[styles.disPro]}>
                                <Text style={[styles.disProText]}>Unavailable</Text>
                            </View>) : null}
                            <Image style={[styles.RecommendImg]} source={{ uri: item.thumbnail }} />
                        </View>
                        <View style={[GlobalStyles.pad10, styles.RecommendContent]}>
                            <Text style={[GlobalStyles.h5]}>{item.title}</Text>
                            <Text style={[styles.discountText]}>sold: {item.sold}</Text>
                        </View>
                        {/* {console.log(item)} */}
                    </TouchableOpacity>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    RecommendItem: {
        display: "flex",
        flexDirection: "row"
    },
    RecommendImg: {
        width: 100,
        height: 100,
        resizeMode: "center",
        objectFit: "cover"
    },
    imgAre: {
        width: 100,
        height: 100,
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
        fontSize: 15
    },
    RecommendContent: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: "#F5F7F8",
        marginRight: 10,
        width: 130
    },
    discountText: {
        padding: 3,
        alignSelf: "flex-start",
        borderWidth: 1,
        borderColor: "#C40C0C",
        borderStyle: "solid",
        color: "#C40C0C",
        fontSize: 12
    }
});

export default Recommend;
