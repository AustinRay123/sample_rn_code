
import React, {useRef, useEffect} from 'react';


import {SafeAreaView, StyleSheet, View, Text} from 'react-native';
import LottieView from 'lottie-react-native';
import { Button } from 'react-native';
import useStyles from "./LoginStyles";
const Login = ({navigation}) => {
  let animationRef = useRef();
  const styles = useStyles();
  useEffect(() => {
    // To play complete animation
    animationRef.play();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.container}>
        <Text style={styles.header}>
          React Native Lottie Component for Android and iOS
        </Text>
        <LottieView
          ref={(animation) => {
            animationRef = animation;
          }}
          source={require('../../assets/8881-wave.json')}
          autoPlay
          loop
        />
      </View>
      <Button title='go to' onPress={()=>{ navigation.navigate("Home2")}}/>
      <Text style={styles.smallText}>www.aboutreact.com</Text>
    
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  smallText: {
    fontSize: 18,
    textAlign: 'center',
  },
});