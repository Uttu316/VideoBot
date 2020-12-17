import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import {moderateScale} from '../../utils/dimensions';
import {DefaultTheme} from '../../utils/theme';

export const Welcome = ({}) => {
  const {watchedVideos, recordedVideos} = useSelector((state) => state.main);

  return (
    <>
      {watchedVideos.length === 0 && recordedVideos.length === 0 && (
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeLabel}>Welcome Aboard</Text>
          <Text style={styles.welcomeMessage}>Please explore our services</Text>
        </View>
      )}
    </>
  );
};
const styles = StyleSheet.create({
  welcomeContainer: {
    marginVertical: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: moderateScale(20),
  },
  welcomeLabel: {
    color: DefaultTheme.dark.colors.accent,
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: moderateScale(10),
  },
  welcomeMessage: {
    fontSize: 16,
  },
});
