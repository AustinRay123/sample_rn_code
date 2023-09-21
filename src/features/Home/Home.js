import {
  Text,
  View,
  Image,
  TouchableOpacity,
  Platform,
  Dimensions,
  StatusBar,
  AppState,
  SafeAreaView,
  Linking,
} from 'react-native';
import React, {useContext, useEffect, useState, useRef} from 'react';
import useStyles from './HomeStyle';
import CommonStyles from '../CommonStyles';
import {
  useFocusEffect,
  useIsFocused,
  useNavigation,
  useTheme,
  CommonActions,
} from '@react-navigation/native';
import {AppThemeContext, commonStackIdentifier} from '../../../App';
import image from '../../constants/image';
import AnimatedCircularProgress from '../../components/AnimatedCircularProgress';
import Svg, {
  Circle,
  Path,
  Text as TextSvg,
  Image as ImageSvg,
  G,
} from 'react-native-svg';
import {dimens, fontsizes} from '../../constants/dimens';
import {
  checkIsDaytime,
} from '../../Utility/HelperFunctions';
import moment from 'moment';
import {ScrollView} from 'react-native-gesture-handler';
import Header from '../../components/Header/Header';
import StartYourFastComp from './StartYourFastComp';
import * as Asyncstore from '../../asyncstorage/index';
import {FlatList} from 'react-native';
import DailyArticleComp from './DailyArticleComp';
import CommonDatePickerSheet from '../../components/BottomSheets/CommonDatePickerSheet';
import FastCompletedComp from './FastCompletedComp';
import AddWaterBottomSheet from '../../components/BottomSheets/AddWaterBottomSheet';
import ActivityIntakeBottomSheet from '../../components/BottomSheets/ActivityIntakeBottomSheet';
import {userProfileDetails} from '../../commonSlices/profile.slice';
import {useDispatch, useSelector} from 'react-redux';
import {
  editBirthDate,
  editEmail,
  editFirstName,
  editGender,
  editLastname,
  editProfilePic,
} from '../../commonSlices/editProfile.slice';
import {getArticles} from '../../commonSlices/explore.slice';
import {editHeight, editWeight} from '../../commonSlices/weight.slice';
import {getProduct} from '../../commonSlices/product.slice';
import Supplements from '../../components/Supplements';
import ExploreCard from '../../components/ExploreCard';
import _ from 'lodash';
import {EventRegister} from 'react-native-event-listeners';
import localNotificationManager, {
  handleCancelNotification,
  handleScheduledNotification,
  showNotification,
} from '../../Utility/LocalNotification/notification.android';
import {clearState, logout} from '../../commonSlices/common.slice';
import * as commonSlice from '../../commonSlices/common.slice';
import * as homeSlice from '../../commonSlices/home.slice';
import * as activityIntakeSlice from '../../commonSlices/activityIntakeSlice';
import * as waterIntakeSlice from '../../commonSlices/waterIntakeSlice';
import * as myProfileSlice from '../../commonSlices/profile.slice';
import * as productSlice from '../../commonSlices/product.slice';
import * as articleSlice from '../../commonSlices/explore.slice';
import * as calendarSlice from '../../commonSlices/calendar.slice';

import NetInfo from '@react-native-community/netinfo';
import WeekViewCalendar from './HeaderDays';
import {
  addFast,
  fastListLatest,
  updateFast,
} from '../../commonSlices/home.slice';
import font from '../../constants/fonts';
import constants from '../../constants/constants';
import QuickSnapBottomSheet from '../../components/BottomSheets/QuickSnapBottomSheet';
import CustomModal from '../../components/CustomModal/CustomModal';
import SuperChargeYourHealthComp from './SuperChargeYourHealthComp';
import ProgressIndicator from '../../components/ProgressIndicator';

const colorsssForFastDone = ['#4DAA57', '#4DAA57'];

const Home = ({props}) => {
  const {width, height} = Dimensions.get('screen');
  const styles = useStyles();
  const {colors} = useTheme();
  const dispatch = useDispatch();
  const commonStyle = CommonStyles();
  const navigation = useNavigation();
  const {AppThemeName, updateAppTheme} = useContext(AppThemeContext);
  const selectorAddEditPreset = useSelector(
    state => state.createAddEditPresetReducer,
  );
  let fastingHour = 1;
  const [fastingHourState, setFastingHourState] = useState(fastingHour);
  const myRef_Fasting_hours = useRef(fastingHour);
  const [totalSecondsState, setTotalSecondsState] = useState(
    myRef_Fasting_hours.current * 3600,
  );
  const myRef_total_seconds = useRef(myRef_Fasting_hours.current * 3600);
  const totalSeconds = myRef_Fasting_hours.current * 3600;
  // let colorsArrary=colorsssForDay;
  // const [time, setTime] = useState(0);
  const [isCountingUp, setIsCountingUp] = useState(true);
  const [time, setTime] = useState(0); // timer count value from 0 to ...
  const [timeInreverse, setTimeInreverse] = useState(totalSeconds); // total hr in seconds in reverse
  const [timeerStart, setisTimeerStart] = useState(false); // flag for timer is running
  // const [isCountingUp, setIsCountingUp] = useState(true);
  const [colorsArrary, setColorsArrary] = useState(colorsssForDay); // arrary for grad color
  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  const [backgroundTime, setBackgroundTime] = useState(0);
  const myRef_time_forward = useRef(0);
  const myRef_time_backward = useRef(totalSeconds);
  const [isupdateStartDate, setIsupdateStartDate] = useState(false);
  const [isFastCompleted, setisFastCompleted] = useState(false); // flag for fast complete
  const [showReverseTime, setShowReverseTime] = useState(true); // flag if need to show in reverse or not
  const [timerStartTimelocal, setTimerStartTimelocal] = useState(new Date());
  const [isAddWeightVisible, setIsAddWeightVisible] = useState(false);
  const [isActivityIntakeVisible, setIsActivityIntakeVisible] = useState(false);
  const [isStartTimeUpdated, setIsStartTimeUpdated] = useState(false);
  const myProfileSelector = useSelector(state => state.myProfileReducer);
  const activityIntakeSelector = useSelector(
    state => state.activityIntakeReducer,
  );
  const waterIntakeSelector = useSelector(state => state.waterIntakeReducer);
  const isFocused = useIsFocused();
  const [articleList, setArticleList] = useState([]);
  const articleSelector = useSelector(state => state.articlesReducer);
  const selector_home = useSelector(state => state.homeReducer);
  const [isInterNetOn, setIsInterNetOn] = useState(false);

  const [startDateTime, setStartedTime] = useState(new Date());
  const [endDateTime, setEndTime] = useState('');
  const [endDateTimeApi, setEndTimeApi] = useState('');

  const [onStartClick, setOnStartClick] = useState(false);
  const [onEndClick, setOnEndClick] = useState(false);
  const [onLogout, setOnLogout] = useState(false);
  const [showQuickSnap, setQuickSnap] = useState(false);
  const [expand, setExpand] = useState(false);
  const [weightBottomSheet, setWeightBottomSheet] = useState(false);
  const [selectedField, setSelectedField] = React.useState('');
  const [isContentVisible, setIsContentVisible] = React.useState(false);
  const selectorEditProfile = useSelector(state => state.editProfileReducer);

  useFocusEffect(
    React.useCallback(() => {
      dispatch(userProfileDetails()).then(() => {
        if (myProfileSelector?.checkDataStatus === 'fulfilled') {
          const {
            first_name,
            last_name,
            email,
            dob,
            gender,
            avatar_url,
            weight,
            height,
          } = myProfileSelector?.myProfileData;

          dispatch(editFirstName(first_name));
          dispatch(editLastname(last_name));
          dispatch(editEmail(email));
          dispatch(editBirthDate(moment(dob).format('DD/MM/YYYY')));
          dispatch(editProfilePic(avatar_url));
          dispatch(editGender(gender));
          dispatch(editWeight(weight));
          dispatch(editHeight(height));
        }
      });
      Asyncstore.storeJsonData(
        Asyncstore.Keys.USER_DATA,
        myProfileSelector?.myProfileData,
      );

      // Clean up any resources if needed
      return () => {
        // Add cleanup code here if necessary
      };
    }, [
      myProfileSelector?.myProfileData?.first_name,
      myProfileSelector?.myProfileData?.avatar_url,
      activityIntakeSelector?.addActivityIntakeRes,
      waterIntakeSelector?.addWaterIntakeRes,
    ]),
  );

  useEffect(() => {
    if (!_.isEmpty(selectorAddEditPreset?.selectedFastingHoursDetails)) {
      const [beforeColon, afterColon] =
        selectorAddEditPreset?.selectedFastingHoursDetails.count.split(':');

      fastingHour = parseInt(beforeColon);
      setFastingHourState(fastingHour);
      myRef_Fasting_hours.current = fastingHour;

      setColorsBasedOnFastingHours();
      Asyncstore.storeJsonData(
        Asyncstore.Keys.SELECTED_FAST_TIME_DATA,
        myRef_Fasting_hours.current,
      );
      setBackgroundTime(moment().valueOf());
      let calculateEndTimev = calculateEndTime(startDateTime, fastingHour);
      setEndTime(calculateEndTimev);

      let timeReverseTemp = fastingHour * 3600;

      let tempminus = timeReverseTemp - myRef_time_backward.current;

      let updated_fasting_hr_backVlue = myRef_time_backward.current + tempminus; // here we find the new value for reverse timer

      let finalValue = updated_fasting_hr_backVlue - myRef_time_forward.current; // here we minus the current value of forward timer from new reversetotal so we get new reverse value
      myRef_time_backward.current = finalValue;
      setTimeInreverse(finalValue);
      setIsStartTimeUpdated(true);
    } 
  }, [isFocused]);

  useEffect(() => {
    if (
      selector_home.fastListCheckStatus == 'fulfilled' &&
      !_.isEmpty(selector_home?.fastListRes)
    ) {
      setTimerFromServer();
    }
  }, [selector_home?.fastListRes]);

  useEffect(() => {
    if (onLogout) {
      onStopTimerCalled();
    }
  }, [onLogout]);

  useEffect(() => {
    
    getTimerFromServer();
    const subscription = AppState.addEventListener('change', nextAppState => {
      

      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      if (
        appState.current === 'inactive' ||
        appState.current === 'background'
      ) {
        storeTimerinlocalDb();
      }
      if (appState.current == 'active') {
        getTimerFromServer();
      }
    });
    let subscription2;
    if (Platform.OS == 'android') {
      subscription2 = AppState.addEventListener('blur', () => {
        storeTimerinlocalDb();
      });
    }

    return () => {
      subscription.remove();
    };
  }, [isInterNetOn]);

  useEffect(() => {
    
    EventRegister.addEventListener('logout_from_setting', data => {
      try {
        if (data) {
          setOnLogout(true);
        }
      } catch (error) {}
    });
    return () => {
      EventRegister.removeAllListeners();
    };
  }, []);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      if (state.isConnected) {
        setIsInterNetOn(true);
      }
    });

    return unsubscribe;
  }, []);

  

  useEffect(() => {
    
    if (time >= totalSeconds || timeInreverse <= 0) {
      setColorsArrary(colorsssForFastDone);
      setShowReverseTime(false);
      setIsCountingUp(true);
     
    } else {
      setShowReverseTime(true);
      setColorsBasedOnFastingHours();
    }
    if (timeerStart) {
      const interval = setInterval(async () => {
        setTime(prevElapsed => prevElapsed + 1);
        myRef_time_forward.current = myRef_time_forward.current + 1;
        setTimeInreverse(prevElapsed => prevElapsed - 1);
        myRef_time_backward.current = myRef_time_backward.current - 1;

      }, 1000); // Update every second (1000 milliseconds)

      return () => {
        clearInterval(interval);
      };
    }
  }, [time, fastingHour, timeerStart, isCountingUp]);

  useEffect(() => {
    if (onStartClick && !onEndClick) {
      postStartOfTimertoServer();
    } else {
      if (onEndClick && !onLogout) {
        postEndOfTimertoServer();
      } else {
        if (timeerStart) {
        }
      }
    }
  }, [timeerStart, isFastCompleted, onEndClick, onStartClick]);

  useEffect(() => {
    if (isStartTimeUpdated) {
      storeDataOnServer();
    }
  }, [isStartTimeUpdated]);

  useEffect(() => {
    dispatch(getArticles({per_page: 10, current_page: 1}));
    dispatch(getProduct());
  }, []);

  useEffect(() => {
    Linking.getInitialURL().then(url => {
      if (url) {
        let urlArray = url.split('/');
        let screenName = urlArray[urlArray.length - 1];
        navigation.navigate(screenName);
      }
    });
  }, []);

  useEffect(() => {
    if (getArticles?.fulfilled) {
      setArticleList(articleSelector?.articles?.data);
    }
  }, [getArticles, articleSelector]);

  useEffect(() => {
    if (
      selector_home.addFastCheckStatus === 'fulfilled' &&
      !_.isEmpty(selector_home.addFastRes?.data)
    ) {
      let onGoingFastId = selector_home.addFastRes?.data?.id;
      let onGoingFastData = selector_home.addFastRes?.data;
      Asyncstore.storeJsonData(Asyncstore.Keys.ONGOING_FAST_ID, onGoingFastId);
      Asyncstore.storeJsonData(
        Asyncstore.Keys.ONGOING_FAST_DATA,
        onGoingFastData,
      );
      clearState();
    }
  }, [selector_home.addFastCheckStatus]);

  useEffect(() => {
    const getUserDatafromdb = async () => {
      const userDataDb = await Asyncstore.getJsonData(
        Asyncstore.Keys.USER_DATA,
      );
      setUserData(userDataDb);
    };
    getUserDatafromdb();
  }, []);

  useEffect(() => {
    if (selector_home.editFastCheckStatus == 'fulfilled') {
      getTimerFromServer();
    }
  }, [selector_home.editFastRes]);

  const compareTimestamps = (timestamp1, timestamp2) => {
    const date1 = new Date(timestamp1);
    const date2 = new Date(timestamp2);

    if (date1 > date2) {
      return 'greaterthan';
    } else if (date1 < date2) {
      return 'lessthan';
    } else {
      return 'Timestamps are equal';
    }
  };

  const isPositive = number => {
    if (number > 0) {
      return true;
    } else if (number < 0) {
      return false;
    }
  };

  const handleUpdateStartTime = newStartTime => {
    const currentTime = timerStartTimelocal;
    const TimeislessOrgret = compareTimestamps(
      timerStartTimelocal,
      newStartTime,
    );

    const timeDifferenceInSeconds = Math.floor(
      (moment(currentTime) - moment(newStartTime)) / 1000,
    );
  
    if (isPositive(Number(timeDifferenceInSeconds))) {
      setTime(Number(myRef_time_forward.current) + timeDifferenceInSeconds);
      myRef_time_forward.current =
        Number(myRef_time_forward.current) + timeDifferenceInSeconds;
      setTimeInreverse(
        Number(myRef_time_backward.current) - timeDifferenceInSeconds,
      );
      myRef_time_backward.current =
        Number(myRef_time_backward.current) - timeDifferenceInSeconds;
    } else {
      let result = timeDifferenceInSeconds + Number(myRef_time_forward.current);
      if (result < 0) {
        setTime(0);
        myRef_time_forward.current = 0;
        setTimeInreverse(totalSeconds);
        myRef_time_backward.current = totalSeconds;
      } else {
        setTime(timeDifferenceInSeconds + Number(myRef_time_forward.current));
        myRef_time_forward.current =
          timeDifferenceInSeconds + Number(myRef_time_forward.current);
        setTimeInreverse(
          Number(myRef_time_backward.current) - timeDifferenceInSeconds,
        );
        myRef_time_backward.current =
          Number(myRef_time_backward.current) - timeDifferenceInSeconds;
      }

    }
    setTimerStartTimelocal(newStartTime);
    Asyncstore.storeJsonData(Asyncstore.Keys.TIMER_START_TIME, newStartTime);
    setIsStartTimeUpdated(true);
    setColorsBasedOnFastingHours();
  };

  const storeTimerinlocalDb = () => {
    Asyncstore.storeJsonData(
      Asyncstore.Keys.TIMER_FORWARD,
      myRef_time_forward.current,
    );
    Asyncstore.storeJsonData(
      Asyncstore.Keys.TIMER_BACKWARD,
      myRef_time_backward.current,
    );
    Asyncstore.storeJsonData(
      Asyncstore.Keys.TIMER_BACKGROUND_VALUE,
      moment().valueOf(),
    );
    Asyncstore.storeJsonData(
      Asyncstore.Keys.SELECTED_FAST_TIME_DATA,
      myRef_Fasting_hours.current,
    );
    setBackgroundTime(moment().valueOf());
  };
  const getTimerFromlocalDb = async () => {
    let isTimerRuning = await Asyncstore.getJsonData(
      Asyncstore.Keys.IS_TIMER_RUNING,
    );

    if (isTimerRuning) {
      setisTimeerStart(true);
      let timer = await Asyncstore.getData(Asyncstore.Keys.TIMER_FORWARD);
      let tierm_reverse = await Asyncstore.getData(
        Asyncstore.Keys.TIMER_BACKWARD,
      );

      let tierm_back_value = await Asyncstore.getData(
        Asyncstore.Keys.TIMER_BACKGROUND_VALUE,
      );
      let fastingHr = await Asyncstore.getJsonData(
        Asyncstore.Keys.SELECTED_FAST_TIME_DATA,
      );

      fastingHour = parseInt(fastingHr);
      setFastingHourState(fastingHour);
      myRef_Fasting_hours.current = fastingHour;
      const currentTime = moment().valueOf();

      const timeDifference = currentTime - tierm_back_value;
      let tempTimediff = Math.floor(timeDifference / 1000);

      setTime(Number(timer) + tempTimediff);
      myRef_time_forward.current = Number(timer) + tempTimediff;
      myRef_time_backward.current = Number(tierm_reverse) - tempTimediff;
      setTimeInreverse(Number(tierm_reverse) - tempTimediff);

      let startTimetemp = await Asyncstore.getJsonData(
        Asyncstore.Keys.TIMER_START_TIME,
      );
      setTimerStartTimelocal(startTimetemp);

      setStartedTime(startTimetemp);
      let calculateEndTimev = calculateEndTime(startTimetemp, fastingHr);
      setEndTime(calculateEndTimev);
      
    } else {
      // onStopTimerCalled();
      init();
    }
  };

  const getTimerFromServer = async calledfrom => {
    if (isInterNetOn) {
      dispatch(fastListLatest());
    }
  };

  const setTimerFromServer = async () => {
    let getAPiOngoingFast = selector_home.fastListRes;

    if (getAPiOngoingFast?.isTimerRuning) {
      setisTimeerStart(true);
      let timer = getAPiOngoingFast?.timer;
      let tierm_reverse = getAPiOngoingFast.timeInreverse;

      let tierm_back_value = getAPiOngoingFast?.timeBackground;
      let fastingHr = getAPiOngoingFast?.fastingHour;

      fastingHour = parseInt(fastingHr);
      setFastingHourState(fastingHour);
      myRef_Fasting_hours.current = fastingHour;
      // const currentTime = new Date().getTime();
      const currentTime = moment().valueOf();

      const timeDifference = currentTime - tierm_back_value;
      // const currentTime = new Date().getTime();
      // const timeDifference = Math.floor((currentTime - backgroundTime) / 1000); // Calculate difference in seconds
      let tempTimediff = Math.floor(timeDifference / 1000);

      setTime(Number(timer) + tempTimediff);
      myRef_time_forward.current = Number(timer) + tempTimediff;
      myRef_time_backward.current = Number(tierm_reverse) - tempTimediff;
      setTimeInreverse(Number(tierm_reverse) - tempTimediff);

      const inputStartDate = new Date(getAPiOngoingFast?.startDateTime);
      let startTimetemp = inputStartDate.toISOString();
      setTimerStartTimelocal(startTimetemp);

      setStartedTime(startTimetemp);
      let calculateEndTimev = calculateEndTime(startTimetemp, fastingHr);
      setEndTime(calculateEndTimev);
      Asyncstore.storeJsonData(
        Asyncstore.Keys.ONGOING_FAST_ID,
        getAPiOngoingFast.id,
      );
      storeTimerinlocalDb();
    } else {
      // onStopTimerCalled();
      init();
      if (!isInterNetOn) {
        getTimerFromlocalDb();
      }
    }
  };

  const onStopTimerCalled = () => {
    setOnEndClick(true);
    setisFastCompleted(true);
    setShowReverseTime(true);
    setIsCountingUp(true);
    setTime(0);
    setTimeInreverse(totalSeconds);
    myRef_time_forward.current = 0;
    myRef_time_backward.current = totalSeconds;
    setisTimeerStart(false);
    Asyncstore.storeJsonData(Asyncstore.Keys.IS_TIMER_RUNING, false);
    Asyncstore.storeJsonData(Asyncstore.Keys.TIMER_FORWARD, 0);
    Asyncstore.storeJsonData(Asyncstore.Keys.TIMER_BACKWARD, totalSeconds);
    Asyncstore.storeJsonData(
      Asyncstore.Keys.TIMER_BACKGROUND_VALUE,
      moment().valueOf(),
    );
    handleCancelNotification();
    // postEndOfTimertoServer();
  };

  const init = async () => {
    setShowReverseTime(true);
    setIsCountingUp(true);
    setTime(0);
    setTimeout(() => {
      setisFastCompleted(false);
    }, 2000);

    // setTimeInreverse(totalSeconds);
    myRef_time_forward.current = 0;
    myRef_time_backward.current = totalSeconds;
    setisTimeerStart(false);
    Asyncstore.storeJsonData(Asyncstore.Keys.IS_TIMER_RUNING, false);
    Asyncstore.storeJsonData(Asyncstore.Keys.TIMER_FORWARD, 0);
    Asyncstore.storeJsonData(Asyncstore.Keys.TIMER_BACKWARD, totalSeconds);
    Asyncstore.storeJsonData(
      Asyncstore.Keys.TIMER_BACKGROUND_VALUE,
      moment().valueOf(),
    );
    let fastingHr = await Asyncstore.getJsonData(
      Asyncstore.Keys.SELECTED_FAST_TIME_DATA,
    );

    fastingHour = fastingHr ? parseInt(fastingHr) : 1;
    setFastingHourState(fastingHour);
    myRef_Fasting_hours.current = fastingHour;
    const totalSeconds2 = fastingHour * 3600;
    setTimeInreverse(totalSeconds2);
    if (fastingHr == undefined) {

      fastingHour = parseInt(1);
      setFastingHourState(1);
      myRef_Fasting_hours.current = 1;
    }
  };
  const onStartTimerCalled = () => {
    setOnStartClick(true);
    setColorsBasedOnFastingHours();
    setisFastCompleted(false);
    setShowReverseTime(true);
    setIsCountingUp(true);
    setTime(0);
    setTimeInreverse(totalSeconds);
    myRef_time_forward.current = 0;
    myRef_time_backward.current = totalSeconds;
    setisTimeerStart(true);
    let startTimetemp = new Date();
    setTimerStartTimelocal(startTimetemp);
    setStartedTime(startTimetemp);
    Asyncstore.storeJsonData(Asyncstore.Keys.TIMER_START_TIME, startTimetemp);
    let calculateEndTimev = calculateEndTime(startTimetemp, fastingHourState);
    setEndTime(calculateEndTimev);
    Asyncstore.storeJsonData(Asyncstore.Keys.IS_TIMER_RUNING, true);
    Asyncstore.storeJsonData(Asyncstore.Keys.TIMER_FORWARD, 0);
    Asyncstore.storeJsonData(Asyncstore.Keys.TIMER_BACKWARD, totalSeconds);
    Asyncstore.storeJsonData(
      Asyncstore.Keys.TIMER_BACKGROUND_VALUE,
      moment().valueOf(),
    );

    const start = moment(startTimetemp);
    const end = start.clone().add(fastingHourState, 'hours'); // Calculate end time

    let notification_text = constants.FAST_ABOUT_END;
    let timetoShow = new Date(end - 900 * 1000);
    handleScheduledNotification(
      constants.KEEP_IT_UP,
      notification_text,
      timetoShow,
    );

    // set for on time of fast completed
    let notification_text_FAST_ended = constants.FAST_ENDED;
    let timetoShow_ended = new Date(end);

    handleScheduledNotification(
      constants.WELL_DONE,
      notification_text_FAST_ended,
      timetoShow_ended,
    );

    // handleCancelNotification();
  };

  function formatDateTimeForApicall(inputDate) {
    const originalDate = new Date(inputDate);

    // Applying the time difference of 5 hours and 30 minutes
    const timeDifference = 5 * 60 * 60 * 1000 + 30 * 60 * 1000;
    const adjustedDate = new Date(originalDate.getTime() + timeDifference);

    const day = adjustedDate.getUTCDate().toString().padStart(2, '0');
    const month = (adjustedDate.getUTCMonth() + 1).toString().padStart(2, '0');
    const year = adjustedDate.getUTCFullYear();
    const hours = adjustedDate.getUTCHours().toString().padStart(2, '0');
    const minutes = adjustedDate.getUTCMinutes().toString().padStart(2, '0');
    // const seconds = adjustedDate.getUTCSeconds().toString().padStart(2, '0');
    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
    return formattedDate;
  }
  const postStartOfTimertoServer = () => {
    const date_start = formatDateTimeForApicall(startDateTime);
    const date_end = formatDateTimeForApicall(endDateTimeApi);

    const {isCurrentTimeGreater, isCurrentTimeLess, timeDifferenceInHours} =
      compareDates(endDateTimeApi);
    let End_time;
    if (isCurrentTimeGreater || isCurrentTimeLess) {
      End_time = formatDateTimeForApicall(new Date());
    } else {
      End_time = date_end;
    }
    if (isInterNetOn) {
      let bgTime = moment().valueOf();
      let payLoadtemp = {
        date_start_time: date_start,
        date_end_time: date_end,
        fastingHour: myRef_Fasting_hours.current,
        isFastCompleted: isFastCompleted,
        isTimerRuning: timeerStart,
        timer: time,
        timeInreverse: timeInreverse,
        timeBackground: bgTime,
      };
   
      const formData = new FormData();

      formData.append('date_start_time', date_start);
      formData.append('date_end_time', date_end);
      formData.append('fastingHour', myRef_Fasting_hours.current);
      formData.append('isFastCompleted', isFastCompleted);
      formData.append('isTimerRuning', timeerStart);
      formData.append('timer', time);
      formData.append('timeInreverse', timeInreverse);
      formData.append('timeBackground', bgTime);
      formData.append('appLocalData', payLoadtemp);
      dispatch(addFast(formData));
      setOnStartClick(false);
    }
  };

  const postEndOfTimertoServer = async () => {
    // const date_start = formatDateTimeForApicall(startDateTime);
    // const date_end = formatDateTimeForApicall(endDateTimeApi);

    const date_start = formatDateTimeForApicall(startDateTime);
    const date_end = formatDateTimeForApicall(endDateTimeApi);
    let id_local = await Asyncstore.getJsonData(
      Asyncstore.Keys.ONGOING_FAST_ID,
    );

    const {isCurrentTimeGreater, isCurrentTimeLess, timeDifferenceInHours} =
      compareDates(endDateTimeApi);
    let End_time;
    if (isCurrentTimeGreater || isCurrentTimeLess) {
      End_time = formatDateTimeForApicall(new Date()); // todo need to re-think, we can always send current time for end time and calcule the diff leter
    } else {
      End_time = date_end;
    }
    let bgTime = moment().valueOf();

    let payLoadtemp = {
      id: id_local,
      date_start_time: date_start,
      date_end_time: End_time,
      fastingHour: myRef_Fasting_hours.current,
      isFastCompleted: isFastCompleted,
      isTimerRuning: timeerStart,
      timer: time,
      timeInreverse: timeInreverse,
      timeBackground: bgTime,
    };
    if (isInterNetOn) {
      const formData = new FormData();
      formData.append('id', id_local);
      formData.append('date_start_time', date_start);
      formData.append('date_end_time', End_time);
      formData.append('fastingHour', myRef_Fasting_hours.current);
      formData.append('isFastCompleted', isFastCompleted);
      formData.append('isTimerRuning', timeerStart);
      formData.append('timer', time);
      formData.append('timeInreverse', timeInreverse);
      formData.append('timeBackground', bgTime);
      formData.append('appLocalData', payLoadtemp);

      dispatch(updateFast(formData));
      setOnEndClick(false);
    }
  };

  const storeDataOnServer = async () => {
    const date_start = formatDateTimeForApicall(startDateTime);
    const date_end = formatDateTimeForApicall(endDateTimeApi);
    let id_local = await Asyncstore.getJsonData(
      Asyncstore.Keys.ONGOING_FAST_ID,
    );
    const {isCurrentTimeGreater, isCurrentTimeLess, timeDifferenceInHours} =
      compareDates(endDateTimeApi);
    let End_time;
    if (isCurrentTimeGreater || isCurrentTimeLess) {
      End_time = formatDateTimeForApicall(new Date()); // todo need to re-think, we can always send current time for end time and calcule the diff leter
    } else {
      End_time = date_end;
    }
    let bgTime = moment().valueOf();

    let payLoadtemp = {
      id: id_local,
      date_start_time: date_start,
      date_end_time: End_time,
      fastingHour: myRef_Fasting_hours.current,
      isFastCompleted: isFastCompleted,
      isTimerRuning: timeerStart,
      timer: time,
      timeInreverse: timeInreverse,
      timeBackground: bgTime,
    };
    if (isInterNetOn) {
      const formData = new FormData();
      formData.append('id', id_local);
      formData.append('date_start_time', date_start);
      formData.append('date_end_time', End_time);
      formData.append('fastingHour', myRef_Fasting_hours.current);
      formData.append('isFastCompleted', isFastCompleted);
      formData.append('isTimerRuning', timeerStart);
      formData.append('timer', time);
      formData.append('timeInreverse', timeInreverse);
      formData.append('timeBackground', bgTime);
      formData.append('appLocalData', payLoadtemp);

      dispatch(updateFast(formData));
      setIsStartTimeUpdated(false);
    }
  };

  const compareDates = givenTimestamp => {
    const currentDatetime = moment(new Date());
    const givenDatetime = moment(givenTimestamp);

    const isCurrentTimeGreater = currentDatetime.isAfter(givenDatetime);
    const isCurrentTimeLess = currentDatetime.isBefore(givenDatetime);

    const timeDifferenceInHours = currentDatetime.diff(givenDatetime, 'hours');

    return {isCurrentTimeGreater, isCurrentTimeLess, timeDifferenceInHours};
  };

  const calculateEndTime = (startTime, totalHours) => {
    const start = moment(startTime);
    const end = start.clone().add(totalHours, 'hours'); // Calculate end time

    let endFormat;
    const today = moment().startOf('day'); // Get the start of today
    const tomorrow = moment().add(1, 'day').startOf('day'); // G

    endTimelocal = end;
    setEndTimeApi(end);
   

    // Check if the end time is today
    if (end.isBetween(today, moment().endOf('day'))) {
      return 'Today, ' + end.format('HH:mm');
    }
    // Check if the end time is tomorrow
    else if (end.isBetween(tomorrow, tomorrow.clone().endOf('day'))) {
      return 'Tomorrow, ' + end.format('HH:mm');
    }
    // For other cases, use the general format
    else {
      return end.format('MMM D, HH:mm');
    }
  };

  const setColorsBasedOnFastingHours = () => {
    if (fastingHourState > 12) {
      const currentTime = new Date().getHours();

      if (checkIsDaytime(currentTime)) {
        setColorsArrary(colorsssForDay);
      } else {
        setColorsArrary(colorsssForNight);
      }
    } else {
      setColorsArrary(colorsssNight);
    }
  };

  const formatTime = timeInSeconds => {
    const hours = Math.floor(timeInSeconds / 3600);
    const minutes = Math.floor((timeInSeconds % 3600) / 60);
    const seconds = timeInSeconds % 60;

    const formattedHours = String(hours).padStart(2, '0');
    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  };

  
  let formattedPercentage;
  if (time >= totalSeconds) {
    formattedPercentage = 100;
  } else {
    const percentage = (time / totalSeconds) * 100;
    formattedPercentage = percentage.toFixed(0); // Format percentage to two decimal places
  }
  const setPercentage = () => {
    if (totalSeconds > time) {
      const formattedPercentage = percentage.toFixed(0);
    } else {
      const percentage =
        (time / (myRef_Fasting_hours.current * totalSeconds)) * 100;
      const formattedPercentage = percentage.toFixed(0); // Format percentage to two decimal places
    }
  };

  const renderAddactivityBtn = () => {
    return (
      <>
        
        <View style={{flex: 1, marginTop: 20, paddingHorizontal: dimens.w3}}>
          <View style={styles.cardsRowContainer}>
            <TouchableOpacity
              onPress={() => {
                setIsAddWeightVisible(true);
              }}
              style={styles.waterCardContainer}>
              <View style={styles.waterLevelContainer}>
                <Text style={styles.waterIntakeBtntext}>
                  {myProfileSelector?.myProfileData?.watervalue == undefined
                    ? '0/0'
                    : (
                        myProfileSelector?.myProfileData?.watervalue / 1000
                      ).toFixed(2) +
                      '/' +
                      myProfileSelector?.myProfileData?.watergoal +
                      ' L'}
                </Text>
                <Text style={styles.waterIntakeBtntext2}>WATER</Text>
              </View>
              <View style={{flex: 1}}>
                <Image
                  source={
                    AppThemeName == 'MyDefaultThemeDay'
                      ? image.ic_cupCoffe_orange
                      : image.ic_cupCoffe_blue
                  }
                  resizeMode="contain"
                  style={{
                    width: dimens.w15,
                    height: dimens.h10,
                  }}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setIsActivityIntakeVisible(true);
              }}
              style={styles.activityCardContainer}>
              <View style={styles.activityLevelContainer}>
                <Text style={styles.waterIntakeBtntext}>
                  {myProfileSelector?.myProfileData?.activityvalue == undefined
                    ? '0/0'
                    : myProfileSelector?.myProfileData?.activityvalue +
                      '/' +
                      myProfileSelector?.myProfileData?.activitygoal +
                      ' M'}
                </Text>
                <Text style={styles.waterIntakeBtntext2}>ACTIVITY</Text>
              </View>
              <View style={{flex: 1}}>
                <Image
                  source={
                    AppThemeName == 'MyDefaultThemeDay'
                      ? image.ic_thunder_orange
                      : image.ic_thunder_blue
                  }
                  resizeMode="contain"
                  style={{
                    width: dimens.w13,
                    height: dimens.h10,
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{flex: 1, marginTop: 20, paddingHorizontal: dimens.w3}}>
          <View style={styles.cardsRowContainer}>
            <TouchableOpacity
              onPress={() => {
                setWeightBottomSheet(true);
                setIsContentVisible(true);
              }}
              style={styles.waterCardContainer}>
              <View style={styles.waterLevelContainer}>
                <Text style={styles.waterIntakeBtntext}>210 lbs</Text>
                <Text style={styles.waterIntakeBtntext2}>WEIGHT</Text>
              </View>
              <View style={{flex: 1}}>
                <Image
                  source={
                    AppThemeName == 'MyDefaultThemeDay'
                      ? image.ic_cupCoffe_orange
                      : image.ic_cupCoffe_blue
                  }
                  resizeMode="contain"
                  style={{
                    width: dimens.w15,
                    height: dimens.h10,
                  }}
                />
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                setQuickSnap(true);
              }}
              style={styles.activityCardContainer}>
              <View style={styles.activityLevelContainer}>
                <Text style={styles.waterIntakeBtntext}>4</Text>
                <Text style={styles.waterIntakeBtntext2}>PHOTOS</Text>
              </View>
              <View style={{flex: 1}}>
                <Image
                  source={
                    AppThemeName == 'MyDefaultThemeDay'
                      ? image.ic_thunder_orange
                      : image.ic_thunder_blue
                  }
                  resizeMode="contain"
                  style={{
                    width: dimens.w13,
                    height: dimens.h10,
                  }}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </>
    );
  };

  const renderDailyArticle = () => {
    return (
      <>
        <View style={{marginVertical: dimens.h2}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: dimens.w3,
            }}>
            <Text style={styles.dailyArtTitle}>Fasting Odyssey</Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(commonStackIdentifier.home_bottom_tabs, {
                  screen: 'EXPLORE_TAB',
                });
              }}>
              <Text
                style={{
                  fontSize: fontsizes.FONT_12Px_H6,
                  fontFamily: font.Proximanovaexcn_Regular,
                  color: colors.textInputTextColor,
                  //marginBottom: dimens.h1_5,
                  marginTop: dimens.h1,
                  marginRight: 5,
                }}>
                See All
              </Text>
            </TouchableOpacity>
          </View>
          <View style={{}}>
            <FlatList
              //data={articleData}
              data={articleList}
              showsHorizontalScrollIndicator={false}
              horizontal
              // renderItem={item => ArticleCard(item)}
              renderItem={item => (
                <DailyArticleComp item={item} navigation={navigation} />
              )}
            />
          </View>
        </View>
      </>
    );
  };

  const formateStartTime = time => {
    return moment(time).format('MMM D, HH:mm');
  };

  const handleCloseModal = () => {
    setWeightBottomSheet(false);
    setSelectedField('');
  };
  const handleFieldSubmit = (field, value) => {
    console.log(`Field: ${field}, Value: ${value}`);
  };
  return (
    <>
      
      <SafeAreaView style={{flex: 1, backgroundColor: colors.darkWhite}}>
        <ScrollView bounces={false} style={{flex: 1}}>
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle={'dark-content'}
          />
          <View
            style={[
              {
                backgroundColor: 'transparent',
                paddingTop: Platform.OS == 'android' ? dimens.h6 : 0,
                //paddingHorizontal: dimens.w4,
              },
            ]}>
            <Header
              title={`Hi, ${
                myProfileSelector?.myProfileData?.first_name
                  ? myProfileSelector?.myProfileData?.first_name
                  : ''
              }`}
              prefixIcon={image.ic_Calendar}
              onPrefixPress={() =>
                navigation.navigate(commonStackIdentifier.calendar_days_screen)
              }
              customStyle={
                {
                  paddingHorizontal: 10,
                }
              }
              profile={false}
            />
          </View>

          {isupdateStartDate && (
            <CommonDatePickerSheet
              visibility={isupdateStartDate}
              onBackdropPress={() => {
                setIsupdateStartDate(false);
              }}
              onItemClick={item => {
                setStartedTime(item);

                let calculateEndTimev = calculateEndTime(
                  item,
                  fastingHourState,
                );
                setEndTime(calculateEndTimev);

                handleCancelNotification();
                const start = moment(item);
                const end = start.clone().add(fastingHourState, 'hours'); // Calculate end time
                let notification_text = constants.FAST_ABOUT_END;
                let timetoShow = new Date(end - 900 * 1000);
                handleScheduledNotification(
                  constants.KEEP_IT_UP,
                  notification_text,
                  timetoShow,
                );
                let notification_text_FAST_ended = constants.FAST_ENDED;
                let timetoShow_ended = new Date(end);
                handleScheduledNotification(
                  constants.WELL_DONE,
                  notification_text_FAST_ended,
                  timetoShow_ended,
                );
                handleUpdateStartTime(item);
              }}
              selectedDate={startDateTime}
              mode={'datetime'}
            />
          )}
          {isAddWeightVisible && (
            <AddWaterBottomSheet
              visibility={isAddWeightVisible}
              onBackdropPress={() => {
                setIsAddWeightVisible(false);
              }}
              prop={props}
              waterValue={myProfileSelector?.myProfileData?.watervalue}
              waterGoal={myProfileSelector?.myProfileData?.watergoal}
            />
          )}
          {isActivityIntakeVisible && (
            <ActivityIntakeBottomSheet
              visibility={isActivityIntakeVisible}
              onBackdropPress={() => {
                setIsActivityIntakeVisible(false);
              }}
              props={props}
              activityValue={myProfileSelector?.myProfileData?.activityvalue}
              activityGoal={myProfileSelector?.myProfileData?.activitygoal}
            />
          )}
          <View
            style={[
              commonStyle.appverticalePadding,
              {flex: 1, paddingBottom: dimens.h5},
            ]}>
            <View
              style={{
                marginBottom: 20,
                paddingHorizontal: dimens.w3,
              }}>
              <WeekViewCalendar />
            </View>

            <View style={{flex: 1, paddingHorizontal: dimens.w3}}>
              <View style={styles.whiteContainerTimer}>
                <TouchableOpacity
                  style={styles.roundBtn}
                  onPress={() => {
                    navigation.navigate(commonStackIdentifier.choose_a_fast, {
                      isFromHome: true,
                    });
                  }}>
                  <Text style={styles.fastingHourstext}>
                    {fastingHourState}
                  </Text>
                </TouchableOpacity>
                {timeerStart && (
                  <TouchableOpacity
                    style={styles.roundBtnRight}
                    onPress={() => {
                      onStopTimerCalled();
                    }}>
                    <Text style={styles.endFastText}>{'Stop'}</Text>
                  </TouchableOpacity>
                )}

                <AnimatedCircularProgress
                  rotation={366}
                  size={width / 1.3}
                  duration={0}
                  width={15}
                  fill={parseInt(formattedPercentage)}
                  tintColor={colorsArrary}
                  backgroundColor={'#F8F8F8'}
                  padding={10}
                  arcSweepAngle={345}
                  renderCap={({center}) => (
                    <TouchableOpacity
                      style={{width: center.x, height: center.y}}>
                      <Circle cx={center.x} cy={center.y} r="16" fill="black" />
                    </TouchableOpacity>
                  )}
                  renderCap2={({center}) => (
                    <>
                      <Circle
                        cx={center.x}
                        cy={center.y}
                        r="7"
                        fill="white"
                        stroke="white"
                        strokeWidth="0"></Circle>

                    </>
                  )}
                  childrenContainerStyle={{}}
                  children={callback => (
                    <View
                      style={{
                        zIndex: 1,
                        alignItems: 'center',
                      }}>
                      {isFastCompleted ? (
                        <>
                          <FastCompletedComp />
                        </>
                      ) : (
                        <>
                          <TouchableOpacity
                            style={{alignItems: 'center'}}
                            onPress={() => {
                              if (showReverseTime) {
                                setIsCountingUp(!isCountingUp);
                              }
                            }}>
                            <Text style={styles.elapsedTime}>
                              {isCountingUp ? 'Elapsed Time' : 'Time remaining'}
                            </Text>
                            <Text style={styles.timerStyle}>
                              {isCountingUp
                                ? formatTime(time)
                                : formatTime(timeInreverse)}
                            </Text>

                            {/* <Text style={styles.timerStyle}>07:34:26</Text> */}
                            <Text style={styles.targetText}>
                              {'Target ' + fastingHourState + ' hours'}
                            </Text>
                          </TouchableOpacity>
                          
                        </>
                      )}

                     
                    </View>
                  )}
                />
                {timeerStart && (
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      width: Platform.OS === 'ios' ? dimens.h42 : dimens.h45,
                    }}>
                    <TouchableOpacity
                      style={styles.timerStartedTime}
                      onPress={() => setIsupdateStartDate(true)}>
                      <Text style={styles.timerStartedTimeText}>Started</Text>
                      <Text style={styles.timerStarted}>
                        {formateStartTime(startDateTime)}
                      </Text>
                    </TouchableOpacity>
                    <View style={styles.separator2} />
                    <TouchableOpacity
                      style={styles.timerStartedTime}
                      onPress={() => {
                        navigation.navigate(
                          commonStackIdentifier.choose_a_fast,
                          {
                            isFromHome: true,
                          },
                        );
                      }}>
                      <Text style={styles.timerStartedTimeText}>Goal</Text>
                      <Text style={styles.timerStarted}>{endDateTime}</Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
             
            </View>
            {/* start fast UI  */}
            {!timeerStart && (
              <StartYourFastComp
                fastHours={fastingHourState}
                onEditPress={() => {
                  navigation.navigate(commonStackIdentifier.choose_a_fast, {
                    isFromHome: true,
                  });
                }}
                onStartClick={() => {
                  onStartTimerCalled();
                  // onStopTimerCalled();
                }}
              />
            )}
            {renderAddactivityBtn()}

            <Supplements />

            {renderDailyArticle()}

            <ExploreCard />
            {/* Supercharge Your Health Potential  view*/}
            <SuperChargeYourHealthComp
              expand={expand}
              onPressExpand={() => setExpand(!expand)}
              onQuickSnapAddTrackerPress={() => setQuickSnap(true)}
              onWeightAddTrackerPress={() => setWeightBottomSheet(true)}
            />
            {showQuickSnap && (
              <QuickSnapBottomSheet
                visibility={showQuickSnap}
                onBackdropPress={() => {
                  setQuickSnap(false);
                }}
              />
            )}
            {weightBottomSheet && (
              <View style={{}}>
                <CustomModal
                  data={selectorEditProfile}
                  visible={weightBottomSheet}
                  field={'weight'}
                  isContentVisible={isContentVisible}
                  onClose={handleCloseModal}
                  onSubmit={handleFieldSubmit}
                  customStyle={{padding: 20}}
                  mainModalStyle={{
                    borderWidth: 1,
                    margin: 0,
                    backgroundColor: colors.darkWhite,
                    height: 200,
                  }}
                />
              </View>
            )}
          </View>
        </ScrollView>
        {myProfileSelector?.loading && (
        
          <View
            style={{
              position: 'absolute',
              flex: 1,
              // backgroundColor: 'red',
              top: dimens.h50,
              alignSelf: 'center',
            }}>
            <ProgressIndicator size="large" color={colors.black} />
          </View>
        )}
      </SafeAreaView>
      {/* </ImageBackground> */}
    </>
  );
};

export default Home;
