import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {client} from '../services/client';
import URL from '../services/endpoint';
import * as AsyncStore from '../asyncstorage/index';

const initialState = {
  googleSignup: '',
  googleSignupErrorMsg: 'Please select valid email',
  googleSignupIsError: false,
  errorMessage: '',
  googleSignupRes: {},
  googleSignInRes: {},
  loading: false,
  googleSignupCheckStatus: false,
  googleSignInCheckStatus: false,
  googleSignIn: '',
  googleSignInErrorMsg: 'Please select valid email',
  googleSignInIsError: false,
};

export const googleSignup = createAsyncThunk(
  'SOCIAL_LOGIN',
  async (params, thunkAPI) => {
    try {
      const response = await client.post(URL.SOCIAL_LOGIN, params);
      if (response.data.status == false) {
        return response.data;
      } else {
        const token = response?.data?.data?.token;
        AsyncStore.storeData(AsyncStore.Keys.ACCESS_TOKEN, token);
        AsyncStore.storeJsonData(
          AsyncStore.Keys.USER_DATA,
          response?.data?.data,
        );
        return response.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
export const socialSignUpSlice = createSlice({
  name: 'signupSlice',
  initialState,
  reducers: {
    clearGoogleState: (state, action) => {
      (state.googleSignup = ''),
        (state.googleSignupErrorMsg = 'Please enter valid email'),
        (state.googleSignupIsError = false);
      state.googleSignupRes = {};
      state.googleSignupCheckStatus = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(googleSignup.pending, state => {
      state.loading = true;
      (state.googleSignupCheckStatus = false),
        (state.googleSignupCheckStatus = 'pending');
    });
    builder.addCase(googleSignup.fulfilled, (state, action) => {
      if (action.payload) {
        state.loading = false;
        state.googleSignupRes = action.payload;
        state.googleSignupCheckStatus = 'fulfilled';
      }
    });
    builder.addCase(googleSignup.rejected, (state, action) => {
      state.loading = false;
      state.googleSignupRes = {};
      state.googleSignupCheckStatus = 'rejected';
    });
  },
});
export const {clearGoogleState} = socialSignUpSlice.actions;

const socialReducer = socialSignUpSlice.reducer;

export default socialReducer;
