import React, { useState } from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
    SafeAreaView,
    Alert,
    ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { InputBox, SplashScreen } from '../../components';
import * as ImagePicker from 'expo-image-picker';
import GlobalStyles, { primaryColor } from '../../../assets/styles/GlobalStyles';
import { StyleSheet } from 'react-native';
import axios from '../../API/axios';

function AddVehicleScreen() {
    const [vehicleBrand, setVehicleBrand] = useState('');
    const [vehicleLine, setVehicleLine] = useState('');
    const [vehicleLicensePlate, setVehicleLicensePlate] = useState('');
    const [deviceId, setDeviceId] = useState('');
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const pickImage = async () => {
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
        }
    };

    const handleSaveVehicle = async () => {
        setIsLoading(true);
        if (!image) return;

        const formData = new FormData();
        formData.append('thumbnail', {
            uri: image.uri,
            type: image.type || 'image/png',
            name: image.fileName || 'default_ava.png',
        });
        formData.append('vehicle_brand', vehicleBrand);
        formData.append('vehicle_line', vehicleLine);
        formData.append('license_plate', vehicleLicensePlate);
        formData.append('device_id', deviceId);
        /* console.log(formData); */
        try {
            const response = await axios.post('/vehicles/add', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            console.log(response.data);
            setImage(null);
            setVehicleBrand('');
            setVehicleLine('');
            setVehicleLicensePlate('');
            setDeviceId('');
            Alert.alert('Vehicle added successfully!');
        } catch (error) {
            Alert.alert(error.message);
            console.error('Error uploading thumbnail:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <ScrollView>
            <SafeAreaView style={[{ flex: 1, backgroundColor: primaryColor.whitePrimary }]}>
                <SplashScreen isLoading={isLoading} />
                {!isLoading && (
                    <View style={[GlobalStyles.padScreen20]}>
                        <InputBox
                            text="Brand Name"
                            textColor={primaryColor.darkPrimary}
                            placeholder="Ex: Toyota"
                            value={vehicleBrand}
                            onChangeText={setVehicleBrand}
                        />
                        <InputBox
                            text="Line Name"
                            textColor={primaryColor.darkPrimary}
                            placeholder="Ex: Camry"
                            value={vehicleLine}
                            onChangeText={setVehicleLine}
                        />
                        <InputBox
                            text="License Plate"
                            textColor={primaryColor.darkPrimary}
                            placeholder="Ex: 51A55548"
                            value={vehicleLicensePlate}
                            onChangeText={setVehicleLicensePlate}
                        />
                        <InputBox
                            text="Device ID"
                            textColor={primaryColor.darkPrimary}
                            placeholder="Enter ID of device that setups the vehicle"
                            value={deviceId}
                            onChangeText={setDeviceId}
                        />
                        <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
                            {image ? <Image source={{ uri: image.uri }} style={styles.imagePreview} /> : (
                                <>
                                    <Ionicons name="camera-outline" size={46} color='#CCC' />
                                    <Text style={styles.imageButtonText}>Choose Image</Text>
                                </>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.postButton} onPress={handleSaveVehicle}>
                            <Text style={styles.postButtonText}>Add new</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </SafeAreaView>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F5F6FA',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 16,
        marginBottom: 16,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 8,
        color: primaryColor.darkPrimary,
    },
    inputContainer: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    titleInput: {
        borderColor: '#CCCCCC',
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
    },
    contentInput: {
        borderColor: '#CCCCCC',
        borderWidth: 1,
        borderRadius: 8,
        padding: 12,
        marginBottom: 16,
        height: 100,
    },
    imageButton: {
        marginTop: 25,
        backgroundColor: '#F1F1F1',
        height: 200,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 16,
        borderWidth: 1,
        borderColor: '#CCCCCCCC',
        flexDirection: 'column',
    },
    imageButtonText: {
        color: '#CCCCCCCC',
        fontWeight: 'bold',
        marginLeft: 8,
    },
    imagePreview: {
        width: '100%',
        height: '100%',
        borderRadius: 8,
    },
    postButton: {
        backgroundColor: primaryColor.darkPrimary,
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
    },
    postButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
    },
});

export default AddVehicleScreen;
