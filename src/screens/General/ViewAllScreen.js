import React from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Dimensions, Image, FlatList } from "react-native";
import { AntDesign, Entypo } from '@expo/vector-icons';
import GlobalStyles, { primaryColor } from "../../../assets/styles/GlobalStyles";
import { BASEURL } from '@env';

const { width } = Dimensions.get('window');

function ViewAllScreen({ navigation, route }) {
    const { titlePage, allList } = route.params;
    const generateStatus = (status) => {
        const statusValue = String(status); // Convert status to string for consistency
        switch (statusValue) {
            case '1':
                return 'Have not rental';
            case '0':
                return 'Rented';
            default:
                return 'Unknown status'; // Handle unexpected values
        }
    };
    return (
        <SafeAreaView style={[{ flex: 1, backgroundColor: primaryColor.whitePrimary }]}>
            <View style={[GlobalStyles.padScreen20, styles.headerPage]}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <AntDesign name="arrowleft" size={24} color={primaryColor.yellowPrimary} />
                </TouchableOpacity>
                <Text style={styles.titleText}>{titlePage}</Text>
            </View>
            {allList.length === 0 ? (
                <View style={[GlobalStyles.padScreen20, GlobalStyles.mt10, { backgroundColor: primaryColor.whitePrimary }]}>
                    <View style={[GlobalStyles.flex, GlobalStyles.mt15]}>
                        <Entypo name='circle-with-cross' size={32} color={primaryColor.yellowPrimary} />
                        <Text style={[GlobalStyles.h4, styles.textContent, { color: primaryColor.blackPrimary }]}>
                            Have no data yet
                        </Text>
                    </View>
                </View>
            ) : (
                <FlatList
                    data={allList}
                    style={styles.itemContainer}
                    renderItem={({ item }) => (
                        <TouchableOpacity
                            onPress={() => navigation.navigate("Product", { id: String(item.vehicle_id) })}
                            key={item.vehicle_id}
                            style={styles.vehicleItem}>
                            <View style={styles.imgArea}>
                                {item.deleted == 1 && (
                                    <View style={styles.disPro}>
                                        <Text style={styles.disProText}>Unavailable</Text>
                                    </View>
                                )}
                                <Image style={styles.vehicleListImg} source={{ uri: `${BASEURL}${item.thumbnail}` }} />
                            </View>
                            <View style={[GlobalStyles.pad10, styles.vehicleContent]}>
                                <Text style={GlobalStyles.h5}>{item.vehicle_brand + ' ' + item.vehicle_line}</Text>
                                <Text style={styles.licenseStyles}>{item.license_plate}</Text>
                                <Text style={[
                                    styles.statusText,
                                    item.status === 1
                                        ? { borderColor: '#185519', color: '#185519' }
                                        : { borderColor: '#FF6600', color: '#FF6600' }
                                ]}>
                                    status: {generateStatus(item.status)}
                                </Text>
                            </View>
                        </TouchableOpacity>
                    )}
                />
            )}
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
    licenseStyles: {
        fontSize: 16,
        fontWeight: "bold",
        color: primaryColor.redPrimary,
    },
    statusText: {
        padding: 3,
        alignSelf: "flex-start",
        borderWidth: 1,
        fontSize: 12,
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
    vehicleListImg: {
        width: 100,
        height: 100,
        resizeMode: "cover",
    },
    imgArea: {
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
        backgroundColor: "rgba(0,0,0,0.5)",
        alignItems: "center",
        justifyContent: "center",
    },
    disProText: {
        fontWeight: "500",
        color: primaryColor.whitePrimary,
        fontSize: 15,
    },
    vehicleItem: {
        flexDirection: "row",
        borderRadius: 10,
        overflow: 'hidden',
        marginBottom: 10,
    },
    vehicleImg: {
        width: 100,
        height: 100,
        resizeMode: "cover",
    },
    vehicleContent: {
        flex: 1,
        flexDirection: "column",
        height: 100,
        justifyContent: "space-between",
        backgroundColor: "#F5F7F8",
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
    textContent: {
        marginTop: 5,
        color: primaryColor.blackPrimary,
        fontSize: 16,
        fontWeight: "500",
        textAlign: "center",
    },
});

export default ViewAllScreen;
