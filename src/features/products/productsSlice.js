import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../../api/api';




export const fetchProducts = createAsyncThunk('products/fetchProducts', async () => {
    const response = await api.get('/allproducts');
    return response.data;
});


export const fetchProductById = createAsyncThunk(
    'products/fetchProductById',
    async (productId, {rejectWithValue}) => {
        try {
          const response = await api.get(`/product/${productId}`);
          return response.data;
        } catch(err){
            return rejectWithValue(err.response.data);
        }
    }
);


const productsSlice = createSlice({
    name: 'products',
    initialState:{
        products:[],
        status: 'idle',
        error: null,
        singleProduct: [],
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchProducts.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.products = action.payload;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
        })
        .addCase(fetchProductById.pending, (state) => {
            state.status = 'loading';
          })
          .addCase(fetchProductById.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.singleProduct = action.payload;
          })
          .addCase(fetchProductById.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.error.message;
          });
    },
});


export default productsSlice.reducer;
