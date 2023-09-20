import React, {
  useCallback,
  useMemo,
  useRef,
  useEffect,
  useState,
  useContext,
} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import ModalNew from 'react-native-modal';
import {dimens, fontsizes} from '../../constants/dimens';
import font from '../../constants/fonts';
import useStyles from './ActivityIntakeStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TextinputComp} from '../TextinputComp';
import {useDispatch, useSelector} from 'react-redux';
import RoundedButtom from '../RoundedButtom';
import {AppThemeContext, commonStackIdentifier} from '../../../App';
import * as AsyncStore from '../../asyncstorage/index';
import {
  updateDateTime,
  activityIntakeSlice,
  clearState,
  updateDateTimeErrorMsg,
  updateDateTimeIsError,
  updateDuration,
  updateDurationErrorMsg,
  updateDurationIsError,
  updateActivity,
  updateActivityErrorMsg,
  updateActivityIsError,
  updateActivityGoal,
  updateActivityGoalErrorMsg,
  updateActivityGoalIsError,
  addActivityIntake,
} from '../../commonSlices/activityIntakeSlice';
import image from '../../constants/image';
import CommonDatePickerSheet from './CommonDatePickerSheet';
import ActivityModal from './ActivityModal';
import moment from 'moment';
import _ from 'lodash';
import ProgressIndicator from '../ProgressIndicator';

const ActivityIntakeBottomSheet = props => {
  const {
    visibility,
    onBackdropPress,
    onItemClick,
    prop,
    activityValue,
    activityGoal,
  } = props;
  const styles = useStyles();
  const {colors} = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [count, setCount] = useState(14);
  const [isDatetimePickerVisible, setIsDatetimePickerVisible] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const {AppThemeName, updateAppTheme} = useContext(AppThemeContext);
  // const selector = useSelector(state => state.activityIntakeReducer);
  const activityIntakeSelector = useSelector(
    state => state.activityIntakeReducer,
  );
  const [isActivityPickerVisible, setIsActivityPickerVisible] = useState(false);
  const [activity, setActivity] = useState('');
  const activityDatas = [
    'Other',
    'Cardio dance ',
    'Social dance ',
    'Fitness games',
    'Hand cycling ',
    'Mixed cardio',
    'Yoga',
    'Gym',
    'Wrestling',
    'Swimming',
    'Running',
    'Cycling',
    'Walking',
    'Basketball',
    'Football',
    'Tennis',
    'Cricket',
    'Badminton',
    'Table Tennis',
    'Volleyball',
    'Baseball',
    'Softball',
    'Rugby',
    'Hockey',
    'Golf',
    'Skating',
    'Skiing',
    'Snowboarding',
    'Surfing',
    'Horse Riding',
    'Gymnastics',
    'Martial Arts',
    'Boxing',
    'Bowling',
    'Rock Climbing',
    'Fishing',
    'Hiking',
    'Archery',
    'Shooting',
    'Darts',
    'Billiards',
  ];
  useEffect(() => {
    if (activityIntakeSelector.checkDataStatusActivity === 'fulfilled') {
      dispatch(clearState());
      onBackdropPress();
    }
  }, [activityIntakeSelector]);
  useEffect(() => {
    if (activityIntakeSelector.activityGoal === '') {
      dispatch(updateActivityGoal(activityGoal));
    }
  }, []);
  const onDoneClick = () => {
    // if (_.isEmpty(activityIntakeSelector.dateTime)) {
    //   dispatch(updateDateTimeIsError(true));
    //   return;
    // }
    if (_.isEmpty(activityIntakeSelector.duration)) {
      dispatch(updateDurationIsError(true));
      return;
    }
    if (_.isEmpty(activityIntakeSelector.activityGoal)) {
      dispatch(updateActivityGoalIsError(true));
      return;
    }
    if (_.isEmpty(activityIntakeSelector.activity)) {
      dispatch(updateActivityIsError(true));
      return;
    }
    const date = !!activityIntakeSelector.dateTime
      ? moment(activityIntakeSelector.dateTime).format('DD/MM/YYYY HH:mm:ss')
      : moment(new Date()).format('DD/MM/YYYY HH:mm:ss');
    const data = {
      date_time: date,
      duration: activityIntakeSelector.duration,
      goal: activityIntakeSelector?.activityGoal
        ? activityIntakeSelector?.activityGoal
        : activityGoal,
      description: activityIntakeSelector.activity,
    };
    console.log('data', data);
    dispatch(addActivityIntake(data));
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
      onSwipeComplete={isActivityPickerVisible ? () => {} : onBackdropPress}
      // deviceWidth={util.getDeviceWidth}
      swipeDirection={['down']}
      propagateSwipe={true}
      // deviceHeight={t}
      isVisible={visibility}>
      <KeyboardAvoidingView
        style={{
          flex: 1,
          marginTop: dimens.h10,
          // height: dimens.h95,
        }}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        enabled>
        {isDatetimePickerVisible && (
          <CommonDatePickerSheet
            visibility={isDatetimePickerVisible}
            onBackdropPress={() => {
              setIsDatetimePickerVisible(false);
            }}
            onItemClick={item => {
              setSelectedDateTime(item);
              dispatch(updateDateTime(item.toString()));
            }}
            mode={'datetime'}
            // selectedDate={new Date()}
            selectedDate={
              activityIntakeSelector?.dateTime == ''
                ? new Date()
                : activityIntakeSelector?.dateTime
            }
          />
        )}
        {isActivityPickerVisible && (
          <ActivityModal
            visibility={isActivityPickerVisible}
            onBackdropPress={() => {
              setIsActivityPickerVisible(false);
            }}
            onItemClick={item => {
              setActivity(item);
            }}
            mode={'activity'}
            selectedItem={activity}
            selectedDate={new Date()}
            isTitleVisible={true}
            data={activityDatas}
            onSaveClick={() => {
              console.log('activity', activity);
              dispatch(updateActivity(activity));
              setIsActivityPickerVisible(false);
            }}
          />
        )}
        <View
          style={{
            borderRadius: 20,
            backgroundColor: colors.backgroundWhite,
            padding: 20,
            paddingVertical: 40,
            paddingTop: 10,
            height: dimens.h95,
          }}>
          <Text style={styles.presentStyle}>{'Add Active Minutes'}</Text>
          <TouchableOpacity
            style={{position: 'absolute', right: 10, top: 10}}
            onPress={() => {
              dispatch(clearState());
              onBackdropPress();
            }}>
            <AntDesign
              name="closecircleo"
              size={dimens.w6}
              color={colors.black}
              style={{width: dimens.w6, height: dimens.h3}}
            />
          </TouchableOpacity>

          <View style={styles.whitrbgView}>
            <View style={{flexDirection: 'column'}}>
              <Text style={styles.targetFirst}>
                {activityValue + '/' + activityGoal} MIN
              </Text>
              <Text style={styles.targetFirst2}>ACTIVITY</Text>
            </View>
            <View>
              <Image
                source={
                  AppThemeName == 'MyDefaultThemeDay'
                    ? image.ic_thunder_orange
                    : image.ic_thunder_blue
                }
                resizeMode="contain"
                style={{
                  width: dimens.w15,
                  height: dimens.h10,
                }}
              />
            </View>
          </View>
          <TouchableOpacity
            onPress={() => {
              setIsDatetimePickerVisible(true);
              dispatch(updateDateTimeIsError(false));
              Keyboard.dismiss();
            }}>
            <Text style={styles.titleText}>Date And Time</Text>
            <View
              style={[
                styles.textInputstyle,
                {
                  height: 50,
                  width: '100%',
                  alignContent: 'center',
                  alignItems: 'flex-start',
                  justifyContent: 'center',
                  // backgroundColor: '#f2f4f7',
                },
              ]}>
              <Text style={styles.customTextInputText}>
                {activityIntakeSelector?.dateTime !== ''
                  ? moment(activityIntakeSelector?.dateTime).format(
                      'MMM DD, hh:mm A',
                    )
                  : moment(new Date()).format('MMM DD, hh:mm A')}
              </Text>
            </View>
          </TouchableOpacity>

          <Text style={styles.titleText2}>Duration</Text>

          <TextinputComp
            placeholder={'10'}
            style={styles.textInputstyle}
            mode={'flat'}
            keyboardType="numeric"
            maxLength={3}
            onChangeText={text => {
              dispatch(updateDuration(text));
              dispatch(updateDurationIsError(false));
            }}
            value={activityIntakeSelector.duration}
            error={activityIntakeSelector.durationIsError}
            errorMsg={activityIntakeSelector.durationErrorMsg}
          />

          <Text style={styles.titleText2}>Goal</Text>

          <TextinputComp
            placeholder={activityGoal}
            style={styles.textInputstyle}
            mode={'flat'}
            keyboardType="numeric"
            maxLength={3}
            onChangeText={text => {
              dispatch(updateActivityGoal(text));
              dispatch(updateActivityGoalIsError(false));
            }}
            value={activityIntakeSelector.activityGoal}
            error={activityIntakeSelector.activityGoalIsError}
            errorMsg={activityIntakeSelector.activityGoalErrorMsg}
          />

          <TouchableOpacity
            onPress={() => {
              setIsActivityPickerVisible(true);
              dispatch(updateActivityIsError(false));
              Keyboard.dismiss();
            }}>
            <Text style={styles.titleText}></Text>
            <View
              style={[
                styles.textInputstyle,
                {
                  height: 50,
                  width: '100%',
                  alignContent: 'center',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'row',
                  // backgroundColor: '#f2f4f7',
                },
              ]}>
              <Text
                style={[
                  styles.customTextInputText,
                  {textAlign: 'center', marginEnd: 5},
                ]}>
                {activityIntakeSelector?.activity !== ''
                  ? activityIntakeSelector?.activity
                  : 'Select Activity'}
              </Text>
              <AntDesign name="down" size={dimens.w4} color={colors.indigo} />
            </View>
          </TouchableOpacity>
          {activityIntakeSelector.activityIsError && (
            <View style={{}}>
              <Text style={[styles.titleText2, {color: colors.warmred}]}>
                Please select any activity.
              </Text>
            </View>
          )}

          <View style={{marginVertical: dimens.h3, marginTop: 30}}>
            {/* {activityIntakeSelector.loading ? (
              <ActivityIndicator size="small" />
            ) : ( */}
            <RoundedButtom
              onPress={() => {
                onDoneClick();
              }}
              title={
                activityIntakeSelector.loading ? (
                  <ProgressIndicator
                    size="small"
                    color={colors.graditnBtnTextColor}
                  />
                ) : (
                  'Add'
                )
              }
              disabled={activityIntakeSelector.loading}
              titleStyle={styles.titleStylebtn}
              gradColors={[colors.signupLightBlue, colors.signupDarkBlue]}
              gradStyle={styles.gradStyles}
              container={styles.containerBtn}
              isLinearGradiantApplied={true}
            />
            {/* )} */}
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(commonStackIdentifier.activity_list);
              onBackdropPress();
            }}
            style={{marginTop: 40, marginRight: 10, alignItems: 'flex-end'}}>
            <Text
              style={{
                // textDecorationLine: 'underline',
                // color: colors.black,
                fontSize: fontsizes.FONT_12Px_H6,
                fontFamily: font.Proximanovaexcn_Regular,
                color: colors.textInputTextColor,
              }}>
              See Logs
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ModalNew>
  );
};

export default ActivityIntakeBottomSheet;
