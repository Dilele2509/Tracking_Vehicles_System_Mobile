import { StyleSheet, Text, TouchableOpacity, View, Dimensions, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import GlobalStyles, { primaryColor } from '../../assets/styles/GlobalStyles'
import { AntDesign } from '@expo/vector-icons';
import FillButton from './FillButton';
import axios from '../API/axios';
import InputBox from './inputBox';

const { width } = Dimensions.get('window');


/* Tran Binh Phuoc do this task */
const AddressBox = (props) => {
    const { setIsOpen, item, setItem} = props;
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const handleAddDeli = ()=>{
        if(name == '' || phone == '' || address == ''){
            setItem(item)
        }else{
            setItem({
                receiver: name,
                phone: phone,
                address: address
            })
        }
        setIsOpen(false)
    }

    return (
        <View style={styles.container}>
            <View style={[GlobalStyles.padScreen20, styles.headerPage]}>
                <Text style={styles.titleText}>Delivery Information</Text>
                <TouchableOpacity onPress={()=>setIsOpen(false)} style={styles.closeBtn}>
                    <AntDesign name="close" size={24} color={primaryColor.whitePrimary} />
                </TouchableOpacity>
            </View>
            <View style={{padding: 20}}>
                {/* <View key={item.product_id} style={styles.contentItem}>
                    <Image style={styles.itemImg} source={{ uri: item.thumbnail }} />
                    <View style={styles.itemInfo}>
                        <View style={styles.priceInfo}>
                            <Text style={GlobalStyles.h5}>{item.title}</Text>
                            <Text style={[GlobalStyles.h5, { color: primaryColor.yellowPrimary }]}>{item.price} VND</Text>
                        </View>
                        <View style={styles.quantityContainer}>
                            <TouchableOpacity style={styles.quantityButton} onPress={() => decrementQuantity()}>
                                <Text style={styles.quantityButtonText}>-</Text>
                            </TouchableOpacity>
                            <TextInput
                                style={styles.quantityInput}
                                value={String(quantity)}
                                editable={false}
                            />
                            <TouchableOpacity style={styles.quantityButton} onPress={() => incrementQuantity()}>
                                <Text style={styles.quantityButtonText}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View> */}
                <InputBox value={name} onChangeText={setName} placeholder="Enter receiver's name"/>
                <InputBox value={phone} onChangeText={setPhone} placeholder="Enter receive phone"/>
                <InputBox value={address} onChangeText={setAddress} placeholder="Enter receiver address"/>
            </View>
            <View style={{alignItems: "center"}}>
                <FillButton onPress={handleAddDeli} text="Add" color={primaryColor.whitePrimary} backgroundColor={primaryColor.yellowPrimary}/>
            </View>
        </View>
    );
};

export default AddressBox

const styles = StyleSheet.create({
    headerPage: {
        backgroundColor: primaryColor.yellowPrimary,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        position: "relative",
    },
    titleText: {
        fontSize: 24,
        fontWeight: '500',
        color: primaryColor.whitePrimary,
        position: "absolute",
        width: width,
        textAlign: "center",
        zIndex: -999,
    },
    closeBtn: {
        marginLeft: 'auto',
        paddingHorizontal: 10,
    },
    container: {
        width: "100%",
        height: 600,
        backgroundColor: 'rgba(0, 0, 0, .9)',
        position: "absolute",
        bottom: 0,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: .05,
        shadowRadius: .9,
        zIndex: 9999
    },
    contentItem: {
        marginBottom: 10,
        padding: 15,
        borderColor: primaryColor.brownPrimary,
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: primaryColor.whitePrimary,
        flexDirection: "row",
    },
    itemImg: {
        width: 90,
        height: 90
    },
    itemInfo: {
        flex: 10,
        marginLeft: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    priceInfo: {
        flex: 5,
        height: 90,
        flexDirection: "column",
        justifyContent: "space-between",
    },
    quantityContainer: {
        flexDirection: "row",
        alignItems: "center",
    },
    quantityButton: {
        width: 30,
        height: 30,
        backgroundColor: primaryColor.yellowPrimary,
        borderRadius: 5,
    },
    quantityButtonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: "500",
        textAlign: "center",
        lineHeight: 30,
    },
    quantityInput: {
        width: 30,
        height: 30,
        borderColor: primaryColor.yellowPrimary,
        borderWidth: 1,
        textAlign: 'center',
        marginHorizontal: 10,
        borderRadius: 5,
    },
})