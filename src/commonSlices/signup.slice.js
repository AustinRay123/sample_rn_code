import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {client} from '../services/client';
import URL from '../services/endpoint';
import {Alert} from 'react-native';

const initialState = {
  otherSignUpEmail: '',
  otherSignUpEmailErrorMsg: 'Please enter valid email',
  otherSignUpEmailIsError: false,
  isLoading: false,
  isSuccess: false,
  errorMessage: '',
  emailExists: {},
  loading: false,
  emailCheckStatus: false,
  signUpData: {},
  signUpStatus: false,
  isPasswordSecure: true,
  isCofirmPasswordSecure: true,
  createPasswordText: '',
  createPasswordTextErrorMsg: 'Use at least 8 characters',
  createPasswordTextIsError: false,
  confirmPasswordText: '',
  confirmPasswordTextIsError: false,
  confirmPasswordTextErrorMsg: 'Password and confirm password does not match',

  firstName: '',
  firstNameErrorMsg: 'Please enter first name',
  firstNameIsError: false,
  lastName: '',
  lastNameErrorMsg: 'Please enter last name',
  lastNameIsError: false,
  selectedGender: '',
  selectedGenderMsg: 'Please select gender',
  selectedGenderIsError: false,
  birthDate: '',
  birthDateErrorMsg: 'Please select birth date',
  birthDateIsError: false,
  time: '',
  weight: '',
  isModalOpen: false,
  updateProfileStatus: false,
  updateProfileData: {},
  measurement_metric: '',
  claimYourSubEmail: '',
};

export const checkEmailExists = createAsyncThunk(
  'SIGNUP/checkEmailExists',
  async (params, thunkAPI) => {
    try {
      const response = await client.post(URL.CHECK_EMAIL_EXIST, params);
      // ------ Uncomment if else code if needed ------- //
      // if (response.data.status == false) {
      //   // showToast(response.data.message);
      //   return response.data;
      // } else {
      //   // showToast('Login Successfully');
      //   return response.data;
      // }
      return response.data;
    } catch (error) {
      console.log('error-- ', error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const signUp = createAsyncThunk(
  'SIGNUP/signUp',
  async (params, thunkAPI) => {
    try {
      const response = await client.post(URL.SIGN_UP, params);
      if (response.data.status == true) {
        return response.data;
      } else {
        return response.data;
      }
      // return response.data;
    } catch (error) {
      console.log('error-- ', error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const updateProfile = createAsyncThunk(
  'SIGNUP/updateProfile',
  async (params, thunkAPI) => {
    try {
      const response = await client.post(URL.USER_PROFILE, params);
      if (response.data.status == false) {
        return response.data;
      } else {
        return response.data;
      }
      // return response.data;
    } catch (error) {
      console.log('error-- ', error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const signupSlice = createSlice({
  name: 'emailExist',
  initialState,
  reducers: {
    clearState: (state, action) => {
      state.otherSignUpEmail = '';
      state.otherSignUpEmailIsError = false;
      state.otherSignUpEmailErrorMsg = '';
      state.isLoading = false;
      state.isSuccess = false;
      state.errorMessage = '';
      state.emailExists = {};
      state.loading = false;
      state.emailCheckStatus = false;
      state.signUpData = {};
      state.signUpStatus = false;
      state.isPasswordSecure = true;
      state.isCofirmPasswordSecure = true;
      state.createPasswordText = '';
      state.createPasswordTextErrorMsg = '';
      state.createPasswordTextIsError = false;
      state.confirmPasswordText = '';
      state.confirmPasswordTextIsError = false;
      state.confirmPasswordTextErrorMsg = '';
      state.firstName = '';
      state.firstNameErrorMsg = '';
      state.firstNameIsError = false;
      state.lastName = '';
      state.lastNameErrorMsg = '';
      state.lastNameIsError = false;
      state.selectedGender = '';
      state.selectedGenderMsg = '';
      state.selectedGenderIsError = false;
      state.birthDate = '';
      state.birthDateErrorMsg = '';
      state.birthDateIsError = false;
      state.time = '';
      state.weight = '';
      state.isModalOpen = false;
      state.updateProfileStatus = false;
      state.updateProfileData = {};
      state.claimYourSubEmail = '';
    },
    updateOtherSignUpEmail: (state, action) => {
      state.otherSignUpEmail = action.payload;
    },
    updateOtherSignUpEmailIsError: (state, action) => {
      state.otherSignUpEmailIsError = action.payload;
    },
    // for create password screen
    updateIsPassSecure: (state, action) => {
      state.isPasswordSecure = !state.isPasswordSecure;
    },
    updateIsConfirmPassSecure: (state, action) => {
      state.isCofirmPasswordSecure = !state.isCofirmPasswordSecure;
    },
    updateCreatPassword: (state, action) => {
      state.createPasswordText = action.payload;
    },
    updateConfirmPasword: (state, action) => {
      state.confirmPasswordText = action.payload;
    },
    updateCreatPasswordIsError: (state, action) => {
      state.createPasswordTextIsError = action.payload;
    },
    updateConfirmPaswordIsError: (state, action) => {
      state.confirmPasswordTextIsError = action.payload;
    },

    // for create profile screen
    updateFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    updateFirstNameIsError: (state, action) => {
      state.firstNameIsError = action.payload;
    },
    updateLastname: (state, action) => {
      state.lastName = action.payload;
    },
    updateLastnameIsError: (state, action) => {
      state.lastNameIsError = action.payload;
    },
    updateGender: (state, action) => {
      state.selectedGender = action.payload;
    },
    updateGenderIsError: (state, action) => {
      state.selectedGenderIsError = action.payload;
    },
    updateBirthDate: (state, action) => {
      state.birthDate = action.payload;
    },
    updateBirthDateIsError: (state, action) => {
      state.birthDateIsError = action.payload;
    },

    updateTime: (state, action) => {
      state.time = action.payload;
    },
    updateWeight: (state, action) => {
      state.weight = action.payload;
    },
    updateMeasurement: (state, action) => {
      state.measurement_metric = action.payload;
    },
    openModal: (state, action) => {
      state.isModalOpen = action.payload;
    },

    updateClaimYourSubEmail: (state, action) => {
      state.claimYourSubEmail = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(checkEmailExists.pending, state => {
      // Set loading state to true
      state.loading = true;
      state.emailCheckStatus = 'pending';
    });
    builder.addCase(checkEmailExists.fulfilled, (state, action) => {
      // Update the state with the API response data
      if (action.payload) {
        state.loading = false;
        state.emailExists = action.payload;
        state.emailCheckStatus = 'fulfilled';
      }
    });
    builder.addCase(checkEmailExists.rejected, (state, action) => {
      // Handle rejected state if needed
      state.loading = false;
      state.emailExists = {};
      state.emailCheckStatus = 'rejected';
    });
    builder.addCase(signUp.pending, state => {
      // Set loading state to true
      state.loading = true;
      state.signUpStatus = 'pending';
    });
    builder.addCase(signUp.fulfilled, (state, action) => {
      // Update the state with the API response data
      if (action.payload) {
        state.loading = false;
        state.signUpData = action.payload;
        state.signUpStatus = 'fulfilled';
      }
    });
    builder.addCase(signUp.rejected, (state, action) => {
      // Handle rejected state if needed
      state.loading = false;
      state.signUpData = {};
      state.signUpStatus = 'rejected';
    });
    builder.addCase(updateProfile.pending, state => {
      // Set loading state to true
      state.loading = true;
      state.updateProfileStatus = 'pending';
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      // Update the state with the API response data
      if (action.payload) {
        state.loading = false;
        state.updateProfileData = action.payload;
        state.updateProfileStatus = 'fulfilled';
      }
    });
    builder.addCase(updateProfile.rejected, (state, action) => {
      // Handle rejected state if needed
      state.loading = false;
      state.updateProfileData = {};
      state.updateProfileStatus = 'rejected';
    });
  },
});
// Action creators are generated for each case reducer function
export const {
  clearState,
  updateOtherSignUpEmail,
  updateOtherSignUpEmailIsError,
  updateFirstName,
  updateLastname,
  updateGender,
  updateBirthDate,
  updateTime,
  updateWeight,
  openModal,
  updateIsPassSecure,
  updateIsConfirmPassSecure,
  updateCreatPassword,
  updateConfirmPasword,
  updateCreatPasswordIsError,
  updateConfirmPaswordIsError,
  updateFirstNameIsError,
  updateLastnameIsError,
  updateGenderIsError,
  updateBirthDateIsError,
  updateClaimYourSubEmail,
  updateMeasurement,
} = signupSlice.actions;

const signupReducer = signupSlice.reducer;

export default signupReducer;
