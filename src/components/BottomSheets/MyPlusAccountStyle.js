import {StyleSheet, Platform} from 'react-native';
import {dimens, fontsizes} from '../../constants/dimens';

import {useTheme} from '@react-navigation/native';
import React from 'react';
import font from '../../constants/fonts';

const getStyles = props =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    contentContainer: {
      //   flex: 1,
      //   marginHorizontal: dimens.w4,
      //   marginVertical: dimens.w12,
    },
    topContainer: {
      backgroundColor: 'white',
      borderRadius: dimens.h1,
      padding: dimens.w3,
      alignItems: 'center',
      marginHorizontal: dimens.w4,
      elevation: dimens.w1,
      //shadow for ios
      ...Platform.select({
        ios: {
          shadowColor: props.colors.shadowColor,
          shadowOffset: {width: 0, height: 1},
          shadowOpacity: 0.5,
          shadowRadius: 2,
        },
      }),
    },
    itemContainer: {
      flex: 1,
      padding: dimens.h1,
      alignItems: 'center',
    },
    headerText: {
      fontFamily: font.ProximaNovaExtraCondensed_Bold,
      fontSize: fontsizes.FONT_36Px_H1,
      color: props.colors.bigTextColors,
    },
    itemText: {
      fontFamily: font.Proximanovaexcn_Regular,
      fontSize: fontsizes.FONT_12Px_H6,
      color: props.colors.textInputTextColor,
      // marginVertical: dimens.w1,
    },
    itemText2: {
      fontFamily: font.Proximanovacond_Medium,
      fontSize: fontsizes.FONT_14Px_H6,
      color: props.colors.textInputTextColor,
    },
    titleText: {
      fontFamily: font.Proximanova_Bold,
      fontSize: fontsizes.FONT_18Px_,
      color: props.colors.bigTextColors,
    },
    priceText: {
      fontFamily: font.ProximaNovaExtraCondensed_Bold,
      color: props.colors.deepcyan,
    },
    headingText: {
      fontFamily: font.Proximanova_Bold,
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
    gradColorText: {
      fontSize: fontsizes.FONT_24Px_H4,
      fontFamily: font.ProximaNovaExtraCondensed_Bold,
      includeFontPadding: false,
      color: props.colors.bigTextColors,
    },
    welcomeText: {
      color: props.colors.bigTextColors,
      fontSize: fontsizes.FONT_24Px_H4,
      textAlign: 'left',
      fontFamily: font.ProximaNovaExtraCondensed_Bold,
      includeFontPadding: false,
    },
  });

function useStyles() {
  const {colors} = useTheme();
  const styles = React.useMemo(() => getStyles({colors}), [colors]);
  return styles;
}

export default useStyles;
