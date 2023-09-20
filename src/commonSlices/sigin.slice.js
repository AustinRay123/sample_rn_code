import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {client} from '../services/client';
import URL from '../services/endpoint';
import {Alert} from 'react-native';
import {storeData} from '../asyncstorage';
import {ACCESS_TOKEN} from '../asyncstorage/Keys';
import * as AsyncStore from '../asyncstorage/index';

const initialState = {
  signInwithEmail: '',
  signInwithEmailErrorMsg: 'Please enter valid email',
  signInwithEmailIsError: false,
  isLoading: false,
  isSuccess: false,
  errorMessage: '',
  signIn: {},
  loading: false,
  signInCheckStatus: false,

  signPassword: '',
  signPasswordisSecure: true,
  signPasswordIsError: false,
  signPasswordErrorMsg: 'Please enter valide password',

  forgotPasswordEmail: '',
  forgotPasswordEmailErrorMsg: 'Please enter valid email',
  forgotPasswordEmailIsError: false,
};

export const signIn = createAsyncThunk('SIGNIN', async (params, thunkAPI) => {
  try {
    const response = await client.post(URL.SIGNIN, params);
    // ------ Uncomment if else code if needed ------- //
    if (response.data.status == false) {
      // showToast(response.data.message);
      // Alert.alert(response?.data?.message);
      return response.data;
    } else {
      // showToast('Login Successfully');
      console.log('Response of Sign in API ==', response.data);
      const token = response?.data?.data?.token;
      AsyncStore.storeData(AsyncStore.Keys.ACCESS_TOKEN, token);
      AsyncStore.storeJsonData(AsyncStore.Keys.USER_DATA, response?.data?.data);
      return response.data;
    }
    // return response.data;
  } catch (error) {
    console.log('error-- ', error);
    return thunkAPI.rejectWithValue(error.response.data);
  }
});

export const signinslice = createSlice({
  name: 'sigin',
  initialState,
  reducers: {
    clearState: (state, action) => {
      state.signIn = {};
      state.signInCheckStatus = false;
      state.signInwithEmail = '';
      state.signInwithEmailIsError = false;
      state.signPassword = '';
      state.signPasswordIsError = false;
      state.signPasswordisSecure = true;
      state.forgotPasswordEmail = '';
      state.forgotPasswordEmailIsError = false;

      state.signInwithEmailErrorMsg = 'Please enter valid email';
      state.signPasswordErrorMsg = 'Please enter valide password';
      state.forgotPasswordEmailErrorMsg = 'Please enter valid email';

      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = '';
    },
    clearStatus: (state, action) => {
      state.signInCheckStatus = false;
    },
    updatesignInwithEmail: (state, action) => {
      state.signInwithEmail = action.payload;
    },
    updatesignInwithEmailIsError: (state, action) => {
      state.signInwithEmailIsError = action.payload;
    },
    updateSignPassword: (state, action) => {
      state.signPassword = action.payload;
    },
    updateSignPasswordIsError: (state, action) => {
      state.signPasswordIsError = action.payload;
    },
    updateSignPasswordIsSecure: (state, action) => {
      state.signPasswordisSecure = !state.signPasswordisSecure;
    },

    updateForgotPasswordEmail: (state, action) => {
      state.forgotPasswordEmail = action.payload;
    },
    updateForgotPasswordEmailIsError: (state, action) => {
      state.forgotPasswordEmailIsError = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(signIn.pending, state => {
      // Set loading state to true
      state.loading = true;
      state.signIn = {};
      state.signInCheckStatus = 'pending';
    });
    builder.addCase(signIn.fulfilled, (state, action) => {
      // Update the state with the API response data
      if (action.payload) {
        state.loading = false;
        state.signIn = action.payload;
        state.signInCheckStatus = 'fulfilled';
      }
    });
    builder.addCase(signIn.rejected, (state, action) => {
      // Handle rejected state if needed
      state.loading = false;
      state.signIn = {};
      state.signInCheckStatus = 'rejected';
    });
  },
});

// Action creators are generated for each case reducer function
export const {
  clearState,
  updateSignPassword,
  updateSignPasswordIsSecure,
  updatesignInwithEmail,
  updatesignInwithEmailIsError,
  updateSignPasswordIsError,
  updateForgotPasswordEmail,
  updateForgotPasswordEmailIsError,
  clearStatus,
} = signinslice.actions;

const signInReducer = signinslice.reducer;

export default signInReducer;
