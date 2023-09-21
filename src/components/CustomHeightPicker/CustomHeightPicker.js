import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import Modal from 'react-native-modal';
import {dimens} from '../../constants/dimens';
import RoundedButtom from '../RoundedButtom';
import {useTheme} from '@react-navigation/native';
import useStyles from './heightPickerStyle';
import {useDispatch, useSelector} from 'react-redux';
import moment from 'moment';
import {editHeight, userHeightDetails} from '../../commonSlices/weight.slice';
import {userProfileDetails} from '../../commonSlices/profile.slice';
import ProgressIndicator from '../ProgressIndicator';

const CustomHeightPicker = ({
  isVisible,
  onClose,
  onBackdropPress,
  selectedValue,
}) => {
  const styles = useStyles();
  const dispatch = useDispatch();
  const selector = useSelector(state => state.createpassReducer);
  const myProfileSelector = useSelector(state => state.myProfileReducer);
  const weightSelector = useSelector(state => state.myWeightReducer);
  const [selectedHeight, setSelectedHeight] = useState(selectedValue);
  const [centerIndex, setCenterIndex] = useState(0);
  const flatListRef = useRef(null);
  const {colors} = useTheme();
  const [height, setHeight] = React.useState(null);
 
  const heightData = Array.from({length: 8}, (_, index) => ({
    key: `${index}`,
    value: `${index + 1}`,
  }));

  useEffect(() => {
    updateWeights();
  }, [myProfileSelector?.myProfileData?.measurement_metric]);

  const unit = myProfileSelector?.myProfileData?.measurement_metric;

  const updateWeights = () => {
    if (unit == 'lbs_ft') {
      setHeight(
        Array.from({length: 8}, (_, index) => ({
          key: `${index}`,
          value: `${index + 1}`,
        })),
      );
    } else {
      // this is for kg_cm
      setHeight(
        Array.from({length: 162}, (_, index) => ({
          key: `${index}`,
          value: `${index + 54}`,
        })),
      );
    }
  };

  const apiParams = () => {
    const currentDate = selector.birthDate
      ? selector.birthDate
      : moment().format('DD/MM/YYYY');
    const currentTime = selector.time
      ? selector.time
      : moment().format('HH:mm:ss');

    const params = {
      date: currentDate,
      time: currentTime,
      height: weightSelector.height,
    };
    dispatch(userHeightDetails(params)).then(() => {
      dispatch(userProfileDetails());
      onClose();
    });
  };

  const renderHeightItem = ({item, index}) => {
    const isSelected = item.value === selectedHeight;

    return (
      <TouchableOpacity
        style={{
          paddingVertical: 10,
          alignItems: 'center',
          backgroundColor: isSelected ? '#ccc' : 'transparent',
          borderRadius: 20,
          width: dimens.h20,
        }}
        onPress={() => handleHeightSelect(item.value, index)}>
        <Text style={{fontSize: 18, color: isSelected ? 'white' : 'black'}}>
          {item.value}
        </Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    scrollToCenter();
  }, [isVisible]);

  const handleHeightSelect = (height, index) => {
    setSelectedHeight(height);
    setCenterIndex(index);
    dispatch(editHeight(height));
  };

  const scrollToCenter = () => {
    const centerIndex = Math.floor(height?.length / 2);
    setCenterIndex(selectedValue);

    const itemHeight = 50; // Adjust this based on your item height
    const offset = centerIndex * itemHeight;

    if (flatListRef.current) {
      flatListRef.current.scrollToOffset({offset, animated: true});
    }
  };

  useEffect(() => {
    scrollToSelectedValue();
  }, [isVisible]);

  useEffect(() => {
    setSelectedHeight(selectedValue);
  }, [selectedValue]);

  const scrollToSelectedValue = () => {
    const selectedIndex = height?.findIndex(
      item => item.value === selectedValue,
    );

    if (selectedIndex !== -1 && flatListRef.current) {
      flatListRef.current.scrollToOffset({
        index: selectedIndex,
        animated: true,
      });
    }
  };

  return (
    <Modal
      animationInTiming={600}
      animationOutTiming={400}
      backdropTransitionInTiming={800}
      backdropTransitionOutTiming={800}
      style={styles.modalContainer}
      isVisible={isVisible}
      onBackdropPress={onBackdropPress}
      onSwipeComplete={onBackdropPress}
      propagateSwipe={true}
      swipeDirection={['down']}>
      <View style={styles.mainContainer}>
        <StatusBar
          translucent
          backgroundColor={colors.black}
          barStyle={'dark-content'}
        />
        <Text style={styles.textStyleHeight}>Height In</Text>

        <FlatList
          showsVerticalScrollIndicator={false}
          ref={flatListRef}
          data={height}
          renderItem={renderHeightItem}
          keyExtractor={item => item.key}
          contentContainerStyle={styles.flatListContainer}
        />
        <RoundedButtom
          onPress={() => apiParams()}
          title={
            weightSelector?.weightListLoading ? (
              <ProgressIndicator size="small" color={colors.white} />
            ) : (
              'Select Height'
            )
          }
          disabled={weightSelector?.weightListLoading}
          titleStyle={styles.titleStyle}
          gradColors={[colors.signupLightBlue, colors.signupDarkBlue]}
          gradStyle={styles.gradeStyle}
          container={styles.rButtonContainer}
        />
      </View>
    </Modal>
  );
};

export default CustomHeightPicker;
