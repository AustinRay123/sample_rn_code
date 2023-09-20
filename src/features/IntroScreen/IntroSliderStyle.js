import {StyleSheet, Platform} from 'react-native';
import {dimens, fontsizes} from '../../constants/dimens';

import {useTheme} from '@react-navigation/native';
import React from 'react';
import font from '../../constants/fonts';

const getStyles = props =>
  StyleSheet.create({
    mainView: {
      height: dimens.h43,
      width: dimens.w100,
      marginTop: dimens.h5,
    },
    img: {
      height: '100%',
      width: '100%',
      resizeMode: 'contain',
      justifyContent: 'center',
      alignSelf: 'center',
    },
    headlineText: {
      fontSize: fontsizes.FONT_32Px_H2,
      fontFamily: font.ProximaNovaExtraCondensed_Bold,
      fontWeight: '700',
      color: props.colors.introText,
      paddingHorizontal: dimens.w8,
      marginTop: dimens.h4,
    },
    textView: {
      marginHorizontal: 10,
      marginTop: Platform.OS == 'android' ? 60 : 10,
    },
    text: {
      marginTop: dimens.h2_5,
      fontSize: fontsizes.FONT_18Px_,
      fontFamily: font.Proximanovaexcn_Regular,
      fontWeight: '400',
      paddingHorizontal: dimens.w8,
      color: props.colors.introTextColor,
      includeFontPadding: false,
    },
    titleStyle: {
      color: props.colors.bigTextColors,
      fontSize: fontsizes.FONT_36Px_H1,
      textAlign: 'center',
      fontFamily: font.ProximaNovaExtraCondensed_Bold,
    },
    paraStyle: {
      color: props.colors.smallTextColors,
      fontSize: fontsizes.FONT_16PX,
      textAlign: 'left',
      fontFamily: font.Proximanovaexcn_Regular,
      includeFontPadding: false,
    },

    siginWithText: {
      color: props.colors.bigTextColors,
      fontSize: fontsizes.FONT_15PX,
      textAlign: 'left',
      fontFamily: font.Proximanovacond_Medium,
      includeFontPadding: false,
    },
    container: {
      flex: 1,
      backgroundColor: props.colors.white,
    },
    dotStyle: {
      backgroundColor: 'grey',
      width: 10,
      height: 10,
      borderRadius: 5,
      marginHorizontal: dimens.w1,
      backgroundColor: props.colors.inActiveDot,
    },
    activeDotStyle: {
      width: 10,
      height: 10,
      borderRadius: 5,
      marginHorizontal: dimens.w1,
      backgroundColor: props.colors.bigTextColors,
    },
    paginationView: {
      marginBottom: dimens.h4,
      justifyContent: 'center',
      alignSelf: 'center',
      alignItems: 'center',
    },
    dotContainer: {
      flexDirection: 'row',
    },
    containerBtn: {
      flex: 1,
    },
    gradStyles: {
      borderRadius: dimens.h10,
      width: dimens.w87_3,
      height: dimens.h5_7,
    },
    logoImageStyle: {
      width: dimens.w60_1,
      height: dimens.h28_5,
      resizeMode: 'contain',
    },
    titleStylebtn: {
      color: props.colors.graditnBtnTextColor,
      fontSize: fontsizes.FONT_18Px_,
      fontFamily: font.Proximanova_Bold,
    },
    titleStylebtnBlack: {
      // color: props.colors.black,
      color: props.colors.smallTextColors,
      // fontSize: fontsizes.FONT_12PX,
      fontSize: fontsizes.FONT_18Px_,
      textAlign: 'center',
      fontWeight: '700',
      fontFamily: font.Proximanovaexcn_Regular,
      justifyContent: 'center',
    },
    appleSignupBtn: {
      flexDirection: 'row',
      width: dimens.w100,
      justifyContent: 'center',
      height: dimens.h3,
      alignItems: 'center',
      marginTop: dimens.h2,
    },
    imgStyle: {
      width: dimens.w5,
      height: dimens.h5,
      resizeMode: 'contain',
    },
    roundBackgroundStyle: {
      width: dimens.w15,
      height: dimens.w15,
      borderRadius: 40,
      backgroundColor: props.colors.white,
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
    },
    roundTextstyle: {
      textAlign: 'center',
      marginTop: dimens.h1,
      color: props.colors.smallTextColors,
      fontFamily: font.Proximanovaexcn_Regular,
      fontsizes: fontsizes.FONT_16Px_,
      includeFontPadding: false,
    },
    separaterText: {
      textAlign: 'center',
      fontSize: fontsizes.FONT_12PX,
      color: props.colors.neutral,
      marginHorizontal: dimens.w2,
      marginHorizontal: dimens.w6,
    },
    separator: {
      height: dimens.ho1,
      flex: 1,
      backgroundColor: props.colors.separatorColor,
    },
    textInputstyle: {
      backgroundColor: props.colors.textInputBackground,
      borderRadius: dimens.ho5,
      borderTopLeftRadius: dimens.ho5,
      borderTopRightRadius: dimens.ho5,
      fontFamily: font.Proximanovaexcn_Regular,
      fontSize: fontsizes.FONT_16Px_,
    },
    emailTitle: {
      color: props.colors.bigTextColors,
      fontSize: fontsizes.FONT_16Px_,
      textAlign: 'left',
      marginBottom: dimens.h1,
      fontFamily: font.Proximanovacond_Medium,
      includeFontPadding: false,
    },
    verticalGradient: {
      flex: dimens.h5,
    },
    horizontalGradient: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: dimens.h15,
      bottom: 0,
      height: dimens.h15,
    },
    notRegister: {
      fontFamily: font.Proximanovaexcn_Regular,
      fontSize: fontsizes.FONT_16Px_,
      color: props.colors.smallTextColors,
      includeFontPadding: false,
    },
    registerNow: {
      fontFamily: font.Proximanovacond_Medium,
      fontSize: fontsizes.FONT_16Px_,
      color: props.colors.deepmagenta,
      includeFontPadding: false,
    },
    rememberMe: {
      fontFamily: font.Proximanovaexcn_Regular,
      fontSize: fontsizes.FONT_16Px_,
      color: props.colors.bigTextColors,
      includeFontPadding: false,
    },
    forgotPass: {
      fontFamily: font.Proximanovacond_Medium,
      fontSize: fontsizes.FONT_16Px_,
      color: props.colors.indigo,
      includeFontPadding: false,
    },
    nextBtn: {
      alignSelf: 'center',
      height: dimens.h6,
      width: dimens.w35,
      borderRadius: 64,
      borderWidth: 1,
      justifyContent: 'center',
      borderColor: props.colors.smallTextColors,
    },
    nextText: {
      fontSize: fontsizes.FONT_18Px_,
      textAlign: 'center',
      fontWeight: '700',
      fontFamily: font.Proximanovaexcn_Regular,
      color: props.colors.smallTextColors,
    },
    renderPageView: {
      alignItems: 'center',
      marginBottom: dimens.h5,
    },
    gradStylesWhite: {
      borderRadius: dimens.h10,
      width: dimens.w36,
      backgroundColor: props.colors.white,
      justifyContent: 'center',
    },
    containerBtnWhite: {
      backgroundColor: props.colors.white,
      width: dimens.w35_5,
      height: dimens.h5_3,
      borderRadius: dimens.h10,
      borderColor: 'transparent',
      borderWidth: 1,
      alignSelf: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });

function useStyles() {
  const {colors} = useTheme();
  // We only want to recompute the stylesheet on changes in color.
  const styles = React.useMemo(() => getStyles({colors}), [colors]);
  return styles;
}

export default useStyles;
