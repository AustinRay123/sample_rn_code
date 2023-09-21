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
import React, {useState, useEffect} from 'react';
import useStyles from './otherSignupstyle';
import {useTheme} from '@react-navigation/native';
import CommonStyles from '../CommonStyles';
import image from '../../constants/image';
import RoundedButtom from '../../components/RoundedButtom';
import {dimens} from '../../constants/dimens';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {commonStackIdentifier} from '../../../App';
import OthersignupRoundComp from './OthersignupRoundComp';
import {TextinputComp} from '../../components/TextinputComp';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {
  checkEmailExists,
  updateFirstName,
  updateGender,
  updateLastname,
  updateOtherSignUpEmail,
  updateOtherSignUpEmailIsError,
} from '../../commonSlices/signup.slice';
import {isEmail} from '../../Utility/HelperFunctions';
import _ from 'lodash';
import auth from '@react-native-firebase/auth';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import {
  clearGoogleState,
  googleSignup,
} from '../../commonSlices/socialLogin.slice';
import * as AsyncStore from '../../asyncstorage/index';
import AfterSignInErrorComp from '../../components/AfterSignInErrorComp';
import ProgressIndicator from '../../components/ProgressIndicator';

const OtherSignup = ({props}) => {
  const styles = useStyles();
  const {colors} = useTheme();
  const commonStyle = CommonStyles();
  const screenHeight = Dimensions.get('window').height;
  const topSectionHeight = screenHeight * 0.12;
  const selector = useSelector(state => state.signupReducer);
  const dispatch = useDispatch();
  const checkEmail = useSelector(state => state.signupReducer);
  const socialSignUp = useSelector(state => state.socialReducer);
  const [googleCredentials, setGooggleCreds] = useState(null);
  const [showModal, setModal] = useState(false);
  const [showErrorModal, setErrorModal] = useState(false);

  const onClickSignUpBtn = async () => {
    if (
      _.isEmpty(selector.otherSignUpEmail) ||
      !isEmail(selector.otherSignUpEmail)
    ) {
      dispatch(updateOtherSignUpEmailIsError(true));
      return;
    }
    const params = {
      email: selector.otherSignUpEmail,
    };
    dispatch(checkEmailExists(params)).then(res => {
      if (res?.payload?.data?.isExists == false) {
        props.navigation.navigate(commonStackIdentifier.create_password);
      } else {
        setErrorModal(true);
      }
    });
  };

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
    if (socialSignUp.googleSignupCheckStatus == 'fulfilled') {
      if (socialSignUp?.googleSignupRes?.status == true) {
        AsyncStore.storeData(
          AsyncStore.Keys.ACCESS_TOKEN,
          socialSignUp?.googleSignupRes?.data?.token,
        ).then(() => {
          AsyncStore.storeJsonData(
            AsyncStore.Keys.USER_DATA,
            socialSignUp?.googleSignupRes?.data,
          );
          if (socialSignUp?.googleSignupRes?.data?.is_exists == false) {
            AsyncStore.storeData(AsyncStore.Keys.SIGN_UP_STEP, '2');
            props.navigation.navigate(commonStackIdentifier.create_profile);
            try {
              {
                socialSignUp?.googleSignupRes?.data?.first_name &&
                  dispatch(
                    updateFirstName(
                      socialSignUp?.googleSignupRes?.data?.first_name,
                    ),
                  );
              }
              {
                socialSignUp?.googleSignupRes?.data?.last_name &&
                  dispatch(
                    updateLastname(
                      socialSignUp?.googleSignupRes?.data?.last_name,
                    ),
                  );
              }
              {
                socialSignUp?.googleSignupRes?.data?.gender &&
                  dispatch(
                    updateGender(socialSignUp?.googleSignupRes?.data?.gender),
                  );
              }
              {
                socialSignUp?.googleSignupRes?.data?.dob &&
                  dispatch(
                    updateBirthDate(socialSignUp?.googleSignupRes?.data?.dob),
                  );
              }
            } catch (e) {
            }
            dispatch(clearGoogleState());
          } else {
            // setModal(true);
            AsyncStore.storeData(AsyncStore.Keys.SIGN_UP_STEP, '5');
            props.navigation.replace(commonStackIdentifier.home_bottom_tabs);
            dispatch(clearGoogleState());
          }
        });
      }
    }
  }, [socialSignUp.googleSignupCheckStatus]);
  const signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut();
      const userinfo = await GoogleSignin.signIn();
      console.warn('userinfo', userinfo);
      const temp = auth.GoogleAuthProvider.credential(userinfo.idToken);
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
    <>
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled
      >
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle={'dark-content'}
        />
        <ScrollView
          bounces={false}
          style={{flex: 1, backgroundColor: colors.darkWhite}}>
          <View style={{alignItems: 'center'}}>
            <TouchableOpacity
              style={{position: 'absolute', left: dimens.w3, top: dimens.h8}}
              onPress={() => {
                if (props.navigation.canGoBack()) {
                  props.navigation.goBack();
                }
              }}>
              <AntDesign
                name="left"
                size={dimens.w6}
                color={colors.black}
                style={{width: dimens.w6, height: dimens.h3}}
              />
            </TouchableOpacity>
            <View style={{height: topSectionHeight}} />

            <View
              style={[
                commonStyle.appverticalePadding,
              ]}>
              <View>
                <Image
                  source={image.ic_app_logo}
                  style={[
                    commonStyle.logoImageStyle,
                    {alignSelf: 'center', marginBottom: dimens.h5},
                  ]}
                  resizeMode="contain"
                />
              </View>
              <View style={{}}>
                <Text style={styles.titleStyle}>Other sign up options</Text>
                <View
                  style={[
                    commonStyle.flexDirectionrow,
                    {
                      height: dimens.h15,
                      justifyContent: 'space-evenly',
                      paddingVertical: dimens.h3,
                    },
                  ]}>
                  <OthersignupRoundComp
                    imgSrc={image.ic_google_logo}
                    onPress={() => signIn()}
                    imgStyle={styles.imgStyle}
                    mainViewStle={commonStyle.flexDirectioncolumn}
                    textName={'Google'}
                    toucbaleStyle={styles.roundBackgroundStyle}
                    textStyle={styles.roundTextstyle}
                  />
                  {Platform.OS == 'ios' && (
                    <OthersignupRoundComp
                      imgSrc={image.ic_apple_logo}
                      onPress={() => {}}
                      imgStyle={styles.imgStyle}
                      mainViewStle={commonStyle.flexDirectioncolumn}
                      textName={'Apple'}
                      toucbaleStyle={styles.roundBackgroundStyle}
                      textStyle={styles.roundTextstyle}
                    />
                  )}

                  <OthersignupRoundComp
                    imgSrc={image.ic_facebook_logo}
                    onPress={() => {}}
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
                    alignContent: 'center',
                    alignItems: 'center',
                    marginVertical: dimens.h2,
                    justifyContent: 'center',
                  }}>
                  <View style={styles.separator} />
                  <Text style={styles.separaterText}>
                    or sign up with email
                  </Text>
                  <View style={styles.separator} />
                </View>

                <View
                  style={{
                    flexDirection: 'column',
                    marginTop: dimens.h3,
                    width: dimens.w76,
                  }}>

                  <TextinputComp
                    placeholder={'nickname@mail.com'}
                    value={selector.otherSignUpEmail}
                    style={styles.textInputstyle}
                    error={selector.otherSignUpEmailIsError}
                    errorMsg={selector.otherSignUpEmailErrorMsg}
                    mode={'flat'}
                    keyboardType={'email-address'}
                    onChangeText={
                      text => {
                        dispatch(updateOtherSignUpEmail(text));
                        dispatch(updateOtherSignUpEmailIsError(false));
                      }
                    }
                    showRightIcon={true}
                    isCustomIcon={true}
                    customIconObj={{
                      name: 'person-outline',
                      color: colors.textInputTextColor,
                      size: 20,
                    }}
                  />
                </View>
                <View
                  style={{
                    marginVertical: dimens.h3,
                    width: dimens.w76,
                  }}>
                  <RoundedButtom
                    onPress={() => {
                      onClickSignUpBtn();
                    }}
                    title={
                      checkEmail?.loading ? (
                        <ProgressIndicator
                          size={'small'}
                          color={colors.white}
                        />
                      ) : (
                        'Sign Up'
                      )
                    }
                    disabled={checkEmail?.loading}
                    titleStyle={styles.titleStylebtn}
                    gradColors={[colors.signupLightBlue, colors.signupDarkBlue]}
                    gradStyle={styles.gradStyles}
                    container={styles.containerBtn}
                    isLinearGradiantApplied={true}
                  />

                </View>
              </View>
            </View>
          </View>
          {showModal && (
            <AfterSignInErrorComp
              openModal={showModal}
              title={
                socialSignUp?.googleSignupRes?.status ||
                checkEmail?.emailExists?.status
              }
              errorMessage={
                socialSignUp?.googleSignupRes?.message ||
                checkEmail?.emailExists?.message
              }
              onBackPress={() => setModal(false)}
              onOkPress={() => {
                setModal(false);
              }}
              gradColors={[colors.signupLightBlue, colors.signupDarkBlue]}
              gradStyle={styles.gradErrorStyles}
              container={styles.containerErrorBtn}
            />
          )}
          {showErrorModal && (
            <AfterSignInErrorComp
              openModal={showErrorModal}
              title={checkEmail?.emailExists?.status}
              errorMessage={checkEmail?.emailExists?.message}
              onBackPress={() => setErrorModal(false)}
              onOkPress={() => {
                setErrorModal(false);
                dispatch(updateOtherSignUpEmail(''));
                props.navigation.navigate(
                  commonStackIdentifier.sigin_screen_withemail,
                );
              }}
              gradColors={[colors.signupLightBlue, colors.signupDarkBlue]}
              gradStyle={styles.gradErrorStyles}
              container={styles.containerErrorBtn}
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </>
  );
};

export default OtherSignup;
