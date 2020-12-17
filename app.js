import React, {useEffect} from 'react';
import {store, persistor} from './app/redux/store';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import VideoBotApp from 'app/index.js';
import SplashScreen from 'react-native-splash-screen';

export default function App() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <VideoBotApp />
      </Provider>
    </PersistGate>
  );
}
