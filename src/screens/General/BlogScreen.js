import React from 'react';
import GlobalStyles, { primaryColor } from '../../../assets/styles/GlobalStyles';
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Dimensions } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const { width } = Dimensions.get('window');


const BlogScreen = ({navigation}) => {
    return (
        <SafeAreaView style={[{ flex: 1, backgroundColor: primaryColor.whitePrimary }]}>
            <View style={[GlobalStyles.padScreen20, styles.headerPage]}>
                <TouchableOpacity onPress={() => { navigation.goBack() }}>
                    <AntDesign name="arrowleft" size={24} color={primaryColor.yellowPrimary} />
                </TouchableOpacity>
                <Text style={styles.titleText}>Blog</Text>
            </View>
            <ScrollView contentContainerStyle={styles.blogContainer}>
                <Text style={styles.blogTitle}>What Are the Advantages of Personal GPS Tracking?</Text>

                <View style={styles.blogContain}>
                    <View style={styles.blogImgContain}>
                        <Image
                            style={styles.blogImg}
                            source={require('../../../assets/Images/blog-img.png')} // Adjust the path based on your project structure
                        />
                    </View>

                    <View style={styles.blogContentContain}>
                        <Text style={styles.blogContent}>
                            Other than vehicle and fleet Tracking, GPS tracking devices can also meet your personal safety needs.
                            Personal GPS trackers have been designed to suit diverse purposes – protecting your valuable assets, rescuing children, monitoring teen driving, theft recovery, preventing elderly from any danger, and more, from any place.
                            The major advantage is that these trackers are compatible with mobile devices and are easy to use just like other mobile apps.
                        </Text>

                        <Text style={styles.blogHeader}>Here are some key benefits you can enjoy with GPS tracking technology</Text>

                        <Text style={styles.blogSubHeader}>Allows real-time vehicle tracking</Text>
                        <Text style={styles.blogContent}>
                            Live GPS tracking helps to monitor your vehicles as well as driver behavior. These trackers can help manage police vehicles by providing visual GPS location maps in real-time.
                            You can prevent your drivers from taking the vehicle on a wrong route rather than the scheduled way. In case of any bad weather, this tracking device will help you to redirect your drivers through safer paths, thus protecting your vehicle as well as saving your driver from any accidents.
                            You will also get maintenance alerts, which helps to ensure that the vehicle gets necessary services on time.
                        </Text>

                        <Text style={styles.blogSubHeader}>Prevent your vehicle theft</Text>
                        <Text style={styles.blogContent}>
                            Vehicle theft, mainly cars, is on the rise in many countries. Investing in GPS technology is a key option to protect your vehicle from theft. By installing a tracking device, you can monitor your vehicle even if you’re not nearby.
                            In case of any movement in your car in your absence, the device will send an alert to your computer or smartphone. Even if it is stolen, you can catch hold of the culprits immediately based on the location of the vehicle.
                        </Text>

                        <Text style={styles.blogSubHeader}>Track your child even in a crowd</Text>
                        <Text style={styles.blogContent}>
                            Prevent abduction and let your kids play and walk around safe. GPS trackers are great options for parents for monitoring their children. Good to be worn as a watch, this device can track a child’s location as well as allow parents to set up a virtual fence or safe zone for their kids.
                            The system provides an instant alert the moment the child leaves assigned safe zones. With assistance from such technology, you can allow more freedom for children while being watched at the same time.
                            Even while at school, tracking device tracker sends clear notifications when the child has left school premises and the time when they are dropped off. Now, most school buses are also equipped with GPS trackers to ensure safe transportation for students.
                        </Text>

                        <Text style={styles.blogSubHeader}>Protect your aging parents</Text>
                        <Text style={styles.blogContent}>
                            If you are concerned about the safety of your elderly loved ones, especially those with any sort of conditions like dementia or Alzheimer’s, GPS tracking ensures their safety.
                            There are possibilities that they may wander and may reach somewhere they are not familiar with. In such scenarios, tracking their location helps you to find them with ease. Trackers such as Mindme, GPS Smart Sole, and AngelSense are designed to protect people with such cognitive disabilities.
                        </Text>

                        <Text style={styles.blogSubHeader}>SOS or panic alerts to inform danger</Text>
                        <Text style={styles.blogContent}>
                            If you have to travel through any dangerous areas, you can be confident that these trackers can even save your life. These devices feature a SOS or panic button.
                            By pressing this button, it will send alerts in real-time along with current location details of the device to whom the user has chosen. Travelers, night shift workers, senior citizens as well as children can benefit from this feature.
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

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
    blogContainer: {
        padding: 16,
        backgroundColor: '#ffffff', // Use your color variable if needed
    },
    blogTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 16,
    },
    blogContain: {},
    blogImgContain: {
        alignItems: 'center',
        marginVertical: 16,
    },
    blogImg: {
        width: '100%',
        height: 200, // Adjust based on your design
        resizeMode: 'contain',
    },
    blogContentContain: {
        alignItems: 'center',
    },
    blogContent: {
        textAlign: 'justify',
        marginBottom: 16,
        width: '90%', // Adjust based on your design
    },
    blogHeader: {
        marginTop: 16,
        fontWeight: 'bold',
        fontSize: 18,
        width: '90%',
    },
    blogSubHeader: {
        marginTop: 12,
        fontWeight: '600',
        fontSize: 16,
        width: '90%',
    },
});

export default BlogScreen;
