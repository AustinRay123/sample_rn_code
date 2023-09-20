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
import RBSheet from 'react-native-raw-bottom-sheet';
import ModalNew from 'react-native-modal';
import {dimens, fontsizes} from '../../constants/dimens';
import font from '../../constants/fonts';
import useStyles from './AddEditPresentStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TextinputComp} from '../TextinputComp';
import {useDispatch, useSelector} from 'react-redux';
import RoundedButtom from '../RoundedButtom';
import {commonStackIdentifier} from '../../../App';
import * as AsyncStore from '../../asyncstorage/index';
import {
  addChooseAFast,
  clearAddStatus,
  clearDeleteStatus,
  clearEditStatus,
  clearState,
  deleteChooseAFast,
  editChooseAFast,
  updateDuration,
  updateDurationIsError,
  updateTitle,
  updateTitleIsError,
} from '../../commonSlices/addEditPreset.slice';
import _ from 'lodash';
import ErrorComp from '../ErrorComp';
import KeyboardAvoidingView from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import AfterSignInErrorComp from '../AfterSignInErrorComp';
import ProgressIndicator from '../ProgressIndicator';
import YesNoModalComp from '../YesNoModalComp';

const AddEditPresentBottomSheet = props => {
  const {
    visibility,
    onBackdropPress,
    onItemClick,
    prop,
    edit,
    title,
    duration,
  } = props;
  const styles = useStyles();
  const {colors} = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [count, setCount] = useState(14);
  const [showModal, setModal] = useState(false);
  const [showModalSuc, setModalSuc] = useState(false);
  const [yesNoModal, setYesNoModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const selector = useSelector(state => state.createAddEditPresetReducer);
  const [showDeleteModal, setDeleteModal] = useState(false);
  // console.log('selectes Item props', prop);
  // const editDuration = prop?.count?.split(':');
  // selector.title = edit == true ? prop?.title : '';
  // selector.duration = edit == true ? editDuration[0] : '';
  // console.log('edit duration', prop?.count.split(':00'));
  // const iId = props?.id;
  useEffect(() => {
    edit && setCount(14 - selector?.title?.length);
  }, [edit]);
  useEffect(() => {
    if (selector.addChoosAFastCheckStatus == 'fulfilled') {
      if (selector?.addChoosAFastRes?.status == true) {
        setModalSuc(true);
        // props.navigation.navigate(commonStackIdentifier.sigin_screen_withemail);
        dispatch(clearState());
      } else {
        setModal(true);
        // dispatch(clearAddStatus());
      }
    }
  }, [selector.addChoosAFastCheckStatus]);
  useEffect(() => {
    if (selector.editChoosAFastCheckStatus == 'fulfilled') {
      if (selector?.editChoosAFastRes?.status == true) {
        setYesNoModal(false);
        setModalSuc(true);
        // props.navigation.navigate(commonStackIdentifier.sigin_screen_withemail);
        dispatch(clearState());
        dispatch(clearEditStatus());
      } else {
        setYesNoModal(false);
        setModal(true);
        // dispatch(clearAddStatus());
      }
    }
  }, [selector.editChoosAFastCheckStatus]);
  useEffect(() => {
    if (selector.deleteChoosAFastCheckStatus == 'fulfilled') {
      if (selector?.deleteChoosAFastRes?.status == true) {
        setYesNoModal(false);
        setModalSuc(true);
        // props.navigation.navigate(commonStackIdentifier.sigin_screen_withemail);
        dispatch(clearDeleteStatus());
        dispatch(clearState());
        onBackdropPress();
      } else {
        setYesNoModal(false);
        setModal(true);
        // dispatch(clearAddStatus());
      }
    }
  }, [selector.deleteChoosAFastCheckStatus]);
  const onAddPresetPress = () => {
    // AsyncStore.storeData(AsyncStore.Keys.SIGN_UP_STEP, '5');
    // navigation.replace(commonStackIdentifier.home_bottom_tabs);
    // onBackdropPress();
    if (_.isEmpty(selector.title)) {
      dispatch(updateTitleIsError(true));
      return;
    } else if (_.isEmpty(selector.duration)) {
      dispatch(updateDurationIsError(true));
      return;
    }
    const params = {
      title: selector.title,
      fast_hours: selector.duration,
    };
    dispatch(addChooseAFast(params));
  };
  const onEditPresetPress = () => {
    if (_.isEmpty(selector.title)) {
      dispatch(updateTitleIsError(true));
      return;
    } else if (_.isEmpty(selector.duration)) {
      dispatch(updateDurationIsError(true));
      return;
    }
    const params = {
      id: selector.id,
      title: selector.title,
      fast_hours: selector.duration,
    };
    dispatch(editChooseAFast(params));
  };
  const onDeletePress = () => {
    const params = selector.id;
    dispatch(deleteChooseAFast(params));
    // onBackdropPress();
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
      {/* <KeyboardAvoidingView
        // style={{flex: 1}}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled
        //   keyboardVerticalOffset={100}
      > */}
      {showDeleteModal == true && (
        <YesNoModalComp
          openModal={showDeleteModal}
          title={'Delete'}
          errorMessage={'Are you sure you want to delete the record?'}
          onBackPress={() => setDeleteModal(false)}
          onCancelPress={() => setDeleteModal(false)}
          onOkPress={() => {
            onDeletePress();
            setDeleteModal(false);
          }}
        />
      )}
      <ScrollView bounces={false} style={{flex: 1}}>
        <SafeAreaView></SafeAreaView>
        <StatusBar
          translucent
          // backgroundColor="transparent"
          backgroundColor={colors.black}
          barStyle={'dark-content'}
        />
        <View
          style={{
            borderRadius: 20,
            backgroundColor: colors.backgroundWhite,
            padding: 20,
            paddingVertical: 40,
            paddingTop: 10,
            height: dimens.h100,
          }}>
          <Text style={styles.presentStyle}>
            {edit == true ? 'Edit Preset' : 'Add Preset'}
          </Text>
          <TouchableOpacity
            style={{position: 'absolute', right: 10, top: 10}}
            onPress={onBackdropPress}>
            <AntDesign
              name="closecircleo"
              size={dimens.w6}
              color={colors.black}
              style={{width: dimens.w6, height: dimens.h3}}
            />
          </TouchableOpacity>
          {/* <TouchableOpacity style={{marginTop: dimens.h1}}>
          <FlatList
            data={genderdataLocal}
            style={{height: dimens.h20}}
            renderItem={renderGenderItem}
            keyExtractor={item => item.id.toString()}
          />
        </TouchableOpacity> */}
          <Text style={styles.titleText}>Title</Text>
          <Text style={styles.titleText1}>
            Name it something short and memorable.
          </Text>
          <TextinputComp
            placeholder={'Enter Title'}
            style={styles.textInputstyle}
            mode={'flat'}
            keyboardType="default"
            maxLength={14}
            onChangeText={text => {
              dispatch(updateTitleIsError(false));
              dispatch(updateTitle(text));
              console.log('tesxt length ', text.length);
              setCount(14 - text.length);
            }}
            value={selector.title}
            error={selector.titleIsError}
            errorMsg={selector.titleErrorMsg}
          />
          <Text style={styles.titleText2}>{count} characters remaining</Text>
          <Text style={styles.titleText}>Duration</Text>
          <Text style={styles.titleText1}>
            You can save Presets up to 168 hours.
          </Text>

          <TextinputComp
            placeholder={'Enter Duration'}
            style={styles.textInputstyle}
            mode={'flat'}
            onChangeText={text => {
              dispatch(updateDurationIsError(false));
              dispatch(updateDuration(text));
            }}
            value={selector.duration}
            keyboardType="number-pad"
            error={selector.durationIsError}
            errorMsg={selector.durationErrorMsg}
          />
          <View style={{marginVertical: dimens.h3, marginTop: 50}}>
            <RoundedButtom
              onPress={
                edit == true
                  ? () => {
                      //   props.navigation.navigate(commonStackIdentifier.choose_a_fast);
                      setYesNoModal(true);
                      setIsEdit(true);
                    }
                  : () => {
                      onAddPresetPress();
                    }
              }
              title={
                selector.loading == true ? (
                  // <View>
                  // <ActivityIndicator
                  //   size="large"
                  //   color={colors.deepcyan}
                  //   style={{flex: 1}}
                  // />
                  <ActivityIndicator
                    size="large"
                    color={colors.white}
                    style={{flex: 1}}
                  />
                ) : edit == true ? (
                  'Edit Preset'
                ) : (
                  'Add Preset'
                )
              }
              titleStyle={styles.titleStylebtn}
              gradColors={[colors.signupLightBlue, colors.signupDarkBlue]}
              gradStyle={styles.gradStyles}
              container={styles.containerBtn}
              isLinearGradiantApplied={true}
              disabled={selector.loading == true ? true : false}
            />
          </View>
          <View style={{marginTop: dimens.h5}}>
            {edit && (
              <RoundedButtom
                onPress={async () => {
                  setIsEdit(false);
                  setYesNoModal(true);
                }}
                title={
                  selector.isDeleteLoading == true ? (
                    <ProgressIndicator
                      size="large"
                      color={colors.deepcyan}
                      style={{flex: 1}}
                    />
                  ) : (
                    'Delete'
                  )
                }
                titleStyle={styles.titleStylebtnBlack}
                gradColors={[colors.signupLightBlue, colors.signupDarkBlue]}
                gradStyle={styles.gradStylesWhite}
                container={styles.containerBtnWhite}
                //   isLinearGradiantApplied={false}
              />
            )}
          </View>
        </View>
      </ScrollView>
      {showModal == true ? (
        <AfterSignInErrorComp
          openModal={showModal}
          title={
            selector?.editChoosAFastRes?.status ||
            selector?.addChoosAFastRes?.status ||
            selector?.deleteChoosAFastRes?.status
          }
          errorMessage={
            selector?.editChoosAFastRes?.message ||
            selector?.addChoosAFastRes?.message ||
            selector?.deleteChoosAFastRes?.message
          }
          onBackPress={() => setModal(false)}
          onOkPress={() => setModal(false)}
          gradColors={[colors.signupLightBlue, colors.signupDarkBlue]}
          gradStyle={styles.gradErrorStyles}
          container={styles.containerErrorBtn}
        />
      ) : (
        <></>
      )}
      {showModalSuc && (
        <AfterSignInErrorComp
          openModal={showModalSuc}
          title={
            selector?.resetPasswordRes?.status ||
            selector?.editChoosAFastRes?.status ||
            selector?.deleteChoosAFastRes?.status ||
            selector?.addChoosAFastRes.status
          }
          errorMessage={
            selector?.resetPasswordRes?.message ||
            selector?.editChoosAFastRes?.message ||
            selector?.deleteChoosAFastRes?.message ||
            selector?.addChoosAFastRes?.message
          }
          onBackPress={() => {
            setModalSuc(false);
          }}
          onOkPress={() => {
            setModalSuc(false);
            onBackdropPress();
          }}
          gradColors={[colors.signupLightBlue, colors.signupDarkBlue]}
          gradStyle={styles.gradErrorStyles}
          container={styles.containerErrorBtn}
        />
      )}
      {yesNoModal == true ? (
        <YesNoModalComp
          openModal={yesNoModal}
          onBackPress={() => setYesNoModal(false)}
          errorMessage={
            isEdit
              ? selector.editChooseAFastErrorMsg
              : selector.deleteChooseAFastErrorMsg
          }
          onOkPress={
            isEdit
              ? () => {
                  onEditPresetPress();
                }
              : () => {
                  onDeletePress();
                }
          }
          title={isEdit ? 'Edit Choose a Fast' : 'Delete Choose a Fast'}
          onCancelPress={() => setYesNoModal(false)}
        />
      ) : (
        <></>
      )}
      {/* </KeyboardAvoidingView> */}
    </ModalNew>
  );
};

export default AddEditPresentBottomSheet;
