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
  measurement_metric: '',
  errorMessage: '',
  userProfileData: {},
  loading: false,
  isModalOpen: false,
  updateUserProfileCheckStatus: false,
};

export const updateUserProfile = createAsyncThunk(
  'EDIT_PROFILE/updateUserProfile',
  async (params, thunkAPI) => {
    const maxRetries = 3;
    let retries = 0;
    //   try {
    //     const response = await client.post(URL.UPDATE_MY_PROFILE, params);
    //     console.log('response.update.data-----', response.data);
    //     return response.data;
    //   } catch (error) {
    //     console.log('error update-- ', error);

    //     return thunkAPI.rejectWithValue(error.response.data);
    //   }
    // },
    while (retries < maxRetries) {
      try {
        const response = await client.post(URL.UPDATE_MY_PROFILE, params);
        console.log('response.update.data-----', response.data);
        return response.data;
      } catch (error) {
        console.log('error update-- ', error);

        if (retries < maxRetries - 1) {
          retries++;
          // Retry the request after a delay (e.g., 1 second)
          await new Promise(resolve => setTimeout(resolve, 1000));
        } else {
          // Handle the error and notify the user that retries have failed
          return thunkAPI.rejectWithValue(error.response.data);
        }
      }
    }
  },
);

export const editProfile = createSlice({
  name: 'updateUserProfile',
  initialState,
  reducers: {
    clearState: (state, action) => {
      (state.firstName = ''), (state.lastName = ''), (state.birthDate = '');
      (state.selectedGender = ''), (state.height = '');
    },
    editFirstName: (state, action) => {
      state.firstName = action.payload;
    },
    editLastname: (state, action) => {
      state.lastName = action.payload;
    },
    editGender: (state, action) => {
      state.selectedGender = action.payload;
    },
    editBirthDate: (state, action) => {
      state.birthDate = action.payload;
    },
    editHeight: (state, action) => {
      state.height = action.payload;
    },
    // editWeight: (state, action) => {
    //   state.weight = action.payload;
    // },
    editProfilePic: (state, action) => {
      state.profilePic = action.payload;
    },
    checkImageType: (state, action) => {
      state.imageType = action.payload;
    },
    editEmail: (state, action) => {
      state.email = action.payload;
    },
    editMeasurement: (state, action) => {
      state.measurement_metric = action.payload;
    },
    openModal: (state, action) => {
      state.isModalOpen = action.payload;
    },
    clearUpdateStatus: (state, action) => {
      state.updateUserProfileCheckStatus = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(updateUserProfile.pending, state => {
        state.loading = true;
        state.errorMessage = null;
        state.updateUserProfileCheckStatus = 'pending';
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.userProfileData = action.payload;
        state.updateUserProfileCheckStatus = 'fulfilled';
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
        state.updateUserProfileCheckStatus = 'rejected';
      });
  },
});

export const {
  clearState,
  editBirthDate,
  editFirstName,
  editGender,
  editLastname,
  editHeight,
  // editWeight,
  editProfilePic,
  checkImageType,
  editEmail,
  editMeasurement,
  openModal,
  clearUpdateStatus,
} = editProfile.actions;

const editProfileReducer = editProfile.reducer;

export default editProfileReducer;
