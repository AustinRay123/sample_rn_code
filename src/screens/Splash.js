import { StyleSheet, Text, View } from 'react-native'
import React from 'react';
import { Splash as SplashComponent } from '../features';

const Splash = (props) => {
  return (
    <SplashComponent props={props}/>
  )
}

export default Splash

const styles = StyleSheet.create({})