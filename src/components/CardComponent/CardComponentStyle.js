import {StyleSheet, Platform} from 'react-native';
import {dimens, fontsizes} from '../../constants/dimens';

import {useTheme} from '@react-navigation/native';
import React from 'react';
import font from '../../constants/fonts';

const getStyles = props =>
  StyleSheet.create({
    cardMainComponent: {
      flexDirection: 'row',
      alignItems: 'center',
      // // borderWidth: 1,
      backgroundColor: props.colors.white,
      marginVertical: 10,
      paddingHorizontal: dimens.w2,
      borderRadius: 10,
      height: dimens.h7_7,
    },
    gridMainComponent: {
      // flexDirection: 'row',
      alignItems: 'center',
      // borderWidth: 1,
      justifyContent: 'center',
      backgroundColor: props.colors.white,
      marginVertical: dimens.h1_5,
      marginHorizontal: dimens.h1,
      borderRadius: 10,
      height: dimens.h20,
      width: dimens.w40,
      // marginRight: 20,
      padding: 12,
    },
    checkIconStyle: {position: 'absolute', right: dimens.w4, top: dimens.h3},
    cardTitleStyle: {
      color: props.colors.smallTextColors,
      fontSize: fontsizes.FONT_18PX,
      fontFamily: font.Proximanova_Bold,
      width: dimens.w60_1,
    },
    gridStyle: {
      color: props.colors.smallTextColors,
      fontSize: fontsizes.FONT_18PX,
      fontFamily: font.Proximanova_Bold,
      width: dimens.w35,
      textAlign: 'center',
    },
    fastImageStyle: {
      width: dimens.w12,
      height: dimens.h10,
      marginRight: 10,
    },
    gridFastImageStyle: {
      width: dimens.w22,
      height: dimens.h12,
      marginRight: 10,
    },
    gridSubTextStyle: {
      textAlign: 'center',
      color: props.colors.smallTextColors,
      fontFamily: font.Proximanovaexcn_Regular,
      fontSize: fontsizes.FONT_12PX,
    },
  });

function useStyles() {
  const {colors} = useTheme();
  // We only want to recompute the stylesheet on changes in color.
  const styles = React.useMemo(() => getStyles({colors}), [colors]);
  return styles;
}

export default useStyles;
