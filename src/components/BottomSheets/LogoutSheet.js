import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import ModalNew from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useTheme} from '@react-navigation/native';
import {dimens} from '../../constants/dimens';
const LogoutSheet = ({visibility, onBackdropPress, onLogout}) => {
  const {colors} = useTheme();
  return (
    <ModalNew
      animationInTiming={300}
      animationOutTiming={100}
      backdropTransitionInTiming={800}
      backdropTransitionOutTiming={800}
      style={{
        borderRadius: 20,
        justifyContent: 'flex-end',
        margin: 0,
        top: Platform.OS === 'ios' ? dimens.h4 : 0,
      }}
      onBackdropPress={onBackdropPress}
      onSwipeComplete={onBackdropPress}
      swipeDirection="down"
      isVisible={visibility}>
      <SafeAreaView style={{bottom: 0}}>
        <StatusBar
          translucent
          // backgroundColor="transparent"
          backgroundColor={colors.black}
          barStyle={'dark-content'}
        />
        <View
          style={{
            backgroundColor: colors.white,
            //height: '30%',
            width: '100%',
            alignItems: 'center',
            paddingBottom: dimens.h3,
          }}>
          <View
            style={{
              height: 50,
              backgroundColor: 'transparent',
              width: '100%',
              alignContent: 'flex-end',
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
              //marginLeft: 10,
              paddingRight: 10,
              marginTop: -25,
              marginBottom: 25,
            }}>
            <TouchableOpacity
              onPress={onBackdropPress}
              style={{
                backgroundColor: colors.white,
                padding: 10,
                borderTopRightRadius: 25,
                borderTopLeftRadius: 25,
              }}>
              <AntDesign name="close" size={28} color={colors.black} />
            </TouchableOpacity>
          </View>
          <View
            style={{
              paddingHorizontal: 50,
              alignItems: 'center',
              justifyContent: 'center',
              alignContent: 'center',
              alignSelf: 'center',
            }}>
            <Text
              style={{
                fontSize: 20,
                fontWeight: 'bold',
                textAlign: 'center',
                color: colors.black,
              }}>
              Are you sure you want to logout?
            </Text>
            <Text
              style={{
                fontSize: 16,
                marginTop: 10,
                textAlign: 'center',
                color: colors.black,
              }}>
              Your active fast will continue running and all of your data will
              be saved until next login.
            </Text>
          </View>
          <View style={{marginTop: 20}}>
            <TouchableOpacity
              onPress={onLogout}
              style={{
                backgroundColor: colors.deepmagenta,
                padding: 10,
                borderRadius: 20,
                width: '70%',
                alignItems: 'center',
                justifyContent: 'center',
                alignSelf: 'center',
                paddingHorizontal: 50,
              }}>
              <Text style={{color: colors.white, fontWeight: 'bold'}}>
                Yes, Log me out!
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </ModalNew>
  );
};

export default LogoutSheet;

const styles = StyleSheet.create({});
