import React from 'react';
import {StatusBar, SafeAreaView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';
import {DefaultTheme} from '../../utils/theme';

export const MainContainer = ({children, style, barColor}) => {
  const {themeMode} = useSelector((state) => state.main);
  return (
    <>
      <StatusBar
        barStyle={
          themeMode === 'dark' && barColor !== 'black'
            ? 'dark-content'
            : 'light-content'
        }
        backgroundColor={barColor || 'white'}
      />
      <SafeAreaView style={[styles.container, style]}>{children}</SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
