import {StyleSheet, Platform} from 'react-native';
import {dimens, fontsizes} from '../../constants/dimens';

import {useTheme} from '@react-navigation/native';
import React from 'react';
import font from '../../constants/fonts';

const getStyles = props =>
  StyleSheet.create({
    MainView: {
      borderRadius: 20,
      backgroundColor: props.colors.backgroundWhite,
      padding: 20,
      paddingVertical: 40,
      paddingTop: 10,
      height: dimens.h100,
    },
    gradStyles: {
      borderRadius: dimens.h10,
      width: dimens.w87_3,
      height: dimens.h5_7,
    },
    gradErrorStyles: {
      borderRadius: dimens.h10,
      width: dimens.w40,
      height: dimens.h5_7,
      justifyContent: 'center',
    },
    // containerErrorBtn: {
    //   flex: 1,
    //   paddingVertical: 12,
    // },
    titleStylebtn: {
      color: props.colors.graditnBtnTextColor,
      fontSize: fontsizes.FONT_18Px_,
      fontFamily: font.Proximanova_Bold,
    },
    // containerBtn: {
    //   flex: 1,
    // },
    textInputstyle: {
      marginTop: dimens.h1,
      backgroundColor: props.colors.textInputBackground,
      borderRadius: dimens.ho5,
      borderTopLeftRadius: dimens.ho5,
      borderTopRightRadius: dimens.ho5,
      fontFamily: font.Proximanovaexcn_Regular,
      fontSize: fontsizes.FONT_16Px_,
    },
    customTextInputText: {
      fontFamily: font.Proximanovaexcn_Regular,
      fontSize: fontsizes.FONT_16Px_,
      color: props.colors.bigTextColors,
      textAlign: 'center',
      marginStart: dimens.w4_5,
    },
    titleTextStyle: {
      color: props.colors.black,
      textAlign: 'center',
      fontFamily: font.ProximaNovaExtraCondensed_Bold,
      fontSize: fontsizes.FONT_28Px_H3,
      color: props.colors.bigTextColors,
    },
    fastDetailStyle: {
      color: props.colors.black,
      fontFamily: font.ProximaNovaExtraCondensed_Bold,
      fontSize: fontsizes.FONT_24Px_H4,
      color: props.colors.bigTextColors,
      marginTop: dimens.h3_5,
    },
    hourMinuteStyle: {
      marginTop: dimens.h1_5,
      marginBottom: dimens.ho5,
      fontSize: fontsizes.FONT_14Px_H6,
      fontFamily: font.Proximanovaexcn_Regular,
      color: props.colors.hmText,
    },
    fastStyle: {
      color: props.colors.black,
      marginTop: dimens.h2_5,
      fontSize: fontsizes.FONT_16Px_,
      fontFamily: font.Proximanovaexcn_Regular,
      color: props.colors.bigTextColors,
    },
    gradStylesWhite: {
      borderRadius: dimens.h10,
      width: dimens.w86_1,
      height: dimens.h5_4,
      backgroundColor: props.colors.white,
    },
    containerBtnWhite: {
      // flex:1,
      backgroundColor: props.colors.white,
      width: dimens.w87_3,
      height: dimens.h5_7,
      borderRadius: dimens.h10,
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      // borderColor: props.colors.gradintLightBlue,
      // borderWidth: 1,
    },
    titleStylebtnBlack: {
      color: props.colors.black,
      fontSize: fontsizes.FONT_18Px_,
      fontFamily: font.Proximanova_Bold,
      textAlign: 'center',
    },
    seeLogStyle: {
      // textDecorationLine: 'underline',
      // color: props.colors.black,
      fontSize: fontsizes.FONT_12Px_H6,
      fontFamily: font.Proximanovaexcn_Regular,
      color: props.colors.textInputTextColor,
    },
    gradStylesWhite: {
      borderRadius: dimens.h10,
      width: dimens.w86_1,
      height: dimens.h5_4,
      backgroundColor: props.colors.white,
    },
    containerBtnWhite: {
      // flex:1,
      backgroundColor: props.colors.white,
      width: dimens.w87_3,
      height: dimens.h5_7,
      borderRadius: dimens.h10,
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      // borderColor: props.colors.gradintLightBlue,
      // borderWidth: 1,
    },
    titleStylebtnBlack: {
      color: props.colors.black,
      fontSize: fontsizes.FONT_18Px_,
      fontFamily: font.Proximanova_Bold,
      textAlign: 'center',
    },
  });

function useStyles() {
  const {colors} = useTheme();
  // We only want to recompute the stylesheet on changes in color.
  const styles = React.useMemo(() => getStyles({colors}), [colors]);
  return styles;
}

export default useStyles;
