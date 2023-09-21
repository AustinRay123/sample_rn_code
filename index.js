/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';

if (Platform.OS === 'android') {
  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
      console.log('TOKEN:', token);
    },

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      PushNotification.localNotification({
        channelId: 'sean',
        title: notification.title,
        message: notification.body,
        onlyAlertOnce: false,
        ignoreInForeground: false,
        priority: 'max',
        invokeApp: false,
        vibrate: true,
      });
    },
    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: Platform.OS === 'ios',
  });
}

AppRegistry.registerComponent(appName, () => App);
