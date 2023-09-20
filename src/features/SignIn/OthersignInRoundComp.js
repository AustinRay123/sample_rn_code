import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {dimens} from '../../constants/dimens';

const OthersignInRoundComp = ({
  mainViewStle = {},
  onPress,
  imgSrc,
  imgStyle = {},
  textName = '',
  toucbaleStyle = {},
  textStyle={}
}) => {
  return (
    <View style={mainViewStle}>
      <TouchableOpacity style={[toucbaleStyle]} onPress={onPress}>
        <Image source={imgSrc} style={imgStyle} />
      </TouchableOpacity>
      <Text style={textStyle}>{textName}</Text>
    </View>
  );
};

export default OthersignInRoundComp;
