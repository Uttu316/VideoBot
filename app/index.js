import React from 'react';
import Navigator from './navigations';
import {ThemeProvider} from 'react-native-elements';

export default function VideoBotApp() {
  return (
    <ThemeProvider>
      <Navigator />
    </ThemeProvider>
  );
}
