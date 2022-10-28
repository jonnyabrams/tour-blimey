import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

import { ICreateTourData, TourType } from "../../../typings/typings";

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
    builder.addCase(createTour.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(
      createTour.fulfilled,
      (state, action: PayloadAction<ICreateTourData>) => {
        state.loading = false;
        state.tours = [action.payload];
      }
    );
    builder.addCase(createTour.rejected, (state, action) => {
      if (action.payload) {
        state.loading = false;
        // @ts-ignore
        state.error = action.payload.message;
      } else {
        // @ts-ignore
        state.error = action.error.message;
      }
    });
  },
});

export default tourSlice.reducer;
