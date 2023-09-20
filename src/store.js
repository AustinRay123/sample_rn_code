import {configureStore} from '@reduxjs/toolkit';
import counterReducer from './commonSlices/splash.slice';
import createpassReducer from './commonSlices/createpass.slice';
import signupReducer from './commonSlices/signup.slice';
import signInReducer from './commonSlices/sigin.slice';
import editProfileReducer from './commonSlices/editProfile.slice';
import myProfileReducer from './commonSlices/profile.slice';
import myWeightReducer from './commonSlices/weight.slice';
import commonSliceReducer from './commonSlices/common.slice';
import resetPasswordReducer from './commonSlices/resetPassword.slice';
import chooseYourGoalReducer from './commonSlices/chooseYourGoal.slice';
import waterIntakeReducer from './commonSlices/waterIntakeSlice';
import activityIntakeReducer from './commonSlices/activityIntakeSlice';
import createAddEditPresetReducer from './commonSlices/addEditPreset.slice';
import articlesReducer from './commonSlices/explore.slice';
import addFastReducer from './commonSlices/addFast.slice';
import productReducer from './commonSlices/product.slice';
import calendarReducer from './commonSlices/calendar.slice';
import socialReducer from './commonSlices/socialLogin.slice';
import homeReducer from './commonSlices/home.slice';
import graphListReducer from './commonSlices/graph.slice';
import quizReducer from './commonSlices/quizSlice';
import quickSnapReducer from './commonSlices/quickSnap.slice';

import claimYOurSubReducer from './commonSlices/ClaimSubscription.slice';
export const store = configureStore({
  reducer: {
    // [counterReducer.name]: counterReducer
    counterReducer: counterReducer,
    createpassReducer,
    signupReducer,
    signInReducer,
    editProfileReducer,
    myProfileReducer,
    myWeightReducer,
    commonSliceReducer,
    resetPasswordReducer,
    chooseYourGoalReducer,
    waterIntakeReducer,
    activityIntakeReducer,
    createAddEditPresetReducer,
    articlesReducer,
    addFastReducer,
    productReducer,
    calendarReducer,
    socialReducer,
    homeReducer,
    graphListReducer,
    quizReducer,
    claimYOurSubReducer,
    quickSnapReducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      immutableCheck: {warnAfter: 128},
      serializableCheck: {warnAfter: 128},
    }),
});
