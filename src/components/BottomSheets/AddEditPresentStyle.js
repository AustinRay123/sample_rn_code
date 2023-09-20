import {StyleSheet, Platform} from 'react-native';
import {dimens, fontsizes} from '../../constants/dimens';

import {useTheme} from '@react-navigation/native';
import React from 'react';
import font from '../../constants/fonts';

const getStyles = props =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginTop: dimens.h2,
    },
    contentContainer: {
      flex: 1,
      alignItems: 'center',
    },
    itemContainer: {
      flex: 1,
      padding: dimens.h1,
      alignItems: 'center',
    },
    itemText: {
      fontFamily: font.Proximanovacond_Medium,
      fontSize: fontsizes.FONT_18Px_,
      color: props.colors.smallTextColors,
      includeFontPadding: false,
    },
    titleText: {
      fontFamily: font.Proximanova_Bold,
      fontSize: fontsizes.FONT_18Px_,
      color: props.colors.bigTextColors,
      includeFontPadding: false,
      alignSelf: 'center',
      marginTop: dimens.h1,
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
    containerErrorBtn: {
      flex: 1,
      paddingVertical: 12,
    },
    titleStylebtn: {
      color: props.colors.graditnBtnTextColor,
      fontSize: fontsizes.FONT_18Px_,
      fontFamily: font.Proximanova_Bold,
    },
    containerBtn: {
      flex: 1,
    },
    textInputstyle: {
      backgroundColor: props.colors.textInputBackground,
      borderRadius: dimens.ho5,
      borderTopLeftRadius: dimens.ho5,
      borderTopRightRadius: dimens.ho5,
      fontFamily: font.Proximanovaexcn_Regular,
      fontSize: fontsizes.FONT_16Px_,
    },
    presentStyle: {
      color: props.colors.black,
      textAlign: 'center',
      fontFamily: font.ProximaNovaExtraCondensed_Bold,
      fontSize: fontsizes.FONT_28Px_H3,
      color: props.colors.bigTextColors,
    },
    titleText: {
      color: props.colors.black,
      marginTop: 50,
      fontSize: fontsizes.FONT_16Px_,
      fontFamily: font.Proximanova_Bold,
      color: props.colors.bigTextColors,
    },
    titleText1: {
      fontSize: fontsizes.FONT_14Px_H6,
      fontFamily: font.Proximanovacond_Medium,
      color: props.colors.smallTextColors,
      includeFontPadding: false,
      marginVertical: 8,
    },
    titleText2: {
      textAlign: 'right',
      color: '#989898',
      marginTop: 5,
      marginBottom: 21,
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
