import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import ModalNew from 'react-native-modal';
import {dimens, fontsizes} from '../constants/dimens';
import font from '../constants/fonts';
import LinearGradient from 'react-native-linear-gradient';

const AfterSignInErrorComp = ({
  openModal,
  onBackPress,
  errorMessage,
  onOkPress,
  title,
  gradColors = [],
  container = {},
  gradStyle = {},
}) => {
  return (
    <ModalNew
      animationInTiming={600}
      animationOutTiming={400}
      backdropTransitionInTiming={800}
      backdropTransitionOutTiming={800}
      style={{
        borderRadius: 20,
        justifyContent: 'flex-end',
        margin: 0,
      }}
      onBackdropPress={onBackPress}
      onSwipeComplete={onBackPress}
      swipeDirection={['down']}
      isVisible={openModal}>
      <TouchableOpacity
        style={{
          flex: 1,
          justifyContent: 'center',
          paddingHorizontal: dimens.w4,
        }}
        onPress={onBackPress}>
        <View
          style={{
            backgroundColor: '#FAFAFD',
            paddingBottom: dimens.h8,
            paddingTop: dimens.h6,
            paddingHorizontal: dimens.w10,
            alignItems: 'center',
            borderRadius: 14,
          }}>
          <Text style={styles.whoops}>
            {title == true ? 'Success' : 'Whoops'}
          </Text>
          <Text style={styles.errormsg}>{errorMessage}</Text>
          <TouchableOpacity onPress={onOkPress} style={container}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={gradColors}
              style={[gradStyle, styles.gradient]}>
              <Text style={styles.okText}>Ok</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </ModalNew>
  );
};

export default AfterSignInErrorComp;

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
    color: '#1A1A1A',
  },
  okBtn: {
    backgroundColor: '#E11B49',
    paddingHorizontal: 48,
    paddingVertical: 12,
    borderRadius: 64,
    fontSize: fontsizes.FONT_18Px_,
    fontFamily: font.Proximanova_Bold,
  },
  okText: {
    fontSize: fontsizes.FONT_18Px_,
    textAlign: 'center',
    fontFamily: font.Proximanova_Bold,
    color: '#FFFFFF',
  },
  gradStyles: {
    borderRadius: dimens.h10,
    width: dimens.w87_3,
    height: dimens.h5_7,
  },
  containerBtn: {
    flex: 1,
  },
  gradStyles: {
    borderRadius: dimens.h10,
    width: dimens.w87_3,
    height: dimens.h5_7,
  },
});
