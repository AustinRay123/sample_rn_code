import URL from '../services/endpoint';
import {client} from '../services/client';
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {
  // title: '',
  // duration: '',
  logout: false,
  loading: false,
  logoutData: {},
  deleteLoading: false,
  deleteAccountErrorMsg: 'Are you sure want to delete the account ?',
  deleteAccountRes: {},
  deleteAccountCheckStatus: false,

  userDataRes: {},

  banner_product_list: {},
  openModalOnSetting: false,
};
export const logout = createAsyncThunk(
  'COMMOM/logout',
  async (params, thunkAPI) => {
    try {
      const response = await client.post(URL.LOGOUT, params);
      console.log('response.data-logout- ', response.data);
      return response.data;
    } catch (error) {
      console.log('error-- ', error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const deleteAccount = createAsyncThunk(
  'COMMOM/DELETE_ACCOUNT',
  async (params, thunkAPI) => {
    try {
      const response = await client.post(URL.DELETE_ACCOUNT, params);
      console.log('Response of Delete Account API ==', response.data);
      return response.data;
      // return response.data;
    } catch (error) {
      console.log('error-- ', error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const userProfileDetails = createAsyncThunk(
  'COMMOM/userProfileDetails',
  async (params, thunkAPI) => {
    try {
      const response = await client.post(URL.MY_PROFILE);
      console.log('response.profile.data-----', response.data);
      return response.data;
    } catch (error) {
      console.log('error-- ', error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const banner_list = createAsyncThunk(
  'COMMOM/banner_list',
  async (params, thunkAPI) => {
    try {
      const response = await client.get(URL.BANNER_LIST);
      console.log('response.data-BANNER_LIST- ', response.data);
      return response.data;
    } catch (error) {
      console.log('error-- ', error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const commonSlice = createSlice({
  name: 'commonSlice',
  initialState,
  reducers: {
    clearState: (state, action) => {
      state.logout = false;
      state.loading = false;
      state.logoutData = {};
      state.deleteAccountRes = {};
      state.deleteAccountCheckStatus = false;
      state.banner_product_list = {};
      state.userDataRes = {};
    },
    updateLogout: (state, action) => {
      state.logout = action.payload;
    },
    updateDeleteAccount: (state, action) => {
      state.deleteAccountRes = action.payload;
    },
    updateOpenModalOnSetting: (state, action) => {
      state.openModalOnSetting = action.payload;
    },
  },
  extraReducers: {
    [logout.pending]: (state, action) => {
      state.loading = true;
    },
    [logout.fulfilled]: (state, action) => {
      state.loading = false;
      state.logoutData = action.payload;
    },
    [logout.rejected]: (state, action) => {
      state.loading = false;
      state.logoutData = action.payload;
    },
    ///DELETE ACCOUNT
    [deleteAccount.pending]: (state, action) => {
      state.deleteLoading = true;
      state.deleteAccountRes = {};
      state.deleteAccountCheckStatus = false;
      state.deleteAccountCheckStatus = 'pending';
    },
    [deleteAccount.fulfilled]: (state, action) => {
      state.deleteLoading = false;
      state.deleteAccountRes = action.payload;
      state.deleteAccountCheckStatus = 'fulfilled';
    },
    [deleteAccount.rejected]: (state, action) => {
      state.deleteLoading = false;
      state.deleteAccountRes = {};
      state.deleteAccountCheckStatus = 'rejected';
    },

    ///GET ACCOUNT DETAILs
    [userProfileDetails.pending]: (state, action) => {
      state.userDataRes = {};
    },
    [userProfileDetails.fulfilled]: (state, action) => {
      if (action.payload) {
        state.userDataRes = action.payload;
      }
    },
    [userProfileDetails.rejected]: (state, action) => {
      state.userDataRes = {};
    },

    ///GET Banner List
    [banner_list.pending]: (state, action) => {
      state.banner_product_list = {};
    },
    [banner_list.fulfilled]: (state, action) => {
      if (action.payload) {
        state.banner_product_list = action.payload;
      }
    },
    [banner_list.rejected]: (state, action) => {
      state.banner_product_list = {};
    },
  },
});

export const {
  clearState,
  updateLogout,
  updateDeleteAccount,
  updateOpenModalOnSetting,
} = commonSlice.actions;

const commonSliceReducer = commonSlice.reducer;

export default commonSliceReducer;
