import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AudioScreen from '../screens/audio-screen';
import {screensName} from '../constants';
import Home from '../screens/home';
import VideoScreen from '../screens/video-screen';
import VideoPlayer from '../screens/video-player';

const Stack = createStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name={screensName.home}
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={screensName.audioScreen}
          component={AudioScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={screensName.videoScreen}
          component={VideoScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name={screensName.videoPlayer}
          component={VideoPlayer}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
