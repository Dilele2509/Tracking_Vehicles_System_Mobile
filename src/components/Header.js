import React, { useEffect, useState } from "react";
import GlobalStyles, { primaryColor } from '../../assets/styles/GlobalStyles';
import { Keyboard, KeyboardAvoidingView, Platform, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import SearchFilter from "./SearchFilter";
import axios from "../API/axios";

function Header(props) {
    const { navigation, userName, setHasResult, searchData, setSearchData, setSearchResult, setIsLoading } = props;

/*     const config = {
        headers: {
            "Content-Type": "application/json"
        },
        withCredentials: true
    }; */

/*     useEffect(() => {
        if (searchData !== '') {
            setHasResult(true);
            axios.post('/vehicles/search/', { title: searchData }, config)
                .then((response) => {
                    setSearchResult(response.data);
                });
        } else {
            setSearchResult([]);
            setHasResult(false);
        }
    }, [searchData]); */

    /* const handleChooseFile = async (fileUri) => {
        const formData = new FormData();
        formData.append('thumbnail', {
            uri: fileUri,
            name: 'photo.jpg',
            type: 'image/jpeg',
        });

        try {
            setIsLoading(true)
            await axios.post('/ai/similar/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
                .then((response) => {
                    if (response.status == 200) {
                        navigation.navigate("Search", { titlePage: "Search Result", allList: response.data })
                    } else {
                        console.error('Error fetching similar images:', response);
                    }
                })
                .catch((error) => {
                    console.error('Error fetching similar images:', error);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        } catch (error) {
            console.error('Error fetching similar images:', error);
        }
    }; */

    return (
        <View style={[styles.relativeContainer]}>
            <TouchableOpacity
                onPress={() => navigation.navigate("Account")}
                style={[GlobalStyles.flexRow, GlobalStyles.padScreen20, styles.headerContainer]}>
                <Text style={GlobalStyles.h3}>Hi, {userName}</Text>
            </TouchableOpacity>
            {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    <SearchFilter
                        value={searchData}
                        onChangeText={setSearchData}
                        iconColor={primaryColor.yellowPrimary}
                        placeholder={"Enter car you want to find"} />
                </KeyboardAvoidingView>
            </TouchableWithoutFeedback> */}
        </View>
    );
}

const styles = StyleSheet.create({
    relativeContainer: {
        position: 'relative',
    },
    headerContainer: {
        width: "100%",
        justifyContent: "space-between",
    },
});

export default Header;
