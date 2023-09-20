import {View, Text, Image, StyleSheet, BackHandler} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {
  Home as HomeComp,
  Explore as ExploreComp,
  Progress as ProgressComp,
} from '../features';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import image from '../constants/image';
import {AppThemeContext, commonStackIdentifier} from '../../App';
import {dimens} from '../constants/dimens';
import {useFocusEffect, useRoute, useTheme} from '@react-navigation/native';
import ProgressScreen from './ProgressScreen';
import {handleBackPress} from '../Utility/backHandler';
import {EventRegister} from 'react-native-event-listeners';
import * as Asyncstore from '../asyncstorage/index';
import {useDispatch} from 'react-redux';
import {useNavigation, CommonActions} from '@react-navigation/native';
import * as commonSlice from '../commonSlices/common.slice';
import * as homeSlice from '../commonSlices/home.slice';
import * as activityIntakeSlice from '../commonSlices/activityIntakeSlice';
import * as waterIntakeSlice from '../commonSlices/waterIntakeSlice';
import * as myProfileSlice from '../commonSlices/profile.slice';
import * as productSlice from '../commonSlices/product.slice';
import * as articleSlice from '../commonSlices/explore.slice';
import * as calendarSlice from '../commonSlices/calendar.slice';
import AutoLogoutModalComp from '../components/AutoLogoutModalComp';
const Tab = createBottomTabNavigator();

export const bottomTabIdentifier = {
  home_tab: 'HOME_TAB',
  explore_tab: 'EXPLORE_TAB',
  progress_tab: 'PROGRESS_TAB',
};

const HomeBottomTabScreen = () => {
  const {AppThemeName, updateAppTheme} = useContext(AppThemeContext);
  const {colors} = useTheme();
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isLogoutModalVisible, setIsLogoutModalVisible] = useState(false);
  const [logoutMessage, setLogoutMessage] = useState('');

  const route = useRoute();
  useEffect(() => {
    EventRegister.addEventListener('logout', data => {
     try {
      if (!data.status) {
        setIsLogoutModalVisible(true);
        setLogoutMessage(data.message);
      }
     } catch (error) {
      
     }
    });
    return () => {
      EventRegister.removeAllListeners();
    };
  }, []);

  const forceLogout = () => {
    Asyncstore.storeData(Asyncstore.Keys.SIGN_UP_STEP, '1').then(() => {
      Asyncstore.storeJsonData(Asyncstore.Keys.USER_DATA, {}).then(() => {
        Asyncstore.storeJsonData(Asyncstore.Keys.ACCESS_TOKEN, '').then(() => {
          dispatch(commonSlice.clearState());
          dispatch(myProfileSlice.clearState());
          dispatch(homeSlice.clearState());
          dispatch(activityIntakeSlice.clearState());
          dispatch(waterIntakeSlice.clearState());
          dispatch(productSlice.clearProduct());
          dispatch(articleSlice.clearArticles());
          dispatch(calendarSlice.clearCalendarData());

          setTimeout(() => {
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: commonStackIdentifier.signup_screen,
                    params: {isFromLogout: true},
                  },
                ],
              }),
            );
          });
        }, 10);
      });
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      const backAction = () => {
        return handleBackPress(route.name); // Use the utility function
      };

      const backHandler = BackHandler.addEventListener(
        'hardwareBackPress',
        backAction,
      );

      return () => backHandler.remove();
    }, [route]),
  );

  return (
    <View style={styles.container}>
      {isLogoutModalVisible && (
        <AutoLogoutModalComp
          isVisible={isLogoutModalVisible}
          onOkPress={() => {
            setIsLogoutModalVisible(false);
            forceLogout();
          }}
          title={'Session Expired'}
          errorMessage={logoutMessage}
        />
      )}
      <Tab.Navigator
        initialRouteName={bottomTabIdentifier.home_tab}
        screenOptions={({route}) => ({
          headerShown: false,
          tabBarShowLabel: false,
          tabBarStyle: {
            shadowOffset: {
              width: 0,
              height: 12,
            },
            shadowOpacity: 0.58,
            shadowRadius: 16.0,
            elevation: 24,
            backgroundColor: colors.white,
            position: 'absolute',
            bottom: 0,
            padding: 10,
            width: dimens.w100,
            height: dimens.h8,
            zIndex: 0,
            borderTopWidth: 0,
          },
          tabBarIcon: ({focused, color, size}) => {
            let iconName;
            if (route.name === bottomTabIdentifier.home_tab) {
              if ((iconName = focused)) {
                AppThemeName == 'MyDefaultThemeDay'
                  ? (iconName = image.ic_home_orange)
                  : (iconName = image.ic_home_blue);
              } else {
                iconName = image.ic_home_gray;
              }
            } else if (route.name === bottomTabIdentifier.explore_tab) {
              if ((iconName = focused)) {
                AppThemeName == 'MyDefaultThemeDay'
                  ? (iconName = image.ic_discovery_orange)
                  : (iconName = image.ic_discovery_blue);
              } else {
                iconName = image.ic_discovery_gray;
              }
            } else if (route.name === bottomTabIdentifier.progress_tab) {
              if ((iconName = focused)) {
                AppThemeName == 'MyDefaultThemeDay'
                  ? (iconName = image.ic_user_Orange)
                  : (iconName = image.ic_user_blue);
              } else {
                iconName = image.ic_user_gray;
              }
            }
            return (
              <View>
                <Image
                  source={iconName}
                  resizeMode="contain"
                  style={{width: size, height: size}}
                />
              </View>
            );
          },
        })}>
        <Tab.Screen
          name={bottomTabIdentifier.home_tab}
          component={HomeComp}
        />
        <Tab.Screen
          name={bottomTabIdentifier.explore_tab}
          component={ExploreComp}
        />
        <Tab.Screen
          name={bottomTabIdentifier.progress_tab}
          component={ProgressScreen}
        />
      </Tab.Navigator>
    </View>
  );
};

export default HomeBottomTabScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white', // Replace with your desired background color
    shadowColor: '#000', // Replace with the shadow color
    shadowOffset: {
      width: 0,
      height: -2, // Control the shadow offset on the Y-axis to create the desired effect
    },
    shadowOpacity: 0.2, // Control the shadow opacity
    shadowRadius: 2, // Control the shadow blur radius
    elevation: 2, // Android shadow elevation
  },
});
