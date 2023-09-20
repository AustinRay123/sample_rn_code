import {
  Dimensions,
  Image,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import {dimens} from '../../constants/dimens';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TextinputComp} from '../../components/TextinputComp';
import commonStyles from '../CommonStyles';
import {useDispatch, useSelector} from 'react-redux';
import {
  clearForgotPasswordStatus,
  clearState,
  clearStatus,
  resetPassword,
  updateConPassword,
  updateConPasswordIsError,
  updateConPasswordIsSecure,
  updatePassword,
  updatePasswordIsError,
  updatePasswordIsSecure,
} from '../../commonSlices/resetPassword.slice';
import useStyles from './ResetPasswordStyle';
import {useTheme} from '@react-navigation/native';
import RoundedButtom from '../../components/RoundedButtom';
import {
  isValidConfirmPassword,
  isValidPassword8cahrOnly,
} from '../../Utility/HelperFunctions';
import _ from 'lodash';
import {commonStackIdentifier} from '../../../App';
import image from '../../constants/image';
import AfterSignInErrorComp from '../../components/AfterSignInErrorComp';
import ProgressIndicator from '../../components/ProgressIndicator';
const ResetPassword = ({props}) => {
  const screenHeight = Dimensions.get('window').height;
  const topSectionHeight = screenHeight * 0.02;
  const selector = useSelector(state => state.resetPasswordReducer);
  const dispatch = useDispatch();
  const styles = useStyles();
  const {colors} = useTheme();
  const commonStyle = commonStyles();
  const [showModal, setModal] = useState(false);
  const [showModalSuc, setModalSuc] = useState(false);
  useEffect(() => {
    console.log('inside fulfil', selector.resetPasswordCheckStatus);
    if (selector.resetPasswordCheckStatus == 'fulfilled') {
      console.log('inside if', selector?.resetPasswordRes?.status);
      if (selector?.resetPasswordRes?.status == true) {
        setModalSuc(true);
        dispatch(clearState());
      } else {
        setModal(true);
        dispatch(clearStatus());
      }
    }
  }, [selector.resetPasswordCheckStatus]);

  const onSubmitClick = () => {
    if (
      _.isEmpty(selector.password) ||
      !isValidPassword8cahrOnly(selector.password)
    ) {
      dispatch(updatePasswordIsError(true));
      return;
    }
    if (
      _.isEmpty(selector.conPassword) ||
      !isValidConfirmPassword(selector.password, selector.conPassword)
    ) {
      dispatch(updateConPasswordIsError(true));
      return;
    }
    const params = {
      email: selector.email,
      otp: selector.otp,
      password: selector.password,
      password_confirmation: selector.conPassword,
    };
    dispatch(resetPassword(params));
  };
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: colors.darkWhite}}>
      {Platform.OS === 'ios' ? (
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          enabled
        >
          <ScrollView bounces={false} style={{flex: 1}}>
            <StatusBar
              translucent
              backgroundColor="transparent"
              barStyle="dark-content"
            />
            <View
              style={{
                flex: 1,
                marginLeft: dimens.w2,
                paddingTop: Platform.OS == 'android' ? dimens.h8 : dimens.h2_5,
              }}>
              <TouchableOpacity
                onPress={() => {
                  dispatch(clearForgotPasswordStatus());
                  props.navigation.goBack();
                }}>
                <AntDesign
                  name="left"
                  size={dimens.w6}
                  color={colors.black}
                  style={{width: dimens.w6, height: dimens.h3}}
                />
              </TouchableOpacity>
            </View>
            <View style={{height: topSectionHeight}} />
            <View style={[{alignItems: 'center', flex: 1}]}>
              <Image
                source={image.ic_app_logo}
                style={[styles.logoImageStyle, {}]}
                resizeMode="contain"
              />
            </View>
            <View
              style={[
                commonStyle.appHorizontalMargin,
                commonStyle.appverticalePadding,
                {
                  paddingHorizontal: dimens.w6,
                  marginTop: dimens.h10,
                },
              ]}>
              <Text style={styles.titleStyle}>Reset Password</Text>
              <View style={{marginTop: dimens.h3}} />
              <TextinputComp
                placeholder={'Password'}
                style={styles.textInputstyle}
                mode={'flat'}
                onChangeText={text => {
                  dispatch(updatePasswordIsError(false));
                  dispatch(updatePassword(text));
                }}
                keyboardType="default"
                value={selector.password}
                error={selector.passwordIsError}
                errorMsg={selector.passwordErrorMsg}
                isSecure={selector.passwordisSecure}
                showRightIcon={true}
                isCustomIcon={true}
                customIconObj={{
                  name: selector.passwordisSecure
                    ? 'eye-off-outline'
                    : 'eye-outline',
                  color: colors.textInputTextColor,
                  size: 20,
                }}
                onRightIconPressed={() => dispatch(updatePasswordIsSecure())}
              />
              <View style={{marginTop: dimens.h3}}></View>
              <TextinputComp
                placeholder={'Confirm-Password'}
                style={styles.textInputstyle}
                mode={'flat'}
                onChangeText={text => {
                  dispatch(updateConPassword(text));
                  dispatch(updateConPasswordIsError(false));
                }}
                keyboardType="default"
                value={selector.conPassword}
                error={selector.conPasswordIsError}
                errorMsg={selector.conPasswordErrorMsg}
                isSecure={selector.conPasswordisSecure}
                showRightIcon={true}
                isCustomIcon={true}
                customIconObj={{
                  name: selector.conPasswordisSecure
                    ? 'eye-off-outline'
                    : 'eye-outline',
                  color: colors.textInputTextColor,
                  size: 20,
                }}
                onRightIconPressed={() => dispatch(updateConPasswordIsSecure())}
              />
              <View style={{flex: 1, marginTop: dimens.h5}}>
                <RoundedButtom
                  onPress={() => {
                    onSubmitClick();
                  }}
                  title={
                    selector?.loading ? (
                      <ProgressIndicator size="small" color={colors.white} />
                    ) : (
                      'Submit'
                    )
                  }
                  disabled={selector?.loading}
                  titleStyle={styles.titleStylebtn}
                  gradColors={[colors.signupLightBlue, colors.signupDarkBlue]}
                  gradStyle={styles.gradStyles}
                  container={styles.containerBtn}
                  isLinearGradiantApplied={true}
                />
              </View>
            </View>
            {showModalSuc ? (
              <AfterSignInErrorComp
                openModal={showModalSuc}
                title={selector?.resetPasswordRes?.status}
                errorMessage={selector?.resetPasswordRes?.message}
                onBackPress={() => setModalSuc(false)}
                onOkPress={() =>
                  props.navigation.navigate(
                    commonStackIdentifier.sigin_screen_withemail,
                  )
                }
                gradColors={[colors.signupLightBlue, colors.signupDarkBlue]}
                gradStyle={styles.gradErrorStyles}
                container={styles.containerErrorBtn}
              />
            ) : (
              <></>
            )}
            {showModal ? (
              <AfterSignInErrorComp
                openModal={showModal}
                title={selector?.resetPasswordRes?.status}
                errorMessage={selector?.resetPasswordRes?.message}
                onBackPress={() => setModal(false)}
                onOkPress={() => setModal(false)}
                gradColors={[colors.signupLightBlue, colors.signupDarkBlue]}
                gradStyle={styles.gradErrorStyles}
                container={styles.containerErrorBtn}
              />
            ) : (
              <></>
            )}
          </ScrollView>
        </KeyboardAvoidingView>
      ) : (
        <ScrollView bounces={false} style={{flex: 1}}>
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="dark-content"
          />
          <View
            style={{
              flex: 1,
              marginLeft: dimens.w2,
              paddingTop: Platform.OS == 'android' ? dimens.h8 : dimens.h2_5,
            }}>
            <TouchableOpacity
              onPress={() => {
                // dispatch(clearState());
                dispatch(clearForgotPasswordStatus());
                props.navigation.goBack();
              }}>
              <AntDesign
                name="left"
                size={dimens.w6}
                color={colors.black}
                style={{width: dimens.w6, height: dimens.h3}}
              />
            </TouchableOpacity>
          </View>
          <View style={{height: topSectionHeight}} />
          <View style={[{alignItems: 'center', flex: 1}]}>
            <Image
              source={image.ic_app_logo}
              style={[styles.logoImageStyle, {}]}
              resizeMode="contain"
            />
          </View>
          <View
            style={[
              commonStyle.appHorizontalMargin,
              commonStyle.appverticalePadding,
              {
                paddingHorizontal: dimens.w6,
                marginTop: dimens.h10,
              },
            ]}>
            <Text style={styles.titleStyle}>Reset Password</Text>
            <Text style={styles.emailTitle}>Password</Text>
            <TextinputComp
              placeholder={'Password'}
              style={styles.textInputstyle}
              mode={'flat'}
              onChangeText={text => {
                dispatch(updatePasswordIsError(false));
                dispatch(updatePassword(text));
              }}
              keyboardType="default"
              value={selector.password}
              error={selector.passwordIsError}
              errorMsg={selector.passwordErrorMsg}
              isSecure={selector.passwordisSecure}
              isCustomIcon={true}
              customIconObj={{
                name: selector.passwordisSecure
                  ? 'eye-off-outline'
                  : 'eye-outline',
                color: colors.textInputTextColor,
                size: 20,
              }}
              onRightIconPressed={() => dispatch(updatePasswordIsSecure())}
            />
            <Text style={styles.emailTitle}>Confirm Password</Text>
            <TextinputComp
              placeholder={'Con-Password'}
              style={styles.textInputstyle}
              mode={'flat'}
              onChangeText={text => {
                dispatch(updateConPassword(text));
                dispatch(updateConPasswordIsError(false));
              }}
              keyboardType="default"
              value={selector.conPassword}
              error={selector.conPasswordIsError}
              errorMsg={selector.conPasswordErrorMsg}
              isSecure={selector.conPasswordisSecure}
              showRightIcon={true}
              isCustomIcon={true}
              customIconObj={{
                name: selector.conPasswordisSecure
                  ? 'eye-off-outline'
                  : 'eye-outline',
                color: colors.textInputTextColor,
                size: 20,
              }}
              onRightIconPressed={() => dispatch(updateConPasswordIsSecure())}
            />
            <View style={{flex: 1, marginTop: dimens.h4}}>
              <RoundedButtom
                onPress={() => {
                  onSubmitClick();
                }}
                title={
                  selector?.loading ? (
                    <ProgressIndicator size={'small'} color={colors.white} />
                  ) : (
                    'Submit'
                  )
                }
                disabled={selector?.loading}
                titleStyle={styles.titleStylebtn}
                // gradColors={[colors.deepmagenta, colors.deepmagenta]}
                gradColors={[colors.signupLightBlue, colors.signupDarkBlue]}
                gradStyle={styles.gradStyles}
                container={styles.containerBtn}
                isLinearGradiantApplied={true}
              />
            </View>
          </View>
          {showModalSuc ? (
            <AfterSignInErrorComp
              openModal={showModalSuc}
              title={selector?.resetPasswordRes?.status}
              errorMessage={selector?.resetPasswordRes?.message}
              onBackPress={() => setModalSuc(false)}
              onOkPress={() =>
                props.navigation.navigate(
                  commonStackIdentifier.sigin_screen_withemail,
                )
              }
              gradColors={[colors.signupLightBlue, colors.signupDarkBlue]}
              gradStyle={styles.gradErrorStyles}
              container={styles.containerErrorBtn}
            />
          ) : (
            <></>
          )}
          {showModal ? (
            <AfterSignInErrorComp
              openModal={showModal}
              title={selector?.resetPasswordRes?.status}
              errorMessage={selector?.resetPasswordRes?.message}
              onBackPress={() => setModal(false)}
              onOkPress={() => setModal(false)}
              gradColors={[colors.signupLightBlue, colors.signupDarkBlue]}
              gradStyle={styles.gradErrorStyles}
              container={styles.containerErrorBtn}
            />
          ) : (
            <></>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default ResetPassword;

const styles = StyleSheet.create({});
