import React, {useCallback, useMemo, useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import ModalNew from 'react-native-modal';
import {dimens, fontsizes} from '../../constants/dimens';
import useStyles from './QuickSnapStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TextinputComp} from '../TextinputComp';
import {useDispatch, useSelector} from 'react-redux';
import RoundedButtom from '../RoundedButtom';
import _ from 'lodash';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import ProgressIndicator from '../ProgressIndicator';
import CommonDatePickerSheet from './CommonDatePickerSheet';
import DatepickerBottomSheet from './DatepickerBottomSheet';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {
  updateQSDate,
  updateQSImage,
  updateQSTime,
} from '../../commonSlices/quickSnap.slice';

const QuickSnapBottomSheet = props => {
  const {
    visibility,
    onBackdropPress,
    onItemClick,
    prop,
    edit,
    title,
    duration,
    onImageSelect,
  } = props;
  const styles = useStyles();
  const {colors} = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [qsDate, setQSDate] = useState();
  const [qsTime, setQSTime] = useState();
  const [imageUri, setImageUri] = useState('');
  const selector = useSelector(state => state.quickSnapReducer);
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
      console.log('IMAGE SOURCE', response?.assets[0]?.uri);
      dispatch(updateQSImage(response?.assets[0]?.uri));
      if (onImageSelect) {
        onImageSelect(response?.assets[0]);
      }
    }
    // setModalVisible(false);
  };

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
      // deviceWidth={util.getDeviceWidth}
      swipeDirection={['down']}
      // deviceHeight={t}
      isVisible={visibility}>
      <KeyboardAvoidingView
        // style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled
        //   keyboardVerticalOffset={100}
      >
        {/* <ScrollView bounces={false} style={{flex: 1}}> */}
        <StatusBar
          translucent
          // backgroundColor="transparent"
          backgroundColor={colors.black}
          barStyle={'dark-content'}
        />
        <View
          style={{
            borderRadius: 20,
            backgroundColor: colors.darkWhite,
            padding: 20,
            paddingVertical: 40,
            paddingTop: 10,
            height: dimens.h50,
          }}>
          <TouchableOpacity
            style={{
              position: 'absolute',
              right: 10,
              top: 10,
            }}
            onPress={onBackdropPress}>
            <AntDesign
              name="closecircleo"
              size={dimens.w7}
              color={colors.black}
              style={{width: dimens.w7, height: dimens.w7}}
            />
          </TouchableOpacity>
          <Text style={styles.presentStyle}>Quick Snap</Text>
          <Text style={styles.titleText}>Date</Text>
          <TouchableOpacity
            onPress={() => {
              setQSDate(true);
            }}>
            <View
              style={[
                styles.textInputstyle,
                {
                  height: 50,
                  width: '100%',
                  alignContent: 'center',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                },
              ]}>
              <Text style={styles.customTextInputText}>
                {selector.quickSnapDate !== ''
                  ? selector.quickSnapDate
                  : 'Select Date'}
              </Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.titleText}>Time</Text>

          <TouchableOpacity
            onPress={() => {
              setQSTime(true);
            }}>
            <View
              style={[
                styles.textInputstyle,
                {
                  height: 50,
                  width: '100%',
                  alignContent: 'center',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                },
              ]}>
              <Text style={styles.customTextInputText}>
                {selector.quickSnapTime !== ''
                  ? selector.quickSnapTime
                  : 'Select Time'}
              </Text>
            </View>
          </TouchableOpacity>
          <View style={{marginVertical: dimens.h3, marginTop: 20}}>
            <RoundedButtom
              onPress={() => {
                chooseImage(true);
              }}
              title={'Take Photo'}
              titleStyle={styles.titleStylebtn}
              gradColors={[colors.signupLightBlue, colors.signupDarkBlue]}
              gradStyle={styles.gradStyles}
              container={styles.containerBtn}
              isLinearGradiantApplied={true}
              // disabled={selector.loading == true ? true : false}
            />
          </View>
          <View style={{marginTop: dimens.h5}}>
            <RoundedButtom
              onPress={async () => {
                chooseImage(false);
              }}
              title={'Select From Camera Roll'}
              titleStyle={styles.titleStylebtn}
              gradColors={[colors.signupLightBlue, colors.signupDarkBlue]}
              gradStyle={styles.gradStyles}
              container={styles.containerBtn}
              isLinearGradiantApplied={true}
            />
          </View>
        </View>
        {qsDate && (
          <DatepickerBottomSheet
            isRedBtn={false}
            visibility={qsDate}
            onBackdropPress={() => {
              setQSDate(false);
            }}
            onItemClick={item => {
              dispatch(updateQSDate(item));
            }}
            mode={'datetime'}
            //   selectedDate={selector.endDate !== '' ? selector.endDate : Date()}
          />
        )}
        {qsTime && (
          <DatepickerBottomSheet
            isRedBtn={false}
            visibility={qsTime}
            isTimePicker={true}
            onBackdropPress={() => {
              setQSTime(false);
            }}
            onItemClick={item => {
              dispatch(updateQSTime(item));
            }}
            mode={'datetime'}
            //   selectedDate={selector.endDate !== '' ? selector.endDate : Date()}
          />
        )}
        {/* </ScrollView> */}
      </KeyboardAvoidingView>
    </ModalNew>
  );
};

export default QuickSnapBottomSheet;
