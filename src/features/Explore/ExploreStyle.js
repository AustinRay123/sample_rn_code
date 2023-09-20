import {StyleSheet} from 'react-native';
import {dimens, fontsizes} from '../../constants/dimens';

import {useTheme} from '@react-navigation/native';
import React from 'react';
import font from '../../constants/fonts';

const getStyles = props =>
  StyleSheet.create({
    container: {
      flex: 1,
    },
    header: {
      backgroundColor: props.colors.backgroundWhite,
      height: 2,
      shadowColor: '#000',
      shadowOffset: {width: 1, height: 1},
      shadowOpacity: 0.4,
      shadowRadius: 3,
      elevation: 8,
    },
    headerText: {
      fontFamily: font.ProximaNovaExtraCondensed_Bold,
      fontSize: fontsizes.FONT_28Px_H3,
      color: props.colors.black,
    },
    mainView: {
      height: '100%',
      backgroundColor: props.colors.darkWhite, //textInputTextColor
      paddingTop: dimens.h1,
    },
    articleHeading: {
      fontFamily: font.ProximaNovaExtraCondensed_Bold,
      fontSize: fontsizes.FONT_24Px_H4,
      color: props.colors.black,
    },
    articleList: {
      flex: 1,
    },
    articleSaperator: {
      height: 1,
      backgroundColor: props.colors.separatorColor,
      marginHorizontal: 20,
    },
    articleCard: {
      backgroundColor: props.colors.white,
      flexDirection: 'row',
      padding: 20,
    },
    articleImage: {
      width: 70 || dimens.w20,
      height: 80 || dimens.h10,
      borderRadius: 10,
    },
    articleTitle: {
      fontFamily: font.ProximaNovaExtraCondensed_Bold,
      fontSize: fontsizes.FONT_20Px_H5,
      width: dimens.w65,
      color: props.colors.black,
      height: dimens.h6,
      marginTop: 5,
    },
    articleLine: {
      height: '80%',
      width: 1,
      backgroundColor: props.colors.separatorColor,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      marginHorizontal: 10,
    },
    articleSubTitle: {
      flexDirection: 'row',
    },
    articleAuthor: {
      fontFamily: font.Proximanovaexcn_Regular,
      fontSize: fontsizes.FONT_12PX,
      color: props.colors.textInputTextColor,
      fontWeight: '700',
    },
    articleType: {
      fontFamily: font.Proximanovaexcn_Regular,
      fontSize: fontsizes.FONT_12PX,
      color: props.colors.textInputTextColor,
      fontWeight: '700',
    },
    featuredArticleCard: {
      backgroundColor: 'red' || props.colors.white,
      flex: 1,
      overflow: 'hidden',
    },
    flatListContent: {
      paddingHorizontal: 16,
    },
    featuredArticleCardInside: {
      width: dimens.w100 - 32, // Adjust margin
      marginHorizontal: 8, // Margin between cards
      padding: 16, // Padding within each card
      backgroundColor: 'white',
      borderRadius: 8,
    },
  });

function useStyles() {
  const {colors} = useTheme();
  // We only want to recompute the stylesheet on changes in color.
  const styles = React.useMemo(() => getStyles({colors}), [colors]);
  return styles;
}

export default useStyles;
