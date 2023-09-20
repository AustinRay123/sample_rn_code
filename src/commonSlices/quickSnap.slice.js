import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {client} from '../services/client';
import URL from '../services/endpoint';

const initialState = {
  loading: false,
  errorMessage: '',
  quickSnapRes: {},
  quickSnapTime: '',
  quickSnapDate: '',
  quickSnapImage: '',
};

export const quickSnapSlice = createSlice({
  name: 'QuickSnap',
  initialState,
  reducers: {
    clearState: (state, action) => {
      (state.quickSnapTime = ''),
        (state.quickSnapDate = ''),
        (state.quickSnapImage = ''((state.errorMessage = ''))),
        (state.quickSnapRes = {});
    },
    updateQSTime: (state, action) => {
      state.quickSnapTime = action.payload;
    },
    updateQSDate: (state, action) => {
      state.quickSnapDate = action.payload;
    },
    updateQSImage: (state, action) => {
      state.quickSnapImage = action.payload;
    },
  },
});

export const {clearState, updateQSTime, updateQSDate, updateQSImage} =
  quickSnapSlice.actions;

const quickSnapReducer = quickSnapSlice.reducer;

export default quickSnapReducer;
