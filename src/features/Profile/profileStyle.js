import {StyleSheet, Platform} from 'react-native';
import {dimens, fontsizes} from '../../constants/dimens';

import {useTheme} from '@react-navigation/native';
import React from 'react';
import font from '../../constants/fonts';
import colors from '../../constants/colors';

const getStyles = props =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
      backgroundColor: props.colors.darkWhite,
    },
    profileHeader: {
      alignItems: 'center',
      marginBottom: 20,
    },
    profileName: {
      fontSize: fontsizes.FONT_18PX,
      fontFamily: font.Proximanova_Bold,
      color: props.colors.indigo,
    },
    section: {
      backgroundColor: 'white',
      flexDirection: 'row',
      borderRadius: 6,
      padding: dimens.h2,
      marginBottom: dimens.h2,
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    sectionTitle: {
      fontSize: fontsizes.FONT_16PX,
      fontFamily: font.Proximanovacond_Medium,
      color: props.colors.black,
      includeFontPadding: false,
    },
    sectionContent: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    sectionContentTwo: {
      backgroundColor: colors.white,
      justifyContent: 'flex-end',
      fontFamily: font.Proximanovaexcn_Regular,
      height: dimens.h2,
    },
    sectionValue: {
      color: props.colors.textInputTextColor,
      fontFamily: font.Proximanovaexcn_Regular,
      textTransform: 'capitalize',
    },
    emailStyle: {
      color: props.colors.textInputTextColor,
      fontFamily: font.Proximanovaexcn_Regular,
    },
    infoItem: {
      marginTop: dimens.h1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    arrowImage: {
      width: dimens.h2,
      height: dimens.h2,
      resizeMode: 'contain',
    },
    textInputstyle: {
      backgroundColor: props.colors.textInputBackground,
      borderRadius: dimens.ho5,
      borderTopLeftRadius: dimens.ho5,
      borderTopRightRadius: dimens.ho5,
      fontFamily: font.Proximanovaexcn_Regular,
      fontSize: fontsizes.FONT_16Px_,
    },
    emailTitle: {
      color: props.colors.bigTextColors,
      fontSize: fontsizes.FONT_12PX,
      textAlign: 'left',
      marginBottom: dimens.h1,
      fontFamily: font.Proximanovacond_Medium,
      includeFontPadding: false,
    },
    loaderContainer: {
      flex: 1,
      width: '21%',
      height: '10%',
      position: 'absolute',
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      opacity: 0.5,
      top: 110,
      borderRadius: 40,
    },
    titleStylebtn: {
      color: props.colors.graditnBtnTextColor,
      fontSize: fontsizes.FONT_18Px_,
      fontFamily: font.Proximanova_Bold,
    },
    gradStyles: {
      borderRadius: dimens.h10,
      height: dimens.h5_7,
    },
    containerBtn: {
      flex: 1,
    },
    gradErrorStyles: {
      borderRadius: dimens.h10,
      width: dimens.w40,
      height: dimens.h5_7,
      justifyContent: 'center',
    },
    customModalStyle: {
      padding: 30,
    },
  });

function useStyles() {
  const {colors} = useTheme();
  // We only want to recompute the stylesheet on changes in color.
  const styles = React.useMemo(() => getStyles({colors}), [colors]);
  return styles;
}

export default useStyles;
