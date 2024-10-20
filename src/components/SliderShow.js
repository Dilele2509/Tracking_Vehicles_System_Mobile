import { StyleSheet, View, ImageBackground, Dimensions } from 'react-native';
import PagerView from 'react-native-pager-view';
import React, { useState, useEffect, useRef } from 'react';

const { width } = Dimensions.get('window');

/* Nguyen Le Giang Ha do this task */
export default function SliderShow() {
  const pagerRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const arrImg = [
    require('../../assets/images/slider1.png'),
    require('../../assets/images/slider2.png'),
    require('../../assets/images/slider3.png'),
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
            <ImageBackground key={index} style={styles.page} source={image} />
        ))}
      </PagerView>
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        marginBottom: 5,
        width: "100%",
        height: 200,
    },
    page: {
        objectFit: "cover",
        zIndex: -9999
    },
})
