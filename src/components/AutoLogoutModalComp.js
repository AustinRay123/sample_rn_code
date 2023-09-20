import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import ModalNew from 'react-native-modal';
import {useTheme} from '@react-navigation/native';
import {dimens, fontsizes} from '../constants/dimens';
import font from '../constants/fonts';
import RoundedButtom from './RoundedButtom';

const AutoLogoutModalComp = props => {
  const {isVisible, errorMessage, onOkPress, title} = props;
  const {colors} = useTheme();
  return (
    <ModalNew
      animationInTiming={400}
      style={{
        borderRadius: 20,
        justifyContent: 'flex-end',
        margin: 0,
      }}
      isVisible={isVisible}>
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          paddingHorizontal: dimens.w4,
        }}>
        <View
          style={{
            backgroundColor: '#FAFAFD',
            paddingVertical: dimens.h6,
            paddingHorizontal: dimens.w10,
            alignItems: 'center',
            borderRadius: 20,
          }}>
          <Text style={[styles.whoops, {color: colors.black}]}>{title}</Text>
          <Text style={[styles.errormsg, {color: colors.black}]}>
            {errorMessage}
          </Text>
          <View
            style={{
              width: dimens.w100,
              flexDirection: 'row',
              justifyContent: 'space-evenly',
              marginTop: dimens.h2,
            }}>
            <RoundedButtom
              onPress={() => {
                onOkPress();
              }}
              title={'Ok'}
              titleStyle={[styles.titleStylebtnBlack, {color: colors.white}]}
              gradColors={[colors.signupLightBlue, colors.signupDarkBlue]}
              gradStyle={styles.gradStylesWhite}
              container={styles.containerBtnWhite}
              disabled={false}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%',
            }}></View>
        </View>
      </View>
    </ModalNew>
  );
};

export default AutoLogoutModalComp;

const styles = StyleSheet.create({
  whoops: {
    fontSize: fontsizes.FONT_24Px_H4,
    fontFamily: font.ProximaNovaExtraCondensed_Bold,
    color: '#000000',
    marginBottom: dimens.h1_5,
  },
  errormsg: {
    fontSize: fontsizes.FONT_14Px_H6,
    fontFamily: font.Proximanovaexcn_Regular,
    marginBottom: dimens.h1_5,
    textAlign: 'center',
  },
  okBtn: {
    backgroundColor: '#E11B49',
    // paddingHorizontal: dimens.h5,
    paddingVertical: 12,
    width: dimens.h12,
    borderRadius: 64,
    fontSize: fontsizes.FONT_18Px_,
    fontFamily: font.Proximanova_Bold,
  },
  cancelBtn: {
    backgroundColor: '#E11B49',
    // paddingHorizontal: dimens.h5,
    width: dimens.h12,
    paddingVertical: 12,
    borderRadius: 64,
    fontSize: fontsizes.FONT_18Px_,
    fontFamily: font.Proximanova_Bold,
  },
  okText: {
    fontSize: fontsizes.FONT_18Px_,
    textAlign: 'center',
    fontFamily: font.Proximanovaexcn_Regular,
    color: '#FFFFFF',
  },
  gradStylesWhite: {
    // borderRadius: dimens.h10,
    //width: dimens.w86_1,
    //height: dimens.h5_4,
    // backgroundColor: props.colors.white,
  },
  containerBtnWhite: {
    width: dimens.w30,
    height: dimens.h5_7,
    borderRadius: dimens.h10,
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStylebtnBlack: {
    fontSize: fontsizes.FONT_18Px_,
    fontFamily: font.Proximanova_Bold,
    textAlign: 'center',
  },
});
