import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  Platform,
} from 'react-native';
import React from 'react';
import {dimens, fontsizes} from '../../constants/dimens';
import font from '../../constants/fonts';
import {useTheme} from '@react-navigation/native';

const Header = props => {
  const {colors} = useTheme();
  const {
    title,
    prefixIcon,
    onPrefixPress,
    suffixIcon,
    onSuffixPress,
    profile,
    customStyle,
    suffixStyleprops,
    ispreFixVisible = true,
  } = props;
  return (
    <View
      style={[
        styles.mainView,
        customStyle,
        {
          // marginTop: Platform.OS == 'android' ? dimens.h6 : 0,
          // backgroundColor: 'red',
        },
      ]}>
      <TouchableOpacity
        onPress={onPrefixPress}
        style={{justifyContent: 'center', width: '10%'}}>
        {ispreFixVisible ? (
          <Image
            source={prefixIcon}
            style={styles.prefixStyle}
            resizeMode={'contain'}></Image>
        ) : (
          <></>
        )}
        {/* <Image
          source={prefixIcon}
          style={styles.prefixStyle}
          resizeMode={'contain'}></Image> */}
      </TouchableOpacity>
      <Text style={[styles.headerStyle, {color: colors.bigTextColors}]}>
        {title}
      </Text>
      <TouchableOpacity
        onPress={onSuffixPress}
        style={{justifyContent: 'center', width: '10%'}}>
        <Image
          source={suffixIcon}
          resizeMode={'center'}
          style={[
            props.profile == true ? styles.profileStyle : styles.prefixStyle,
            suffixStyleprops,
          ]}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  mainView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  prefixStyle: {height: 24, width: 24, alignSelf: 'center'},
  headerStyle: {
    fontSize: fontsizes.FONT_28Px_H3,
    alignSelf: 'center',
    fontFamily: font.ProximaNovaExtraCondensed_Bold,
    width: '80%',
    textAlign: 'center',
  },
  profileStyle: {
    height: 46,
    width: 46,
    borderRadius: 23,
  },
  suffixStyle: {
    height: 24,
    width: 24,
    alignSelf: 'center',
  },
});
