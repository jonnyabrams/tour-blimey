import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { ICreateTourData } from "../../../typings/typings";

import * as api from "../api";

export const createTour = createAsyncThunk(
  "tour/createTour",
  async (createdTourData: ICreateTourData) => {
    const response = await api.createTour(createdTourData);
    return response.data;
  }
);

const allTours: ICreateTourData[] = [];

const tourSlice = createSlice({
  name: "tour",
  initialState: {
    tour: {},
    tours: allTours,
    userTours: [],
    error: "",
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    // The `builder` callback form is used here because it provides correctly typed reducers from the action creators
    builder.addCase(createTour.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      createTour.fulfilled,
      (state, action: PayloadAction<ICreateTourData>) => {
        state.loading = false;
        // state.tours.push(action.payload);
      }
    );
    builder.addCase(createTour.rejected, (state, Error) => {
      state.loading = false;
      console.log(Error);
      state.error = "Something went wrong";
    });
  },
});

export default tourSlice.reducer;
