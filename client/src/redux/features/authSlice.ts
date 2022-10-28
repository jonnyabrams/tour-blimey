import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../api";
import { ILogin, IRegister, IUserState } from "../../../typings/typings";
import { RootState } from "../store";

const initialState: IUserState = {
  user: null,
  error: "",
  loading: false,
};

export const register = createAsyncThunk(
  "auth/register",
  async (formValue: IRegister) => {
    const response = await api.signUp(formValue);
    return response.data;
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (formValue: ILogin) => {
    const response = await api.signIn(formValue);
    return response.data;
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // persist the user (doesn't get lost on refresh)
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogout: (state) => {
      localStorage.clear();
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    // The `builder` callback form is used here because it provides correctly typed reducers from the action creators
    builder.addCase(login.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    });
    builder.addCase(login.rejected, (state, Error) => {
      state.loading = false;
      state.error = "Something went wrong";
      console.log(Error);
    });
    builder.addCase(register.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(register.fulfilled, (state, action) => {
      state.loading = false;
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    });
    builder.addCase(register.rejected, (state, Error) => {
      state.loading = false;
      state.error = "Something went wrong";
      console.log(Error);
    });
  },
});

export const { setUser, setLogout } = authSlice.actions;

// User Selector
export const selectUser = (state: RootState) => state.auth.user;

export default authSlice.reducer;
