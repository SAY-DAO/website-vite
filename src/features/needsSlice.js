/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axios';

// Simple JS version of the needs slice (same behavior as the TS slice).
const initialState = {
  items: [],
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};

export const fetchMultiPayerNeeds = createAsyncThunk(
  'needs/fetchMultiPayerNeeds',
  async (limit = 100) => {
    const res = await api.get(
      `/api/dao/analytic/public/multi-payers?limit=${limit}`,
    );
    return res.data; // expect array of Need objects
  },
);

const needsSlice = createSlice({
  name: 'needs',
  initialState,
  reducers: {
    clearNeeds(state) {
      state.items = [];
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMultiPayerNeeds.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchMultiPayerNeeds.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchMultiPayerNeeds.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error?.message || 'Failed to load needs';
      });
  },
});

export const { clearNeeds } = needsSlice.actions;
export default needsSlice.reducer;
