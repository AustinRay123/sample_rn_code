import {StyleSheet, Platform} from 'react-native';
import {dimens, fontsizes} from '../../constants/dimens';

import {useTheme} from '@react-navigation/native';
import React from 'react';
import font from '../../constants/fonts';

const getStyles = props =>
  StyleSheet.create({
    mainView: {
      flex: 1,
      backgroundColor: props.colors.white,
    },
    titleStyle: {
      color: props.colors.bigTextColors,
      fontSize: fontsizes.FONT_32Px_H2,
      textAlign: 'left',
      fontFamily: font.ProximaNovaExtraCondensed_Bold,
      textAlign: 'center',
      marginTop: dimens.h4,
      textTransform: 'capitalize',
    },
    paraStyle: {
      color: props.colors.smallTextColors,
      fontSize: fontsizes.FONT_16PX,
      textAlign: 'left',
      fontFamily: font.Proximanovaexcn_Regular,
      includeFontPadding: false,
      color: props.colors.smallTextColors,
      fontSize: fontsizes.FONT_16PX,
      textAlign: 'left',
      fontFamily: font.Proximanovaexcn_Regular,
      includeFontPadding: false,
    },

    siginWithText: {
      color: props.colors.bigTextColors,
      fontSize: fontsizes.FONT_16Px_,
      textAlign: 'center',
      fontFamily: font.Proximanovacond_Medium,
      includeFontPadding: false,
    },
    container: {
      flex: 1,
      backgroundColor: props.colors.white,
    },
    containerBtn: {
      flex: 1,
    },
    gradStyles: {
      borderRadius: dimens.h10,
      width: dimens.w75,
      height: dimens.h5_7,
    },
    logoImageStyle: {
      width: dimens.w60_1,
      height: dimens.h28_5,
      alignSelf: 'center',
      marginTop: dimens.h2,
    },
    titleStylebtn: {
      color: props.colors.graditnBtnTextColor,
      fontSize: fontsizes.FONT_18Px_,
      fontFamily: font.Proximanova_Bold,
    },
    titleStylebtnBlack: {
      color: props.colors.black,
      fontSize: fontsizes.FONT_12PX,
    },
    containerBtnWhite: {
      backgroundColor: props.colors.white,
      width: dimens.w87_3,
      height: dimens.h5_7,
      borderRadius: dimens.h10,
      borderColor: props.colors.gradintLightBlue,
      borderWidth: 1,
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
      width: dimens.w7,
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
      fontsizes: fontsizes.FONT_14Px_H6,
      includeFontPadding: false,
    },
    separaterText: {
      textAlign: 'center',
      fontSize: fontsizes.FONT_14Px_H6,
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
      backgroundColor: props.colors.white,
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
      fontSize: fontsizes.FONT_12Px_H6,
      color: props.colors.smallTextColors,
      includeFontPadding: false,
      textAlign: 'center',
      marginTop: -dimens.h1,
      textAlign: 'center',
    },
    notRegister2: {
      fontFamily: font.Proximanovaexcn_Regular,
      fontSize: fontsizes.FONT_12Px_H6,
      color: props.colors.donthaveSmallTextColors,
      includeFontPadding: false,
      textAlign: 'center',
      marginTop: -dimens.h1,
      textAlign: 'center',
    },
    notAccount: {
      fontFamily: font.Proximanovaexcn_Regular,
      fontSize: fontsizes.FONT_12Px_H6,
      color: props.colors.donthaveSmallTextColors,
      includeFontPadding: false,
      marginTop: dimens.h3,
      textAlign: 'center',
    },
    registerNow: {
      fontFamily: font.Proximanovacond_Medium,
      fontSize: fontsizes.FONT_16Px_,
      color: props.colors.bigTextColors,
      includeFontPadding: false,
      textAlign: 'center',
      marginTop: dimens.h1,
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
      color: props.colors.deepmagenta,
      includeFontPadding: false,
    },
    gradErrorStyles: {
      borderRadius: dimens.h10,
      width: dimens.w40,
      height: dimens.h5_7,
      justifyContent: 'center',
    },
    containerErrorBtn: {
      flex: 1,
      paddingVertical: 12,
    },
  });

function useStyles() {
  const {colors} = useTheme();
  // We only want to recompute the stylesheet on changes in color.
  const styles = React.useMemo(() => getStyles({colors}), [colors]);
  return styles;
}

export default useStyles;
