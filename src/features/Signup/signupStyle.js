import {StyleSheet, Platform} from 'react-native';
import {dimens, fontsizes} from '../../constants/dimens';

import {useTheme} from '@react-navigation/native';
import React from 'react';
import font from '../../constants/fonts';

const getStyles = props =>
  StyleSheet.create({
    titleStyle: {
      color: props.colors.black,
      fontSize: fontsizes.FONT_28Px_H3,
      textAlign: 'center',
      fontFamily: font.ProximaNovaExtraCondensed_Bold,
      textTransform: 'capitalize',
    },
    aStyle: {
      color: props.colors.black,
      fontSize: fontsizes.FONT_28Px_H3,
      textAlign: 'center',
      fontFamily: font.ProximaNovaExtraCondensed_Bold,
    },
    titleStyleApple: {
      color: props.colors.black,
      fontSize: fontsizes.FONT_18Px_,
      textAlign: 'center',
      fontFamily: font.Proximanova_Bold,
      marginStart: dimens.w3,
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
      width: dimens.w80,
      height: dimens.h5_7,
    },
    logoImageStyle: {
      width: dimens.w60_1,
      height: dimens.h28_5,
    },
    titleStylebtn: {
      color: props.colors.graditnBtnTextColor,
      fontSize: fontsizes.FONT_18Px_,
      fontFamily: font.Proximanova_Bold,
    },
    titleStylebtnBlack: {
      color: props.colors.black,
      fontSize: fontsizes.FONT_18Px_,
      fontFamily: font.Proximanova_Bold,
      textAlign: 'center',
    },
    containerBtnWhite: {
      // flex:1,
      backgroundColor: props.colors.white,
      width: dimens.w80,
      height: dimens.h5_7,
      borderRadius: dimens.h10,
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
    },
    gradStylesWhite: {
      borderRadius: dimens.h10,
      width: dimens.w79,
      height: dimens.h5_4,
      backgroundColor: props.colors.white,
    },
    appleSignupBtn: {
      flexDirection: 'row',
      width: dimens.w80,
      justifyContent: 'center',
      padding: dimens.w2,
      height: dimens.h6,
      alignItems: 'center',
      borderRadius: dimens.h10,
      borderWidth: 1,
      borderColor: props.colors.deepmagenta,
      marginVertical: dimens.h2,
    },
    appleIconStyle: {
      width: 26,
      height: 26,
      position: 'absolute',
      zIndex: 10,
      top: dimens.h1_2,
      left: dimens.w8,
    },
  });

function useStyles() {
  const {colors} = useTheme();
  // We only want to recompute the stylesheet on changes in color.
  const styles = React.useMemo(() => getStyles({colors}), [colors]);
  return styles;
}

export default useStyles;
