
import {Platform} from 'react-native';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';

const createNotificationChannel = () => {
  PushNotification.configure({
    onNotification: handleNotification,
  });

  if (Platform.OS === 'android') {
    //------ channelId: 'sean', this id is passed in mainApplication.java too ---------//
    PushNotification.createChannel({
      channelId: 'sean',
      channelName: 'sampleApp',
      channelDescription: 'A channel to categorize your notifications',
      playSound: false,
      soundName: 'default',
      importance: Importance.HIGH,
      vibrate: true,
    });

    PushNotification.createChannel({
      channelId: 'background', // Use a different channelId for background notifications
      channelName: 'Background Notifications',
      importance: Importance.HIGH,
      vibrate: true,
    });

    PushNotification.createChannel({
      channelId: 'kill', // Use a different channelId for killed state notifications
      channelName: 'Killed State Notifications',
      importance: Importance.HIGH,
      vibrate: true,
    });

    PushNotification.backgroundHandler(backgroundHandler);
  }
};

// Handle received push notifications
const handleNotification = notification => {
  // Handle the received push notification here
  console.log('notification--handleNotification--', notification);
};

// Background handler for Android
const backgroundHandler = notification => {
  // Handle the notification received when the app is in the background or killed state
  handleScheduledNotification(notification);
};

const showNotification = (title, message) => {
  if (Platform.OS === 'android') {
    // alert('android');
    PushNotification.localNotification({
      channelId: 'sean',
      title: title,
      message: message,
      smallIcon: 'applogo',
      largeIcon: 'applogo',
      bigLargeIcon: 'applogo',
      bigLargeIconUrl:
        'https://imgnew.outlookindia.com/uploadimage/library/16_9/16_9_5/IMAGE_1660285542.jpg',
      largeIconUrl:
        'https://imgnew.outlookindia.com/uploadimage/library/16_9/16_9_5/IMAGE_1660285542.jpg',
      picture:
        'https://imgnew.outlookindia.com/uploadimage/library/16_9/16_9_5/IMAGE_1660285542.jpg',
    });
  } else if (Platform.OS === 'ios') {
    // alert('ios');
    PushNotificationIOS.presentLocalNotification({
      alertTitle: title,
      alertBody: message,
      smallIcon: 'applogo',
      largeIcon: 'applogo',
      bigLargeIcon: 'applogo',
      bigLargeIconUrl:
        'https://imgnew.outlookindia.com/uploadimage/library/16_9/16_9_5/IMAGE_1660285542.jpg',
      largeIconUrl:
        'https://imgnew.outlookindia.com/uploadimage/library/16_9/16_9_5/IMAGE_1660285542.jpg',
      picture:
        'https://imgnew.outlookindia.com/uploadimage/library/16_9/16_9_5/IMAGE_1660285542.jpg',
    });
  }
};

const scheduleNotificationWithBackend = (title, message, scheduledTime) => {
  // Simulate sending the scheduling request to the backend
  console.log(
    `Scheduling notification with backend: ${title} - ${message} at ${scheduledTime}`,
  );

  // Here, you would send a request to your backend to schedule the notification
  // Your backend should then send the push notification to the device at the scheduledTime
};

const handleScheduledNotification = (title, message, datetime) => {
  const date = datetime ? datetime : new Date(Date.now() + 2 * 1000);
  // scheduleNotificationWithBackend(title, message, date);
  if (Platform.OS === 'android') {
    setTimeout(() => {
      PushNotification.localNotificationSchedule({
        channelId: 'sean',
        title: title,
        message: message,
        date: date,
        // repeatType: 'hour',
        // repeatTime: 5,
        bigText: message,
        subText: message, // (optional) default: none
        priority: 'high',
        ignoreInForeground: false,
        allowWhileIdle: true,
      });
    }, 1000);
  } else if (Platform.OS === 'ios') {
    // PushNotificationIOS.scheduleLocalNotification({
    //   fireDate: date.toISOString(),
    //   alertTitle: title,
    //   alertBody: message,
    //   // repeatType: 'hour',
    //   // repeatTime: 10,
    // });
    // PushNotification.localNotificationSchedule({
    //   channelId: 'sean',
    //   title: title,
    //   message: message,
    //   date: date,
    //   // repeatType: 'hour',
    //   // repeatTime: 5,
    //   bigText: message,
    //   subText: message, // (optional) default: none
    //   priority: 'high',
    //   ignoreInForeground: false,
    //   allowWhileIdle: true,
    // });

    setTimeout(() => {
      PushNotification.localNotificationSchedule({
        channelId: 'sean',
        title: title,
        message: message,
        date: date,
        // repeatType: 'hour',
        // repeatTime: 5,
        bigText: message,
        subText: message, // (optional) default: none
        priority: 'high',
        ignoreInForeground: false,
        allowWhileIdle: true,
      });
    }, 1000);
  }
};

const handleCancelNotification = () => {
  if (Platform.OS === 'android') {
    PushNotification.cancelAllLocalNotifications();
  } else if (Platform.OS === 'ios') {
    PushNotification.cancelAllLocalNotifications();
    PushNotificationIOS.removeAllDeliveredNotifications();
  }
};

export {
  createNotificationChannel,
  showNotification,
  handleScheduledNotification,
  handleCancelNotification,
};
