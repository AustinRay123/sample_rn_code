import {StyleSheet, Platform} from 'react-native';

import {useTheme} from '@react-navigation/native';
import React from 'react';
import {dimens, fontsizes} from '../../../constants/dimens';
import font from '../../../constants/fonts';

const getStyles = props =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: props.colors.white,
    },
    containerBtn: {
      flex: 1,
    },
    gradStyles: {
      borderRadius: dimens.h10,
      width: dimens.w87_3,
      height: dimens.h5_7,
    },

    titleStylebtn: {
      color: props.colors.graditnBtnTextColorReverse,
      fontSize: fontsizes.FONT_18Px_,
      fontFamily: font.Proximanova_Bold,
    },
    titleStylebtnBlack: {
      color: props.colors.black,
      fontSize: fontsizes.FONT_12PX,
      // fontWeight: 'bold',
    },
    containerBtnWhite: {
      // flex:1,
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
      width: dimens.w5,
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
      fontsizes: fontsizes.FONT_16Px_,
      includeFontPadding: false,
    },
    textInputContainer: {
      flexDirection: 'column',
      marginTop: dimens.h2,
      // paddingLeft: dimens.h0_5,
      // paddingRight: dimens.h2,
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
      fontSize: fontsizes.FONT_16PX,
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
    titleStyle: {
      color: props.colors.white,
      fontSize: fontsizes.FONT_18Px_,
      fontFamily: font.Proximanova_Bold,
      textAlign: 'center',
    },
    gradeStyle: {
      borderRadius: dimens.h10,
      width: dimens.w86_1,
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
    headerStyle: {
      fontSize: fontsizes.FONT_28Px_H3,
      fontFamily: font.ProximaNovaExtraCondensed_Bold,
      color: props.colors.black,
      textAlign: 'center',
      marginBottom: dimens.h3,
    },
  });

function useStyles() {
  const {colors} = useTheme();
  // We only want to recompute the stylesheet on changes in color.
  const styles = React.useMemo(() => getStyles({colors}), [colors]);
  return styles;
}

export default useStyles;
