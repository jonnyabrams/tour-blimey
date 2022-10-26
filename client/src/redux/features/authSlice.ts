import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../api";
import { ILogin, IRegister, UserType } from "../../../typings/typings";
import { RootState } from "../store";

export const register = createAsyncThunk<IRegister, any, any>(
  "auth/register",
  async ({ formValue, navigate, toast }, {rejectWithValue}) => {
    try {
      const response = await api.signUp(formValue);
      toast.success("Signup successful!");
      navigate("/");
      return response.data;
    } catch (error) {
      // @ts-ignore
      return rejectWithValue(error.response.data)
    }
  }
);

export const login = createAsyncThunk<ILogin, any, any>(
  "auth/login",
  async ({ formValue, navigate, toast }, {rejectWithValue}) => {
    try {
      const response = await api.signIn(formValue);
      toast.success("Login successful!");
      navigate("/");
      return response.data;
    } catch (error) {
      // @ts-ignore
      return rejectWithValue(error.response.data)
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    error: "",
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    // The `builder` callback form is used here because it provides correctly typed reducers from the action creators
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state, action) => {
      if (action.payload) {
        state.loading = false;
        // @ts-ignore
        state.error = action.payload.message;
      } else {
        // @ts-ignore
        state.error = action.error.message
      }
    });
    builder.addCase(register.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    });
    builder.addCase(register.rejected, (state, action) => {
      if (action.payload) {
        state.loading = false;
        // @ts-ignore
        state.error = action.payload.message;
      } else {
        // @ts-ignore
        state.error = action.error.message
      }
    });
  },
});

// User Selector
export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
