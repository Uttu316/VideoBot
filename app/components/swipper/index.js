import React from 'react';
import {Image, StyleSheet, View} from 'react-native';
import {Card, Text} from 'react-native-elements';
import Swiper from 'react-native-swiper';
import image1 from '../../assets/s-1.png';
import image2 from '../../assets/s-2.png';
import image3 from '../../assets/s-3.jpg';
import {moderateScale} from '../../utils/dimensions';
import {boxShadow} from '../../utils/theme';
export const AppSwipper = () => {
  return (
    <Swiper
      style={styles.wrapper}
      showsPagination={false}
      autoplay={true}
      removeClippedSubviews={false}
      autoplayTimeout={3}>
      <SwipperCard image={image3} />
      <SwipperCard image={image2} />
      <SwipperCard image={image1} />
    </Swiper>
  );
};
const SwipperCard = ({image}) => {
  return (
    <Card containerStyle={styles.card}>
      <Image source={image} style={styles.image} />
    </Card>
  );
};
const styles = StyleSheet.create({
  wrapper: {
    height: moderateScale(220),
  },
  card: {
    padding: 0,

    borderRadius: 12,
    ...boxShadow,
  },
  image: {
    height: moderateScale(200),
    width: '100%',
    borderRadius: 12,
  },
});
