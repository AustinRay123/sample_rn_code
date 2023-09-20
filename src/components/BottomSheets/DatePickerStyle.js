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
    titleText: {
      fontFamily: font.Proximanova_Bold,
      fontSize: fontsizes.FONT_18Px_,
      color: props.colors.bigTextColors,
      includeFontPadding: false,
      alignSelf: 'center',
      marginTop: dimens.h2,
    },
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
  });

function useStyles() {
  const {colors} = useTheme();
  // We only want to recompute the stylesheet on changes in color.
  const styles = React.useMemo(() => getStyles({colors}), [colors]);
  return styles;
}

export default useStyles;
