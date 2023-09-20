import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {client} from '../services/client';
import URL from '../services/endpoint';

const initialState = {
  imageType: null,
  profilePic: null,
  email: '',
  firstName: '',
  lastName: '',
  birthDate: null,
  selectedGender: null,
  height: '',
  weight: '',
  time: '',
  errorMessage: '',
  myProfileData: {},
  loading: false,
  isModalOpen: false,
  checkDataStatus: false,
};

export const userProfileDetails = createAsyncThunk(
  'PROFILE/userProfileDetails',
  async (params, thunkAPI) => {
    try {
      const response = await client.post(URL.MY_PROFILE);
      // console.log('response.profile.data-----', response.data);
      return response.data;
    } catch (error) {
      console.log('error-- ', error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const cancelSubscription = createAsyncThunk(
  'PROFILE/cancelSubscription',
  async (params, thunkAPI) => {
    try {
      const response = await client.post(URL.CANCEL_SUBSCRIPTION);
      // console.log('response.profile.data-----', response.data);
      return response.data;
    } catch (error) {
      console.log('error-- ', error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const myProfileDetails = createSlice({
  name: 'userProfileDetails',
  initialState,
  reducers: {
    clearState: (state, action) => {
      (state.firstName = ''), (state.lastName = ''), (state.birthDate = '');
      (state.selectedGender = ''), (state.height = '');
    },
  },
  extraReducers: builder => {
    builder
      .addCase(userProfileDetails.pending, state => {
        state.loading = true;
        state.checkDataStatus = 'pending';
        state.errorMessage = null;
      })
      .addCase(userProfileDetails.fulfilled, (state, action) => {
        if (action.payload?.code === 200) {
          state.loading = false;
          state.myProfileData = action.payload?.data;
          state.checkDataStatus = 'fulfilled';
        }
      })
      .addCase(userProfileDetails.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
        state.checkDataStatus = 'rejected';
      })

      // cancel subscription
      .addCase(cancelSubscription.pending, state => {
        state.loading = true;
      
      })
      .addCase(cancelSubscription.fulfilled, (state, action) => {
        if (action.payload?.code === 200) {
          state.loading = false;
        }
      })
      .addCase(cancelSubscription.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const {clearState} = myProfileDetails.actions;

const myProfileReducer = myProfileDetails.reducer;

export default myProfileReducer;
