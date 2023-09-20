import React, {useCallback, useMemo, useRef, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
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

const ActivityModal = ({
  visibility,
  onBackdropPress,
  onItemClick,
  isTimePicker = false,
  mode = 'date',
  isTitleVisible = false,
  titleText = '',
  selectedDate,
  data = [],
  selectedItem,
  onSaveClick,
}) => {
  const styles = useStyles();
  const {colors} = useTheme();
  const [date, setDate] = useState(selectedDate);
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
      //swipeDirection={['down']}

      // deviceHeight={t}
      isVisible={visibility}>
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
        <View style={{height: dimens.h25, marginTop: 10}}>
          <FlatList
            scrollEnabled={true}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            data={data ? data : []}
            renderItem={({item, index}) => {
              return (
                <TouchableOpacity
                  style={{
                    paddingVertical: 10,
                    alignItems: 'center',
                    backgroundColor:
                      selectedItem == item ? '#ccc' : 'transparent',
                    borderRadius: 2,
                    width: dimens.h40,
                    //marginTop: dimens.h2,
                  }}
                  onPress={() => {
                    onItemClick(item);
                  }}>
                  <Text style={styles.itemText}>{item}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>

        <RoundedButtom
          onPress={() => {
            onBackdropPress();
            onSaveClick();
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

export default ActivityModal;
