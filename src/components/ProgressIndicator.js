import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ProgressIndicator = props => {
  const {size, color, style} = props;
  return (
    <View>
      <ActivityIndicator
        size={props.size}
        color={props.color}
        style={props.style}
      />
    </View>
  );
};

export default ProgressIndicator;

const styles = StyleSheet.create({});
