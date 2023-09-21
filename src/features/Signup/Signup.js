import {
  Text,
  View,
  Image,
  Platform,
  Dimensions,
  StatusBar,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import useStyles from './signupStyle';
import {useTheme} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CommonStyles from '../CommonStyles';
import image from '../../constants/image';
import RoundedButtom from '../../components/RoundedButtom';
import {dimens} from '../../constants/dimens';
import {AppThemeContext, commonStackIdentifier} from '../../../App';
import OfflineSheet from '../../components/BottomSheets/OfflineSheet';
import NetInfo from '@react-native-community/netinfo';
import auth from '@react-native-firebase/auth';
import {
  appleAuth,
} from '@invertase/react-native-apple-authentication';
import FastImage from 'react-native-fast-image';

const Signup = ({props}) => {
  const styles = useStyles();
  const {colors} = useTheme();
  const commonStyle = CommonStyles();
  const screenHeight = Dimensions.get('window').height;
  const topSectionHeight = screenHeight * 0.2;
  const [netCheck, setNetCheck] = React.useState(false);
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (!state.isConnected) {
        setNetCheck(true);
      }
    });
    return unsubscribe;
  }, []);
  useEffect(() => {
    if (props?.route?.params?.isFromLogout) {
      props.navigation.navigate(commonStackIdentifier.signin_screen);
    }
  }, [props?.route?.params]);

  const handleButtonPress = () => {
    props.navigation.navigate(commonStackIdentifier.other_signup_screeen);
  };

  async function onAppleButtonPress() {
    // Start the sign-in request
    const appleAuthRequestResponse = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      // As per the FAQ of react-native-apple-authentication, the name should come first in the following array.
      requestedScopes: [appleAuth.Scope.FULL_NAME, appleAuth.Scope.EMAIL],
    });
    // Ensure Apple returned a user identityToken
    if (!appleAuthRequestResponse.identityToken) {
      throw new Error('Apple Sign-In failed - no identify token returned');
    } else {
    }
    const {identityToken, nonce} = appleAuthRequestResponse;
    const appleCredential = auth.AppleAuthProvider.credential(
      identityToken,
      nonce,
    );
    return auth().signInWithCredential(appleCredential);
  }

  const handleLogout = async () => {
    try {
      // Create an Apple Sign Out request
      const appleAuthRequestResponse = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGOUT,
      });
    } catch (error) {
      console.error('Error logging out with Apple:', error);
    }
  };

  return (
    <>
      <SafeAreaView
        style={[
          commonStyle.appHorizontalPadding,
        ]}>
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={'dark-content'}
        />
        <OfflineSheet
          visibility={netCheck}
          onBackdropPress={() => {
            setNetCheck(false);
          }}
        />
        <View style={{alignItems: 'center'}}>
          <View style={{height: topSectionHeight}} />
          <View
            style={[
              commonStyle.appHorizontalPadding,
              commonStyle.appverticalePadding,
            ]}>
            <View
              style={{
                justifyContent: 'flex-end',
                alignItems: 'center',
              }}>
              <Image
                source={image.ic_app_logo}
                style={[styles.logoImageStyle, {marginTop: -dimens.h5}]}
                resizeMode="contain"
              />
              <View
                style={{
                  marginVertical: Platform.OS == 'ios' ? dimens.h5 : dimens.h8,
                  width: dimens.w100,
                }}>
                <Text style={styles.titleStyle}>
                  Build a Healthy Lifestyle that
                </Text>
                <Text style={styles.titleStyle}>
                  {' '}
                  still lets you enjoy your life.
                </Text>
              </View>

              {Platform.OS == 'ios' ? (
                <View style={{marginTop: dimens.h2, marginBottom: dimens.h2}}>
                  <FastImage
                    source={image.ic_apple_logo}
                    style={styles.appleIconStyle}
                  />
                  <RoundedButtom
                    onPress={() =>
                      onAppleButtonPress().then(() =>
                        console.log('Apple sign-in complete!'),
                      )
                    }
                    title={'Sign in with Apple'}
                    titleStyle={styles.titleStylebtnBlack}
                    gradColors={[colors.signupLightBlue, colors.signupDarkBlue]}
                    gradStyle={styles.gradStylesWhite}
                    container={styles.containerBtnWhite}
                  />
                </View>
              ) : null}

              <View
                style={{
                  flexDirection: 'column',
                  alignSelf: 'center',
                  alignContent: 'center',
                  alignItems: 'center',
                  flex: 1,
                }}>
                <RoundedButtom
                  onPress={handleButtonPress}
                  title={'Other sign up options'}
                  titleStyle={styles.titleStylebtn}
                  gradColors={[colors.signupLightBlue, colors.signupDarkBlue]}
                  gradStyle={styles.gradStyles}
                  // container={styles.containerBtn}
                  isLinearGradiantApplied={true}
                />
                <View style={{marginTop: dimens.h2}}>
                  <RoundedButtom
                    onPress={async () => {
                      props.navigation.navigate(
                        commonStackIdentifier.signin_screen,
                      );
                    }}
                    title={'Have an account? Sign in'}
                    titleStyle={styles.titleStylebtnBlack}
                    gradColors={[colors.signupLightBlue, colors.signupDarkBlue]}
                    gradStyle={styles.gradStylesWhite}
                    container={styles.containerBtnWhite}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default Signup;
