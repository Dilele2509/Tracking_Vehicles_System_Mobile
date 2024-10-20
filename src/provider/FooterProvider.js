import React, { createContext, useState } from 'react';

export const FooterContext = createContext();

export const FooterProvider = ({ children }) => {
    const [btnType, setBtnType] = useState([
        {
            titleBtn: "Home",
            iconBtn: "MaterialCommunityIcons",
            iconBtnName: "food-drumstick",
            nextPage: "HomeScreen",
            isSelected: true
        },
        {
            titleBtn: "Orders",
            iconBtn: "FontAwesome5",
            iconBtnName: "clipboard-list",
            nextPage: "Orders",
            isSelected: false
        },
        {
            titleBtn: "AI Chat",
            iconBtn: "Ionicons",
            iconBtnName: "chatbubble-ellipses",
            nextPage: "ChatBox",
            isSelected: false
        },
        {
            titleBtn: "Me",
            iconBtn: "FontAwesome",
            iconBtnName: "user",
            nextPage: "Account",
            isSelected: false
        },
    ]);

    const handlePress = (index, navigation) => {
        setBtnType(btnType.map((btn, i) => ({
            ...btn,
            isSelected: i === index
        })));
        navigation.navigate(btnType[index].nextPage);
    };

    return (
        <FooterContext.Provider value={{ btnType, handlePress }}>
            {children}
        </FooterContext.Provider>
    );
};
