import {StyleSheet, Platform} from 'react-native';
import {dimens, fontsizes} from '../../constants/dimens';

import {useTheme} from '@react-navigation/native';
import React from 'react';
import font from '../../constants/fonts';

const getStyles = props =>
  StyleSheet.create({
    textInputContainer: {
      flexDirection: 'column',
      marginTop: dimens.h2,
      width: dimens.w90,
      // paddingLeft: dimens.h0_5,
      // paddingRight: dimens.h2,
    },
    emailTitle: {
      color: props.colors.bigTextColors,
      fontSize: fontsizes.FONT_16PX,
      textAlign: 'left',
      marginBottom: dimens.h1,
      fontFamily: font.Proximanovacond_Medium,
      includeFontPadding: false,
    },
    textInputstyle: {
      backgroundColor: props.colors.white,
      borderRadius: dimens.ho5,
      borderTopLeftRadius: dimens.ho5,
      borderTopRightRadius: dimens.ho5,
      fontFamily: font.Proximanovaexcn_Regular,
      fontSize: fontsizes.FONT_16Px_,
    },
    headerStyle: {
      fontSize: fontsizes.FONT_28Px_H3,
      fontFamily: font.ProximaNovaExtraCondensed_Bold,
      color: props.colors.black,
      textAlign: 'center',
      marginBottom: dimens.h3,
    },
    titleTextStyle: {
      color: props.colors.black,
      textAlign: 'center',
      fontFamily: font.ProximaNovaExtraCondensed_Bold,
      fontSize: fontsizes.FONT_28Px_H3,
      color: props.colors.bigTextColors,
      marginTop: dimens.h1,
    },
    titleStyle: {
      color: props.colors.white,
      fontSize: fontsizes.FONT_18Px_,
      fontFamily: font.Proximanovaexcn_Regular,
      fontWeight: '700',
      textAlign: 'center',
    },
    gradeStyle: {
      borderRadius: dimens.h10,
      width: dimens.w86,
      height: dimens.h5_4,
      // backgroundColor: '#fff',
    },
    rButtonContainer: {
      backgroundColor: props.colors.white,
      // width: dimens.w87_3,
      // height: dimens.h5_7,
      borderRadius: dimens.h10,
      // borderColor: 'lightBlue',
      // borderWidth: 1,
      top: dimens.h2,
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
