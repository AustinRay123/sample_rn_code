import {StyleSheet, Text, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {
  VictoryBar,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
} from 'victory-native';
import {Defs, Stop, LinearGradient, Svg} from 'react-native-svg';
import {useTheme} from '@react-navigation/native';
import {AppThemeContext} from '../../../App';
import {dimens} from '../../constants/dimens';

const BarChartComponent = props => {
  const {colors} = useTheme();
  const {AppThemeName} = useContext(AppThemeContext);
  const getBarColor = datum => {
    // Your dynamic conditions here
    if (datum.status === 'unfinished') {
      return colors.grayBtnBg; // Color for Unfinished bars
    } else {
      return `url(#gradientStroke)`; // Color for Goal Reached bars
    }
  };
  // console.log('PROPS', props?.yTickValue);
  const yvalue = [0, 4, 8, 12, 16, 20, 24];
  const newValues = props?.yTickValue;
  const newArray = [...yvalue];
  newValues.forEach(value => {
    if (value > 24) {
      newArray.push(value); // Add the value to the newArray if it's greater than 24
    }
  });
  // console.log('newArray', newArray);
  return (
    <View>
      <Svg>
        <VictoryChart
          theme={VictoryTheme.material}
          height={dimens.h40} // Change this to fit your desired chart height
          // minDomain={{y: 0}}
          domainPadding={{x: dimens.w2}}
          // domain={{y: [0, 8]}}
          // padding={{top: 20, bottom: 40, left: 40, right: 40}}
        >
          <Defs>
            {AppThemeName == 'MyDefaultThemeDay' ? (
              <LinearGradient id="gradientStroke" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0%" stopColor={colors.gradintlightYellow} />
                <Stop offset="100%" stopColor={colors.gradintdarkOrange} />
              </LinearGradient>
            ) : (
              <LinearGradient id="gradientStroke" x1="0" y1="0" x2="0" y2="1">
                <Stop offset="0%" stopColor={colors.deepcyan} />
                <Stop offset="100%" stopColor={colors.indigo} />
              </LinearGradient>
            )}
          </Defs>

          <VictoryAxis
            crossAxis
            // scale={'linear'}
            // Set custom tick values for the x-axis
            tickValues={props?.xTickValues}
            standalone={false}
            // domain={[5, 0]}
            theme={VictoryTheme.material}
            style={{
              // grid: '1',
              ticks: {
                fill: 'transparent',
              },
              tickLabels: {fontSize: 12, padding: 5, fill: colors.graphText},
              axis: {stroke: 'none'},
            }}
          />
          {/* <VictoryAxis
            dependentAxis
            crossAxis // Configure the y-axis
            // domain={[0, 24]}
            theme={VictoryTheme.material}
            standalone={false}
            style={{
              axis: {stroke: 'none'},
              tickLabels: {fill: colors.graphText},
            }}
            tickValues={props?.yTickValue}
            // tickValues={props.yTickValue === 0 ? [] : props.yTickValue}
            tickFormat={t => `${t}`} // Format y-axis tick labels
            // tickFormat={t => (props.yTickValue === 0 ? '' : `${t}`)}
          /> */}
          {/* <VictoryBar
            data={props?.data}
            barWidth={7}
            cornerRadius={{top: 5, bottom: 5}}
            x="week_day"
            y="fast_hours"
            labels={({datum}) => datum.fast_hours}
            // y="value"
            label={() => ''}
            style={{
              // data: {
              //   fill: ({datum}) => {
              //     return `url(#gradientStroke)`;
              //   },
              // },
              data: {
                fill: ({datum}) => {
                  if (parseInt(datum.fast_hours) > 0) {
                    // Show the bar with the specified color logic
                    return getBarColor(datum); // Use the dynamic color function here
                  } else {
                    return 'transparent'; // Set the color to transparent if conditions aren't met
                  }
                },
                // getBarColor(datum),
                // datum.x == 'Wed' || datum.x == 'Sun'
                //   ? '#CCCCCC'
                //   : `url(#gradientStroke)`,
                // stroke: ({index}) => (+index % 2 === 0 ? '#000000' : '#c43a31'),
                // fillOpacity: 0.7,
                strokeWidth: 1,
              },
            }}
          /> */}
          <VictoryAxis
            crossAxis
            dependentAxis
            style={{
              axis: {stroke: 'none'},
              tickLabels: {fill: colors.graphText},
            }}
            tickValues={newArray}
          />
          <VictoryBar
            barWidth={7}
            cornerRadius={{top: 5, bottom: 5}}
            data={props?.data}
            x="week_day"
            y="fast_hours"
            labels={({datum}) => {
              if (datum.fast_label != '') {
                return datum.fast_label; // Use the dynamic color function here
              } else {
                return; // Set the color to transparent if conditions aren't met
              }
            }} ////For upper label value
            style={{
              labels: {fill: colors.bigTextColors, fontSize: 10},
              data: {
                fill: ({datum}) => {
                  if (parseInt(datum.fast_hours) >= 0.0) {
                    // Show the bar with the specified color logic
                    return getBarColor(datum); // Use the dynamic color function here
                  } else {
                    return 'transparent'; // Set the color to transparent if conditions aren't met
                  }
                },
                // getBarColor(datum),
                // datum.x == 'Wed' || datum.x == 'Sun'
                //   ? '#CCCCCC'
                //   : `url(#gradientStroke)`,
                // stroke: ({index}) => (+index % 2 === 0 ? '#000000' : '#c43a31'),
                // fillOpacity: 0.7,
                strokeWidth: 1,
              },
            }}
            // labelComponent={<VictoryLabel dy={30} />}
          />
        </VictoryChart>
      </Svg>
    </View>
  );
};

export default BarChartComponent;

const styles = StyleSheet.create({});
