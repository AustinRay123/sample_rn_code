import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
  ImageBackground,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import useStyles from './otherSignupstyle';
import {useTheme} from '@react-navigation/native';
import {SafeAreaView} from 'react-native-safe-area-context';
import CommonStyles from '../CommonStyles';
import LinearGradient from 'react-native-linear-gradient';
import image from '../../constants/image';
import RoundedButtom from '../../components/RoundedButtom';
import {dimens, fontsizes} from '../../constants/dimens';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {AppThemeContext, commonStackIdentifier} from '../../../App';
import OthersignupRoundComp from './OthersignupRoundComp';
import {TextinputComp} from '../../components/TextinputComp';
import {ScrollView} from 'react-native-gesture-handler';
// import SvgImage from 'react-native-svg/lib/typescript/elements/Image';
import GradientShape from '../../assets/GradientShape.svg';
import {useDispatch, useSelector} from 'react-redux';
import * as AsyncStore from '../../asyncstorage/index';

import {
  updateConfirmPasword,
  updateConfirmPaswordIsError,
  updateCreatPassword,
  updateCreatPasswordIsError,
  updateIsConfirmPassSecure,
  updateIsPassSecure,
  signUp,
} from '../../commonSlices/signup.slice';
import constants from '../../constants/constants';
import _ from 'lodash';
import {
  isValidConfirmPassword,
  isValidPassword,
  isValidPassword8cahrOnly,
} from '../../Utility/HelperFunctions';
import RedRoundedButton from '../../components/RedRoundedButton';
import font from '../../constants/fonts';
import ProgressIndicator from '../../components/ProgressIndicator';

const CreatePasswordScreen = ({props}) => {
  const styles = useStyles();
  const {colors} = useTheme();
  const commonStyle = CommonStyles();
  
  const signupSelector = useSelector(state => state.signupReducer);
  const dispatch = useDispatch();
  const {AppThemeName} = useContext(AppThemeContext);

  const screenHeight = Dimensions.get('window').height;
  const topSectionHeight = screenHeight * 0.23;
  const bottomSectionHeight = screenHeight - topSectionHeight;

  useEffect(() => {
    // console.log('signupSelector.signUpStatus', signupSelector.signUpData);
    if (signupSelector.signUpStatus === 'fulfilled') {
      // dispatch(clearState());
      AsyncStore.storeData(
        AsyncStore.Keys.ACCESS_TOKEN,
        signupSelector?.signUpData?.data?.token,
      ).then(() => {
        AsyncStore.storeJsonData(
          AsyncStore.Keys.USER_DATA,
          signupSelector?.signUpData?.data,
        );
        AsyncStore.storeData(AsyncStore.Keys.SIGN_UP_STEP, '2');
        props.navigation.navigate(commonStackIdentifier.create_profile);
      });
    }
  }, [signupSelector.signUpStatus]);

  const onCreaePasswordBtnClick = () => {
    if (
      _.isEmpty(signupSelector.createPasswordText) ||
      !isValidPassword8cahrOnly(signupSelector.createPasswordText)
    ) {
      dispatch(updateCreatPasswordIsError(true));
      return;
    }
    if (
      _.isEmpty(signupSelector.confirmPasswordText) ||
      !isValidConfirmPassword(
        signupSelector.createPasswordText,
        signupSelector.confirmPasswordText,
      )
    ) {
      dispatch(updateConfirmPaswordIsError(true));
      return;
    }
    const payload = {
      email: signupSelector.otherSignUpEmail,
      password: signupSelector.createPasswordText,
      password_confirmation: signupSelector.confirmPasswordText,
    };
    dispatch(signUp(payload));

    // props.navigation.navigate(commonStackIdentifier.create_profile);
    // props.navigation.navigate(commonStackIdentifier.create_profile_copy);
    // dispatch(clearState());
  };
  return (
    <KeyboardAvoidingView
      style={{flex: 1}}
      behavior={Platform.OS === 'ios' ? 'padding' : null}
      enabled
      //   keyboardVerticalOffset={100}
    >
      {/* // source={
      //   AppThemeName == 'MyDefaultThemeDay'
      //     ? image.img_Background
      //     : image.img_Background2
      // }

      // resizeMode={'cover'}
      // style={{flex: 1, backgroundColor: colors.darkWhite}}> */}

      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <ScrollView
        bounces={false}
        style={{flex: 1, backgroundColor: colors.darkWhite}}>
        <View
          style={[
            commonStyle.appHorizontalPadding,
            commonStyle.appverticalePadding,
            {alignItems: 'center'},
          ]}>
          <TouchableOpacity
            style={{position: 'absolute', left: dimens.w3, top: dimens.h8}}
            onPress={() => props.navigation.goBack()}>
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
            style={[commonStyle.logoImageStyle, {marginTop: -dimens.h5}]}
            resizeMode="contain"
          />

          <View style={commonStyle.titleContainer}>
            {/* <View style={{flexDirection: 'row'}}>
                <Text style={styles.titleStyle}>Create</Text>
                <Text style={styles.aStyle}> a</Text>
                <Text style={styles.titleStyle}> Password</Text>
              </View> */}
            <Text style={styles.titleStyle}>Create A Password</Text>
            <View style={commonStyle.titleDesContainerStyle}>
              <Text
                style={[
                  commonStyle.titleDesStyle,
                  {
                    fontSize: fontsizes.FONT_16Px_,
                    color: colors.smallTextColors,
                    fontFamily: font.Proximanovaexcn_Regular,
                  },
                ]}
                numberOfLines={4}>
                {/* Use at least 8 characters character. */}
                Use at least 8 characters.
              </Text>
              {/* <Text
                style={[
                  commonStyle.titleDesStyle,
                  {
                    fontSize: fontsizes.FONT_16Px_,
                    color: colors.smallTextColors,
                    fontFamily: font.Proximanovaexcn_Regular,
                  },
                ]}
                numberOfLines={4}>
                number, and one special character.
              </Text> */}
            </View>
          </View>

          <View
            style={[
              //commonStyle.appHorizontalPadding,
              //commonStyle.appverticalePadding,
              //{height: bottomSectionHeight},
              {
                width: dimens.w90,
                marginTop: dimens.h5,
                paddingHorizontal: dimens.w7,
              },
            ]}>
            {/* <View style={{}}> */}
            {/* <Text style={styles.titleStyle}>CREATE A PASSWORD</Text>
                <Text style={styles.paraStyle} numberOfLines={4}>
                  Use at least 8 characters with 1 number, and one special
                  character.
                </Text> */}

            <View style={{marginTop: dimens.h2}}>
              {/* <Text style={styles.emailTitle}>Password</Text> */}
              <TextinputComp
                placeholder={'Password'}
                style={styles.textInputstyle}
                mode={'flat'}
                onChangeText={text => {
                  dispatch(updateCreatPasswordIsError(false));
                  dispatch(updateCreatPassword(text));
                }}
                value={signupSelector.createPasswordText}
                error={signupSelector.createPasswordTextIsError}
                errorMsg={signupSelector.createPasswordTextErrorMsg}
                isSecure={signupSelector.isPasswordSecure}
                showRightIcon={true}
                // rightIconObj={{
                //   name: signupSelector.isPasswordSecure
                //     ? 'eye-off-outline'
                //     : 'eye-outline',
                //   color: colors.textInputTextColor,
                // }}
                isCustomIcon={true}
                customIconObj={{
                  name: signupSelector.isPasswordSecure
                    ? 'eye-off-outline'
                    : 'eye-outline',
                  color: colors.textInputTextColor,
                  size: 20,
                }}
                onRightIconPressed={() => dispatch(updateIsPassSecure())}
              />
            </View>
            <View style={{flexDirection: 'column', marginTop: dimens.h2}}>
              {/* <Text style={styles.emailTitle}>Confirm password</Text> */}
              <TextinputComp
                placeholder={'Confirm password'}
                style={styles.textInputstyle}
                mode={'flat'}
                onChangeText={text => {
                  dispatch(updateConfirmPaswordIsError(false));
                  dispatch(updateConfirmPasword(text));
                }}
                value={signupSelector.confirmPasswordText}
                error={signupSelector.confirmPasswordTextIsError}
                errorMsg={signupSelector.confirmPasswordTextErrorMsg}
                isSecure={signupSelector.isCofirmPasswordSecure}
                showRightIcon={true}
                // rightIconObj={{
                //   name: signupSelector.isCofirmPasswordSecure
                //     ? 'eye-off-outline'
                //     : 'eye-outline',
                //   color: colors.textInputTextColor,
                // }}
                isCustomIcon={true}
                customIconObj={{
                  name: signupSelector.isCofirmPasswordSecure
                    ? 'eye-off-outline'
                    : 'eye-outline',
                  color: colors.textInputTextColor,
                  size: 20,
                }}
                onRightIconPressed={() => dispatch(updateIsConfirmPassSecure())}
              />
            </View>
            <View
              style={{
                marginVertical: dimens.h3,
                // marginHorizontal: dimens.w3,
              }}>
              {/* <RedRoundedButton
                  container={{width: dimens.w76}}
                  onPress={() => {
                    onCreaePasswordBtnClick();
                  }}
                  title={
                    signupSelector?.loading ? (
                      <ActivityIndicator size="small" color={colors.white} />
                    ) : (
                      'Sign Up'
                    )
                  }
                /> */}
                <RoundedButtom
                  onPress={() => {
                    onCreaePasswordBtnClick();
                  }}
                  title={
                    signupSelector?.loading ? (
                      <ProgressIndicator size={'small'} color={colors.white} />
                    ) : (
                      'Next'
                    )
                  }
                  disabled={signupSelector?.loading}
                  titleStyle={styles.titleStylebtn}
                  gradColors={[colors.signupLightBlue, colors.signupDarkBlue]}
                  gradStyle={styles.gradStyles2}
                  container={styles.containerBtn}
                  isLinearGradiantApplied={true}
                />
              </View>
              {/* </View> */}
            </View>
            {/* </View> */}
          </View>
        {/* </View> */}
      </ScrollView>
    </KeyboardAvoidingView>
  );

  // return (
  //   //   <LinearGradient
  //   //   start={startGradient}
  //   //   end={endGradient}
  //   //     locations={[0, 0.7,1]}
  //   //     useAngle={true} angle={120} angleCenter={{x:0.5,y:0.5}}
  //   //     colors={Platform.OS =='ios'? ['rgba(47, 47, 130,0.1 )',
  //   //     'rgba(42, 161, 219, 0.1)','rgba(255, 255, 255,0 )'
  //   //     ] :
  //   //     [colors.backgroundgrad2_Android,
  //   //       colors.backgroundgrad1_Android,
  //   //       colors.white]}
  //   //     // colors={Platform.OS =='ios'? ['rgba(42, 161, 219, .10)',
  //   //     //   'rgba(47, 47, 130,0.2 )',colors.white
  //   //     //   ] :
  //   //     //   [colors.backgroundgrad2_Android,
  //   //     //     colors.backgroundgrad1_Android,
  //   //     //     colors.white]}
  //   //     style={[commonStyle.safeAreaViewStyle,{}]}>
  //   // <View style={[{flex: 1}]}>
  //   <KeyboardAvoidingView
  //     style={{flex: 1}}
  //     behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
  //     enabled
  //     //   keyboardVerticalOffset={100}
  //   >
  //               <StatusBar translucent backgroundColor="transparent" />
  //     <ScrollView bounces={false} style={{flex: 1}}>
  //       <LinearGradient
  //         start={startGradient}
  //         end={endGradient}
  //         locations={Platform.OS == 'ios' ? [0.2, 0.7] : [0.5, 0.7]}
  //         useAngle={true}
  //         angle={260}
  //         angleCenter={{x: 0.4, y: 0.3}}
  //         colors={
  //           Platform.OS == 'ios'
  //             ? ['rgba(47, 47, 130,0.1 )', 'rgba(42, 161, 219, 0.1)']
  //             : ['rgba(47, 47, 130,0.1  )', 'rgba(42, 161, 219, 0.10)']
  //         }
  //         style={[{height: topSectionHeight}]}
  //       />
  //       <LinearGradient
  //         // start={startGradient}
  //         // end={endGradient}
  //         // locations={[0.2, 1]}
  //         useAngle={false}
  //         angle={180}
  //         angleCenter={{x: 0.5, y: 0.5}}
  //         colors={[
  //           'rgba(255, 255, 255, 0)',
  //           'rgba(255, 255, 255, 1)',
  //           'rgba(255, 255, 255, 0)',
  //         ]}
  //         // colors={['transparent', 'rgba(255, 255, 255, 0.1)']}
  //         // colors={
  //         //   Platform.OS == 'ios'
  //         //     ? [
  //         //         'rgba(47, 47, 130,0.1 )',
  //         //         'rgba(42, 161, 219, 0.1)',
  //         //         'rgba(255, 255, 255,0 )',
  //         //       ]
  //         //     : [
  //         //         colors.backgroundgrad2_Android,
  //         //         colors.backgroundgrad1_Android,
  //         //       ]
  //         // }
  //         style={{
  //           position: 'absolute',
  //           left: 0,
  //           right: 0,
  //           top: topSectionHeight - 20,
  //           bottom: 0,
  //           height: dimens.h5,
  //         }}
  //         // style={[{height: dimens.h5, opacity: 0.6}]}
  //       />
  //       {/* <View style={{height: topSectionHeight}} /> */}
  //       <View
  //         style={[
  //           commonStyle.appHorizontalPadding,
  //           commonStyle.appverticalePadding,
  //           {height: bottomSectionHeight},
  //         ]}>
  //         <Text style={styles.titleStyle}>CREATE A PASSWORD</Text>
  //         <Text style={styles.paraStyle} numberOfLines={4}>
  //           Use at least 8 characters with 1 number, and one special character.
  //         </Text>

  //         <View style={{flexDirection: 'column', marginTop: dimens.h2}}>
  //           <Text style={styles.emailTitle}>Password</Text>
  //           <TextinputComp
  //             style={styles.textInputstyle}
  //             mode={'flat'}
  //             onChangeText={text => dispatch(updatePassword(text))}
  //             value={selector.password}
  //             // error={selector.showPasswordErr}
  //             // errorMsg={selector.passwordErrMessage}

  //             isSecure={selector.isPasswordSecure}
  //             showRightIcon={true}
  //             rightIconObj={{
  //               name: selector.isPasswordSecure ? 'eye-off' : 'eye',
  //               color: colors.black,
  //             }}
  //             onRightIconPressed={() => dispatch(updateIsPassSecure())}
  //           />
  //         </View>
  //         <View style={{flexDirection: 'column', marginTop: dimens.h2}}>
  //           <Text style={styles.emailTitle}>Confirm password</Text>
  //           <TextinputComp
  //             style={styles.textInputstyle}
  //             mode={'flat'}
  //             onChangeText={text => dispatch(updateConfirmPassword(text))}
  //             value={selector.confirmPassword}
  //             // error={selector.showPasswordErr}
  //             // errorMsg={selector.passwordErrMessage}

  //             isSecure={selector.isCofirmPasswordSecure}
  //             showRightIcon={true}
  //             rightIconObj={{
  //               name: selector.isCofirmPasswordSecure ? 'eye-off' : 'eye',
  //               color: colors.black,
  //             }}
  //             onRightIconPressed={() => dispatch(updateIsConfirmPassSecure())}
  //           />
  //         </View>
  //         <View style={{marginVertical: dimens.h3}}>
  //           <RoundedButtom
  //             onPress={() => {
  //               //   props.navigation.navigate(
  //               //     commonStackIdentifier.create_password,
  //               //   );
  //             }}
  //             title={'Next'}
  //             titleStyle={styles.titleStylebtn}
  //             gradColors={[colors.signupLightBlue, colors.signupDarkBlue]}
  //             gradStyle={styles.gradStyles}
  //             container={styles.containerBtn}
  //             isLinearGradiantApplied={true}
  //           />
  //         </View>
  //       </View>
  //     </ScrollView>
  //   </KeyboardAvoidingView>
  //   // </View>

  //   // </LinearGradient>
  // );
};

export default CreatePasswordScreen;
