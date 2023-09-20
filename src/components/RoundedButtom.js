import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {dimens} from '../constants/dimens';
import LinearGradient from 'react-native-linear-gradient';
import withPreventDoubleClick from '../Utility/withPreventDoubleClick';
const TouchableOpacity = withPreventDoubleClick();
const RoundedButtom = ({
  title,
  onPress,
  gradColors = [],
  container = {},
  gradStyle = {},
  titleStyle = {},
  isLinearGradiantApplied = false,
  disabled,
}) => {
  return (
    <>
      {isLinearGradiantApplied ? (
        <TouchableOpacity
          onPress={onPress}
          style={container}
          disabled={disabled}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={gradColors}
            style={[gradStyle, styles.gradient]}>
            <Text style={[titleStyle, {includeFontPadding: false}]}>
              {title}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      ) : (
        <LinearGradient
          colors={gradColors}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={container}>
          <TouchableOpacity
            onPress={onPress}
            disabled={disabled}
            style={[styles.gradient, gradStyle, {}]}>
            <Text style={[titleStyle, {includeFontPadding: false}]}>
              {title}
            </Text>
          </TouchableOpacity>
        </LinearGradient>
      )}
    </>
  );
};

export default RoundedButtom;

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
