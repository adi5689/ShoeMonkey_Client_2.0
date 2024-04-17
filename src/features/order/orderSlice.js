import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../api/api';


// Async thunk for placing an order
export const placeOrderAsync = createAsyncThunk(
 'order/placeOrder',
 async ({ email, address, totalValue }, { getState }) => {
    const token = localStorage.getItem('token');
    const response = await api.post('/placeorder', {
      email,
      address,
      totalValue,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      throw new Error('Failed to place order');
    }
    // console.log('Response data:', response.data);
    return { success: true, message: "Order placed successfully!", orderId: response.data.orderId };
 }
 
);



export const fetchOrderDetailsAsync = createAsyncThunk(
  'order/fetchOrderDetails',
  async (orderId, {getState}) => {
    const token = localStorage.getItem('token');
    const response = await api.get(`/orders/${orderId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if(response.status !== 200){
      throw new Error('Failed to fetch order details!');
    }
    console.log('Response data:', response.data);
    return response.data; 
  }
)

// Order slice
const orderSlice = createSlice({
 name: 'order',
 initialState: {
    order: null,
    orderId: null,
    status: 'idle',
    error: null,
 },
 reducers: {},
 extraReducers: (builder) => {
    builder
      .addCase(placeOrderAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(placeOrderAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.orderId = action.payload.orderId;
      })
      .addCase(placeOrderAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchOrderDetailsAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOrderDetailsAsync.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.order = action.payload;
      })
      .addCase(fetchOrderDetailsAsync.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
 },
});



export default orderSlice.reducer;
