import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ObjectId } from "mongoose";

import {
  ICreateTourData,
  IToursState,
  IUpdateTourData,
  TourType,
} from "../../../typings/typings";

import * as api from "../api";

const initialState: IToursState = {
  tour: null,
  tours: [],
  userTours: [],
  tagTours: [],
  relatedTours: [],
  currentPage: 1,
  numberOfPages: null,
  error: "",
  loading: false,
};

export const createTour = createAsyncThunk(
  "tour/createTour",
  async (createdTourData: ICreateTourData) => {
    const response = await api.createTour(createdTourData);
    return response.data;
  }
);

export const getAllTours = createAsyncThunk(
  "tour/getAllTours",
  async (page: number) => {
    const response = await api.getAllTours(page);
    return response.data;
  }
);

export const getTour = createAsyncThunk(
  "tour/getTour",
  async (id: ObjectId) => {
    const response = await api.getTour(id);
    return response.data;
  }
);

export const deleteTour = createAsyncThunk(
  "tour/deleteTour",
  async (id: ObjectId) => {
    const response = await api.deleteTour(id);
    return response.data;
  }
);

export const updateTour = createAsyncThunk(
  "tour/updateTour",
  async ({
    updatedTourData,
    id,
  }: {
    updatedTourData: IUpdateTourData;
    id: ObjectId;
  }) => {
    const response = await api.updateTour(updatedTourData, id);
    return response.data;
  }
);

export const getToursByUser = createAsyncThunk(
  "tour/getToursByUser",
  async (id: ObjectId) => {
    const response = await api.getToursByUser(id);
    return response.data;
  }
);

export const searchTours = createAsyncThunk(
  "tour/searchTours",
  async (searchQuery: string) => {
    const response = await api.getToursBySearch(searchQuery);
    return response.data;
  }
);

export const getToursByTag = createAsyncThunk(
  "tour/getToursByTag",
  async (tag: string) => {
    const response = await api.getToursByTag(tag);
    return response.data;
  }
);

export const getRelatedTours = createAsyncThunk(
  "tour/getRelatedTours",
  async (tags: string[]) => {
    const response = await api.getRelatedTours(tags);
    return response.data;
  }
);

export const likeTour = createAsyncThunk(
  "tour/likeTour",
  async ({ id, userId }: { id: ObjectId; userId: ObjectId }) => {
    const response = await api.likeTour(id, userId);
    return response.data;
  }
);

const tourSlice = createSlice({
  name: "tour",
  initialState,
  reducers: {
    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    // The `builder` callback form is used here because it provides correctly typed reducers from the action creators
    builder.addCase(createTour.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      createTour.fulfilled,
      (state, action: PayloadAction<ICreateTourData>) => {
        state.loading = false;
        state.tours = [...state.tours, action.payload];
      }
    );
    builder.addCase(createTour.rejected, (state, Error) => {
      state.loading = false;
      console.log(Error);
      state.error = "Something went wrong";
    });
    builder.addCase(getAllTours.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getAllTours.fulfilled, (state, action) => {
      state.loading = false;
      state.tours = action.payload.data;
      state.numberOfPages = action.payload.numberOfPages;
      state.currentPage = action.payload.currentPage;
    });
    builder.addCase(getAllTours.rejected, (state, Error) => {
      state.loading = false;
      console.log(Error);
      state.error = "Something went wrong";
    });
    builder.addCase(getTour.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getTour.fulfilled, (state, action) => {
      state.loading = false;
      state.tour = action.payload;
    });
    builder.addCase(getTour.rejected, (state, Error) => {
      state.loading = false;
      console.log(Error);
      state.error = "Something went wrong";
    });
    builder.addCase(getToursByUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getToursByUser.fulfilled, (state, action) => {
      state.loading = false;
      state.userTours = action.payload;
    });
    builder.addCase(getToursByUser.rejected, (state, Error) => {
      state.loading = false;
      console.log(Error);
      state.error = "Something went wrong";
    });
    builder.addCase(deleteTour.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(deleteTour.fulfilled, (state, action) => {
      state.loading = false;
      // only need to destructure one level as only one argument
      const { arg } = action.meta;
      if (arg) {
        state.userTours = state.userTours.filter(
          (item: TourType) => item._id !== arg
        );
        state.tours = state.tours.filter((item: TourType) => item._id !== arg);
      }
    });
    builder.addCase(deleteTour.rejected, (state, Error) => {
      state.loading = false;
      console.log(Error);
      state.error = "Something went wrong";
    });
    builder.addCase(updateTour.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateTour.fulfilled, (state, action) => {
      state.loading = false;
      // need to destructure two levels as there's more than one argument
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.userTours = state.userTours.map((item: TourType) =>
          item._id === id ? action.payload : item
        );
        state.tours = state.tours.map((item: TourType) =>
          item._id === id ? action.payload : item
        );
        state.tour = action.payload;
      }
    });
    builder.addCase(updateTour.rejected, (state, Error) => {
      state.loading = false;
      console.log(Error);
      state.error = "Something went wrong";
    });
    builder.addCase(searchTours.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(searchTours.fulfilled, (state, action) => {
      state.loading = false;
      state.tours = action.payload;
    });
    builder.addCase(searchTours.rejected, (state, Error) => {
      state.loading = false;
      console.log(Error);
      state.error = "Something went wrong";
    });
    builder.addCase(getToursByTag.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getToursByTag.fulfilled, (state, action) => {
      state.loading = false;
      state.tagTours = action.payload;
    });
    builder.addCase(getToursByTag.rejected, (state, Error) => {
      state.loading = false;
      console.log(Error);
      state.error = "Something went wrong";
    });
    builder.addCase(getRelatedTours.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(getRelatedTours.fulfilled, (state, action) => {
      state.loading = false;
      state.relatedTours = action.payload;
    });
    builder.addCase(getRelatedTours.rejected, (state, Error) => {
      state.loading = false;
      console.log(Error);
      state.error = "Something went wrong";
    });
    builder.addCase(likeTour.pending, (state) => {});
    builder.addCase(likeTour.fulfilled, (state, action) => {
      state.loading = false;
      // need to destructure two levels as there's more than one argument
      const {
        arg: { id },
      } = action.meta;
      if (id) {
        state.tours = state.tours.map((item: TourType) =>
          item._id === id ? action.payload : item
        );
        state.tour = action.payload;
      }
    });
    builder.addCase(likeTour.rejected, (state, Error) => {
      console.log(Error);
      state.error = "Something went wrong";
    });
  },
});

export const { setCurrentPage } = tourSlice.actions;

export default tourSlice.reducer;
