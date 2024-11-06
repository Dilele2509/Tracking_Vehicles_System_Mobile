import React, { createContext, useState, useEffect } from 'react';

export const FooterContext = createContext();

export const FooterProvider = ({ children }) => {
    const [activeScreen, setActiveScreen] = useState('HomeScreen');
    const [btnType, setBtnType] = useState([
        {
            titleBtn: "Home",
            iconBtn: "AntDesign",
            iconBtnName: "home",
            nextPage: "HomeScreen",
            isSelected: true,
        },
        {
            titleBtn: "Driving Mode",
            iconBtn: "Ionicons",
            iconBtnName: "car-sport-outline",
            nextPage: "DrivingMode",
            isSelected: false,
        },
        {
            titleBtn: "Activities",
            iconBtn: "MaterialCommunityIcons",
            iconBtnName: "history",
            nextPage: "ActivitiesStack",
            isSelected: false,
        },
        {
            titleBtn: "Account",
            iconBtn: "Feather",
            iconBtnName: "user",
            nextPage: "Account",
            isSelected: false,
        },
    ]);

    const handlePress = (index) => {
        const selectedPage = btnType[index].nextPage;

        setBtnType(btnType.map((btn, i) => ({
            ...btn,
            isSelected: i === index
        })));

        setActiveScreen(selectedPage);
    };


    return (
        <FooterContext.Provider value={{ btnType, handlePress, activeScreen }}>
            {children}
        </FooterContext.Provider>
    );
};
