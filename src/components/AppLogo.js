import React from "react";
import { Text } from "react-native";
import GlobalStyles, {primaryColor} from "../../assets/styles/GlobalStyles"


/* Tran Binh Phuoc do this task */
function AppLogo() {
    return ( 
        <Text style={[GlobalStyles.logoSize, { color: primaryColor.yellowPrimary }]}>HungryCat</Text>
    );
}

export default AppLogo;