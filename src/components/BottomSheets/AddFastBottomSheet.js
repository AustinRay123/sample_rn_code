import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ModalNew from 'react-native-modal';
import {useNavigation, useTheme} from '@react-navigation/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch, useSelector} from 'react-redux';
import RoundedButtom from '../RoundedButtom';
import {dimens} from '../../constants/dimens';
import useStyles from './AddFastBottomsheetStyle';
import {TextinputComp} from '../TextinputComp';
import {
  addFast,
  clearState,
  clearStatus,
  deleteFast,
  updateEndDate,
  updateEndDateIsError,
  updateFast,
  updateIsEdit,
  updateStartDate,
  updateStartDateIsError,
} from '../../commonSlices/addFast.slice';
import moment from 'moment';
import CommonDatePickerSheet from './CommonDatePickerSheet';
import AfterSignInErrorComp from '../AfterSignInErrorComp';
import {commonStackIdentifier} from '../../../App';
import PopUp from '../../features/Progress/PopUp';
import YesNoModalComp from '../YesNoModalComp';
import ProgressIndicator from '../ProgressIndicator';

const AddFastBottomSheet = props => {
  const {visibility, onBackdropPress, onItemClick, prop, edit} = props;

  const {colors} = useTheme();
  const styles = useStyles();
  const navigation = useNavigation();
  const [showDatePiker, setShowDatePiker] = useState(false);
  const [endDate, setEndDate] = useState(false);
  const selector = useSelector(state => state.addFastReducer);
  const dispatch = useDispatch();
  const [modal, setModal] = useState(false);
  const [yesNoModal, setYesNoModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isAdd, setIsAdd] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  // function formatDateTime(inputDate) {
  //   const originalDate = new Date(inputDate);
  //   const day = originalDate.getUTCDate().toString().padStart(2, '0');
  //   const month = (originalDate.getUTCMonth() + 1).toString().padStart(2, '0');
  //   const year = originalDate.getUTCFullYear();
  //   const hours = originalDate.getUTCHours().toString().padStart(2, '0');
  //   const minutes = originalDate.getUTCMinutes().toString().padStart(2, '0');
  //   const seconds = originalDate.getUTCSeconds().toString().padStart(2, '0');
  //   const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  //   return formattedDate;
  // }
  // function formatDateTime(inputDate) {
  //   const originalDate = new Date(inputDate);
  //   // Applying the time difference of 5 hours and 30 minutes
  //   const timeDifference = 5 * 60 * 60 * 1000 + 30 * 60 * 1000;
  //   const adjustedDate = new Date(originalDate.getTime() + timeDifference);
  //   const day = adjustedDate.getUTCDate().toString().padStart(2, '0');
  //   const month = (adjustedDate.getUTCMonth() + 1).toString().padStart(2, '0');
  //   const year = adjustedDate.getUTCFullYear();
  //   const hours = adjustedDate.getUTCHours().toString().padStart(2, '0');
  //   const minutes = adjustedDate.getUTCMinutes().toString().padStart(2, '0');
  //   const seconds = adjustedDate.getUTCSeconds().toString().padStart(2, '0');
  //   const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
  //   return formattedDate;
  // }
  function formatDateTime(inputDate) {
    const originalDate = new Date(inputDate);
    // Applying the time difference of 5 hours and 30 minutes
    const timeDifference = 5 * 60 * 60 * 1000 + 30 * 60 * 1000;
    const adjustedDate = new Date(originalDate.getTime() + timeDifference);
    const day = adjustedDate.getUTCDate().toString().padStart(2, '0');
    const month = (adjustedDate.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = adjustedDate.getUTCFullYear();
    const hours = adjustedDate.getUTCHours().toString().padStart(2, '0');
    const minutes = adjustedDate.getUTCMinutes().toString().padStart(2, '0');
    // Omitting seconds as they are not provided in your desired output
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
    return formattedDate;
  }

  // useEffect(() => {}, [selector.startDate, selector.endDate]);
  useEffect(() => {
    if (selector.addFastCheckStatus == 'fulfilled') {
      if (selector?.addFastRes?.status == true) {
        setModal(true);
        // props.navigation.navigate(commonStackIdentifier.sigin_screen_withemail);
        dispatch(clearState());
        dispatch(clearStatus());
      } else {
        // setShowModal(true);
        dispatch(clearStatus());
      }
    }
  }, [selector.addFastCheckStatus]);
  useEffect(() => {
    // console.log('STATUS', selector.editFastCheckStatus);

    // console.log('selectoreditFastResstatus', selector?.editFastRes?.status);
    // console.log('selectoreditFastResstatus', selector?.editFastRes?.message);

    if (selector.editFastCheckStatus == 'fulfilled') {
      console.log('RES Status', selector?.editFastRes?.status);
      if (selector?.editFastRes?.status == true) {
        setYesNoModal(false);
        setModal(true);
        // props.navigation.navigate(commonStackIdentifier.sigin_screen_withemail);
        dispatch(clearStatus());
      } else {
        setShowModal(true);
        dispatch(clearStatus());
      }
    }
  }, [selector.editFastCheckStatus]);
  useEffect(() => {
    if (selector.deleteFastCheckStatus == 'fulfilled') {
      if (selector?.deleteFastRes?.status == true) {
        setYesNoModal(false);
        setModal(true);
        // props.navigation.navigate(commonStackIdentifier.sigin_screen_withemail);
        dispatch(clearStatus());
      } else {
        setShowModal(true);
        dispatch(clearStatus());
      }
    }
  }, [selector.deleteFastCheckStatus]);
  const calculateDuration = () => {
    if (selector.startDate && selector.endDate) {
      const startDate = moment(selector.startDate);
      const endDateTime = moment(selector.endDate);
      const duration = moment.duration(endDateTime.diff(startDate));
      const timeDifferenceInMilliseconds = endDateTime - startDate;
      const hours = Math.floor(timeDifferenceInMilliseconds / (1000 * 60 * 60));
      const minutes = Math.floor(
        (timeDifferenceInMilliseconds % (1000 * 60 * 60)) / (1000 * 60),
      );
      return `${hours} HOURS, ${minutes} MINUTES`;
    }
    return '0 HOURS, 0 MINUTES';
  };
  const date_start = formatDateTime(selector.startDate);
  const date_end = formatDateTime(selector.endDate);

  // console.log('CHECK DATEs', date_start, date_end);
  const onAddFastPress = async () => {
    const params = {
      date_start_time: date_start,
      date_end_time: date_end,
    };
    dispatch(addFast(params));
  };
  const onEditPress = () => {
    const params = {
      date_start_time: date_start,
      date_end_time: date_end,
      id: onItemClick.id,
    };
    dispatch(updateFast(params));
  };
  const onDeletePress = () => {
    const params = onItemClick.id;
    dispatch(deleteFast(params));
  };
  // console.log('Edit New Date', selector.startDate, selector.endDate);
  // console.log('Edit New Date', date_start, date_end);
  console.log('New UPDATE msg', selector?.editFastRes?.message);
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
      <ScrollView bounces={false} style={{flex: 1}}>
        <SafeAreaView></SafeAreaView>
        <StatusBar
          translucent
          backgroundColor={colors.black}
          barStyle={'dark-content'}
        />
        <View style={styles.MainView}>
          <Text style={styles.titleTextStyle}>
            {edit ? 'Edit Fast' : 'Add Fast'}
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
          <Text style={styles.fastDetailStyle}>Fast Details</Text>
          <Text style={styles.hourMinuteStyle}>{calculateDuration()}</Text>
          <Text style={styles.fastStyle}>Fast Start</Text>
          <TouchableOpacity
            onPress={() => {
              setShowDatePiker(true);
              dispatch(updateStartDateIsError(false));
            }}
            style={{}}>
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
                {
                  selector.startDate !== ''
                    ? moment(selector.startDate).format('MMM DD, hh:mm A')
                    : 'Select Start Date'
                  // moment(new Date()).format('MMM DD, hh:mm A')
                }
              </Text>
            </View>
          </TouchableOpacity>
          <Text style={styles.fastStyle}>Fast End</Text>
          <TouchableOpacity
            onPress={() => {
              setEndDate(true);
              dispatch(updateEndDateIsError(false));
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
                {
                  selector.endDate !== ''
                    ? moment(selector.endDate).format('MMM DD, hh:mm A')
                    : 'Select End Date'
                  //  moment(new Date()).format('MMM DD, hh:mm A')
                }
              </Text>
            </View>
          </TouchableOpacity>
          {selector?.addFastRes?.status == false && (
            <Text
              style={{
                color: colors.deepmagenta,
                fontSize: 14,
                textDecorationLine: 'underline',
                marginTop: 25,
              }}>
              *{selector?.addFastRes?.message}
            </Text>
          )}
          {/* {date_start == date_end && (
            <Text
              style={{
                color: colors.deepmagenta,
                fontSize: 14,
                textDecorationLine: 'underline',
                marginTop: 25,
              }}>
              *Please select different time
            </Text>
          )} */}
          <View style={{marginVertical: dimens.h3, marginTop: 30}}>
            <RoundedButtom
              onPress={
                edit
                  ? () => {
                      // onEditPress();
                      setYesNoModal(true);
                      setIsEdit(true);
                    }
                  : //  date_start !== date_end ?
                    () => {
                      onAddFastPress();
                    }
                // : () => {}
              }
              title={
                selector.loading ? (
                  // <ActivityIndicator size={'small'} color={colors.white} />
                  <ProgressIndicator size={'small'} color={colors.white} />
                ) : edit ? (
                  'Edit Fast'
                ) : (
                  'Add Fast'
                )
              }
              disabled={selector.loading}
              titleStyle={styles.titleStylebtn}
              gradColors={[colors.signupLightBlue, colors.signupDarkBlue]}
              gradStyle={styles.gradStyles}
              container={styles.containerBtn}
              isLinearGradiantApplied={true}
            />
          </View>
          {edit ? (
            <RoundedButtom
              onPress={async () => {
                setYesNoModal(true);
              }}
              title={
                selector.deleteLoading ? (
                  // <ActivityIndicator size={'small'} color={colors.black} />
                  <ProgressIndicator size="large" color={colors.black} />
                ) : (
                  'Delete'
                )
              }
              disabled={selector.deleteLoading}
              titleStyle={styles.titleStylebtnBlack}
              gradColors={[colors.signupLightBlue, colors.signupDarkBlue]}
              gradStyle={styles.gradStylesWhite}
              container={styles.containerBtnWhite}
              //   isLinearGradiantApplied={false}
            />
          ) : (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(commonStackIdentifier.fast_list_screen);
                onBackdropPress();
              }}
              style={{marginTop: 0, marginRight: 10, alignItems: 'flex-end'}}>
              <Text style={styles.seeLogStyle}>See Logs</Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
      {showDatePiker && (
        <CommonDatePickerSheet
          visibility={showDatePiker}
          onBackdropPress={() => {
            setShowDatePiker(false);
          }}
          onItemClick={item => {
            dispatch(updateStartDate(item));
          }}
          mode={'datetime'}
          selectedDate={selector.startDate !== '' ? selector.startDate : Date()}
        />
      )}
      {endDate && (
        <CommonDatePickerSheet
          visibility={endDate}
          onBackdropPress={() => {
            setEndDate(false);
          }}
          onItemClick={item => {
            dispatch(updateEndDate(item));
          }}
          mode={'datetime'}
          selectedDate={selector.endDate !== '' ? selector.endDate : Date()}
        />
      )}
      {yesNoModal == true ? (
        <YesNoModalComp
          openModal={yesNoModal}
          onBackPress={() => setYesNoModal(false)}
          errorMessage={
            isEdit ? selector.editFastErrorMsg : selector.deleteFastErrorMsg
          }
          onOkPress={
            isEdit
              ? () => {
                  onEditPress();
                }
              : () => {
                  onDeletePress();
                }
          }
          title={isEdit ? 'Edit Fast' : 'Delete Fast'}
          onCancelPress={() => setYesNoModal(false)}
        />
      ) : (
        <></>
      )}
      {modal == true ? (
        <AfterSignInErrorComp
          openModal={modal}
          title={
            selector?.addFastRes?.status ||
            selector?.editFastRes?.status ||
            selector?.deleteFastRes?.status
          }
          errorMessage={
            selector?.addFastRes?.message ||
            selector?.editFastRes?.message ||
            selector?.deleteFastRes?.message
          }
          onBackPress={() => setModal(false)}
          onOkPress={() => {
            setModal(false);
            onBackdropPress({isEdit: true});
          }}
          gradColors={[colors.signupLightBlue, colors.signupDarkBlue]}
          gradStyle={styles.gradErrorStyles}
          container={styles.containerErrorBtn}
        />
      ) : (
        <></>
      )}
      {showModal && (
        <AfterSignInErrorComp
          openModal={showModal}
          title={
            // false
            // selector?.addFastRes.status ||
            selector?.editFastRes?.status || selector?.deleteFastRes?.status
          }
          errorMessage={
            // selector?.addFastRes?.message ||
            selector?.editFastRes?.message || selector?.deleteFastRes?.message
          }
          onBackPress={() => {
            setShowModal(false);
          }}
          onOkPress={() => {
            setShowModal(false);
          }}
          gradColors={[colors.signupLightBlue, colors.signupDarkBlue]}
          gradStyle={styles.gradErrorStyles}
          container={styles.containerErrorBtn}
        />
      )}
    </ModalNew>
  );
};

export default AddFastBottomSheet;

const styles = StyleSheet.create({});
