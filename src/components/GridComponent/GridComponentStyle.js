import {StyleSheet, Platform} from 'react-native';
import {dimens, fontsizes} from '../../constants/dimens';

import {useTheme} from '@react-navigation/native';
import React from 'react';
import font from '../../constants/fonts';

const getStyles = props =>
  StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column', // Use 'column' to stack rows vertically
      justifyContent: 'center',
      alignItems: 'center',
      bottom: 50,
    },
    row: {
      flexDirection: 'row', // Use 'row' to display boxes horizontally in a row
      justifyContent: 'center', // Center the boxes horizontally within the row
      alignItems: 'center', // Center the boxes vertically within the row
      marginBottom: 20,
    },
    box: {
      borderRadius: 10,
      width: 140,
      height: 140,
      backgroundColor: props.colors.white, // Replace with your desired color
      marginHorizontal: 10, // Add some margin between the boxes
      padding: 10,
    },
    selectedBox: {
      borderColor: props.colors.deepcyan, // Border color for selected box
      borderWidth: 1,
    },
    textStyle: {
      textAlign: 'center',
      fontFamily: font.Proximanova_Bold,
      fontSize: fontsizes.FONT_16PX,
    },
  });

function useStyles() {
  const {colors} = useTheme();
  // We only want to recompute the stylesheet on changes in color.
  const styles = React.useMemo(() => getStyles({colors}), [colors]);
  return styles;
}

export default useStyles;
