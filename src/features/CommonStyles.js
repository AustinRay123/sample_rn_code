import {StyleSheet, Platform} from 'react-native';
import {useTheme} from '@react-navigation/native';
import React from 'react';
import {dimens, fontsizes} from '../constants/dimens';

const getStyles = props =>
  StyleSheet.create({
    appHorizontalMargin: {
      marginHorizontal: dimens.w6,
    },
    appverticaleMargin: {
      marginVertical: dimens.h2,
    },
    appHorizontalPadding: {
      paddingHorizontal: dimens.w6,
    },
    appverticalePadding: {
      paddingVertical: dimens.h2,
    },
    appHorizontalPadding_dashboard: {
      paddingHorizontal: dimens.w5,
    },
    safeAreaViewStyle: {
      flex: 1,
    },
    flexDirectionrow: {
      flexDirection: 'row',
    },
    flexDirectioncolumn: {
      flexDirection: 'column',
    },
    logoImageStyle: {
      width: dimens.w60_1,
      height: dimens.h28_5,
    },
    titleDesStyle: {fontSize: fontsizes.FONT_12PX, textAlign: 'center'},
    titleDesContainerStyle: {width: dimens.h36, alignItems: 'center'},
    titleContainer: {alignItems: 'center', top: dimens.h3},
  });

function useStyles() {
  const {colors} = useTheme();
  // We only want to recompute the stylesheet on changes in color.
  const styles = React.useMemo(() => getStyles({colors}), [colors]);
  return styles;
}

export default useStyles;
