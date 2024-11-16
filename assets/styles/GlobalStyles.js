import { StyleSheet } from "react-native";

// color constants
export const primaryColor = {
    beigePrimary: "#F6EFBD",
    lightRed: '#FFE0E0',
    darkRed: '#7D0A0A',
    lightBeige: '#FEFAF1',
    lightGreen: '#D8EFD3',
    darkGreen: '#508D69',
    yellowPrimary: "#E9BD20",
    darkPrimary: "#3B3B3B",
    lightPrimary: "#FEF6E9",
    greyPrimary: "#F1F1F1",
    whitePrimary: "#fffefd",
    blackPrimary: "#444",
    brownPrimary: "#C06014",
    greenPrimary: "#06D001",
    bluePrimary: "#0079FF",
    redPrimary: "#FC2947"
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
