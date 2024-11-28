import React, { useState, useCallback, useEffect } from "react";
import { 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View, 
    Dimensions, 
    Image, 
    TextInput, 
    Alert, 
    KeyboardAvoidingView, 
    Platform, 
    Keyboard, 
    TouchableWithoutFeedback 
} from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import DateTimePicker from '@react-native-community/datetimepicker';
import { AntDesign, Feather } from '@expo/vector-icons';
import { useFocusEffect } from "@react-navigation/native";
import GlobalStyles, { primaryColor } from "../../../../assets/styles/GlobalStyles";
import axios from "../../../API/axios";
import { FillButton, SplashScreen } from "../../../components";
import * as ImagePicker from 'expo-image-picker';
import { BASEURL } from '@env';


const { width } = Dimensions.get('window');

function EditUserInfo({ navigation, route }) {
    const { titlePage } = route.params;
    const [isEdit, setIsEdit] = useState(false);
    const [userInfo, setUserInfo] = useState([]);
    const [focusedInput, setFocusedInput] = useState(null); // State for focused input
    const [isChooseFile, setIsChooseFile] = useState(false);
    const [image, setImage] = useState(null);
    const [updateInfo, setUpdateInfo] = useState({
        fullname: '',
        email: '',
        phone_number: '',
        birthday: '',
    });
    const [isLoading, setIsLoading] = useState(false);

    const fetchData = useCallback(() => {
        axios.get(`/user/get-info`)
            .then((response) => {
                const userData = response.data;
                setUserInfo(userData);
            })
            .catch((error) => {
                console.error('Error fetching user data:', error);
            });
    }, []);

    useEffect(() => {
        if (userInfo) {
            setUpdateInfo({
                fullname: userInfo.fullname,
                email: userInfo.email,
                phone_number: userInfo.phone_number,
                birthday: userInfo.birthday,
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
        axios.put("/user/update-info", updateInfo)
            .then((response) => {
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

        const formData = new FormData();
        formData.append('avatar', {
            uri: image.uri,
            type: image.type || 'image/png',
            name: image.fileName || 'default_ava.png',
        });

        axios.post('/user/upload-ava', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then((response) => {
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

    const handleBirthdayChange = (event, date) => {
        if (date) {
            const utcDate = date;
            setUpdateInfo(prevState => ({
                ...prevState,
                birthday: utcDate.toISOString(),
            }));
        }
    };

    return (
        <KeyboardAwareScrollView
            style={{ flex: 1, backgroundColor: primaryColor.whitePrimary }}
            contentContainerStyle={{ flexGrow: 1 }}
            enableOnAndroid={true}
            extraScrollHeight={Platform.OS === "android" ? 50 : 0}
        >
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SafeAreaView style={[{ flex: 1, backgroundColor: primaryColor.whitePrimary }]}>
                    <SplashScreen isLoading={isLoading} />
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
                                    <TouchableOpacity style={styles.changeAva} onPress={handleChooseFile}>
                                        <Image
                                            style={styles.userAva}
                                            source={{ uri: image ? image.uri : `${BASEURL}${userInfo.avatar}` }}
                                        />
                                        {console.log(`${BASEURL}${userInfo.avatar}`)}
                                        <Feather name='camera' size={18} style={styles.avaIcon} color={primaryColor.whitePrimary} />
                                    </TouchableOpacity>

                                    {isChooseFile && (
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
                                    )}

                                    {isEdit ? (
                                        <TextInput
                                            style={[styles.inputStyle, styles.mt15, GlobalStyles.alightSelfCenter, focusedInput === "fullname" && styles.inputFocus]}
                                            value={updateInfo.fullname}
                                            onChangeText={(text) => setUpdateInfo(prevState => ({ ...prevState, fullname: text }))}
                                            onFocus={() => setFocusedInput("fullname")}
                                            onBlur={() => setFocusedInput(null)}
                                        />
                                    ) : (
                                        <Text style={[GlobalStyles.h3, GlobalStyles.mt10, { width: "80%" }]}>{userInfo.fullname}</Text>
                                    )}
                                </View>
                                <View style={[styles.InfoArea]}>
                                    <View style={[{ flexDirection: "row", alignItems: "center" }, GlobalStyles.mb10]}>
                                        <Text style={[GlobalStyles.h5, { color: primaryColor.darkPrimary, marginRight: 10 }]}>Email: </Text>
                                        {isEdit ? (
                                            <TextInput
                                                style={[styles.inputStyle, styles.mt15, GlobalStyles.alightSelfCenter, focusedInput === "email" && styles.inputFocus]}
                                                value={updateInfo.email}
                                                onChangeText={(text) => setUpdateInfo(prevState => ({ ...prevState, email: text }))}
                                                onFocus={() => setFocusedInput("email")}
                                                onBlur={() => setFocusedInput(null)}
                                            />
                                        ) : (
                                            <Text style={{ width: "80%" }}>{userInfo.email}</Text>
                                        )}
                                    </View>
                                    <View style={[{ flexDirection: "row", alignItems: "center" }, GlobalStyles.mb10]}>
                                        <Text style={[GlobalStyles.h5, { color: primaryColor.darkPrimary, marginRight: 10 }]}>Phone number: </Text>
                                        {isEdit ? (
                                            <TextInput
                                                style={[styles.inputStyle, styles.mt15, GlobalStyles.alightSelfCenter, focusedInput === "phone_number" && styles.inputFocus]}
                                                value={updateInfo.phone_number}
                                                onChangeText={(text) => setUpdateInfo(prevState => ({ ...prevState, phone_number: text }))}
                                                onFocus={() => setFocusedInput("phone_number")}
                                                onBlur={() => setFocusedInput(null)}
                                            />
                                        ) : (
                                            <Text style={{ width: "80%" }}>{userInfo.phone_number}</Text>
                                        )}
                                    </View>
                                    <View style={[{ flexDirection: "row", alignItems: "center" }, GlobalStyles.mb10]}>
                                        <Text style={[GlobalStyles.h5, { color: primaryColor.darkPrimary, marginRight: 10 }]}>Day of Birth: </Text>
                                        {isEdit ? (
                                            <DateTimePicker
                                                value={new Date(updateInfo.birthday)}
                                                mode="date"
                                                display="default"
                                                onChange={handleBirthdayChange}
                                            />
                                        ) : (
                                            <Text style={{ width: "80%" }}>{new Date(userInfo.birthday).toLocaleDateString()}</Text>
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
                                        <FillButton onPress={handleSaveEdit} color={primaryColor.whitePrimary} backgroundColor={primaryColor.bluePrimary} text="Save Edit" />
                                    </View>
                                    <View style={{ alignItems: "center", marginTop: 20 }}>
                                        <FillButton onPress={() => setIsEdit(false)} color={primaryColor.darkPrimary} backgroundColor={primaryColor.greyPrimary} text="Cancel Edit" />
                                    </View>
                                </>
                            )}
                        </>
                    )}
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAwareScrollView>
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
    changeAva: {
        width: 150,
        height: 150,
        borderRadius: 100,
        overflow: 'hidden',
        position: "relative", // Ensure relative positioning for the container
        alignItems: "center",
        justifyContent: "center",
    },
    avaIcon: {
        position: "absolute", // Position icon on top of image
        bottom: 0,
        width: "100%",
        textAlign: "center",
        backgroundColor: '#000000',
        opacity: 0.5,
        padding: 5,
        zIndex: 2
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
