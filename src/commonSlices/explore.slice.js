import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {client} from '../services/client';
import URL from '../services/endpoint';

const initialState = {
  articles: [],
  loading: false,
  isError: false,
  isFeaturedArticles: [],
  isFeaturedArticlesLoading: false,
  isFeaturedArticlesError: false,
};

export const getArticles = createAsyncThunk(
  'GET_ARTICLES',
  async (params, thunkAPI) => {
    try {
      // console.log('params-- ', params);
      const response = await client.get(
        `${URL.ARTICLE_LIST}?per_page=${params.per_page}&page=${params.current_page}`,
      );
      // console.log('Response of Get Articles API ==', response.data);
      return response.data;
    } catch (error) {
      console.log('error-- ', error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getFeaturedArticles = createAsyncThunk(
  'GET_FEATURED_ARTICLES',
  async (params, thunkAPI) => {
    try {
      const response = await client.get(
        //https://sampleApp.ninjasforjava.com/api/article/list?per_page=10&page=1&is_featured=1
        `${URL.ARTICLE_LIST}?per_page=${params.per_page}&page=${params.current_page}&is_featured=${params.is_featured}`,
      );
      // console.log('Response of Get Articles API ==', response.data);
      return response.data;
    } catch (error) {
      console.log('error-- ', error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const articlesSlice = createSlice({
  name: 'articles',
  initialState,
  reducers: {
    clearArticles: state => {
      state.articles = [];
      state.loading = false;
      state.isError = false;
      state.isFeaturedArticles = [];
      state.isFeaturedArticlesLoading = false;
      state.isFeaturedArticlesError = false;
    },
  },
  extraReducers: {
    [getArticles.pending]: (state, action) => {
      state.loading = true;
      state.isError = false;
    },
    [getArticles.fulfilled]: (state, action) => {
      state.loading = false;
      state.isError = false;
      state.articles = action.payload;
    },
    [getArticles.rejected]: (state, action) => {
      state.loading = false;
      state.isError = true;
    },
    [getFeaturedArticles.pending]: (state, action) => {
      state.isFeaturedArticlesLoading = true;
      state.isFeaturedArticlesError = false;
    },
    [getFeaturedArticles.fulfilled]: (state, action) => {
      state.isFeaturedArticlesLoading = false;
      state.isFeaturedArticlesError = false;
      state.isFeaturedArticles = action.payload;
    },
    [getFeaturedArticles.rejected]: (state, action) => {
      state.isFeaturedArticlesLoading = false;
      state.isFeaturedArticlesError = true;
    },
  },
});

export const {clearArticles} = articlesSlice.actions;
const articlesReducer = articlesSlice.reducer;
export default articlesReducer;
