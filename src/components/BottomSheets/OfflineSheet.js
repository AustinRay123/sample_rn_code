import {
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
//create a modal component that will be shown when the user is offline and tries to access the app
const OfflineSheet = ({visibility, onBackdropPress}) => {
  const {colors} = useTheme();
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
      onBackdropPress={onBackdropPress}
      onSwipeComplete={onBackdropPress}
      swipeDirection="down"
      isVisible={visibility}>
      <StatusBar
        translucent
        // backgroundColor="transparent"
        backgroundColor={colors.black}
        barStyle={'dark-content'}
      />
      {/* <View
        style={{
          height: 50,
          backgroundColor: 'red',
          width: '100%',
          alignContent: 'flex-end',
          justifyContent: 'flex-end',
          alignItems: 'flex-end',
          //marginLeft: 10,
          paddingRight: 10,
        }}>
        <TouchableOpacity
          onPress={onBackdropPress}
          style={{
            backgroundColor: 'white',
            padding: 10,
            borderTopRightRadius: 25,
            borderTopLeftRadius: 25,
          }}>
          <AntDesign name="close" size={28} />
        </TouchableOpacity>
      </View> */}
      <View
        style={{
          backgroundColor: 'white',
          height: 200,
          width: '100%',
          //borderTopLeftRadius: 20,
          //borderTopRightRadius: 20,
          //justifyContent: 'center',
          alignItems: 'center',
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
              backgroundColor: 'white',
              padding: 10,
              borderTopRightRadius: 25,
              borderTopLeftRadius: 25,
            }}>
            <AntDesign name="close" size={28} color="black" />
          </TouchableOpacity>
        </View>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: colors.black}}>
          You are offline
        </Text>
        <Text style={{fontSize: 16, marginTop: 10, color: colors.black}}>
          Please check your internet connection
        </Text>
        <View style={{marginTop: 20}}>
          <TouchableOpacity
            onPress={onBackdropPress}
            style={{
              backgroundColor: '#FF5B79',
              padding: 10,
              borderRadius: 20,
              width: 150,
              alignItems: 'center',
            }}>
            <Text style={{color: colors.white}}>Try again</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ModalNew>
  );
};

export default OfflineSheet;

const styles = StyleSheet.create({});
