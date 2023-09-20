import React, {useContext, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Image,
  SafeAreaView,
  StatusBar,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import ModalNew from 'react-native-modal';
import useStyles from './ClaimYourSubscriptionStyle';
import {AppThemeContext} from '../../../App';
import RoundedButtom from '../RoundedButtom';
import {TextinputComp} from '../TextinputComp';
import {useDispatch, useSelector} from 'react-redux';
import {dimens} from '../../constants/dimens';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {isEmail} from '../../Utility/HelperFunctions';
import {
  clearState,
  postClaimRequst,
  updateClaimYourSubEmail,
  updateClaimYourSubEmailErrorMsg,
  updateClaimYourSubEmailIsError,
  updateClaimYourSubEmail_showError,
} from '../../commonSlices/ClaimSubscription.slice';
import _ from 'lodash';
import VerifyOtpBottomSheet from './VerifyOtpBottomSheet';
import ProgressIndicator from '../ProgressIndicator';
import AfterSignInErrorComp from '../AfterSignInErrorComp';

const ClaimYourSubscription = ({visibility, onBackdropPress, onCloseClick}) => {
  const styles = useStyles();
  const {colors} = useTheme();
  const {AppThemeName, updateAppTheme} = useContext(AppThemeContext);
  const selector = useSelector(state => state.claimYOurSubReducer);
  const dispatch = useDispatch();
  const [showOtpPopup, setShowOtpPopup] = useState(false);

  const onCliamClick = () => {
    if (
      _.isEmpty(selector.claimYourSubEmail) ||
      !isEmail(selector.claimYourSubEmail)
    ) {
      dispatch(updateClaimYourSubEmail_showError(true));
      return;
    }
    let formDatas = new FormData();
    formDatas.append('email', selector.claimYourSubEmail);

    dispatch(postClaimRequst(formDatas));
    // onBackdropPress();
  };

  useEffect(() => {
    if (
      !_.isEmpty(selector.claimYOurSubScriptionApiRes) &&
      selector.claimYOurSubScriptionApiRes.status == true
    ) {
      // setShowOtpPopup(true);
    }
  }, [selector.claimYOurSubScriptionApiRes]);
  useEffect(() => {
    if (selector?.claimYOurSubScriptionApiCheckStatus === 'fulfilled') {
      if (
        !_.isEmpty(selector.claimYOurSubScriptionApiRes) &&
        selector?.claimYOurSubScriptionApiRes?.status === true
      ) {
        setShowOtpPopup(true);
      } else {
        console.log('IN else COndition');

        dispatch(updateClaimYourSubEmailIsError(true));
        dispatch(
          updateClaimYourSubEmailErrorMsg(
            selector?.claimYOurSubScriptionApiRes?.message,
          ),
        );
      }
    }
  }, [selector?.claimYOurSubScriptionApiCheckStatus]);
 
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
      <KeyboardAvoidingView
        behavior="padding"
        style={{flex: 1, marginTop: dimens.h10}}
        // style={{flex: 1}}
        // behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled // keyboardVerticalOffset={100}
      >
        {showOtpPopup && (
          <VerifyOtpBottomSheet
            onCloseClick={() => {
              dispatch(clearState());
              setShowOtpPopup(false);
            }}
            visibility={showOtpPopup}
            onBackdropPress={() => {
              dispatch(clearState());
              onBackdropPress();

              setShowOtpPopup(false);
            }}
            // onItemClick={item => {
            //   dispatch(updateGender(item.name));
            // }}
            // prop={props}
          />
        )}
        <StatusBar
          translucent
          // backgroundColor="transparent"
          backgroundColor={colors.black}
          barStyle={'dark-content'}
        />
        <View
          style={{
            // borderRadius: 20,
            // backgroundColor: colors.backgroundWhite,
            // padding: 20,
            // paddingVertical: 40,
            // paddingTop: 10,
            // height: dimens.h80,
            borderRadius: 20,
            backgroundColor: colors.darkWhite,
            alignItems: 'center',
            //   padding: 20,
            //   paddingVertical: 40,
            //   paddingTop: 10,
            height: dimens.h90,
          }}>
          <Text style={styles.titleTextStyle}>{'Claim Your Subscription'}</Text>
          <TouchableOpacity
            style={{position: 'absolute', right: 10, top: 10}}
            onPress={onCloseClick}>
            <AntDesign
              name="closecircleo"
              size={dimens.w6}
              color={colors.black}
              style={{width: dimens.w6, height: dimens.h3}}
            />
          </TouchableOpacity>

          <View style={styles.textInputContainer}>
            <Text style={styles.emailTitle}>Email</Text>
            <TextinputComp
              placeholder={'Enter Your Email'}
              style={styles.textInputstyle}
              mode={'flat'}
              onChangeText={text => {
                dispatch(updateClaimYourSubEmail_showError(false));
                dispatch(updateClaimYourSubEmail(text));
              }}
              value={selector.claimYourSubEmail}
              error={selector.claimYourSubEmail_Is_showEror}
              errorMsg={selector.claimYourSubEmail_errMsg}
            />
          </View>
          {/* {selector?.updateClaimYourSubEmailIsError == true ? (
            <Text style={{color: 'red'}}>
              {selector?.updateClaimYourSubEmailErrorMsg}
            </Text>
          ) : (
            <></>
          )} */}
          <RoundedButtom
            onPress={() => onCliamClick()}
            title={
              selector.isLoading ? (
                <ProgressIndicator size={'small'} color={colors.graditnBtnTextColor} />
              ) : (
                'Claim Now'
              )
            }
            disabled={selector.isLoading}
            titleStyle={styles.titleStyle}
            gradColors={[colors.signupLightBlue, colors.signupDarkBlue]}
            gradStyle={styles.gradeStyle}
            container={styles.rButtonContainer}
            //   isLinearGradiantApplied={false}
          />
          {selector?.updateClaimYourSubEmailIsError && (
            <AfterSignInErrorComp
              openModal={selector?.updateClaimYourSubEmailIsError}
              title={selector?.claimYOurSubScriptionApiRes?.status}
              errorMessage={selector?.updateClaimYourSubEmailErrorMsg}
              onBackPress={() => {
                dispatch(updateClaimYourSubEmailIsError(false));
                dispatch(updateClaimYourSubEmailErrorMsg(''));
                dispatch(clearState());
              }}
              onOkPress={() => {
                dispatch(updateClaimYourSubEmailIsError(false));
                dispatch(updateClaimYourSubEmailErrorMsg(''));
                dispatch(clearState());
              }}
              gradColors={[colors.signupLightBlue, colors.signupDarkBlue]}
              gradStyle={styles.gradErrorStyles}
              container={styles.containerErrorBtn}
            />
          )}
        </View>
      </KeyboardAvoidingView>
    </ModalNew>
  );
};

export default ClaimYourSubscription;
