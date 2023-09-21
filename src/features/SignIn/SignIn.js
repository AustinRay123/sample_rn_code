import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
  Dimensions,
  StatusBar,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import useStyles from './SignInStyle';
import {useTheme} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CommonStyles from '../CommonStyles';
import image from '../../constants/image';
import RoundedButtom from '../../components/RoundedButtom';
import {dimens} from '../../constants/dimens';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {AppThemeContext, commonStackIdentifier} from '../../../App';
import OthersignInRoundComp from './OthersignInRoundComp';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {useDispatch, useSelector} from 'react-redux';
import auth from '@react-native-firebase/auth';
import {
  clearGoogleState,
  googleSignup,
} from '../../commonSlices/socialLogin.slice';
import * as AsyncStore from '../../asyncstorage/index';
import {
  updateFirstName,
  updateGender,
  updateLastname,
} from '../../commonSlices/signup.slice';

const SignIn = ({props}) => {
  const styles = useStyles();
  const {colors} = useTheme();
  const commonStyle = CommonStyles();

  const socialSignIN = useSelector(state => state.socialReducer);
  const [googleCredentials, setGooggleCreds] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '802945116437-43joenu1ns9g8enfi7d8iivbao74dvui.apps.googleusercontent.com',
    });
  }, []);
  useEffect(() => {
    if (googleCredentials?.token) {
      const params = {
        id_token: googleCredentials.token,
        social_type: googleCredentials.providerId.split('.')[0],
      };
      dispatch(googleSignup(params));
    }
  }, [googleCredentials]);
  useEffect(() => {
    if (socialSignIN.googleSignupCheckStatus == 'fulfilled') {
      if (socialSignIN?.googleSignupRes?.status == true) {
        AsyncStore.storeData(
          AsyncStore.Keys.ACCESS_TOKEN,
          socialSignIN?.googleSignupRes?.data?.token,
        ).then(() => {
          AsyncStore.storeJsonData(
            AsyncStore.Keys.USER_DATA,
            socialSignIN?.googleSignupRes?.data,
          );
          if (socialSignIN?.googleSignupRes?.data?.is_exists == false) {
            AsyncStore.storeData(AsyncStore.Keys.SIGN_UP_STEP, '2');
            props.navigation.navigate(commonStackIdentifier.create_profile);

            try {
              {
                socialSignIN?.googleSignupRes?.data?.first_name &&
                  dispatch(
                    updateFirstName(
                      socialSignIN?.googleSignupRes?.data?.first_name,
                    ),
                  );
              }
              {
                socialSignIN?.googleSignupRes?.data?.last_name &&
                  dispatch(
                    updateLastname(
                      socialSignIN?.googleSignupRes?.data?.last_name,
                    ),
                  );
              }
              {
                socialSignIN?.googleSignupRes?.data?.gender &&
                  dispatch(
                    updateGender(socialSignIN?.googleSignupRes?.data?.gender),
                  );
              }
              {
                socialSignIN?.googleSignupRes?.data?.dob &&
                  dispatch(
                    updateBirthDate(socialSignIN?.googleSignupRes?.data?.dob),
                  );
              }
            } catch (e) {
              console.log('Error in Sign In', e);
            }
            dispatch(clearGoogleState());
          } else {
            AsyncStore.storeData(AsyncStore.Keys.SIGN_UP_STEP, '5');
            props.navigation.replace(commonStackIdentifier.home_bottom_tabs);
            dispatch(clearGoogleState());
          }
        });
      }
    }
  }, [socialSignIN.googleSignupCheckStatus]);
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const userinfo = await GoogleSignin.signIn();
      const temp = await auth.GoogleAuthProvider.credential(userinfo.idToken);
      setGooggleCreds(temp);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signin in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        alert('PLAY_SERVICES_NOT_AVAILABLE');
      } else {
      }
    }
  };
  return (
    <KeyboardAvoidingView
      style={styles.mainView}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      <SafeAreaView
        bounces={false}
        style={{flex: 1, backgroundColor: colors.darkWhite}}
      >
        <View
          style={{
            alignItems: 'center',
            flex: 1,
          }}>
          <TouchableOpacity
            style={{
              left: dimens.w3,
              top: dimens.h2,
              alignSelf: 'flex-start',
            }}
            onPress={() => props.navigation.goBack()}>
            <AntDesign
              name="left"
              size={dimens.w6}
              color={colors.black}
              style={{width: dimens.w6, height: dimens.h3}}
            />
          </TouchableOpacity>
          <View
            style={[
              commonStyle.appHorizontalPadding,
              commonStyle.appverticalePadding,
            ]}>
            <View style={{flex: 1}}>
              <Image
                source={image.ic_app_logo}
                style={[styles.logoImageStyle]}
                resizeMode="contain"
              />
              <Text style={styles.titleStyle}>Let's go!</Text>
              <View
                style={[
                  commonStyle.flexDirectioncolumn,
                ]}>
                <Text style={styles.siginWithText}>Sign In With</Text>
              </View>
              <View
                style={[
                  commonStyle.flexDirectionrow,
                ]}>
                <OthersignInRoundComp
                  imgSrc={image.ic_google_logo}
                  onPress={() => {
                    signIn();
                  }}
                  imgStyle={styles.imgStyle}
                  mainViewStle={commonStyle.flexDirectioncolumn}
                  textName={'Google'}
                  toucbaleStyle={styles.roundBackgroundStyle}
                  textStyle={styles.roundTextstyle}
                />
                {Platform.OS == 'ios' && (
                  <OthersignInRoundComp
                    imgSrc={image.ic_apple_logo}
                    onPress={() => {}}
                    imgStyle={styles.imgStyle}
                    mainViewStle={commonStyle.flexDirectioncolumn}
                    textName={'Apple'}
                    toucbaleStyle={styles.roundBackgroundStyle}
                    textStyle={styles.roundTextstyle}
                  />
                )}

                <OthersignInRoundComp
                  imgSrc={image.ic_facebook_logo}
                  onPress={() => {
                    props.navigation.navigate(
                      commonStackIdentifier.custom_webview,
                      {
                        url: 'https://www.google.com/',
                      },
                    );
                  }}
                  imgStyle={styles.imgStyle}
                  mainViewStle={commonStyle.flexDirectioncolumn}
                  textName={'Facebook'}
                  toucbaleStyle={styles.roundBackgroundStyle}
                  textStyle={styles.roundTextstyle}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  width: dimens.w75,
                  height: dimens.h3,
                  alignContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  flex: 1,
                  marginTop: dimens.h2,
                }}>
                <View style={styles.separator} />
                <Text style={styles.separaterText}>Or</Text>
                <View style={styles.separator} />
              </View>

              <View style={{flex: 1}}>
                <RoundedButtom
                  onPress={() => {
                    props.navigation.navigate(
                      commonStackIdentifier.sigin_screen_withemail,
                    );
                  }}
                  title={'Continue With Email'}
                  titleStyle={styles.titleStylebtn}
                  gradColors={[colors.signupLightBlue, colors.signupDarkBlue]}
                  gradStyle={styles.gradStyles}
                  container={styles.containerBtn}
                  isLinearGradiantApplied={true}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.reset({
                    index: 0,
                    routes: [
                      {
                        name: commonStackIdentifier.signup_screen,
                      },
                    ],
                  });
                }}
                style={{
                  justifyContent: 'center',
                  marginBottom: dimens.h3,
                  flex: 1,
                }}>
                <Text style={styles.notRegister2}>
                  Don't have an account yet?
                </Text>
                <Text style={styles.registerNow}>Create an account</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SignIn;
