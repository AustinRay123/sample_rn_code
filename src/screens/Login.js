import { Login as LoginComponent } from "../features";

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Login = ({ route, navigation }) => {
   
  return (
    <LoginComponent navigation={navigation}/>
  )
}

export default Login

const styles = StyleSheet.create({})