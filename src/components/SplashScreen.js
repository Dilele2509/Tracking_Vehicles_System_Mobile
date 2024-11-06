import { ActivityIndicator, StyleSheet, View } from 'react-native'
import React from 'react'
import { primaryColor } from '../../assets/styles/GlobalStyles'

const SplashScreen = ({ isLoading }) => {
    return (
        <>
            {/* Splash screen while loading */}
            {isLoading && (
                <View style={[StyleSheet.absoluteFill, styles.loadingContainer]}>
                    <ActivityIndicator size="large" color={primaryColor.yellowPrimary} />
                </View>
            )}
        </>
    )
}

export default SplashScreen

const styles = StyleSheet.create({
    loadingContainer: {
        backgroundColor: primaryColor.whitePrimary,
        alignItems: 'center',
        justifyContent: 'center',
    },
})