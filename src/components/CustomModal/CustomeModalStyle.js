import {StyleSheet, Platform} from 'react-native';
import {dimens, fontsizes} from '../../constants/dimens';

import {useTheme} from '@react-navigation/native';
import React from 'react';
import font from '../../constants/fonts';

const getStyles = props =>
  StyleSheet.create({
    modalContainer: {
      borderRadius: 20,
      // justifyContent: 'flex-end',
      margin: 0,
    },
    mainContainer: {
      borderTopRightRadius: 20,
      borderTopLeftRadius: 20,
      // borderRadius: 20,
      backgroundColor: props.colors.darkWhite,
      padding: 20,
      paddingVertical: 40,
      paddingTop: 10,
      height: dimens.h90,
    },
    titleStyle: {
      color: props.colors.black,
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
      width: dimens.w87_3,
      height: dimens.h5_7,
      borderRadius: dimens.h10,
      // borderColor: 'lightBlue',
      // borderWidth: 1,
      top: dimens.h2,
    },
    flatListContainer: {
      paddingVertical: 20,
      // width: dimens.h30,
      alignSelf: 'center',
      // borderWidth: 1,
    },
    textStyleHeight: {
      textAlign: 'center',
      marginBottom: dimens.h3,
      color: props.colors.black,
      fontFamily: font.Proximanova_Bold,
      fontSize: fontsizes.FONT_12PX,
      marginTop: 5,
    },
    closeButtonStyle: {
      alignSelf: 'flex-end',
      marginVertical: dimens.h1,
      marginHorizontal: dimens.w2,
      position: 'absolute',
      top: dimens.h0_5,
      right: dimens.wo1,
    },
  });

function useStyles() {
  const {colors} = useTheme();
  // We only want to recompute the stylesheet on changes in color.
  const styles = React.useMemo(() => getStyles({colors}), [colors]);
  return styles;
}

export default useStyles;
