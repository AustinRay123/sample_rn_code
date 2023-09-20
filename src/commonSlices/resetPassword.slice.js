import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import URL from '../services/endpoint';
import {client} from '../services/client';
import {Alert} from 'react-native';

const initialState = {
  email: '',
  emailErrorMsg: 'Please enter valid email',
  emailIsError: false,
  otp: '',
  otpErrorMsg: 'Please enter valid OTP',
  otpIsError: false,
  password: '',
  passwordErrorMsg: 'Please enter valid password',
  passwordisSecure: true,
  passwordIsError: false,
  conPassword: '',
  conPasswordErrorMsg: 'Please enter same password',
  conPasswordIsError: false,
  conPasswordisSecure: true,
  isLoading: false,
  isSuccess: false,
  errorMessage: '',
  forgotPasswordRes: {},
  verifyOTPRes: {},
  resetPasswordRes: {},
  loading: false,
  forgotPasswordCheckStatus: false,
  verifyOTPCheckStatus: false,
  resetPasswordCheckStatus: false,
};
export const forgotPassword = createAsyncThunk(
  'FORGOT_PASSWORD',
  async (params, thunkAPI) => {
    try {
      const response = await client.post(URL.FORGOT_PASSWORD, params);
      if (response.data.status == false) {
        return response.data;
      } else {
        console.log('Response of Forgot password API ==', response.data);
        return response.data;
      }
    } catch (error) {
      console.log('error-- ', error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
export const verifyOTP = createAsyncThunk(
  'VERIFY_OTP',
  async (params, thunkAPI) => {
    try {
      const response = await client.post(URL.VERIFY_OTP, params);
      if (response.data.status == false) {
        return response.data;
      } else {
        console.log('Response of Verify OTP API ==', response.data);
        return response.data;
      }
    } catch (error) {
      console.log('error-- ', error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
export const resetPassword = createAsyncThunk(
  'RESET_PASSWORD',
  async (params, thunkAPI) => {
    try {
      console.log('Params in reset', params);
      const response = await client.post(URL.RESET_PASSWORD, params);
      if (response.data.status == false) {
        return response.data;
      } else {
        console.log('Response of Verify OTP API ==', response.data);
        return response.data;
      }
    } catch (error) {
      console.log('error-- ', error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {
    clearState: (state, action) => {
      (state.email = ''),
        (state.otp = ''),
        (state.password = ''),
        (state.conPassword = ''),
        (state.errorMessage = ''),
        (state.loading = false),
        (state.forgotPasswordCheckStatus = false),
        (state.verifyOTPCheckStatus = false),
        (state.resetPasswordCheckStatus = false);
    },
    clearEmail: (state, action) => {
      state.email = '';
    },
    clearOTP: (state, action) => {
      state.otp = '';
      state.verifyOTPCheckStatus = false;
    },
    clearStatus: (state, action) => {
      state.resetPasswordCheckStatus = false;
    },
    clearForgotPasswordStatus: (state, action) => {
      state.forgotPasswordCheckStatus = false;
    },
    updateEmail: (state, action) => {
      state.email = action.payload;
    },
    updateEmailIsError: (state, action) => {
      state.emailIsError = action.payload;
    },
    updateOTP: (state, action) => {
      state.otp = action.payload;
    },
    updateOTPIsError: (state, action) => {
      state.otpIsError = action.payload;
    },
    updatePassword: (state, action) => {
      state.password = action.payload;
    },
    updatePasswordIsError: (state, action) => {
      state.passwordIsError = action.payload;
    },
    updatePasswordIsSecure: (state, action) => {
      state.passwordisSecure = !state.passwordisSecure;
    },
    updateConPassword: (state, action) => {
      state.conPassword = action.payload;
    },
    updateConPasswordIsError: (state, action) => {
      state.conPasswordIsError = action.payload;
    },
    updateConPasswordIsSecure: (state, action) => {
      state.conPasswordisSecure = !state.conPasswordisSecure;
    },
  },
  extraReducers: builder => {
    builder.addCase(forgotPassword.pending, state => {
      // Set loading state to true
      state.loading = true;
      state.forgotPasswordCheckStatus = 'pending';
    });
    builder.addCase(forgotPassword.fulfilled, (state, action) => {
      // Update the state with the API response data
      if (action.payload) {
        state.loading = false;
        state.forgotPasswordRes = action.payload;
        state.forgotPasswordCheckStatus = 'fulfilled';
      }
    });
    builder.addCase(forgotPassword.rejected, (state, action) => {
      // Handle rejected state if needed
      state.loading = false;
      state.forgotPasswordRes = {};
      state.forgotPasswordCheckStatus = 'rejected';
    });
    builder.addCase(verifyOTP.pending, state => {
      // Set loading state to true
      state.loading = true;
      state.verifyOTPCheckStatus = 'pending';
    });
    builder.addCase(verifyOTP.fulfilled, (state, action) => {
      // Update the state with the API response data
      if (action.payload) {
        state.loading = false;
        state.verifyOTPRes = action.payload;
        state.verifyOTPCheckStatus = 'fulfilled';
      }
    });
    builder.addCase(verifyOTP.rejected, (state, action) => {
      // Handle rejected state if needed
      state.loading = false;
      state.verifyOTPRes = {};
      state.verifyOTPCheckStatus = 'rejected';
    });
    builder.addCase(resetPassword.pending, state => {
      // Set loading state to true
      state.loading = true;
      state.resetPasswordCheckStatus = 'pending';
    });
    builder.addCase(resetPassword.fulfilled, (state, action) => {
      // Update the state with the API response data
      if (action.payload) {
        state.loading = false;
        state.resetPasswordRes = action.payload;
        state.resetPasswordCheckStatus = 'fulfilled';
      }
    });
    builder.addCase(resetPassword.rejected, (state, action) => {
      // Handle rejected state if needed
      state.loading = false;
      state.resetPasswordRes = {};
      state.resetPasswordCheckStatus = 'rejected';
    });
  },
});

export const {
  clearState,
  updateEmail,
  updateOTP,
  updatePassword,
  updateConPassword,
  updateEmailIsError,
  updateOTPIsError,
  updateConPasswordIsError,
  updatePasswordIsError,
  updateConPasswordIsSecure,
  updatePasswordIsSecure,
  clearOTP,
  clearEmail,
  clearStatus,
  clearForgotPasswordStatus,
} = resetPasswordSlice.actions;

const resetPasswordReducer = resetPasswordSlice.reducer;

export default resetPasswordReducer;
