import {StyleSheet, Platform} from 'react-native';
import {dimens, fontsizes} from '../../constants/dimens';

import {useTheme} from '@react-navigation/native';
import React from 'react';

const getStyles = props =>
  StyleSheet.create({
    titleStyle: {
      color: props.colors.white,
      fontSize: fontsizes.FONT_12PX,
    },
    container: {
      flex: 1,
      backgroundColor: props.colors.white,
      justifyContent: 'center',
      alignItems: 'center',
    },
    containerBtn: {
      flex: 1,

      margin: dimens.h2,
    },
    gradStyles: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    logoImageStyle: {
      width: dimens.w75,
      height: dimens.h75,
      resizeMode: 'contain',
    },
  });

function useStyles() {
  const {colors} = useTheme();
  // We only want to recompute the stylesheet on changes in color.
  const styles = React.useMemo(() => getStyles({colors}), [colors]);
  return styles;
}

export default useStyles;
