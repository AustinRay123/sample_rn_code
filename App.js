// In App.js in a new project

import * as React from 'react';
import {
  View,
  Text,
  Button,
  useColorScheme,
  Platform,
  AppState,
  BackHandler,
  Linking,
} from 'react-native';
import {
  NavigationContainer,
  useTheme,
  createNavigationContainerRef,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {
  createStackNavigator,
  CardStyleInterpolators,
  HeaderStyleInterpolators,
  TransitionPresets,
} from '@react-navigation/stack';
import colors from './src/constants/colors';
import {EventRegister} from 'react-native-event-listeners';
import {useEffect, useState} from 'react';
import {AnimatedCircleComponent, IntroScreen} from './src/features';
import {
  GestureHandlerRootView,
  TouchableOpacity,
} from 'react-native-gesture-handler';
import {client} from './src/services/client';
import URL from './src/services/endpoint';
import * as AsyncStore from './src/asyncstorage/index';
import {Keys} from './src/asyncstorage';
import {Provider} from 'react-redux';
import {store} from './src/store';
import {PaperProvider} from 'react-native-paper';
import {
  CreatePasswordScreen,
  Login,
  OtherSignup,
  Signup,
  Splash,
  CreateProfile,
  SignIn,
  SignInWithEmail,
  ForgotPasswordScreen,
  ChooseYourGoalScreen,
  ChooseAFastScreen,
  HomeBottomTabScreen,
  ProgressScreen,
  WeightDetailsScreen,
  ProfileScreen,
  ResetPasswordScreen,
  CalendarDaysScreen,
  QuizOneScreen,
  QuizTwoScreen,
  QuizThreeScreen,
  QuizFourScreen,
  QuizFiveScreen,
  QuizSixScreen,
  QuizSevenScreen,
  QuizEightScreen,
  FastListScreen,
  MeasurementScreen,
  QuickSnapScreen,
} from './src/screens/index';
import ArticleDetailsScreen from './src/screens/ArticleDetailsScreen';
import {chooseAppThemeBasedOnCurrentTime} from './src/Utility/HelperFunctions';
import constants from './src/constants/constants';
import CreateProfileCopy from './src/features/Signup/CreateProfile copy';
import CalenderScreen from './src/features/Calendar/CalendarScreen';
import SplashScreen from 'react-native-splash-screen';
import StartYourFastComp from './src/features/Temp/StartYourFastComp';
import WeightListScreen from './src/components/UserDetailsComponent/WeightScreen/WeightList/WeightListScreen';
import WaterListScreen from './src/components/UserDetailsComponent/WaterDetails/WaterScreen/WaterList/WaterListScreen';
import ActivityListScreen from './src/components/UserDetailsComponent/ActivityDetails/ActivityList/ActivityListScreen';
import SettingBottomSheet from './src/components/BottomSheets/SettingBottomSheet';
import CustomWebView from './src/components/CustomeWebView';
import SettingScreen from './src/components/SettingScreen';
export const commonStackIdentifier = {
  splash_screen: 'SPLASH_SCREEN',
  intro_slider: 'INTRO_SCREEN',
  signup_screen: 'SIGN_UP_SCREEN',
  other_signup_screeen: 'OTHER_SIGNUP_SCREEN',
  create_password: 'CREATE_PASSWORD',
  create_profile: 'CREATE_PROFILE',
  create_profile_copy: 'CREATE_PROFILE_COPY',
  signin_screen: 'SIGNIN_SCREEN',
  sigin_screen_withemail: 'SIGNIN_SCREEN_WITHEMAIL',
  forgot_password: 'FORGOT_PASSWORD',
  choose_your_goal: 'CHOOSE_YOUR_GOAL',
  home_bottom_tabs: 'HOME_BOTTOM_TABS',
  choose_a_fast: 'CHOOSE_A_FAST',
  calendar_screen: 'CALENDAR_SCREEN',
  calendar_days_screen: 'CALENDAR_DAYS_SCREEN',
  progress: 'PROGRESS',
  weight_detailed_reports: 'WEIGHT_DETAILED_REPORTS',
  ArticleDetailsScreen: 'ARTICLE_DETAILS',
  home_screen: 'HOME_SCREEN',
  profile: 'PROFILE',
  reset_password: 'RESET_PASSWORD',
  weight_list: 'WEIGHT_LIST',
  water_list: 'WATER_LIST',
  activity_list: 'ACTIVITY_LIST',
  custom_webview: 'CUSTOM_WEBVIEW',
  // ---- quiz screens ----- //
  quiz_one_screen: 'QUIZ_ONE_SCREEN',
  quiz_two_screen: 'QUIZ_TWO_SCREEN',
  quiz_three_screen: 'QUIZ_THREE_SCREEN',
  quiz_four_screen: 'QUIZ_FOUR_SCREEN',
  quiz_five_screen: 'QUIZ_FIVE_SCREEN',
  quiz_six_screen: 'QUIZ_SIX_SCREEN',
  quiz_seven_screen: 'QUIZ_SEVEN_SCREEN',
  quiz_eight_screen: 'QUIZ_EIGHT_SCREEN',
  fast_list_screen: 'FAST_LIST_SCREEN',
  setting_screen: 'SETTING_SCREEN',
  measurement_screen: 'MEASUREMENT_SCREEN',
  quick_snap_screen: 'QUICK_SNAP_SCREEN',
};

function HomeScreen2({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Home Screen</Text>
      <Button
        title="dark"
        onPress={() => {
          EventRegister.emit('changeTheme', 'dark');
        }}
      />
      <Button
        title="light"
        onPress={() => {
          EventRegister.emit('changeTheme', 'light');
        }}
      />

      <Button
        title="go to"
        onPress={() => {
          navigation.navigate('Signup');
        }}
      />
    </View>
  );
}

// const Stack = createNativeStackNavigator();
const Stack = createStackNavigator();

export const AppThemeContext = React.createContext();
let AppThemeObject;
let AppThemeName = 'MyDefaultTheme';
function App() {
  const theme = useColorScheme();
  const {colors} = useTheme();
  const [appTheme, setTheme] = useState('MyDefaultTheme');
  const [appThemeObject, setThemeObject] = useState(MyDefaultTheme);
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);
  const appState = React.useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const navigationRef = createNavigationContainerRef();
  // useEffect(() => {
  //   // Your custom logic here
  //   // For example, show an alert or do nothing
  //   // Return 'true' to prevent the default back action
  //   // Return 'false' to allow the default back action

  //   BackHandler.addEventListener('hardwareBackPress', backHandler);

  //   return () => {
  //     BackHandler.removeEventListener('hardwareBackPress', backHandler);
  //   };
  // }, []);

  // const backHandler = () => {
  //   if (
  //     navigationRef.name == commonStackIdentifier.create_profile ||
  //     navigationRef.name == commonStackIdentifier.home_bottom_tabs ||
  //     navigationRef.name == commonStackIdentifier.intro_slider
  //   ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };
  useEffect(() => {
    if (Platform.OS == 'android') {
      SplashScreen.hide();
    }
  }, []);
  useEffect(() => {
    EventRegister.addEventListener('changeTheme', data => {
      setTheme(data);
      setIsDarkTheme(!isDarkTheme);
    });

    return () => {
      EventRegister.removeAllListeners();
    };
  }, [isDarkTheme]);

  useEffect(() => {

    if (Platform.OS == 'android') {
      const subscription2 = AppState.addEventListener('blur', nextAppState => {
        appState.current = nextAppState;
        setAppStateVisible(appState.current);
      });

      return () => {
        subscription2.remove();
      };
    }
  }, []);

  const updateAppTheme = data => {
    if (data) {
      AppThemeName = data;
      setTheme(data);
      fetchStoredTheme();
    }
  };
  
  const fetchStoredTheme = async () => {
    await AsyncStore.getData(AsyncStore.Keys.APP_THEME_OPTION_SELECTED)
      .then(value => {
        if (value == 'MyDefaultTheme') {
          AppThemeObject = MyDefaultTheme;
          setThemeObject(MyDefaultTheme);
          AppThemeName = value;
        } else if (value == 'MyDefaultThemeDay') {
          AppThemeObject = MyDefaultThemeDay;
          setThemeObject(MyDefaultThemeDay);
          AppThemeName = value;
        } else if (value == 'auto') {
          let themesLocal =
            chooseAppThemeBasedOnCurrentTime() == 'PM'
              ? MyDefaultThemeDay
              : MyDefaultTheme; // setting the theme based on AP pr PM

          AppThemeObject = themesLocal;
          setThemeObject(themesLocal);
          chooseAppThemeBasedOnCurrentTime() == 'PM'
            ? (AppThemeName = 'MyDefaultThemeDay')
            : (AppThemeName = 'MyDefaultTheme'); // setting the theme global constant based on AP pr PM, to manage background image in all screen
        } else {
          AppThemeObject = MyDefaultTheme;
          setThemeObject(MyDefaultTheme);
          AppThemeName = 'MyDefaultTheme';
        }
        setTheme(value);
      })
      .catch(() => {
        setThemeObject(MyDefaultTheme);
        AppThemeObject = MyDefaultTheme;
        AppThemeName = 'MyDefaultTheme';
      })
      .finally(() => {});
  };
  fetchStoredTheme();

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{flex: 1}}>
        <PaperProvider>
          <AppThemeContext.Provider value={{AppThemeName, updateAppTheme}}>
            <NavigationContainer
              theme={appThemeObject}
              ref={navigationRef}
              linking={linking}>
              <Stack.Navigator
                initialRouteName={commonStackIdentifier.splash_screen}
                screenOptions={{animation: 'slide_from_right'}}>
                <Stack.Screen
                  name={commonStackIdentifier.intro_slider}
                  options={{headerShown: false, gestureEnabled: false}}
                  component={IntroScreen}
                />
                <Stack.Screen
                  name={commonStackIdentifier.splash_screen}
                  component={Splash}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name={commonStackIdentifier.signup_screen}
                  component={Signup}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name={commonStackIdentifier.other_signup_screeen}
                  component={OtherSignup}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name={commonStackIdentifier.create_password}
                  component={CreatePasswordScreen}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name={commonStackIdentifier.signin_screen}
                  component={SignIn}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name={commonStackIdentifier.sigin_screen_withemail}
                  component={SignInWithEmail}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name={commonStackIdentifier.forgot_password}
                  component={ForgotPasswordScreen}
                  options={{headerShown: false}}
                />
                <Stack.Screen
                  name={commonStackIdentifier.reset_password}
                  component={ResetPasswordScreen}
                  options={{headerShown: false}}
                />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Home2" component={HomeScreen2} />
              </Stack.Navigator>
            </NavigationContainer>
          </AppThemeContext.Provider>
        </PaperProvider>
      </GestureHandlerRootView>
    </Provider>
  );
}

const MyDefaultTheme = {
  colors: {
    black: '#000000',
    uncheckedColor: '#EBEBEB',
    white: '#FFFFFF',
    darkWhite: '#F4F4F4',
    deepcyan: '#29ABE2',
    indigo: '#2F2F82',
    purple: '#48348F',
    deepmagenta: '#E11B49',
    warmred: '#EA2F30',
    yellow: '#F7EC2E',
    starColor: '#FAB004',
    gradintLightBlue: '#2AA1DB',
    gradintDarkBlue: '#2F2F82',
    gradintlightYellow: '#FCEF44',
    gradintdarkOrange: '#E93F3A',
    gradintlightYellowRgba: 'rgba(252, 240, 68, 1)',
    gradintdarkOrangeRgba: 'rgba(233, 63, 58, 1)',
    editPencilColor: '#a1939a',

    signupLightBlue: '#29ABE2',
    signupDarkBlue: '#2F2F82',
    backgroundgrad1: 'rgba(42, 161, 219, 0.10)',
    backgroundgrad2: 'rgba(47, 47, 130,0.01 )',
    smallTextColors: '#4E4E4E',
    bigTextColors: '#1A1A1A',
    separatorColor: '#D0D5DD',
    neutral: '#101828',
    textInputBackground: '#F2F4F7',
    textInputTextColor: '#989898',
    backgroundWhite: '#FAFAFD',
    backgroundgrad1_v1: 'rgba(42, 161, 219, 0)',
    backgroundgrad2_v2: 'rgba(47, 47, 130,0.10  )',
    backgroundgrad1_Android: 'rgba(42, 161, 219, 0)',
    backgroundgrad2_Android: 'rgba(47, 47, 130,0.30 )',
    backgroundGrad_day_1: 'rgba(252, 239, 68,0.1)',
    backgroundGrad_day_2: 'rgba(233, 63, 58,0.1)',

    brachGroundGradColorTheme1_android1: 'rgba(47, 47, 130,0.1)',
    brachGroundGradColorTheme1_android2: 'rgba(42, 161, 219, 0.10)',
    brachGroundGradColorTheme1_ios1: 'rgba(47, 47, 130,0.1 )',
    brachGroundGradColorTheme1_ios2: 'rgba(42, 161, 219, 0.1)',
    graditnBtnTextColor: '#FFFFFF',
    checkboxGreen: '#34BC46',
    introTextColor: '#95969D',

    textGradColors1: '#29ABE2',
    textGradColors2: '#2F2F82',
    checkBoxRoundColors: '#667085',
    grayBtnBg: '#CCCCCC',
    graditnBtnTextColorReverse: '#FFFFFF',
    pinkBg: '#fce8ed',
    lightblue: '#EBEFFB',
    darkGrey: '#37393C',
    inActiveDot: '#E4E5E7',
    introText: '#0D0D26',
    titleText: '#B3B3B3',
    calenderText: '#414142',

    fastCompletedColor: '#4DAA57',
    graphText: '#B5B5C3',

    donthaveSmallTextColors: '#344054',
    otherSignupbg: '#F7F7F7',
    hmText: '#363636',
    tabBGColor: '#FBF8FC',
  },
};

const MyDefaultThemeDay = {
  colors: {
    black: '#000000',
    white: '#FFFFFF',
    darkWhite: '#F4F4F4',
    deepcyan: '#29ABE2',
    indigo: '#2F2F82',
    purple: '#48348F',
    deepmagenta: '#E11B49',
    warmred: '#EA2F30',
    yellow: '#F7EC2E',
    gradintLightBlue: '#2AA1DB',
    gradintDarkBlue: '#2F2F82',
    gradintlightYellow: '#FCEF44',
    gradintdarkOrange: '#E93F3A',
    gradintlightYellowRgba: 'rgba(252, 240, 68, 1)',
    gradintdarkOrangeRgba: 'rgba(233, 63, 58, 1)',

    gradColorArrytest: ['rgba(252, 240, 68, 1)', 'rgba(233, 63, 58, 1)'],
    gradColorArry: [
      'rgba(252, 239, 68, 0.1)',
      'rgba(252, 226, 52, 0.1)',
      'rgba(252, 211, 34,0.1)',
      'rgba(252, 202, 22,0.1)',
      'rgba(253, 199, 19,0.1)',
      'rgba(242, 145, 64,0.1)',
      'rgba(237, 104, 60,0.1)',
      'rgba(233, 63, 58,0.1)',
    ],

    signupLightBlue: '#FCEF44',
    signupDarkBlue: '#E93F3A',
    backgroundgrad1: 'rgba(42, 161, 219, 0.10)',
    backgroundgrad2: 'rgba(47, 47, 130,0.01 )',
    smallTextColors: '#4E4E4E',
    bigTextColors: '#1A1A1A',
    separatorColor: '#D0D5DD',
    neutral: '#101828',
    textInputBackground: '#F2F4F7',
    textInputTextColor: '#989898',
    backgroundWhite: '#FAFAFD',
    backgroundgrad1_v1: 'rgba(42, 161, 219, 0)',
    backgroundgrad2_v2: 'rgba(47, 47, 130,0.10  )',
    backgroundgrad1_Android: 'rgba(42, 161, 219, 0)',
    backgroundgrad2_Android: 'rgba(47, 47, 130,0.30 )',

    brachGroundGradColorTheme1_android1: 'rgba(252, 240, 68,0.1)',
    brachGroundGradColorTheme1_android2: 'rgba(233, 63, 58, 0.10)',
    brachGroundGradColorTheme1_ios1: 'rgba(252, 240, 68,0.1 )',
    brachGroundGradColorTheme1_ios2: 'rgba(233, 63, 58, 0.1)',
    graditnBtnTextColor: '#000000',
    checkboxGreen: '#34BC46',
    introTextColor: '#95969D',

    textGradColors1: '#f1942f',
    textGradColors2: '#ef722f',
    checkBoxRoundColors: '#667085',
    grayBtnBg: '#CCCCCC',
    graditnBtnTextColorReverse: '#FFFFFF',
    pinkBg: '#fce8ed',
    lightblue: '#EBEFFB',
    darkGrey: '#37393C',
    inActiveDot: '#E4E5E7',
    introText: '#0D0D26',
    titleText: '#B3B3B3',
    calenderText: '#414142',

    fastCompletedColor: '#4DAA57',
    graphText: '#B5B5C3',
    donthaveSmallTextColors: '#344054',
    otherSignupbg: '#F7F7F7',
    hmText: '#363636',
    tabBGColor: '#FBF8FC',
  },
};

const MyDarkTheme = {
  colors: {
    black: '#FFFFFF',
    white: '#000000',
    deepcyan: '#29ABE2',
    indigo: '#2F2F82',
    purple: '#48348F',
    deepmagenta: '#E11B49',
    warmred: '#EA2F30',
    yellow: '#F7EC2E',
    gradintLightBlue: '#2AA1DB',
    gradintDarkBlue: '#2F2F82',
    gradintlightYellow: '#FCEF44',
    gradintdarkOrange: '#E93F3A',
    gradintlightYellowRgba: 'rgba(252, 240, 68, 1)',
    gradintdarkOrangeRgba: 'rgba(233, 63, 58, 1)',

    signupLightBlue: '#29ABE2',
    signupDarkBlue: '#2F2F82',
    backgroundgrad1: 'rgba(42, 161, 219, 0.10)',
    backgroundgrad2: 'rgba(47, 47, 130,0.01 )',
    smallTextColors: '#4E4E4E',
    bigTextColors: '#1A1A1A',
    separatorColor: '#D0D5DD',
    neutral: '#101828',
    textInputBackground: '#F2F4F7',
    textInputTextColor: '#989898',
    backgroundWhite: '#FAFAFD',
    backgroundgrad1_v1: 'rgba(42, 161, 219, 0)',
    backgroundgrad2_v2: 'rgba(47, 47, 130,0.10  )',
    backgroundgrad1_Android: 'rgba(42, 161, 219, 0)',
    backgroundgrad2_Android: 'rgba(47, 47, 130,0.30 )',

    brachGroundGradColorTheme1_android1: 'rgba(252, 240, 68,0.1)',
    brachGroundGradColorTheme1_android2: 'rgba(233, 63, 58, 0.10)',
    brachGroundGradColorTheme1_ios1: 'rgba(252, 240, 68,0.1 )',
    brachGroundGradColorTheme1_ios2: 'rgba(233, 63, 58, 0.1)',
    introTextColor: '#95969D',
  },
};

export default App;
