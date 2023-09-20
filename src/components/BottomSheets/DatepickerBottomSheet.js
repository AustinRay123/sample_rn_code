import React, {useCallback, useMemo, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import ModalNew from 'react-native-modal';
import {dimens, fontsizes} from '../../constants/dimens';
import font from '../../constants/fonts';
import useStyles from './DatePickerStyle';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import DatePicker from 'react-native-date-picker';
import {useState} from 'react';
import RoundedButtom from '../RoundedButtom';
import moment from 'moment';
import {useSelector} from 'react-redux';
import ProgressIndicator from '../ProgressIndicator';

const genderdataLocal = [
  {id: 1, name: 'Male'},
  {id: 2, name: 'Female'},
  {id: 3, name: 'Prefer not to say'},
];
const DatepickerBottomSheet = ({
  visibility,
  onBackdropPress,
  onItemClick,
  isTimePicker = false,
  isRedBtn = false,
  isHeaderTitle = false,
  headerTitle,
  selectedDate = new Date(),
}) => {
  const styles = useStyles();
  const {colors} = useTheme();
  const [date, setDate] = useState(
    // moment(selectedDate, 'MM/DD/YYYY').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]'),
    moment(selectedDate).toDate(),
  );
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  // const [date, setDate] = useState(moment(selectedDate).format('DD/MM/YYYY'));
  const myProfileSelector = useSelector(state => state.myProfileReducer);
  // console.log('selectedTime------', moment(selectedTime).format('h:mm:ss'));

  const formattedTime = moment(selectedTime, 'h:mm:ss A').format('HH:mm:ss');
  console.log('formattedTime----', formattedTime);

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
      <View
        style={{
          borderRadius: 20,
          backgroundColor: colors.backgroundWhite,
          alignItems: 'center',
          //   padding: 20,
          //   paddingVertical: 40,
          //   paddingTop: 10,
          height: dimens.h40,
        }}>
        <Text style={styles.titleText}>
          {!isHeaderTitle ? 'Select Birthdate' : headerTitle}
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
        <TouchableOpacity style={{marginTop: dimens.h1, alignItems: 'center'}}>
          {isTimePicker ? (
            <DatePicker
              theme="light"
              date={selectedTime}
              onDateChange={setSelectedTime}
              mode={'time'}
              format="HH:mm"
              // maximumDate={new Date()}
              fadeToColor={colors.backgroundWhite}
              // style={{backgroundColor:colors.backgroundWhite}}
            />
          ) : (
            <DatePicker
              theme="light"
              date={date}
              onDateChange={setDate}
              mode={'date'}
              maximumDate={new Date()}
              // androidVariant={'iosClone'} // or 'iosClone'
              fadeToColor={colors.backgroundWhite}
              // style={{backgroundColor:colors.backgroundWhite}}
            />
          )}
        </TouchableOpacity>

        <RoundedButtom
          onPress={() => {
            onItemClick(
              // date,
              isTimePicker
                ? moment(selectedTime).format('HH:mm:ss')
                : moment(date).format('DD/MM/YYYY'),
            );

            onBackdropPress();
          }}
          title={'Save Changes'}
          // title={
          //   myProfileSelector?.loading ? (
          //     // <ActivityIndicator size="small" color={colors.white} />
          //     <ProgressIndicator size="small" color={colors.white} />
          //   ) : (
          //     'Save Changes'
          //   )
          // }
          titleStyle={styles.titleStylebtn}
          gradColors={
            isRedBtn
              ? [colors.deepmagenta, colors.deepmagenta]
              : [colors.signupLightBlue, colors.signupDarkBlue]
          }
          gradStyle={styles.gradStyles}
          container={[styles.containerBtn, {marginTop: dimens.h2}]}
          isLinearGradiantApplied={true}
          disabled={myProfileSelector?.loading}
        />
      </View>
    </ModalNew>
  );
};

export default DatepickerBottomSheet;
