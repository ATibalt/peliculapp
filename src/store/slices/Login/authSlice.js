/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const login = createAsyncThunk(
  'auth/login',
  async (authData, thunkAPI) => {
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: authData.email,
          password: authData.password
        })
      });
      const data = await response.json();

      if (response.status === 200) {
        localStorage.setItem('token', data.token);
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(
          new Date().getTime() + remainingMilliseconds
        );
        localStorage.setItem('expiryDate', expiryDate.toISOString());
        localStorage.setItem('userId', data.userId);
        return data;
      }

      return thunkAPI.rejectWithValue(data.message);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

const INITIAL_STATE = {
  isLogedIn: false,
  userId: '',
  loginToken: '',
  status: undefined,
  errorMsg: ''
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: INITIAL_STATE,
  reducers: {
    setUserData: (state, { payload }) => {
      state.isLogedIn = true;
      state.userId = payload.userId;
      state.loginToken = payload.loginToken;
    },
    logout: (state) => {
      state.isLogedIn = false;
      state.userId = '';
      state.loginToken = '';
      state.status = undefined;
      state.errorMsg = '';
    }
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.status = 'loading';
    },
    [login.fulfilled]: (state, { payload }) => {
      state.status = 'success';
      state.isLogedIn = true;
      state.userId = payload.userId;
      state.loginToken = payload.token;
    },
    [login.rejected]: (state, { payload }) => {
      state.status = 'failed';
      state.errorMsg = payload;
    }
  }
});

export const { logout, setUserData } = authSlice.actions;

export default authSlice.reducer;
