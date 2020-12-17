import React from 'react';
import {Image, View, StyleSheet} from 'react-native';
import {moderateScale} from '../../utils/dimensions';
import logo from '../../assets/logo.png';
import {boxShadow} from '../../utils/theme';

export const AppHeader = ({}) => {
  return (
    <View style={styles.header}>
      <AppHeaderLogo />
    </View>
  );
};
const AppHeaderLogo = ({}) => {
  return (
    <Image style={styles.headerLeftLogo} resizeMode="contain" source={logo} />
  );
};

const styles = StyleSheet.create({
  header: {
    paddingBottom: 10,
  },
  headerLeftLogo: {
    height: moderateScale(50),

    backgroundColor: 'white',
    width: '100%',
  },
});
