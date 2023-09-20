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
import React, {useState, useContext} from 'react';
import useStyles from './SignInStyle';
import {useTheme} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CommonStyles from '../CommonStyles';
import image from '../../constants/image';
import RoundedButtom from '../../components/RoundedButtom';
import {dimens} from '../../constants/dimens';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {AppThemeContext, commonStackIdentifier} from '../../../App';
import {TextinputComp} from '../../components/TextinputComp';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearState,
  clearStatus,
  signIn,
  updatesignInwithEmail,
  updatesignInwithEmailIsError,
  updateSignPassword,
  updateSignPasswordIsError,
  updateSignPasswordIsSecure,
} from '../../commonSlices/sigin.slice';
import _ from 'lodash';
import {isEmail} from '../../Utility/HelperFunctions';
import * as AsyncStore from '../../asyncstorage/index';
import AfterSignInErrorComp from '../../components/AfterSignInErrorComp';
import ProgressIndicator from '../../components/ProgressIndicator';
import {checkNotifications} from 'react-native-permissions';
import {requestUserPermission} from '../../Utility/PushNotificationHelper';
const SignInwithEmail = ({props}) => {
  const styles = useStyles();
  const {colors} = useTheme();
  const commonStyle = CommonStyles();
  const [email, setEmail] = useState('');

  const selector = useSelector(state => state.signInReducer);
  const dispatch = useDispatch();
  const screenHeight = Dimensions.get('window').height;
  const topSectionHeight = screenHeight * 0.4;
  const bottomSectionHeight = screenHeight - topSectionHeight;
  const {AppThemeName} = useContext(AppThemeContext);
  const [showModal, setModal] = useState(false);
  
  const onSignInbtnClick = async () => {
    if (
      _.isEmpty(selector.signInwithEmail) ||
      !isEmail(selector.signInwithEmail)
    ) {
      dispatch(updatesignInwithEmailIsError(true));
      return;
    }
    if (_.isEmpty(selector.signPassword)) {
      dispatch(updateSignPasswordIsError(true));
      return;
    }
    const params = {
      email: selector.signInwithEmail,
      password: selector.signPassword,
    };
    await dispatch(signIn(params)).then(res => {
      if (res?.payload?.status == true) {
        checkNotifications()
          .then(({status, settings}) => {
            if (status === 'denied') {
              request(PERMISSIONS.ANDROID.POST_NOTIFICATIONS);
            }
          })
          .catch(e => {
            console.log('Notification_E', e);
          });
        requestUserPermission().then(status => {
          introCheck();
        });

        introCheck();
        dispatch(clearState());
      } else {
        setModal(true);
        dispatch(clearStatus());
      }
    });

   
  };
  const introCheck = async () => {
    AsyncStore.storeData(AsyncStore.Keys.SIGN_UP_STEP, '5');
    props.navigation.navigate(commonStackIdentifier.home_bottom_tabs);
  };

  return (
    <KeyboardAvoidingView
      style={{flex: 1, backgroundColor: colors.darkWhite}}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled
    >
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={'dark-content'}
      />
      <SafeAreaView style={{flex: 1, backgroundColor: colors.darkWhite}}>
        <ScrollView bounces={false} style={{flex: 1}}>
          <View style={{alignItems: 'center', flex: 1}}>
            <TouchableOpacity
              style={{
                left: dimens.w3,
                top: dimens.h2,
                alignSelf: 'flex-start',
                flex: 1,
              }}
              onPress={() => {
                props.navigation.goBack();
              }}>
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
              <View
                style={{
                  flex: 1,
                  marginTop: dimens.h5,
                }}>
                <Image
                  source={image.ic_app_logo}
                  style={[styles.logoImageStyle]}
                  resizeMode="contain"
                />
                <View style={{paddingHorizontal: dimens.w5}}>
                  <Text style={styles.titleStyle}>Let's go! </Text>

                  <View style={{marginTop: dimens.h2}}>
                    <TextinputComp
                      placeholder={'nickname@mail.com'}
                      style={styles.textInputstyle}
                      mode={'flat'}
                      onChangeText={text => {
                        dispatch(updatesignInwithEmailIsError(false));
                        dispatch(updatesignInwithEmail(text));
                      }}
                      value={selector.signInwithEmail}
                      error={selector.signInwithEmailIsError}
                      errorMsg={selector.signInwithEmailErrorMsg}
                      keyboardType={'email-address'}
                      showRightIcon={true}
                      isCustomIcon={true}
                      customIconObj={{
                        name: 'person-outline',
                        color: colors.textInputTextColor,
                        size: 20,
                      }}
                    />
                  </View>
                  <View style={{marginTop: dimens.h2}}>
                    <TextinputComp
                      style={styles.textInputstyle}
                      placeholder={'Password'}
                      mode={'flat'}
                      keyboardType="default"
                      onChangeText={text => dispatch(updateSignPassword(text))}
                      value={selector.signPassword}
                      error={selector.signPasswordIsError}
                      errorMsg={selector.signPasswordErrorMsg}
                      isSecure={selector.signPasswordisSecure}
                      showRightIcon={true}
                      isCustomIcon={true}
                      customIconObj={{
                        name: selector.signPasswordisSecure
                          ? 'eye-off-outline'
                          : 'eye-outline',
                        color: colors.textInputTextColor,
                        size: 20,
                      }}
                      onRightIconPressed={() =>
                        dispatch(updateSignPasswordIsSecure())
                      }
                    />
                  </View>
                  <View
                    style={{
                      justifyContent: 'flex-end',
                      flexDirection: 'row',
                      marginTop: dimens.h2_5,
                    }}>
                    <TouchableOpacity
                      onPress={() =>
                        props.navigation.navigate(
                          commonStackIdentifier.forgot_password,
                        )
                      }>
                      <Text style={styles.forgotPass}>Forgot Password?</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{flex: 1, marginTop: dimens.h2_8}}>
                    <RoundedButtom
                      onPress={() => {
                        onSignInbtnClick();
                      }}
                      title={
                        selector?.loading ? (
                          <ProgressIndicator
                            size="small"
                            color={colors.white}
                          />
                        ) : (
                          'Sign In'
                        )
                      }
                      disabled={selector?.loading}
                      titleStyle={styles.titleStylebtn}
                      gradColors={[
                        colors.signupLightBlue,
                        colors.signupDarkBlue,
                      ]}
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
                    >
                    <Text style={styles.notAccount}>
                      Don't have an account yet?
                    </Text>
                    <Text style={styles.registerNow}> Create an account </Text>
                  </TouchableOpacity>
                </View>
                {showModal ? (
                  <AfterSignInErrorComp
                    openModal={showModal}
                    title={selector?.signIn?.status}
                    errorMessage={selector?.signIn?.message}
                    onBackPress={() => setModal(false)}
                    onOkPress={() => setModal(false)}
                    gradColors={[colors.signupLightBlue, colors.signupDarkBlue]}
                    gradStyle={styles.gradErrorStyles}
                    container={styles.containerErrorBtn}
                  />
                ) : (
                  <></>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default SignInwithEmail;
