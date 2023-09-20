import { View, Text } from 'react-native'
import React from 'react'
import { CreateProfile as CreateProfComp } from '../features'
const CreateProfile = (props) => {
  return (
    <CreateProfComp props={props}/>
  )
}

export default CreateProfile