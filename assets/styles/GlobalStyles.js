import { StyleSheet } from "react-native";

// color constants
export const primaryColor = {
    mintPrimary: "#D9EDBF",
    yellowPrimary: "#E9BD20",
    darkPrimary: "#3B3B3B",
    lightPrimary: "#90D26D",
    creamPrimary: "#FFFBEB",
    whitePrimary: "#fff",
    blackPrimary: "#444",
    brownPrimary: "#C06014",
    greenPrimary: "#379237",
    redPrimary: "#CD1818"
};

// global style
const GlobalStyles = StyleSheet.create({
    // display
    inLine: {
        flexDirection: "row",
        alignItems: "center"
    },
    flex: {
        display: "flex",
        alignItems: "center",
    },
    flexRow:{
        display:"flex",
        flexDirection:"row"
    },
    // margin
    ml20: {
        marginLeft: 20
    },
    ml10: {
        marginLeft: 10
    },
    mb10:{
        marginBottom: 10,
    },
    mb20: {
        marginBottom: 20
    },
    mt20: {
        marginTop: 20
    },
    mt15:{
        marginTop: 15,
    },
    mt10: {
        marginTop: 10
    },
    pad10:{
        padding: 10
    },
    // align
    alightItemCenter: {
        alignItems: "center"
    },
    alightSelfCenter: {
        alignSelf: "center"
    },
    alightTextCenter: {
        textAlign: "center"
    },
    // screen
    padScreen20: {
        padding: 20,
    },
    centerScreen: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    heighFullScreen: {
        flex: 10,
        height: "auto"
    },
    // heading styles
    logoSize: {
        fontSize: 60,
        fontWeight: "bold"
    },
    h1: {
        fontSize: 32,
        fontWeight: "bold",
    },
    h2: {
        fontSize: 24,
        fontWeight: "bold",
    },
    h3: {
        fontSize: 20,
        fontWeight: "bold",
    },
    h4: {
        fontSize: 18,
        fontWeight: "bold",
    },
    h5:{
        fontSize: 16,
        fontWeight: "bold"
    },
    // text
    basicText: {
        color: primaryColor.blackPrimary,
        fontSize: 14
    },
    basicTextWhite:{
        color: primaryColor.whitePrimary,
        fontSize: 14
    }
});

export default GlobalStyles;
