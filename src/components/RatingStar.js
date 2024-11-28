import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { primaryColor } from '../../assets/styles/GlobalStyles';

export default function RatingStars({ rating }) {
    const stars = [1, 2, 3, 4, 5]; // Array representing the stars

    return (
        <View style={styles.starContainer}>
            {stars.map((star) => (
                <Icon
                    key={star}
                    name="star"
                    size={26} // Adjust the size as needed
                    color={
                        star <= rating
                            ? '#F3C623' // Yellow color from your color palette
                            : '#DDDDDD' // Grey color for unfilled stars
                    }
                    style={styles.star}
                />
            ))}
        </View>
    );
}

const styles = StyleSheet.create({
    starContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly'
    },
    star: {
        marginRight: 10, // Space between stars
    },
});
