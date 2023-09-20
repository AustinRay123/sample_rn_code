import {StyleSheet, Platform} from 'react-native';
import {dimens, fontsizes} from '../../constants/dimens';

import {useTheme} from '@react-navigation/native';
import React from 'react';
import font from '../../constants/fonts';

const getStyles = props =>
  StyleSheet.create({
    container: {
      flex: 1,
      marginTop: dimens.w3,
      backgroundColor: props.colors.white,
    },
    contentContainer: {
      flex: 1,
      //   marginHorizontal: dimens.w4,
      //   marginVertical: dimens.w12,
    },
    topContainer: {
      backgroundColor: props.colors.white,
      borderRadius: dimens.h1,
      padding: dimens.w3,
      paddingVertical: dimens.w5,
      flexDirection: 'row',
    },
    itemContainer: {
      flex: 1,
      padding: dimens.h1,
      alignItems: 'center',
    },
    itemText: {
      fontFamily: font.ProximaNovaExtraCondensed_Bold,
      fontSize: fontsizes.FONT_13Px_H6,
      color: props.colors.textInputTextColor,
      margin: dimens.w1,
    },
    titleText: {
      fontFamily: font.Proximanova_Bold,
      fontSize: fontsizes.FONT_18Px_,
      color: props.colors.bigTextColors,
      margin: dimens.w2,
    },
    priceText: {
      fontFamily: font.Proximanovaexcn_Regular,
      fontSize: 10,
      color: props.colors.textInputTextColor,
    },
    headingText: {
      fontFamily: font.ProximaNovaExtraCondensed_Bold,
      fontSize: fontsizes.FONT_28Px_H3,
      color: props.colors.bigTextColors,
    },
    headingText2: {
      fontFamily: font.ProximaNovaExtraCondensed_Bold,
      fontSize: fontsizes.FONT_28Px_H3,
      color: props.colors.bigTextColors,
    },
    titleStylebtnBlack: {
      color: props.colors.black,
      fontSize: fontsizes.FONT_18Px_,
      fontFamily: font.Proximanova_Bold,
      textAlign: 'center',
    },
    titleStylebtn: {
      color: props.colors.graditnBtnTextColor,
      fontSize: fontsizes.FONT_18Px_,
      fontFamily: font.Proximanova_Bold,
      marginVertical: dimens.w3,
      borderRadius: dimens.h10,
    },
    titleStylebtn2: {
      color: props.colors.black,
      fontSize: fontsizes.FONT_18Px_,
      fontFamily: font.Proximanova_Bold,
      // marginVertical:dimens.w3,
      borderRadius: dimens.h10,
    },
    gradStyles: {
      borderRadius: dimens.h10,
      width: dimens.w87_3,
      height: dimens.h5_7,
    },
    containerBtn: {
      flex: 1,
    },
    gradStylesWhite: {
      borderRadius: dimens.h10,
      width: dimens.w86_1,
      height: dimens.h5_4,
      backgroundColor: props.colors.white,
    },
    containerBtnWhite: {
      backgroundColor: props.colors.white,
      width: dimens.w87_3,
      height: dimens.h5_7,
      borderRadius: dimens.h10,
      alignContent: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: dimens.w3,
    },
  });

function useStyles() {
  const {colors} = useTheme();
  const styles = React.useMemo(() => getStyles({colors}), [colors]);
  return styles;
}

export default useStyles;
