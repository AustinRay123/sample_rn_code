import {StyleSheet, Platform} from 'react-native';
import {dimens, fontsizes} from '../../constants/dimens';

import {useTheme} from '@react-navigation/native';
import React from 'react';
import font from '../../constants/fonts';

const getStyles = props =>
  StyleSheet.create({
    modalContainer: {
      borderRadius: 20,
      backgroundColor: props.colors.white,
      // justifyContent: 'flex-end',
      margin: 0,
    },
    mainContainer: {
      // borderRadius: 20,
      backgroundColor: props.colors.darkWhite,
      padding: 20,
      paddingVertical: 40,
      // paddingTop: 10,
      height: dimens.h100,
    },
    closeButtonStyle: {
      alignItems: 'flex-end',
      // marginRight: 5,
      position: 'absolute',
      top: Platform.OS === 'ios' ? dimens.h7 : dimens.h4_5,
      right: dimens.h2_5,
    },
    headerStyle: {
      fontSize: fontsizes.FONT_28Px_H3,
      fontFamily: font.ProximaNovaExtraCondensed_Bold,
      color: props.colors.black,
      textAlign: 'center',
      marginTop: Platform.OS === 'ios' ? dimens.h2 : 0,
      marginBottom: dimens.h3,
    },
    section: {
      backgroundColor: props.colors.white,
      flexDirection: 'row',
      borderRadius: 6,
      padding: dimens.h2,
      // marginBottom: dimens.h2,
      justifyContent: 'space-between',
      //alignItems: 'center',
      marginTop: dimens.h2,
    },
    sectionTitle: {
      fontSize: fontsizes.FONT_14PX,
      fontFamily: font.Proximanovacond_Medium,
      color: props.colors.black,
      includeFontPadding: false,
    },
    sectionValue: {
      color: props.colors.textInputTextColor,
      fontFamily: font.Proximanovacond_Medium,
      includeFontPadding: false,
      textTransform: 'capitalize',
    },
    sectionContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginHorizontal: dimens.w2,
    },
    arrowImage: {
      width: dimens.h1_5,
      height: dimens.h1_5,
      resizeMode: 'contain',
      tintColor: props.colors.black,
      left: dimens.h0_5,
    },
    startImageContainer: {
      flexDirection: 'row',
      //width: dimens.h27,
      //justifyContent: 'space-between',
      //alignItems: 'center',
    },
    starImage: {
      width: dimens.h3_5,
      height: dimens.h3_5,
      resizeMode: 'contain',
      tintColor: props.colors.starColor,
      //marginRight: Platform.OS === 'ios' ? 0 : 10,
    },
    rateTextStyle: {fontSize: 12, color: props.colors.textInputTextColor},
    logoImage: {
      width: dimens.h3_5,
      height: dimens.h3_5,
      resizeMode: 'contain',
      // marginRight: 10,
    },
    shareImage: {
      width: dimens.h3_5,
      height: dimens.h3_5,
      resizeMode: 'contain',
      //marginRight: 10,
    },
    preferenceIcon: {
      //width: dimens.h8,
      paddingRight: dimens.w3,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loaderContainer: {
      flex: 1,
      width: '100%',
      height: '100%',
      backgroundColor: 'white',
      position: 'absolute',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: 0.5,
    },
    customModalStyle: {
      // borderTopRightRadius: 20,
      // borderTopLeftRadius: 20,
      // backgroundColor: props.colors.darkWhite,
      padding: 20,
      // height: dimens.h38,
      // width: dimens.w100,
      // position: 'absolute',
      // bottom: 0,
    },
  });

function useStyles() {
  const {colors} = useTheme();
  const styles = React.useMemo(() => getStyles({colors}), [colors]);
  return styles;
}

export default useStyles;
