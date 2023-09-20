import {
  View,
  StatusBar,
} from 'react-native';
import React, {useContext, useEffect, useRef, useState} from 'react';
import useStyles from './SplashStyles';
import {useNavigation, useTheme} from '@react-navigation/native';
import image from '../../constants/image';
import {dimens} from '../../constants/dimens';
import {AppThemeContext, commonStackIdentifier} from '../../../App';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import Video from 'react-native-video';
import {NotificationListener} from '../../Utility/PushNotificationHelper';
import * as AsyncStore from '../../asyncstorage/index';
import _ from 'lodash';
const Splash = ({props}) => {
  const styles = useStyles();
  const navigation = useNavigation();

  const [isPaused, setIsPaused] = useState(false);
  const [isToken, setIsToken] = useState(null);

  useEffect(() => {
    if (isToken !== null) {
      NotificationListener(navigation);
    }
    return () => {};
  }, [isToken]);

  useEffect(() => {
    setIsPaused(false);
    return () => {
      setIsPaused(true);
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      AsyncStore.getJsonData(AsyncStore.Keys.SIGN_UP_STEP).then(value => {
        console.log('SIGN_UP_STEP = ', value, '  ', typeof value);
        if (value == '2') {
          props.navigation.replace(commonStackIdentifier.create_profile);
        } else if (value == '3') {
          props.navigation.replace(commonStackIdentifier.intro_slider);
        } else if (value == '4') {
          props.navigation.replace(commonStackIdentifier.choose_your_goal);
        } else if (value == '5') {
          props.navigation.replace(commonStackIdentifier.home_bottom_tabs);
        } else if (value == '6') {
          props.navigation.replace(commonStackIdentifier.choose_a_fast, {
            isFromHome: false,
          });
        } else {
          props.navigation.replace(commonStackIdentifier.signup_screen);
        }
      });
    }, 3000);
  }, []);

  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    let token = await AsyncStore.getData(AsyncStore.Keys.ACCESS_TOKEN);
    setIsToken(token);
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="white" barStyle="dark-content" />
      <Video
        resizeMode="cover"
        source={
          isToken === null ? image.ic_app_logo_gif2 : image.ic_app_logo_gif1
        }
        style={{
          width: dimens.w100,
          height: dimens.h100,
          alignSelf: 'center',
        }}
      />
    </View>
  );
};

export default Splash;
