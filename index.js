import 'react-native-gesture-handler';

import {AppRegistry} from 'react-native';
import App from './app';
import {name as appName} from './app.json';

import {LogBox} from 'react-native';
import {typography} from './app/utils/typography';

LogBox.ignoreAllLogs();
typography();
AppRegistry.registerComponent(appName, () => App);
