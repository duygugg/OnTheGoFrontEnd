/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import 'react-native-gesture-handler';
import PushNotification from 'react-native-push-notification';



PushNotification.configure({
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },

  // (required) Called when a remote is received or opened, or local notification is opened
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
  },
  requestPermissions: Platform.OS === 'ios',
});



AppRegistry.registerComponent(appName, () => App);
