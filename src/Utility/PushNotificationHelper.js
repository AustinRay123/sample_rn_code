import React, {useState, useEffect} from 'react';
import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Platform} from 'react-native';
import PushNotification, {Importance} from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

export const requestUserPermission = async () => {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    await getFCMToken();
    return true;
  } else {
    console.log('error to register');
    return false;
  }
};

const getFCMToken = async () => {
  let retry;
  let fcmtoken = await AsyncStorage.getItem('fcmtoken');
  if (!fcmtoken) {
    try {
      let fcmtoken = await messaging().getToken();
      if (fcmtoken) {
        AsyncStorage.setItem('fcmtoken', fcmtoken);
      }
    } catch (error) {
      retry = true;
    }
    if (retry) {
      try {
        await messaging().requestPermission(); // IMPORTANT!
        await messaging().registerDeviceForRemoteMessages(); // IMPORTANT!
        let fcmtoken = await messaging().getToken();
        if (fcmtoken) {
          AsyncStorage.setItem('fcmtoken', fcmtoken);
        } else {
          console.log('error for generating token in ios');
        }
      } catch (error) {
        console.log('error in token again', error);
      }
    }
  }
};

export const NotificationListener = navigation => {
  PushNotification.configure({
    onNotification: function (notification) {

      // process the notification when app in foreground
      const {foreground, userInteraction, remote} = notification;

      if (foreground && !userInteraction) {
        console.log('console -> onNotification localNotification');
        const options = {
          soundName: 'default',
          playSound: true,
        };

        if (Platform.OS == 'ios') {
          PushNotification.localNotification({
            channelId: 'ninja',
            title: notification.title || '',
            message: notification.message || '',
            playSound: options.playSound || false,
            soundName: options.soundName || 'default',
            userInteraction: false, // BOOLEAN: If the notification was opened by the user from the notification area or not
            userInfo: {
              item: notification.data,
            },
            picture: notification?.data?.fcm_options?.image,
          });
        }
      }

      if (foreground && userInteraction && notification.data.item) {
        console.log('On clicked');

        const clicked = notification.userInteraction;

        if (clicked) {
          console.log('you clicked on notification...');
          //Add navigation redirection
        }
      }

      if (foreground && userInteraction && !notification.data.item) {
        console.log('On clicked');

        const clicked = notification.userInteraction;

        if (clicked) {
          console.log('you clicked on notification...');
          //Add navigation redirection
        }
      }

      if (!foreground) {
        console.log('background..');
      }

      notification.finish(PushNotificationIOS.FetchResult.NoData);
      //ios only
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    popInitialNotification: true,
    requestPermissions: true,
  });

  // Assume a message-notification contains a "type" property in the data payload of the screen to open
  messaging().onNotificationOpenedApp(notification => {
    console.log(
      'Notification caused app to open from background state:',
      notification,
    );
  });

  // Check whether an initial notification is available
  messaging()
    .getInitialNotification()
    .then(notification => {
      if (notification) {
        console.log(
          'Notification caused app to open from quit state:',
          notification,
        );
        //Add navigation redirection
      }
    });
};
