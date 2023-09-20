import {
  ActivityIndicator,
  Alert,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import ModalNew from 'react-native-modal';
import {dimens, fontsizes} from '../../constants/dimens';
import font from '../../constants/fonts';
import useStyles from './EnterOTPStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation, useTheme} from '@react-navigation/native';
import RoundedButtom from '../RoundedButtom';
import OTPTextInput from 'react-native-otp-textinput';
import {commonStackIdentifier} from '../../../App';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import {useDispatch, useSelector} from 'react-redux';
import {
  updateOTPIsError,
  updateOTP,
  verifyOTP,
  clearState,
  clearOTP,
} from '../../commonSlices/resetPassword.slice';
import _ from 'lodash';
import {HelperText} from 'react-native-paper';
import ErrorComp from '../ErrorComp';
import AfterSignInErrorComp from '../AfterSignInErrorComp';
import ProgressIndicator from '../ProgressIndicator';
const EnterOTPBottomSheet = props => {
  const {visibility, onBackdropPress, onItemClick, prop} = props;
  const styles = useStyles();
  const {colors} = useTheme();
  const otpRef = useRef(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [showModal, setModal] = useState(false);
  const selector = useSelector(state => state.resetPasswordReducer);

  useEffect(() => {
    console.log('inside fulfil', selector.verifyOTPCheckStatus);
    if (selector.verifyOTPCheckStatus == 'fulfilled') {
      console.log('inside if', selector?.verifyOTPRes?.status);
      if (selector?.verifyOTPRes?.status == true) {
        navigation.navigate(commonStackIdentifier.reset_password);
        onBackdropPress();
        // dispatch(clearState());
      } else {
        setModal(true);
        dispatch(clearOTP());
        // dispatch(clearState());
      }
    }
  }, [selector.verifyOTPCheckStatus]);

  const onSubmitPress = async () => {
    if (_.isEmpty(selector.otp)) {
      dispatch(updateOTPIsError(true));
      return;
    }

    const params = {
      email: selector.email,
      otp: selector.otp,
    };
    await dispatch(verifyOTP(params));

    //   onResetPasswordBtnClick();
  };
  return (
    <ModalNew
      animationInTiming={600}
      animationOutTiming={400}
      backdropTransitionInTiming={800}
      backdropTransitionOutTiming={800}
      style={{
        borderRadius: 20,
        justifyContent: 'flex-end',
        margin: 0,
      }}
      onBackdropPress={onBackdropPress}
      onSwipeComplete={onBackdropPress}
      // deviceWidth={util.getDeviceWidth}
      swipeDirection={['down']}
      // deviceHeight={t}
      isVisible={visibility}>
      <StatusBar
        translucent
        // backgroundColor="transparent"
        backgroundColor={colors.black}
        barStyle={'dark-content'}
      />
      <KeyboardAvoidingView
        // style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled
        //   keyboardVerticalOffset={100}
      >
        <View
          style={{
            borderRadius: 20,
            backgroundColor: colors.white,
            padding: 20,
            paddingVertical: 40,
            paddingTop: 10,
            height: dimens.h40,
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={styles.presentStyle}>{'Enter OTP'}</Text>
            <TouchableOpacity
              style={{position: 'absolute', right: 0, top: 5}}
              onPress={onBackdropPress}>
              <AntDesign
                name="closecircleo"
                size={dimens.w6}
                color={colors.black}
                style={{width: dimens.w6, height: dimens.h3}}
              />
            </TouchableOpacity>
          </View>
          <View style={{marginBottom: dimens.h5}}>
            <OTPTextInput
              defaultValue={selector.otp}
              inputCount={6}
              ref={otpRef}
              // tintColor={colors.deepmagenta}
              // tintColor={colors.deepcyan}
              tintColor={colors.black}
              offTintColor={colors.black}
              textInputStyle={{
                borderBottomWidth: 1,
                borderRadius: 8,
                borderWidth: 1,
                height: dimens.h6,
                width: dimens.w10,
                fontSize: fontsizes.FONT_14Px_H6,
                fontFamily: font.Proximanovaexcn_Regular,
                color: colors.black,
              }}
              selectionColor="white"
              containerStyle={{}}
              handleTextChange={text => {
                dispatch(updateOTPIsError(false));
                dispatch(updateOTP(text));
              }}
            />
            {selector.otpIsError == true ? (
              // || selector.otp.length != 6
              <HelperText
                type="error"
                visible={true}
                padding={'none'}
                style={{color: colors.warmred}}>
                {selector.otpErrorMsg}
              </HelperText>
            ) : (
              <></>
            )}
            <Text style={styles.titleText1}>
              Please enter 6 digit code which you received on mail.
            </Text>

            <View style={{flex: 1, marginTop: dimens.h1, alignSelf: 'center'}}>
              <RoundedButtom
                onPress={() => onSubmitPress()}
                title={
                  selector?.loading ? (
                    // <ActivityIndicator size="small" color={colors.white} />
                    <ProgressIndicator size="small" color={colors.white} />
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
          {showModal ? (
            <AfterSignInErrorComp
              openModal={showModal}
              title={selector?.verifyOTPRes?.status}
              errorMessage={selector?.verifyOTPRes?.message}
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
      </KeyboardAvoidingView>
    </ModalNew>
  );
};

export default EnterOTPBottomSheet;

const styles = StyleSheet.create({});
