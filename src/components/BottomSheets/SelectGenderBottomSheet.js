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
import useStyles from './sltgenbottomsheetstyle';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {FlatList, ScrollView} from 'react-native-gesture-handler';

const genderdataLocal = [
  {id: 1, name: 'Male'},
  {id: 2, name: 'Female'},
  {id: 3, name: 'Prefer not to say'},
];
const SelectGenderBottomSheet = ({
  visibility,
  onBackdropPress,
  onItemClick,
}) => {
  const styles = useStyles();
  const {colors} = useTheme();

  const renderGenderItem = useCallback(
    ({item}) => (
      <TouchableOpacity
        style={styles.itemContainer}
        onPress={() => {
          onBackdropPress();
          onItemClick(item);
        }}>
        <Text style={styles.itemText}>{item.name}</Text>
      </TouchableOpacity>
    ),
    [],
  );

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
          backgroundColor: 'white',
          padding: 20,
          paddingVertical: 40,
          paddingTop: 10,
          height: dimens.h25,
        }}>
        <Text style={styles.titleText}>{'Select Gender'}</Text>
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
        <TouchableOpacity style={{marginTop: dimens.h1}}>
          <FlatList
            data={genderdataLocal}
            style={{height: dimens.h20}}
            renderItem={renderGenderItem}
            keyExtractor={item => item.id.toString()}
          />
        </TouchableOpacity>
      </View>
    </ModalNew>
  );
};

export default SelectGenderBottomSheet;
