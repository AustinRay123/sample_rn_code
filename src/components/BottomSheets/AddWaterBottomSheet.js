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
  StatusBar,
} from 'react-native';
import {useNavigation, useTheme} from '@react-navigation/native';
import {TouchableOpacity as TouchableOpacityGesture} from 'react-native-gesture-handler';
import RBSheet from 'react-native-raw-bottom-sheet';
import ModalNew from 'react-native-modal';
import {dimens, fontsizes} from '../../constants/dimens';
import font from '../../constants/fonts';
import useStyles from './AddWasterStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TextinputComp} from '../TextinputComp';
import {useDispatch, useSelector} from 'react-redux';
import RoundedButtom from '../RoundedButtom';
import {AppThemeContext, commonStackIdentifier} from '../../../App';
import * as AsyncStore from '../../asyncstorage/index';
import {
  updateDateTime,
  updateGoal,
  updateValue,
  updateDateTimeErrorMsg,
  updateGoalErrorMsg,
  updateValueErrorMsg,
  updateDateTimeIsError,
  updateGoalIsError,
  updateValueIsError,
  clearState,
  waterIntakeSlice,
  addWaterIntake,
} from '../../commonSlices/waterIntakeSlice';
import image from '../../constants/image';
import moment from 'moment';
import _ from 'lodash';
import CommonDatePickerSheet from './CommonDatePickerSheet';
import ProgressIndicator from '../ProgressIndicator';
const AddWeightBottomSheet = props => {
  const {
    visibility,
    onBackdropPress,
    onItemClick,
    prop,
    waterValue,
    waterGoal,
  } = props;
  const styles = useStyles();
  const {colors} = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [count, setCount] = useState(14);
  const [isDatetimePickerVisible, setIsDatetimePickerVisible] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState(new Date());
  const {AppThemeName, updateAppTheme} = useContext(AppThemeContext);
  // const selector = useSelector(state => state.createpassReducer);
  const waterIntakeSelector = useSelector(state => state.waterIntakeReducer);
  // console.log('waterIntakeSelector', waterIntakeSelector);
  const [valueMl, setValueMl] = useState('');

  useEffect(() => {
    if (waterIntakeSelector.goal === '') {
      dispatch(updateGoal(waterGoal.toString()));
    }
    return () => {};
  }, []);
  useEffect(() => {
    if (waterIntakeSelector.checkDataStatus === 'fulfilled') {
      dispatch(clearState());
      onBackdropPress();
    }
  }, [addWaterIntake, waterIntakeSelector.checkDataStatus]);

  const onAddWater = () => {
    // if (_.isEmpty(waterIntakeSelector.dateTime)) {
    //   dispatch(updateDateTimeIsError(true));
    //   return;
    // }
    if (_.isEmpty(waterIntakeSelector.value)) {
      dispatch(updateValueIsError(true));
      return;
    }
    if (_.isEmpty(waterIntakeSelector.goal)) {
      dispatch(updateGoalIsError(true));
      return;
    }

    const date = !!waterIntakeSelector.dateTime
      ? moment(waterIntakeSelector.dateTime).format('DD/MM/YYYY HH:mm:ss')
      : moment(new Date()).format('DD/MM/YYYY HH:mm:ss');
    const data = {
      date_time: date,
      value: waterIntakeSelector.value,
      goal: waterIntakeSelector?.goal ? waterIntakeSelector?.goal : waterGoal,
    };
    console.log('data', data);
    dispatch(addWaterIntake(data));
    // dispatch(clearState());
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
      <StatusBar
        translucent
        // backgroundColor="transparent"
        backgroundColor={colors.black}
        barStyle={'dark-content'}
      />
      <KeyboardAvoidingView
        style={{
          flex: 1, marginTop: dimens.h10
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
              console.log('item', item);
              dispatch(updateDateTime(item.toString()));
              setSelectedDateTime(item);
            }}
            mode={'datetime'}
            // selectedDate={new Date()}
            selectedDate={
              waterIntakeSelector?.dateTime == ''
                ? new Date()
                : waterIntakeSelector?.dateTime
            }
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
          <Text style={styles.presentStyle}>{'Water Intake'}</Text>
          <TouchableOpacity
            style={{position: 'absolute', right: 10, top: 10}}
            //onPress={onBackdropPress}
            onPress={() => {
              onBackdropPress();
              dispatch(clearState());
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
                {(waterValue / 1000).toFixed(2) + '/' + waterGoal + 'L'}
              </Text>
              <Text style={styles.targetFirst2}>WATER</Text>
            </View>
            <View>
              <Image
                source={
                  AppThemeName == 'MyDefaultThemeDay'
                    ? image.ic_cupCoffe_orange
                    : image.ic_cupCoffe_blue
                }
                resizeMode="contain"
                style={{
                  width: dimens.w15,
                  height: dimens.h10,
                }}
              />
            </View>
          </View>
          <View style={{marginTop: dimens.h2}}>
            <TouchableOpacity
              onPress={() => {
                {
                  /* setIsDatetimePickerVisible(true); */
                }
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
                  {waterIntakeSelector?.dateTime !== ''
                    ? moment(waterIntakeSelector?.dateTime).format(
                        'MMM DD, hh:mm A',
                      )
                    : moment(new Date()).format('MMM DD, hh:mm A')}{' '}
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <Text style={styles.titleText2}>Value</Text>

          <TextinputComp
            placeholder={'200ml'}
            style={styles.textInputstyle}
            mode={'flat'}
            maxLength={4}
            keyboardType="numeric"
            onChangeText={text => {
              dispatch(updateValue(text));
              dispatch(updateValueIsError(false));
              //setCount(14 - text.length);
              //setValueMl(text + 'ml');
            }}
            //value={valueMl}
            value={waterIntakeSelector.value}
            error={waterIntakeSelector.valueIsError}
            errorMsg={waterIntakeSelector.valueErrorMsg}
          />

          <Text style={styles.titleText2}>Goal</Text>

          <TextinputComp
            placeholder={waterGoal.toString()}
            style={styles.textInputstyle}
            mode={'flat'}
            maxLength={4}
            keyboardType="numeric"
            onChangeText={text => {
              dispatch(updateGoal(text));
              dispatch(updateGoalIsError(false));
            }}
            value={waterIntakeSelector.goal}
            error={waterIntakeSelector.goalIsError}
            errorMsg={waterIntakeSelector.goalErrorMsg}
          />

          <View style={{marginTop: 30}}>
            {/* {waterIntakeSelector.loading ? (
              <ActivityIndicator size={'small'} />
            ) : ( */}
            <RoundedButtom
              onPress={() => {
                onAddWater();
              }}
              title={
                waterIntakeSelector.loading ? (
                  <ProgressIndicator size={'small'} color={colors.white} />
                ) : (
                  'Add'
                )
              }
              disabled={waterIntakeSelector.loading}
              titleStyle={styles.titleStylebtn}
              gradColors={[colors.signupLightBlue, colors.signupDarkBlue]}
              gradStyle={styles.gradStyles}
              container={styles.containerBtn}
              isLinearGradiantApplied={true}
            />
            {/*  )} */}
          </View>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate(commonStackIdentifier.water_list);
              onBackdropPress();
            }}
            style={{marginTop: 70, marginRight: 10, alignItems: 'flex-end'}}>
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

export default AddWeightBottomSheet;
