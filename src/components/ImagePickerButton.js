import React, {useState} from 'react';
import {View, TouchableOpacity, Image, StyleSheet, Text} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import Modal from 'react-native-modal';
import {dimens, fontsizes} from '../constants/dimens';
import font from '../constants/fonts';
import RoundedButtom from './RoundedButtom';
import {useTheme} from '@react-navigation/native';
import {useSelector} from 'react-redux';

const ProfileImagePicker = ({onImageSelect}) => {
  const [imageUri, setImageUri] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [fromCamera, setFromCamera] = useState(false);
  const {colors} = useTheme();
  const selector = useSelector(state => state.editProfileReducer);

  const chooseImage = value => {
    const options = {
      mediaType: 'photo',
      maxWidth: 300,
      maxHeight: 300,
      quality: 1,
    };
    if (value) {
      launchCamera(options, handleImageResponse);
    } else {
      launchImageLibrary(options, handleImageResponse);
    }
  };

  const handleImageResponse = response => {
    // console.log('Response = ', response);
    if (response.didCancel) {
      alert('User cancelled image picker');
      return;
    } else if (response.errorCode === 'camera_unavailable') {
      alert('Camera not available on device');
      return;
    } else if (response.errorCode === 'permission') {
      alert('Permission not satisfied');
      return;
    } else if (response.errorCode === 'others') {
      alert(response.errorMessage);
      return;
    }

    if (!response.didCancel && !response.errorCode) {
      setImageUri(response?.assets[0]?.uri);
      if (onImageSelect) {
        onImageSelect(response?.assets[0]);
      }
    }
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        {selector.profilePic ? (
          <Image source={{uri: selector.profilePic}} style={styles.image} />
        ) : (
          <View style={styles.placeholderView}>
            <Image
              source={require('../assets/user.png')}
              style={styles.placeholderImage}
            />
          </View>
        )}
      </TouchableOpacity>

      <Modal
        animationInTiming={400}
        animationOutTiming={400}
        backdropTransitionInTiming={800}
        backdropTransitionOutTiming={800}
        style={styles.modalContainer}
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}
        onSwipeComplete={() => setModalVisible(false)}
        swipeDirection={['down']}>
        <View style={styles.mainContainer}>
          {/* <Text style={styles.textStyleHeight}>Choose One</Text> */}

          {/* {renderCenterPointer()} */}
          {/* <TouchableOpacity onPress={() => chooseImage(true)}>
            <Text>Take Photo</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => chooseImage(false)}>
            <Text>open</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalButton}
            onPress={() => setModalVisible(false)}>
            <Text>Cancel</Text>
          </TouchableOpacity> */}

          <RoundedButtom
            onPress={() => chooseImage(true)}
            title={'Take Photo'}
            titleStyle={styles.titleStyle}
            gradColors={[colors.signupLightBlue, colors.signupDarkBlue]}
            gradStyle={styles.gradeStyle}
            container={styles.rButtonContainer}
            //   isLinearGradiantApplied={false}
          />
          <RoundedButtom
            onPress={() => chooseImage(false)}
            title={'Select from Camera Roll'}
            titleStyle={styles.titleStyle}
            gradColors={[colors.signupLightBlue, colors.signupDarkBlue]}
            gradStyle={styles.gradeStyle}
            container={styles.rButtonContainer}
            //   isLinearGradiantApplied={false}
          />
          <RoundedButtom
            onPress={() => setModalVisible(false)}
            title={'Cancel'}
            titleStyle={[styles.titleStyle, {color: '#fff'}]}
            gradColors={[colors.signupLightBlue, colors.signupDarkBlue]}
            gradStyle={styles.gradeStyle}
            container={styles.rButtonContainer}
            //   isLinearGradiantApplied={false}
          />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: dimens.h2,
    marginTop: dimens.h2,
  },
  image: {
    width: dimens.h10,
    height: dimens.h10,
    borderRadius: 50,
  },
  placeholderImage: {
    width: dimens.h5,
    height: dimens.h5,
    // borderRadius: 50,
    resizeMode: 'contain',
  },
  placeholderView: {
    width: dimens.h10,
    height: dimens.h10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: dimens.h5,
    backgroundColor: '#2f2f8226',
    opacity: 0.5,
  },
  modalContainer: {
    borderRadius: 20,
    justifyContent: 'flex-end',
    margin: 0,
  },
  mainContainer: {
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    // borderRadius: 20,
    backgroundColor: 'white',
    padding: 20,
    paddingVertical: 40,
    paddingTop: 10,
    // height: dimens.h35,
  },
  textStyleHeight: {
    textAlign: 'center',
    marginBottom: dimens.h3,
    color: '#000',
    fontFamily: font.Proximanova_Bold,
    fontSize: fontsizes.FONT_12PX,
    marginTop: 5,
  },
  titleStyle: {
    color: '#fff',
    fontSize: fontsizes.FONT_18PX,
    fontFamily: font.ProximaNovaExtraCondensed_Bold,
    textAlign: 'center',
  },
  rButtonContainer: {
    backgroundColor: '#fff',
    width: dimens.w87_3,
    height: dimens.h5_7,
    borderRadius: dimens.h10,
    // borderColor: 'lightBlue',
    // borderWidth: 1,
    top: dimens.h2,
    marginVertical: 10,
  },
  gradeStyle: {
    borderRadius: dimens.h10,
    width: dimens.w86_1,
    height: dimens.h5_4,
    // backgroundColor: '#fff',
  },
});

export default ProfileImagePicker;
