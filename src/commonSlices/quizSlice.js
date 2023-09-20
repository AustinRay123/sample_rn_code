import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {client} from '../services/client';
import URL from '../services/endpoint';

const initialState = {
  loading: false,
  errorMessage: '',
  optionData: {},
  saveAnswer: '',
  isNoticeModal: false,
};

export const chooseOptions = createAsyncThunk(
  'QUESTIONS_OPTIONS',
  async thunkAPI => {
    try {
      const response = await client.get(URL.QUESTIONS);
      console.log('response.data---QUESTIONS_OPTIONS-----', response.data);
      return response.data;
    } catch (error) {
      console.log('error-- ', error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const addUserAnswer = createAsyncThunk(
  'ADD_USER_ANSWER',
  async (params, thunkAPI) => {
    try {
      const response = await client.post(URL.USER_ANSWER, params);
      console.log('response.data -ADD_USER_ANSWER---', response.data);
      return response.data;
    } catch (error) {
      console.log('error-- ', error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const questionAnswerSlice = createSlice({
  name: 'questionAnswer',
  initialState,
  reducers: {
    clearState: (state, action) => {
      (state.title = ''), (state.duration = '');
      (state.errorMessage = ''), (state.optionData = {});
      state.saveAnswer = '';
    },
    modalHandle: (state, action) => {
      state.isNoticeModal = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(chooseOptions.pending, state => {
        state.loading = true;
        // state.checkDataStatus = 'pending';
        state.errorMessage = null;
      })
      .addCase(chooseOptions.fulfilled, (state, action) => {
        if (action.payload) {
          state.loading = false;
          state.optionData = action.payload?.data;
          // state.checkDataStatus = 'fulfilled';
        }
      })
      .addCase(chooseOptions.rejected, (state, action) => {
        state.loading = false;
        state.errorMessage = action.payload;
        // state.checkDataStatus = 'rejected';
      })

      // ------- save answer api ---------- //

      .addCase(addUserAnswer.pending, state => {
        state.weightListLoading = true;
        // state.checkDataStatus = 'pending';
        state.errorMessage = null;
      })
      .addCase(addUserAnswer.fulfilled, (state, action) => {
        if (action.payload) {
          state.weightListLoading = false;
          state.saveAnswer = action.payload;
          // state.checkDataStatus = 'fulfilled';
        }
      })
      .addCase(addUserAnswer.rejected, (state, action) => {
        state.weightListLoading = false;
        state.errorMessage = action.payload;
        // state.checkDataStatus = 'rejected';
      });
  },
});

export const {modalHandle,clearState} = questionAnswerSlice.actions;

const quizReducer = questionAnswerSlice.reducer;

export default quizReducer;
