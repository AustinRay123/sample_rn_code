import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import URL from '../services/endpoint';
import {client} from '../services/client';

const initialState = {
  startDate: '',
  startDateErrorMsg: 'Please select start Date',
  startDateIsError: false,
  endDate: '',
  endDateErrorMsg: 'Please select end Date',
  endDateIsError: false,
  loading: false,
  loadingList: false,
  errorMessage: '',
  addFastRes: {},
  addFastErrorMsg: 'Are you sure want too add the Fast ?',
  addFastIsError: false,
  addFastCheckStatus: false,
  fastListRes: {},
  fastlListIsError: false,
  fastListCheckStatus: false,
  editFastRes: {},
  editFastErrorMsg: 'Are you sure want too edit the Fast ?',
  editFastIsError: false,
  editFastCheckStatus: false,
};
export const addFast = createAsyncThunk(
  'ADD_FAST_HOME',
  async (params, thunkAPI) => {
    try {
      const response = await client.post(URL.ADD_FAST, params);
      if (response.data.status == false) {
        return response.data;
      } else {
        return response.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
export const fastList = createAsyncThunk(
  'FAST_LIST_HOME',
  async (params, thunkAPI) => {
    try {
      const response = await client.get(
        `${URL.FAST_LIST}?per_page=${params?.per_page}&page=${params?.current_page}`,
      );
      if (response.data.status == false) {
        return response.data;
      } else {
        return response.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const fastListLatest = createAsyncThunk(
  'FAST_LIST_HOME',
  async (params, thunkAPI) => {
    try {
      const response = await client.get(`${URL.FAST_LIST_LATEST}`);
      if (response.data.status == false) {
        return response.data;
      } else {
        return response.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
export const updateFast = createAsyncThunk(
  'UPDATE_FAST_HOME',
  async (params, thunkAPI) => {
    try {
      const response = await client.post(URL.UPDATE_FAST, params);
      if (response.data.status == false) {
        return response.data;
      } else {
        return response.data;
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const homeSlice = createSlice({
  name: 'homeSlice',
  initialState,
  reducers: {
    clearState: (state, action) => {
      (state.startDate = ''),
        (state.endDate = ''),
        (state.startDateIsError = false);
      state.endDateIsError = false;
      (state.addFastRes = {}), (state.editFastRes = {});
      state.addFastCheckStatus = '';
      state.editFastCheckStatus = '';
    },
    updateStartDate: (state, action) => {
      state.startDate = action.payload;
    },
    updateStartDateIsError: (state, action) => {
      state.startDateIsError = action.payload;
    },
    updateEndDate: (state, action) => {
      state.endDate = action.payload;
    },
    updateEndDateIsError: (state, action) => {
      state.endDateIsError = action.payload;
    },
    updateFastList: (state, action) => {
      state.fastListRes = [];
    },
    clearStatus: (state, action) => {
      state.addFastCheckStatus = false;
      state.editFastCheckStatus = false;
      state.deleteFastCheckStatus = false;
    },
  },
  extraReducers: builder => {
    ///Add Fast
    builder.addCase(addFast.pending, state => {
      // Set loading state to true
      state.loading = true;
      state.addFastRes = {};
      state.addFastCheckStatus = 'pending';
    });
    builder.addCase(addFast.fulfilled, (state, action) => {
      // Update the state with the API response data
      if (action.payload) {
        state.loading = false;
        state.addFastRes = action.payload;
        state.addFastCheckStatus = 'fulfilled';
      }
    });
    builder.addCase(addFast.rejected, (state, action) => {
      // Handle rejected state if needed
      state.loading = false;
      state.addFastRes = {};
      state.addFastCheckStatus = 'rejected';
    });

    ///Get Fast List
    builder.addCase(fastListLatest.pending, state => {
      // Set loading state to true
      state.loadingList = true;
      state.fastListRes = {};
      state.fastListCheckStatus = 'pending';
    });
    builder.addCase(fastListLatest.fulfilled, (state, action) => {
      // Update the state with the API response data
      if (action.payload) {
        state.loadingList = false;
        state.fastListRes = action?.payload?.data;
        state.fastListCheckStatus = 'fulfilled';
      }
    });
    builder.addCase(fastListLatest.rejected, (state, action) => {
      // Handle rejected state if needed
      state.loadingList = false;
      state.fastListRes = {};
      state.fastListCheckStatus = 'rejected';
    });

    ///Update Fast
    builder.addCase(updateFast.pending, state => {
      // Set loading state to true
      state.loading = true;
      state.editFastRes = {};
      state.editFastCheckStatus = 'pending';
    });
    builder.addCase(updateFast.fulfilled, (state, action) => {
      // Update the state with the API response data
      if (action.payload) {
        state.loading = false;
        state.editFastRes = action.payload;
        state.editFastCheckStatus = 'fulfilled';
      }
    });
    builder.addCase(updateFast.rejected, (state, action) => {
      // Handle rejected state if needed
      state.loading = false;
      state.editFastRes = {};
      state.editFastCheckStatus = 'rejected';
    });
  },
});

export const {
  clearState,
  updateStartDate,
  updateEndDate,
  updateEndDateIsError,
  updateStartDateIsError,
  updateFastList,
  clearStatus,
} = homeSlice.actions;

const homeReducer = homeSlice.reducer;

export default homeReducer;
