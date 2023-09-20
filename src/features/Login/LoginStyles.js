import { StyleSheet, Platform } from "react-native";
import { dimens } from "../../constants/dimens";


import { useTheme } from "@react-navigation/native";
import React from "react";

const getStyles = (props) =>
  StyleSheet.create({
    titleStyle: {
      color: props.colors.white,
    },
    container :{
      flex:1,
      backgroundColor:props.colors.black,
      
    }
 
  });

function useStyles() {
  const { colors } = useTheme();
  // We only want to recompute the stylesheet on changes in color.
  const styles = React.useMemo(() => getStyles({ colors }), [colors]);
  return styles;
}

export default useStyles;
