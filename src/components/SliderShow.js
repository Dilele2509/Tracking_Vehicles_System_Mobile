import { StyleSheet, View, ImageBackground, Dimensions } from 'react-native';
import PagerView from 'react-native-pager-view';
import React, { useState, useEffect, useRef } from 'react';
import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation

const { width } = Dimensions.get('window');

export default function SliderShow() {
  const navigation = useNavigation(); // Get the navigation object
  const pagerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const arrImg = [
    {
      navigateTo: 'BlogScreen',
      uri: require('../../assets/Images/slider1.png'),
    },
    {
      navigateTo: 'VehicleList',
      uri: require('../../assets/Images/slider2.png'),
    },
    {
      navigateTo: 'Blog', // Ensure the name matches your navigation structure
      uri: require('../../assets/Images/slider3.png'),
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      if (pagerRef.current) {
        let nextPage = currentPage + 1;
        if (nextPage >= arrImg.length) {
          nextPage = 0;
        }
        pagerRef.current.setPage(nextPage);
        setCurrentPage(nextPage);
      }
    }, 2500);

    return () => clearInterval(timer);
  }, [currentPage, arrImg.length]);

  const onPageSelected = (event) => {
    setCurrentPage(event.nativeEvent.position);
  };

  return (
    <View>
      <PagerView
        ref={pagerRef}
        style={styles.container}
        initialPage={0}
        onPageSelected={onPageSelected}
      >
        {arrImg.map((image, index) => (
          <TouchableOpacity
            style={styles.btnSlider}
            key={index}
            onPress={() => {
              navigation.navigate(image.navigateTo);
            }}
          >
            <ImageBackground
              style={styles.page}
              source={image.uri}
              resizeMode="cover"
            />
          </TouchableOpacity>
        ))}
      </PagerView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 5,
    width: '100%',
    height: 200,
  },
  page: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnSlider: {
    width: '100%',
    height: '100%',
  },
});
