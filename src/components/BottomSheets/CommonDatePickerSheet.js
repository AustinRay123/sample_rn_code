import React, {useCallback, useMemo, useRef, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
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

const CommonDatePickerSheet = ({
  visibility,
  onBackdropPress,
  onItemClick,
  isTimePicker = false,
  mode = 'date',
  isTitleVisible = false,
  titleText = '',
  selectedDate,
}) => {
  const styles = useStyles();
  const {colors} = useTheme();
  const [date, setDate] = useState(moment(selectedDate).toDate());
  const [selectedTime, setSelectedTime] = useState(new Date());

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
        {isTitleVisible && <Text style={styles.titleText}>{titleText}</Text>}
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
              mode={mode}
              maximumDate={new Date()}
              fadeToColor={colors.backgroundWhite}
              // style={{backgroundColor:colors.backgroundWhite}}
            />
          )}
        </TouchableOpacity>

        <RoundedButtom
          onPress={() => {
            onBackdropPress();
            onItemClick(
              date,
              //   isTimePicker
              //     ? moment(selectedTime).format('h:mm A')
              //     : moment(date).format('DD/MM/YYYY'),
            );
          }}
          title={'Save changes'}
          titleStyle={styles.titleStylebtn}
          gradColors={[colors.signupLightBlue, colors.signupDarkBlue]}
          gradStyle={styles.gradStyles}
          container={[styles.containerBtn, {marginTop: dimens.h2}]}
          isLinearGradiantApplied={true}
        />
      </View>
    </ModalNew>
  );
};

export default CommonDatePickerSheet;
