import { View,Text  } from 'react-native'
import React from 'react'
import MaskedView from '@react-native-masked-view/masked-view';
import LinearGradient from "react-native-linear-gradient";

const GradientTextComp = (props) => {
  return (
    <MaskedView maskElement={<Text {...props} />}>
    <LinearGradient
      colors={props.colors}
      locations={[0.3, 1]}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
    >
      <Text {...props} style={[props.style, { opacity: 0 }]} />
    </LinearGradient>
  </MaskedView>
  )
}

export default GradientTextComp