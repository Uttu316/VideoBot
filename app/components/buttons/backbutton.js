import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Icon} from 'react-native-elements';
import {DefaultTheme} from '../../utils/theme';

export const BackButton = ({}) => {
  const navigation = useNavigation();
  return (
    <Icon
      reverse
      name="close"
      type="material-community"
      color={'transparent'}
      size={28}
      onPress={() => navigation.goBack()}
    />
  );
};
