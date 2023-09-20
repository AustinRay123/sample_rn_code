import React from 'react';
import {View, Image} from 'react-native';
import {TextInput, HelperText} from 'react-native-paper';

import PropTypes from 'prop-types';
import {useTheme} from '@react-navigation/native';
import image from '../constants/image';
import Icon from 'react-native-vector-icons/Ionicons';
const TextinputComp = ({
  value,
  mode = 'flat',
  label,
  disabled,
  placeholder,
  error,
  errorMsg = '',
  multiline,
  numberOfLines,
  editable,
  keyboardType = 'default',
  isSecure = false,
  showRightIcon = false,
  maxLength = null,
  rightIconObj = {},
  onChangeText,
  onRightIconPressed,
  style = {},
  onPressIn,
  showLeftAffixText = false,
  leftAffixText = '',
  autoCapitalize = 'none',
  onEndEditing,
  onPressOut,
  placeholderTextColor = false,
  onBlur,
  isCustomIcon = false,
  customIconObj = {},
}) => {
  const {colors} = useTheme();
  let rightIconComp = null;
  if (showRightIcon) {
    if (isCustomIcon) {
      if (customIconObj) {
        rightIconComp = (
          <TextInput.Icon
            color={'red'}
            onPress={onRightIconPressed}
            disabled={disabled}
            icon={() => (
              <Icon
                name={customIconObj.name}
                color={customIconObj.color}
                size={customIconObj.size}
              />
            )}
          />
        );
      }
    } else {
      if (rightIconObj) {
        rightIconComp = (
          <TextInput.Icon
            icon={rightIconObj.name}
            color={rightIconObj.color}
            onPress={onRightIconPressed}
            disabled={disabled}
          />
        );
      } else {
        rightIconComp = (
          <TextInput.Icon
            icon={'eye-off-outline'}
            // name="eye-off-outline"
            color={colors.black}
            onPress={onRightIconPressed}
          />
        );
      }
    }
  }
  let leftText = null;
  if (showLeftAffixText) {
    leftText = <TextInput.Affix text={leftAffixText + ' '} />;
  }

  return (
    <View style={{width: '100%'}}>
      <TextInput
        style={[
          {
            height: 50,
            width: '100%',
            fontSize: 16,
            fontWeight: '400',
            textAlign: 'auto',
            // backgroundColor: colors.white,
            // borderTopLeftRadius:10,
            // borderTopRightRadius:10
          },
          style,
        ]}
        mode={mode}
        label={label}
        value={value}
        textColor={colors.bigTextColors}
        disabled={disabled}
        placeholder={placeholder}
        placeholderTextColor={colors.textInputTextColor}
        // placeholderTextColor={ commented as no need to show blue color text
        //   placeholderTextColor
        //     ? colors.signupDarkBlue
        //     : colors.textInputTextColor
        // }
        // signupDarkBlue
        error={error}
        keyboardType={keyboardType}
        // selectionColor={colors.black}
        // underlineColorAndroid={colors.separatorColor}
        underlineColor={'transparent'}
        // outlineColor={colors.black}
        maxLength={maxLength}
        multiline={multiline}
        numberOfLines={numberOfLines}
        editable={editable}
        onChangeText={onChangeText}
        secureTextEntry={isSecure}
        left={leftText}
        right={rightIconComp}
        spellCheck={false}
        autoCapitalize={autoCapitalize}
        theme={{
          colors: {
            primary: colors.textInputTextColor,
            underlineColor: 'transparent',
          },
        }}
        // onPressIn={onPressIn}
        onFocus={onPressIn}
        onEndEditing={onEndEditing}
        onPressOut={onPressOut}
        onBlur={onBlur}
      />
      {error ? (
        <HelperText
          type="error"
          visible={true}
          padding={'none'}
          style={{color: colors.warmred}}>
          {errorMsg}
        </HelperText>
      ) : null}
    </View>
  );
};

// autoCapitalize = ['none', 'sentences', 'words', 'characters']

// TextinputComp.prototype = {
//     mode: PropTypes.oneOf(['flat', 'outlined']),
//     value: PropTypes.string.isRequired,
//     label: PropTypes.string,
//     disabled: PropTypes.bool,
//     placeholder: PropTypes.string,
//     error: PropTypes.bool,
//     multiline: PropTypes.bool,
//     numberOfLines: PropTypes.number,
//     editable: PropTypes.bool,
//     keyboardType: PropTypes.oneOf(['default', 'number-pad', 'decimal-pad', 'numeric', 'email-address', 'phone-pad']),
//     isSecure: PropTypes.bool,
//     showRightIcon: PropTypes.bool
// }

export {TextinputComp};
