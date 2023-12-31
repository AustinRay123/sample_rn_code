import {StyleSheet, Platform} from 'react-native';
import {dimens, fontsizes} from '../../constants/dimens';

import {useTheme} from '@react-navigation/native';
import React from 'react';
import font from '../../constants/fonts';

const getStyles = props =>
  StyleSheet.create({
    textInputstyle: {
      backgroundColor: props.colors.white,
      borderRadius: dimens.ho5,
      borderTopLeftRadius: dimens.ho5,
      borderTopRightRadius: dimens.ho5,
      fontFamily: font.Proximanovaexcn_Regular,
      fontSize: fontsizes.FONT_16Px_,
    },
    titleStylebtn: {
      color: props.colors.graditnBtnTextColorReverse,
      fontSize: fontsizes.FONT_18Px_,
      fontFamily: font.Proximanova_Bold,
    },
    titleStylebtnBlack: {
      color: props.colors.black,
      fontSize: fontsizes.FONT_12PX,
    },
    gradStyles: {
      borderRadius: dimens.h10,
      height: dimens.h5_7,
    },
    containerBtn: {
      flex: 1,
    },
    emailTitle: {
      color: props.colors.bigTextColors,
      fontSize: fontsizes.FONT_16Px_,
      textAlign: 'left',
      marginBottom: dimens.h1,
      marginTop: dimens.h1,
      fontFamily: font.Proximanovacond_Medium,
      includeFontPadding: false,
    },
    titleStyle: {
      color: props.colors.bigTextColors,
      fontSize: fontsizes.FONT_36Px_H1,
      textAlign: 'left',
      marginBottom: dimens.h1,
      fontFamily: font.ProximaNovaExtraCondensed_Bold,
    },
    logoImageStyle: {
      width: dimens.w60_1,
      height: dimens.h28_5,
      alignSelf: 'center',
      marginTop: dimens.h2,
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
