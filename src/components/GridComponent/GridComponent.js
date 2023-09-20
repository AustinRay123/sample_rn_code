import {useTheme} from '@react-navigation/native';
import React, {useState} from 'react';
import {View, StyleSheet, Text, Image, TouchableOpacity} from 'react-native';
import font from '../../constants/fonts';
import {fontsizes} from '../../constants/dimens';
import useStyles from './GridComponentStyle';

const GridComponent = ({data, questionIndex, selectedBox, setSelectedBox}) => {
  const {colors} = useTheme();
  const styles = useStyles();
  // const [selectedBox, setSelectedBox] = useState(null);

  const handleBoxPress = boxIndex => {
    setSelectedBox(boxIndex === selectedBox ? null : boxIndex);
  };

  // console.log('data-----', data[questionIndex]);

  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.box, selectedBox === 1 && styles.selectedBox]}
          onPress={() => handleBoxPress(1)}>
          <View style={{marginVertical: 7}}>
            <Text style={[styles.textStyle, {color: colors.smallTextColors}]}>
              Sofa Superstar
            </Text>
            <Text
              style={{
                textAlign: 'center',
                color: colors.smallTextColors,
                fontFamily: font.Proximanovaexcn_Regular,
                fontSize: fontsizes.FONT_12PX,
              }}>
              Rarely
            </Text>
          </View>

          <View>
            <Image
              source={require('../../assets/user.png')}
              style={{
                width: 70,
                height: 70,
                resizeMode: 'contain',
                alignSelf: 'center',
              }}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.box, selectedBox === 2 && styles.selectedBox]}
          onPress={() => handleBoxPress(2)}></TouchableOpacity>
      </View>
      <View style={styles.row}>
        <TouchableOpacity
          style={[styles.box, selectedBox === 3 && styles.selectedBox]}
          onPress={() => handleBoxPress(3)}></TouchableOpacity>
        <TouchableOpacity
          style={[styles.box, selectedBox === 4 && styles.selectedBox]}
          onPress={() => handleBoxPress(4)}></TouchableOpacity>
      </View>
    </View>
  );
};

export default GridComponent;
