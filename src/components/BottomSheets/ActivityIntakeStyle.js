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
    // titleText: {
    //   fontFamily: font.Proximanova_Bold,
    //   fontSize: fontsizes.FONT_18Px_,
    //   color: props.colors.bigTextColors,
    //   includeFontPadding: false,
    //   alignSelf: 'center',
    //   marginTop: dimens.h1,
    // },
    gradStyles: {
      borderRadius: dimens.h10,
      width: dimens.w87_3,
      height: dimens.h5_7,
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
      color: props.colors.indigo,
    },
    dobTitle: {
      fontFamily: font.Proximanova_Bold,
      fontSize: fontsizes.FONT_16Px_,
      color: props.colors.black,
      marginBottom: dimens.h1,
    },
    presentStyle: {
      textAlign: 'center',
      fontFamily: font.ProximaNovaExtraCondensed_Bold,
      fontSize: fontsizes.FONT_28Px_H3,
      fontWeight: '700',
      color: props.colors.bigTextColors,
    },
    titleText: {
      marginTop: 20,
      fontSize: fontsizes.FONT_16Px_,
      fontFamily: font.Proximanova_Bold,
      fontWeight: '400',
      marginBottom: 10,
      color: props.colors.black,
    },
    titleText2: {
      marginTop: 20,
      fontSize: fontsizes.FONT_16Px_,
      fontFamily: font.Proximanova_Bold,
      fontWeight: '400',
      marginBottom: 10,
      color: props.colors.black,
    },
    whitrbgView: {
      height: dimens.h12,
      backgroundColor: props.colors.white,
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: dimens.w4,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {width: 1, height: 1},
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 8,
      borderRadius: dimens.h1,
      marginTop: dimens.h3,
      paddingHorizontal: dimens.w5,
    },
    targetFirst: {
      fontFamily: font.ProximaNovaExtraCondensed_Bold,
      fontSize: fontsizes.FONT_28Px_H3,
      color: props.colors.bigTextColors,
    },
    targetFirst2: {
      fontFamily: font.Proximanovaexcn_Regular,
      fontSize: fontsizes.FONT_16Px_,
      color: props.colors.bigTextColors,
    },
    customTextInputText: {
      fontFamily: font.Proximanovaexcn_Regular,
      fontSize: fontsizes.FONT_16Px_,
      color: props.colors.black,
      // textAlign: 'center',
      marginStart: dimens.w4_5,
    },
  });

function useStyles() {
  const {colors} = useTheme();
  // We only want to recompute the stylesheet on changes in color.
  const styles = React.useMemo(() => getStyles({colors}), [colors]);
  return styles;
}

export default useStyles;
