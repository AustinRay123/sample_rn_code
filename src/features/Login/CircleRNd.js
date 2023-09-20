import { StyleSheet, Text, View,Dimensions , Easing } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import React, { useEffect, useRef ,useState} from 'react'
import { Svg, Circle, RadialGradient, Stop,LinearGradient ,Path, G, Rect, Defs, ClipPath } from "react-native-svg";
import Animated, {
  useAnimatedProps,
  withSpring,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import AnimatedCircularProgress from '../../components/AnimatedCircularProgress';
// import { AnimatedCircularProgress } from 'react-native-circular-progress';
import{ AnimatedCircle as AnimatedCircleV2} from './AnimatedCircle';
import {dimens} from "../../constants/dimens"
import { fontsizes } from '../../constants/dimens';
import { increment } from '../../commonSlices/splash.slice';
import { useDispatch,useSelector } from 'react-redux';
const colorsss =[
  "#FFFF8A",
  "#FFA500",
  
  // "#d12a78",
  // "#0800ff",
  // "#1f93ab",
  // "#ec3466",
]

const Signup = () => {
  const {width, height} = Dimensions .get('screen');
const Circle_Length = 1000;
const Radius = Circle_Length / (2 * Math.PI);
const selecotr = useSelector((state)=>state.counterReducer)
const dispatch = useDispatch();
// const animatedValue = useRef(new Animated.Value(0)).current;

const [time, setTime] = useState(0);




useEffect(() => {
  

  const interval = setInterval(() => {
    setTime(prevTime => prevTime + 1);
  }, 1000);

  return () => clearInterval(interval);
}, []);

const formatTime = timeInSeconds => {
  const hours = Math.floor(timeInSeconds / 3600);
  const minutes = Math.floor((timeInSeconds % 3600) / 60);
  const seconds = timeInSeconds % 60;

  const formattedHours = String(hours).padStart(2, '0');
  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(seconds).padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
};

const handlePress = () => {
 
};
useEffect(() => {
  
  console.log("Child component pressed!" ,selecotr.value);
  
  
}, [selecotr.value])


const CircleUI = () => {
  const radius = 15; // Radius of the circle
  const strokeWidth = 8; // Width of the stroke
  const colors = ['red', 'green', 'blue']; // Array of colors for the stroke

  const circumference = 1.5 * Math.PI * radius; // Circumference of the circle

  return (
    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
      <Svg width={2 * radius} height={2 * radius}>
        {colors.map((color, index) => {
          const offset = index * (circumference / colors.length); // Offset for each color stroke

          return (
            <Circle
              key={index}
              cx={radius}
              cy={radius}
              r={radius - strokeWidth / 2}
              stroke={color}
              strokeWidth={strokeWidth}
              strokeDasharray={`${circumference} ${circumference}`}
              strokeDashoffset={offset}
              strokeLinecap="round"
              fill="none"
            />
          );
        })}
      </Svg>
    </View>
  );
};


  return (
    <View style={{flex: 1}}>
      {/* <AnimatedCircularProgress
        rotation={360}
          size={width / 1.5}
          duration={1000}
          width={15}
          fill={100}
          tintColor={colorsss}
          // tintColorSecondary="url(#grad)"
          backgroundColor={'#F8F8F8'}
          padding={10}
          renderCap={({center}) => (
            <TouchableOpacity style={{width:center.x,height:center.y}}>
            <Circle cx={center.x} cy={center.y} r="15" fill="black" />
             </TouchableOpacity>
          )}
          renderCap2={({center}) => (
            <Circle cx={center.x} cy={center.y} r="12" fill="green" />
          )}
          // style={{zIndex: 1}}
          childrenContainerStyle={{
            // zIndex: 1
          }}
          children={callback => (
                <View
                  style={{
                    // flexDirection: 'row',
                    // backgroundColor: 'pink',
                    zIndex: 1,
                    // position: 'absolute'
                  }}>
                      
                  
               
              </View>
          )}
        /> */}
      <TouchableOpacity
        onPress={() => {
       
          dispatch(increment());
        }}>
        <Text>{formatTime(time)}</Text>
      </TouchableOpacity>
      {CircleUI()}
    </View>
  );
}

export default Signup

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});