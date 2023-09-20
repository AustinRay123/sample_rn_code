import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TouchableWithoutFeedback,
} from 'react-native';
import React from 'react';
import {
  VictoryBar,
  VictoryChart,
  LineChart,
  VictoryLine,
  VictoryTheme,
  VictoryAxis,
} from 'victory-native';
import {Defs, Stop, LinearGradient, Svg} from 'react-native-svg';
import colors from '../../constants/colors';

const LineChartComponent = props => {
  return (
    <View style={{}}>
      <Svg>
        <VictoryChart
          theme={VictoryTheme.material}
          height={300} // Change this to fit your desired chart height
          domainPadding={{x: 20}}
          padding={{top: 20, bottom: 40, left: 35, right: 50}}>
          <Defs>
            <LinearGradient id="gradientStroke" x1="0" s x2="1" y2="1">
              <Stop offset="50%" stopColor="#29ABE2" />
              <Stop offset="100%" stopColor="#2F2F82" />
            </LinearGradient>
          </Defs>
          <VictoryLine
            interpolation="natural"
            theme={VictoryTheme.material}
            style={{
              data: {stroke: 'url(#gradientStroke)', strokeWidth: 5},
              labels: {padding: -20},
            }}
            events={[
              {
                target: 'data',
                eventHandlers: {
                  onPress: () => {
                    console.log('first');
                  },
                },
              },
            ]}
            data={props.data}
            x="x" // Use 'x' property for x-axis values
            y="value" // Use 'value' property for y-axis values
          />
          <VictoryAxis // Configure the x-axis
            scale={'linear'}
            tickValues={props.tickValues} // Set tick values
            tickFormat={t => t} // Display the tick values as they are
          />
          <VictoryAxis // Configure the y-axis
            scale={'linear'}
            dependentAxis // Indicate that this axis is dependent (y-axis)
            tickFormat={t => `${t}`} // Format y-axis tick labels
            domain={props.domain} // Start y-axis at 0
          />
        </VictoryChart>
      </Svg>
    </View>
  );
};

export default LineChartComponent;

const styles = StyleSheet.create({});
