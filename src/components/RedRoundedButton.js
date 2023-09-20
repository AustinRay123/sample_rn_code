import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import {dimens, fontsizes} from '../constants/dimens';
import font from '../constants/fonts';
import {useTheme} from '@react-navigation/native';

const RedRoundedButton = ({
  title,
  onPress,
  container = {},
  titleStyle = {},
}) => {
  const {colors} = useTheme();
  return (
    <>
      <TouchableOpacity
        onPress={onPress}
        style={[
          {
            width: dimens.w80,
            height: dimens.h6,
            backgroundColor: colors.deepmagenta,
            borderRadius: dimens.h5,
            alignItems: 'center',
            justifyContent: 'center',
          },
          container,
        ]}>
        <Text
          style={[
            titleStyle,
            {
              includeFontPadding: false,
              color: colors.white,
              fontSize: fontsizes.FONT_18Px_,
              textAlign: 'center',
              fontFamily: font.Proximanova_Bold,
            },
          ]}>
          {title}
        </Text>
      </TouchableOpacity>
    </>
  );
};

export default RedRoundedButton;

const styles = StyleSheet.create({
  button: {
    marginVertical: 10,
  },
  gradient: {
    // borderRadius: 10,
    // padding: 10,
    alignItems: 'center',
    justifyContent: 'center',

    // Set a specific height for the button
  },
});
