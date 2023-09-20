import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Pressable,
  Keyboard,
} from 'react-native';
import Modal from 'react-native-modal';
import useStyles from './CustomeModalStyle';
import NameModal from '../UserDetailsComponent/NameScreen/NameModal';
import {dimens, fontsizes} from '../../constants/dimens';
import SubscriptionScreen from '../UserDetailsComponent/SubscriptionScreen/SubscriptionScreen';
import {useTheme} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import EmailModal from '../UserDetailsComponent/EmailScreen/EmailModal';
import WeightModal from '../UserDetailsComponent/WeightScreen/WeightModal';
import AidModal from '../AidModal';
import Quiz1Modal from '../Quiz1Modal/Quiz1Modal';
import Quiz2Modal from '../Quiz2Modal/Quiz2Modal';
import Quiz3Modal from '../Quiz3Modal/Quiz3Modal';
import Quiz4Modal from '../Quiz4Modal/Quiz4Modal';
import NoticeModal from '../NoticeModal/NoticeModal';
import HealthModal from '../HealthModal/HealthModal';

const CustomModal = ({
  visible,
  field,
  onClose,
  onSubmit,
  customStyle,
  mainModalStyle,
  data,
  objectForAid = {},
  isContentVisible,
  setIsContentVisible,
}) => {
  const styles = useStyles();
  const {colors} = useTheme();

  const renderContent = () => {
    switch (field) {
      case 'name':
        return (
          <View>
            <NameModal
              data={data}
              visible={visible}
              field={field}
              onClose={onClose}
              setIsContentVisible={setIsContentVisible}
            />
          </View>
        );
      case 'subscription':
        return (
          <View style={{}}>
            {/* Render subscription cards or other content */}
            <SubscriptionScreen data={data} />
          </View>
        );
      case 'email':
        return (
          <View>
            <EmailModal
              data={data}
              visible={visible}
              field={field}
              onClose={onClose}
              setIsContentVisible={setIsContentVisible}
            />
          </View>
        );
      case 'birthday':
        return (
          <View>
            <Text>birthday:</Text>
            <TouchableOpacity onPress={() => {}}>
              <Text>Submit</Text>
            </TouchableOpacity>
          </View>
        );
      case 'weight':
        return (
          <View>
            <WeightModal
              data={data}
              visible={visible}
              field={field}
              onClose={onClose}
              setIsContentVisible={setIsContentVisible}
            />
          </View>
        );
      case 'aidModal':
        return (
          <View>
            <AidModal
              visible={visible}
              field={field}
              onClose={onClose}
              data={objectForAid}
              setIsContentVisible={setIsContentVisible}
            />
          </View>
        );
      case 'quiz1Modal':
        return (
          <View>
            <Quiz1Modal
              visible={visible}
              field={field}
              onClose={onClose}
              onSubmit={onSubmit}
              setIsContentVisible={setIsContentVisible}
            />
          </View>
        );
      case 'quiz2Modal':
        return (
          <View>
            <Quiz2Modal
              visible={visible}
              field={field}
              onClose={onClose}
              onSubmit={onSubmit}
              setIsContentVisible={setIsContentVisible}
            />
          </View>
        );
      case 'quiz3Modal':
        return (
          <View>
            <Quiz3Modal
              visible={visible}
              field={field}
              onClose={onClose}
              onSubmit={onSubmit}
              setIsContentVisible={setIsContentVisible}
            />
          </View>
        );
      case 'quiz4Modal':
        return (
          <View>
            <Quiz4Modal
              visible={visible}
              field={field}
              onClose={onClose}
              onSubmit={onSubmit}
              setIsContentVisible={setIsContentVisible}
            />
          </View>
        );
      case 'notice':
        return (
          <View>
            <NoticeModal
              visible={visible}
              field={field}
              onClose={onClose}
              setIsContentVisible={setIsContentVisible}
            />
          </View>
        );
      case 'health':
        return (
          <View>
            <HealthModal
              visible={visible}
              field={field}
              onClose={onClose}
              setIsContentVisible={setIsContentVisible}
            />
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      animationInTiming={600}
      animationOutTiming={400}
      backdropTransitionInTiming={800}
      backdropTransitionOutTiming={800}
      backdropColor={colors.black}
      style={
        field == 'aidModal' || 'quiz1Modal'
          ? mainModalStyle
          : styles.modalContainer
      }
      isVisible={visible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection={['down']}
      propagateSwipe={true}
      // visible={visible} onRequestClose={onClose}
    >
      {/* <StatusBar
        translucent
        backgroundColor={colors.black}
        barStyle={'dark-content'}
      /> */}

      <KeyboardAvoidingView
        keyboardVerticalOffset={150}
        behavior="padding"
        style={{flex: 1}}>
        <Pressable onPress={() => Keyboard.dismiss()}>
          <View
            style={
              field == 'aidModal' || 'quiz1Modal'
                ? customStyle
                : styles.mainContainer
            }>
            {isContentVisible && renderContent()}
            {/* <TouchableOpacity onPress={onClose}> */}
            {field !== 'aidModal' ||
              ('quiz1Modal' && (
                <TouchableOpacity
                  onPress={onClose}
                  style={[
                    styles.closeButtonStyle,
                    {
                      backgroundColor: colors.white,
                      padding: 10,
                      borderRadius: 30,
                    },
                  ]}>
                  <AntDesign
                    name="close"
                    size={24}
                    color={colors.textInputTextColor}
                  />
                </TouchableOpacity>
              ))}
            {/* <AntDesign
            name="closecircleo"
            size={fontsizes.FONT_28Px_H3}
            color={colors.bigTextColors}
            style={styles.closeButtonStyle}
            onPress={onClose}
          /> */}
            {/* </TouchableOpacity> */}
          </View>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default CustomModal;
