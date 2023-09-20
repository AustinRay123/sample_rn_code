/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry, Platform} from 'react-native';
import App from './App';
import App2 from './App2';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';
// if (Platform.OS === 'android') {
//   PushNotification.createChannel(
//     {
//       channelId: 'if', // (required)
//       channelName: 'if', // (required)
//       channelDescription: 'A channel to categorise your notifications', // (optional) default: undefined.
//       playSound: true, // (optional) default: tru
//       // importance: 4, // (optional) default: Importance.HIGH. Int value of the Android notification importance
//       vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
//     },
//     created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
//   );

//   PushNotification.getChannels(function (channel_ids) {
//     console.log('total channels', channel_ids); // ['channel_id_1']
//   });
// }

if (Platform.OS === 'android') {
  PushNotification.configure({
    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function (token) {
      console.log('TOKEN:', token);
    },

    // (required) Called when a remote is received or opened, or local notification is opened
    onNotification: function (notification) {
      console.log('NOTIFICATION:', notification);
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
