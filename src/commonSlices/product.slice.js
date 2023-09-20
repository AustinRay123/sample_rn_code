import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {client} from '../services/client';
import URL from '../services/endpoint';

const initialState = {
  product: [],
  loading: false,
  isError: false,
};

export const getProduct = createAsyncThunk(
  'GET_PRODUCT',
  async (params, thunkAPI) => {
    try {
      const response = await client.get(URL.PRODUCT_LIST);
      // console.log('Response of Get Product API ==', response.data);
      return response.data;
    } catch (error) {
      console.log('error-- ', error);
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    clearProduct: state => {
      state.product = [];
    },
  },
  extraReducers: {
    [getProduct.pending]: (state, action) => {
      state.loading = true;
      state.isError = false;
    },
    [getProduct.fulfilled]: (state, action) => {
      state.loading = false;
      state.isError = false;
      state.product = action.payload;
    },
    [getProduct.rejected]: (state, action) => {
      state.loading = false;
      state.isError = true;
    },
  },
});

export const {clearProduct} = productSlice.actions;
const productReducer = productSlice.reducer;
export default productReducer;
