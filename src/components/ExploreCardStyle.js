import {StyleSheet, Platform} from 'react-native';
import {dimens, fontsizes} from '../constants/dimens';

import {useTheme} from '@react-navigation/native';
import React from 'react';
import font from '../constants/fonts';

const getStyles = props =>
  StyleSheet.create({
    mainContainer: {
      paddingVertical: dimens.h1,
      paddingHorizontal: dimens.w3,
    },
    rowContainer: {
      //backgroundColor: '#2aa1db1a',
      backgroundColor: props.colors.white,
      padding: dimens.h1_8,
      borderRadius: dimens.h2,
      flexDirection: 'row',
      paddingVertical: dimens.h2,
      elevation: 5,
      shadowColor: props.colors.black,
      shadowOffset: {width: 2, height: 2},
      shadowOpacity: 0.3,
      // borderWidth: 1,
    },
    supplementText: {
      textTransform: 'uppercase',
      color: props.colors.textInputTextColor,
      fontFamily: font.Proximanovaexcn_Regular,
      fontWeight: 'bold',
      marginBottom: dimens.h0_5,
    },
    text2style: {
      color: props.colors.black,
      fontFamily: font.ProximaNovaExtraCondensed_Bold,
      fontSize: fontsizes.FONT_20Px_H5,
      marginBottom: dimens.h5,
    },
    descriptionText: {
      fontSize: fontsizes.FONT_12Px_H6,
      lineHeight: dimens.h2_3,
      color: props.colors.textInputTextColor,
      fontFamily: font.Proximanovaexcn_Regular,
      marginBottom: dimens.h2,
    },
    titleStyle: {
      color: props.colors.white,
      fontSize: fontsizes.FONT_13Px_H6,
      fontFamily: font.Proximanova_Bold,
      textAlign: 'center',
    },
    gradeStyle: {
      width: dimens.h13,
      height: dimens.h5,
    },
    buttonContainer: {
      width: dimens.h13,
      height: dimens.h5,
      borderRadius: dimens.h5,
    },
    imgContainer: {
      backgroundColor: 'white',
      borderRadius: 20,
      padding: dimens.h2_5,
      marginLeft: dimens.h1_8,
      overflow: 'hidden',
    },
    imgStyle: {
      width: dimens.w50,
      height: dimens.h15,
      //resizeMode: 'contain',
      alignSelf: 'center',
      // backgroundColor: props.colors.darkWhite,
      borderRadius: dimens.w5,
      // overflow: 'hidden',
      // marginTop: dimens.h4,
      // marginLeft: dimens.h1_8,
    },
  });

function useStyles() {
  const {colors} = useTheme();
  // We only want to recompute the stylesheet on changes in color.
  const styles = React.useMemo(() => getStyles({colors}), [colors]);
  return styles;
}

export default useStyles;
