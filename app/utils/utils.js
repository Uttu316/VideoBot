import {ToastAndroid} from 'react-native';

export const showToastWithGravity = (msg) => {
  ToastAndroid.show(msg, ToastAndroid.SHORT);
};
