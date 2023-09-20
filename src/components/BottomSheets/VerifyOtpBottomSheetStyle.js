import {StyleSheet, Platform} from 'react-native';
import {dimens, fontsizes} from '../../constants/dimens';

import {useTheme} from '@react-navigation/native';
import React from 'react';
import font from '../../constants/fonts';

const getStyles = props =>
  StyleSheet.create({
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
  
      titleStylebtn: {
        color: props.colors.white,
        fontSize: fontsizes.FONT_18Px_,
        fontFamily: font.Proximanova_Bold,
      },
      presentStyle: {
        textAlign: 'center',
        fontFamily: font.ProximaNovaExtraCondensed_Bold,
        fontSize: fontsizes.FONT_28Px_H3,
        color: props.colors.bigTextColors,
      },
      titleText: {
        marginTop: 50,
        fontSize: fontsizes.FONT_16Px_,
        fontFamily: font.Proximanova_Bold,
      },
      titleText1: {
        fontSize: fontsizes.FONT_14Px_H6,
        fontFamily: font.Proximanovacond_Medium,
        color: props.colors.smallTextColors,
        includeFontPadding: false,
        marginVertical: 8,
        marginBottom: dimens.h5,
      },
      otp: {
        borderBottomWidth: 1,
        borderRadius: 5,
        borderWidth: 1,
        height: 53,
        width: 40,
        fontSize: 20,
        fontFamily: font.Proximanovaexcn_Regular,
        padding: 0,
        lineHeight: 18,
        paddingTop: 10,
        color: props.colors.white,
      },
  });

function useStyles() {
  const {colors} = useTheme();
  // We only want to recompute the stylesheet on changes in color.
  const styles = React.useMemo(() => getStyles({colors}), [colors]);
  return styles;
}

export default useStyles;
