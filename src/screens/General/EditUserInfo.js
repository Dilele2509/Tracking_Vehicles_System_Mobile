import React, { useState, useCallback, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View, Dimensions, Image, TextInput, Alert, ActivityIndicator } from "react-native";
import { AntDesign } from '@expo/vector-icons';
import { useFocusEffect } from "@react-navigation/native";
import GlobalStyles, { primaryColor } from "../../../assets/styles/GlobalStyles";
import axios from "../../API/axios";  // Import the configured axios instance
import { FillButton, SplashScreen } from "../../components";
import * as ImagePicker from 'expo-image-picker';  // Import Expo Image Picker

const { width } = Dimensions.get('window');

/* Tran Binh Phuoc do this task */
function EditUserInfo({ navigation, route }) {
    const { titlePage } = route.params;
    const [isEdit, setIsEdit] = useState(false);
    const [userInfo, setUserInfo] = useState([]);
    const [isFocus, setIsFocus] = useState(false);
    const [isChooseFile, setIsChooseFile] = useState(false)
    const [image, setImage] = useState(null);  // State to hold selected image
    const [updateInfo, setUpdateInfo] = useState({
        full_name: '',
        email: '',
        phone_num: '',
        address: ''
    });

    const [isLoading, setIsLoading] = useState(false); // State to control loading state
    const fetchData = useCallback(() => {
        setIsLoading(true); // Set loading state to true when fetching data
        axios.get(`/user/id`)
            .then((response) => {
                const userData = response.data.user[0];
                setUserInfo(userData);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            })
            .finally(() => {
                setIsLoading(false); // Set loading state to false after fetching data
            });
    }, []);

    useEffect(() => {
        if (userInfo) {
            setUpdateInfo({
                full_name: userInfo.full_name,
                email: userInfo.email,
                phone_num: userInfo.phone_num,
                address: userInfo.address
            });
        }
    }, [userInfo]);

    useFocusEffect(
        useCallback(() => {
            fetchData();
        }, [fetchData])
    );

    const handleSaveEdit = () => {
        setIsLoading(true);
        axios.put("/user/info", updateInfo)
            .then((response) => {
                console.log(response.data);
                setIsEdit(!isEdit);
                fetchData();
            })
            .catch((error) => {
                Alert.alert(error.message);
                console.error('Error updating user data:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    const handleChooseFile = async () => {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Sorry, we need camera roll permissions to make this work!');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            setImage(result.assets[0]);
            setIsChooseFile(true);
        }
    };

    const handleSaveAva = () => {
        setIsLoading(true);
        if (!image) return;

        //console.log(image);
        const formData = new FormData();
        formData.append('avatar', {
            uri: image.uri,
            type: image.type || 'image/jpeg',
            name: image.fileName || 'avatar.jpg',
        });

        axios.post('/user/avatar', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
                console.log(response.data);
                fetchData();
                setIsChooseFile(false);
            })
            .catch((error) => {
                Alert.alert(error.message);
                console.error('Error uploading avatar:', error);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    return (
        <SafeAreaView style={[{ flex: 1, backgroundColor: primaryColor.creamPrimary }]}>
            {/* Splash screen while loading */}
            <SplashScreen isLoading={isLoading}/>
            {/* Page content */}
            {!isLoading && (
                <>
                    <View style={[GlobalStyles.padScreen20, styles.headerPage]}>
                        <TouchableOpacity onPress={() => { navigation.goBack() }}>
                            <AntDesign name="arrowleft" size={24} color={primaryColor.yellowPrimary} />
                        </TouchableOpacity>
                        <Text style={styles.titleText}>{titlePage}</Text>
                    </View>
                    <View style={[styles.contentContainer]}>
                        <View style={[styles.avaArea, GlobalStyles.mb10]}>
                            <TouchableOpacity onPress={handleChooseFile}>
                                <Image style={styles.userAva} source={{ uri: image ? image.uri : userInfo.avatar }} />
                            </TouchableOpacity>
                            {isChooseFile ? (
                                <View style={{ flexDirection: "row", alignItems: "center" }}>
                                    <TouchableOpacity
                                        onPress={() => setIsChooseFile(false)}
                                        style={[styles.saveAvaBtn, { marginRight: 25, backgroundColor: primaryColor.redPrimary }]}>
                                        <Text style={{ color: primaryColor.whitePrimary, fontWeight: "500" }}>Cancel</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={handleSaveAva}
                                        style={[styles.saveAvaBtn]}>
                                        <Text style={{ color: primaryColor.whitePrimary, fontWeight: "500" }}>Save</Text>
                                    </TouchableOpacity>
                                </View>
                            ) : null}

                            {isEdit ? (
                                <TextInput
                                    style={[styles.inputStyle, styles.mt15, GlobalStyles.alightSelfCenter, isFocus && styles.inputFocus]}
                                    value={updateInfo.full_name}
                                    onChangeText={(text) => setUpdateInfo(prevState => ({ ...prevState, full_name: text }))}
                                    onFocus={() => setIsFocus(true)}
                                    onBlur={() => setIsFocus(false)}
                                />
                            ) : (
                                <Text style={[GlobalStyles.h3, GlobalStyles.mt10, { width: "80%" }]}>{userInfo.full_name}</Text>
                            )}
                        </View>
                        <View style={[styles.InfoArea]}>
                            <View style={[{ flexDirection: "row", alignItems: "center" }, GlobalStyles.mb10]}>
                                <Text style={[GlobalStyles.h5, { color: primaryColor.yellowPrimary, marginRight: 10 }]}>Email: </Text>
                                {isEdit ? (
                                    <TextInput
                                        style={[styles.inputStyle, styles.mt15, GlobalStyles.alightSelfCenter, isFocus && styles.inputFocus]}
                                        value={updateInfo.email}
                                        onChangeText={(text) => setUpdateInfo(prevState => ({ ...prevState, email: text }))}
                                        onFocus={() => setIsFocus(true)}
                                        onBlur={() => setIsFocus(false)}
                                    />
                                ) : (
                                    <Text style={{ width: "80%" }}>{userInfo.email}</Text>
                                )}
                            </View>
                            <View style={[{ flexDirection: "row", alignItems: "center" }, GlobalStyles.mb10]}>
                                <Text style={[GlobalStyles.h5, { color: primaryColor.yellowPrimary, marginRight: 10 }]}>Phone number: </Text>
                                {isEdit ? (
                                    <TextInput
                                        style={[styles.inputStyle, styles.mt15, GlobalStyles.alightSelfCenter, isFocus && styles.inputFocus]}
                                        value={updateInfo.phone_num}
                                        onChangeText={(text) => setUpdateInfo(prevState => ({ ...prevState, phone_num: text }))}
                                        onFocus={() => setIsFocus(true)}
                                        onBlur={() => setIsFocus(false)}
                                    />
                                ) : (
                                    <Text style={{ width: "80%" }}>{userInfo.phone_num}</Text>
                                )}
                            </View>
                            <View style={[{ flexDirection: "row", alignItems: "center" }, GlobalStyles.mb10]}>
                                <Text style={[GlobalStyles.h5, { color: primaryColor.yellowPrimary, marginRight: 10 }]}>Address: </Text>
                                {isEdit ? (
                                    <TextInput
                                        style={[styles.inputStyle, styles.mt15, GlobalStyles.alightSelfCenter, isFocus && styles.inputFocus]}
                                        value={updateInfo.address}
                                        onChangeText={(text) => setUpdateInfo(prevState => ({ ...prevState, address: text }))}
                                        onFocus={() => setIsFocus(true)}
                                        onBlur={() => setIsFocus(false)}
                                    />
                                ) : (
                                    <Text style={{ width: "80%" }}>{userInfo.address}</Text>
                                )}
                            </View>
                        </View>
                    </View>
                    {!isEdit ? (
                        <View style={{ alignItems: "center" }}>
                            <FillButton onPress={() => setIsEdit(true)} color={primaryColor.whitePrimary} backgroundColor={primaryColor.yellowPrimary} text="Edit Information" />
                        </View>
                    ) : (
                        <>
                            <View style={{ alignItems: "center" }}>
                                <FillButton onPress={handleSaveEdit} color={primaryColor.whitePrimary} backgroundColor={primaryColor.yellowPrimary} text="Save Edit" />
                            </View>
                            <View style={{ alignItems: "center", marginTop: 20 }}>
                                <FillButton onPress={() => setIsEdit(false)} color={primaryColor.whitePrimary} backgroundColor={primaryColor.redPrimary} text="Cancel Edit" />
                            </View>
                        </>
                    )}
                </>)}
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
    contentContainer: {
        alignItems: "center",
        padding: 20
    },
    avaArea: {
        alignItems: "center",
        paddingBottom: 20
    },
    InfoArea: {
        width: "100%"
    },
    userAva: {
        width: 150,
        height: 150,
        resizeMode: "cover",
        borderRadius: 100,
        borderWidth: 2,
        borderColor: primaryColor.blackPrimary,
    },
    mt15: {
        marginTop: 15,
    },
    inputStyle: {
        width: 200,
        height: 50,
        borderColor: primaryColor.yellowPrimary,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderRadius: 20,
        borderWidth: 1,
        paddingHorizontal: 15,
        color: primaryColor.blackPrimary,
    },
    inputFocus: {
        borderColor: primaryColor.darkPrimary,
        backgroundColor: primaryColor.whitePrimary,
        color: primaryColor.yellowPrimary,
    },
    saveAvaBtn: {
        marginVertical: 20,
        width: 90,
        height: 45,
        borderRadius: 20,
        backgroundColor: primaryColor.yellowPrimary,
        alignItems: "center",
        justifyContent: "center"
    }
});

export default EditUserInfo;
