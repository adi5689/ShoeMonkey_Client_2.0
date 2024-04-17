import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import api from '../../api/api';


// Async thunk for user login
export const loginUser = createAsyncThunk(
    'user/login',
    async (userData, { rejectWithValue }) => {
        try {
            const response = await api.post('/login', userData);
            return response.data;
            console.log(response.data);
        } catch (err) {
            return rejectWithValue(err.response.data);
        }
    }
);

// Async thunk for user signup
export const signupUser = createAsyncThunk(
    'user/signup',
    async (userData, { rejectWithValue }) => {
       try {
         const response = await api.post('/signup', userData);
         return response.data;
       } catch (err) {
         return rejectWithValue(err.response.data);
       }
    }
);

export const checkAuth = createAsyncThunk(
  'user/checkAuth',
  async (_, {getState}) => {
    const token = getState().user.token;
    if(!token){
      return {isAuthenticated: false};
    }
    return {isAuthenticated: true};
  }
);

const userSlice = createSlice({
    name: 'user',
    initialState: { user: null, token: null, status: 'idle', error: null, isLoggedIn: false },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            state.isLoggedIn = false;
        },
        clearSessionCookie: (state) => {
          document.cookie = 'session=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
          state.user = null;
          state.token = null;
          state.isLoggedIn = false;
        },
    },
    extraReducers: (builder) => {
       builder
         .addCase(loginUser.pending, (state) => {
           state.status = 'loading';
         })
         .addCase(loginUser.fulfilled, (state, action) => {
           state.status = 'succeeded';
           state.user = {email: action.payload.email, name: action.payload.name};
           state.token = action.payload.token;
           state.isLoggedIn = true; 
           localStorage.setItem('token', action.payload.token);
         })
         .addCase(loginUser.rejected, (state, action) => {
           state.status = 'failed';
           state.error = action.error.message;
         })
         .addCase(signupUser.pending, (state) => {
           state.status = 'loading';
         })
         .addCase(signupUser.fulfilled, (state, action) => {
           state.status = 'succeeded';
           state.user = action.payload.user;
           state.token = action.payload.token;
           state.isLoggedIn = true; // Set isLoggedIn to true upon successful signup
         })
         .addCase(signupUser.rejected, (state, action) => {
           state.status = 'failed';
           state.error = action.error.message;
         })
         .addCase(checkAuth.fulfilled, (state, action) => {
          state.isLoggedIn = action.payload.isAuthenticated;
         });

    },
});

// Export the logout action
export const { logout, clearSessionCookie } = userSlice.actions;

// Export the reducer
export default userSlice.reducer;

// Define the selector for isLoggedIn
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;



export const selectLoggedInUserEmail = createSelector(
  (state) => state.user.user,
  (user) => {
    if (user && user.email){
      return user.email;
    }
    return null;
  }
);

export const selectLoggedInUserName = createSelector(
  (state) => state.user.user,
  (user) => {
    if (user && user.name){
      return user.name;
    }
    return null;
  }
);