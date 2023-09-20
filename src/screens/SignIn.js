import { View, Text } from 'react-native'
import React from 'react'
import {SignIn as SignCommp} from '../features';

const SignIn = (props) => {
  return (
    <SignCommp props={props} />
  )
}

export default SignIn