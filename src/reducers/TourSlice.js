import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the initial state
const initialState = {
  tours: [],
  status: 'idle',
  error: null,
};

// Define the asynchronous thunk to fetch tours
export const fetchTours = createAsyncThunk('tours/fetchTours', async () => {
  const response = await axios.get('http://127.0.0.1:8000/api/offres/tours');
  return response.data.data; // Assuming the tours data is under the 'data' key
});

// Create the TourSlice
const tourSlice = createSlice({
  name: 'tours',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTours.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTours.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tours = action.payload;
      })
      .addCase(fetchTours.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

// Export the action creators and reducer
export const selectAllTours = (state) => state.tours.tours;
export const selectTourStatus = (state) => state.tours.status;
export const selectTourError = (state) => state.tours.error;

export default tourSlice.reducer;
