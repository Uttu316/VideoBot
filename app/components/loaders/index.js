import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {DefaultTheme} from '../../utils/theme';

export const Loader = () => {
  return (
    <View style={styles.loader}>
      <ActivityIndicator size="large" color={DefaultTheme.dark.colors.button} />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 345,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
});
