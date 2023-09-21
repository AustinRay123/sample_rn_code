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
import useStyles from './FotgotPasswordStyle';
import {useTheme} from '@react-navigation/native';
import CommonStyles from '../CommonStyles';
import image from '../../constants/image';
import RoundedButtom from '../../components/RoundedButtom';
import {dimens} from '../../constants/dimens';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {AppThemeContext} from '../../../App';
import {TextinputComp} from '../../components/TextinputComp';
import {ScrollView} from 'react-native-gesture-handler';
import {useDispatch, useSelector} from 'react-redux';
import _ from 'lodash';
import {isEmail} from '../../Utility/HelperFunctions';
import EnterOTPBottomSheet from '../../components/BottomSheets/EnterOTPBottomSheet';
import {
  clearEmail,
  clearForgotPasswordStatus,
  forgotPassword,
  updateEmail,
  updateEmailIsError,
} from '../../commonSlices/resetPassword.slice';
import AfterSignInErrorComp from '../../components/AfterSignInErrorComp';
import ProgressIndicator from '../../components/ProgressIndicator';

const ForgotPassword = ({props}) => {
  const styles = useStyles();
  const {colors} = useTheme();
  const commonStyle = CommonStyles();
  const [isAddClicked, setIsAddClicked] = useState(false);
  const selector = useSelector(state => state.resetPasswordReducer);
  const dispatch = useDispatch();
  const screenHeight = Dimensions.get('window').height;
  const topSectionHeight = screenHeight * 0.14;
  const [showModal, setModal] = useState(false);
  useEffect(() => {
    if (selector.forgotPasswordCheckStatus == 'fulfilled') {
      if (selector?.forgotPasswordRes?.status == true) {
        setIsAddClicked(true);
      } else {
        setModal(true);
      }
    }
  }, [selector.forgotPasswordCheckStatus]);
  const onResetPasswordBtnClick = async () => {
    if (_.isEmpty(selector.email) || !isEmail(selector.email)) {
      dispatch(updateEmailIsError(true));
      return;
    }
    const params = {
      email: selector.email,
    };
    await dispatch(forgotPassword(params));
  };
  return (
    <View
      style={{flex: 1, backgroundColor: colors.darkWhite}}>
      {isAddClicked && (
        <EnterOTPBottomSheet
          visibility={isAddClicked}
          onBackdropPress={() => {
            setIsAddClicked(false);
            dispatch(clearForgotPasswordStatus());
          }}
          prop={props}
        />
      )}
      <KeyboardAvoidingView
        style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled
      >
        <StatusBar
          translucent
          backgroundColor="transparent"
          barStyle="dark-content"
        />
        <ScrollView bounces={false} style={{flex: 1}}>
          <View style={{alignItems: 'center', flex: 1}}>
            <TouchableOpacity
              style={{
                position: 'absolute',
                left: dimens.w3,
                top: Platform.OS == 'ios' ? dimens.h8 : dimens.h5,
              }}
              onPress={() => {
                props.navigation.goBack();
                dispatch(clearEmail());
              }}>
              <AntDesign
                name="left"
                size={dimens.w6}
                color={colors.black}
                style={{width: dimens.w6, height: dimens.h3}}
              />
            </TouchableOpacity>
            <View style={{height: topSectionHeight}} />
            <Image
              source={image.ic_app_logo}
              style={[styles.logoImageStyle, {marginBottom: dimens.h15}]}
              resizeMode="contain"
            />
            <View
              style={[
                commonStyle.appverticalePadding,
                {
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  width: '100%',
                  paddingHorizontal: dimens.w5,
                },
              ]}>
              <View
                style={{
                  justifyContent: 'flex-end',
                  paddingHorizontal: dimens.w5,
                }}>
                <Text style={styles.titleStyle}>Forgot Password</Text>
                <Text style={styles.paraStyle} numberOfLines={4}>
                  Please enter the email address you signed up with.
                </Text>

                <View
                  style={{
                    flexDirection: 'column',
                    marginTop: dimens.h4,
                  }}>
                  <TextinputComp
                    placeholder={'nickname@mail.com'}
                    style={styles.textInputstyle}
                    mode={'flat'}
                    onChangeText={text => {
                      dispatch(updateEmailIsError(false));
                      dispatch(updateEmail(text));
                    }}
                    value={selector.email}
                    error={selector.emailIsError}
                    errorMsg={selector.emailErrorMsg}
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

                <View style={{flex: 1, marginTop: dimens.h3}}>
                  <RoundedButtom
                    onPress={() => {
                      onResetPasswordBtnClick();
                    }}
                    title={
                      selector?.loading ? (
                        <ProgressIndicator
                          size={'small'}
                          color={colors.white}
                        />
                      ) : (
                        'Reset password'
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
                {showModal ? (
                  <AfterSignInErrorComp
                    openModal={showModal}
                    title={selector?.forgotPasswordRes?.status}
                    errorMessage={selector?.forgotPasswordRes?.message}
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
      </KeyboardAvoidingView>
    </View>
  );
};

export default ForgotPassword;
