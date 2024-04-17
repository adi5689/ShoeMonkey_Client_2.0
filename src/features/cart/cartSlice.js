import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from "@reduxjs/toolkit";
import api from "../../api/api";

const initialState = {
  items: {},
};

export const addToCartAsync = createAsyncThunk(
  "cart/addToCart",
  async ({ email, productId, quantity, size }, { rejectWithValue }) => {
    try {

      const token = localStorage.getItem('token');
      const response = await api.post("/addtocart", {
        email,
        productId,
        quantity,
        size,
      }, {
        headers: {
          'Authorization':`Bearer ${token}`
        }
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response.data);
    }
  }
);


export const removeFromCartAsync = createAsyncThunk(
  "cart/removeFromCart",
  async ({ email, productId }, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      await api.post("/removefromcart", {
        email,
        productId,
      },{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      return productId;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const fetchCartDataAsync = createAsyncThunk(
  "cart/fetchCartData",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.get("/cartdata", {
        headers: {
          'Authorization': `Bearer ${token}`,
        }
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    resetCart: (state) => {
      state.items = {};
    },
  },
  extraReducers: (builder) => {
    builder
    .addCase(addToCartAsync.fulfilled, (state, action) => {
      // Assuming the server response is the one you've shown
      const serverResponse = action.payload;
      if (serverResponse.success) {
        const itemDetails = {
          productId: serverResponse.productId,
          quantity: serverResponse.quantity,
        };
  
        const key = itemDetails.productId;
        if (state.items[key]) {
          state.items[key].quantity += itemDetails.quantity;
        } else {
          state.items[key] = itemDetails;
        }
      } else {
        console.error('Server response indicates failure:', serverResponse.message);
      }
   })
      .addCase(removeFromCartAsync.fulfilled, (state, action) => {
        const productId = action.payload;

        // Check if the item exists in the cart
        if (state.items[productId]) {
          // If it exists, remove the item from the cart
          delete state.items[productId];
        }
      })
      .addCase(fetchCartDataAsync.fulfilled, (state, action) => {
        // Replace the current cart items with the fetched cart data
        state.items = action.payload;
      })
  },
});

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;

// SELECTOR FOR CALCULATING TOTAL CART AMOUNT
export const selectTotalCartAmount = createSelector(
  (state) => state.cart.items,
  (items) => {
    let totalAmount = 0;
    for (const key in items) {
      const item = items[key];
      // Check if price is a number before adding it to the total
      if (typeof item.quantity === "number") {
        totalAmount += item.price * item.quantity;
      }
    }
    return totalAmount;
  }
);

export const selectTotalCartItems = createSelector(
  (state) => state.cart.items,
  (items) => {
    let totalItems = 0;
    for (const key in items) {
      const item = items[key];
      // Check if quantity is a number before adding it to the total
      if (typeof item.quantity === "number") {
        totalItems += item.quantity;
      }
    }
    return totalItems;
  }
);

export default cartSlice.reducer;
