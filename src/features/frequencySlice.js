/* eslint-disable default-param-last */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../api/axios';
import { parseNumberLoose, sanitizeId } from '../utils/helpers';

const normalizeAxiosError = (err) => {
  if (axios.isAxiosError && axios.isAxiosError(err)) {
    return err.response?.data ?? err.message ?? 'Axios error';
  }
  if (err && typeof err === 'object' && 'message' in err) return err.message;
  return String(err);
};

/* ============================
   Async Thunk
   ============================ */

export const fetchFrequencyData = createAsyncThunk(
  'frequency/fetchFrequencyData',
  async (
    { limit, since, until, filterByDoneAt, similarityThreshold } = {},
    thunkAPI,
  ) => {
    try {
      const res = await api.get(
        '/api/dao/analytic/public/needs-frequency-clustered',
        {
          params: { limit, since, until, filterByDoneAt, similarityThreshold },
          signal: thunkAPI.signal,
        },
      );

      const rows = Array.isArray(res.data) ? res.data : [];

      const normalized = rows.map((r, idx) => {
        const rawTotal =
          r.totalCount ?? r.total ?? r.total_count ?? r.count ?? 0;
        const rawDone =
          r.doneCount ?? r.done ?? r.done_count ?? r.completed ?? 0;

        const total = Math.max(0, parseNumberLoose(rawTotal));
        const done = Math.max(0, parseNumberLoose(rawDone));

        let finalTotal = total;
        if (finalTotal === 0 && Array.isArray(r.members) && r.members.length) {
          finalTotal = r.members.length;
        }
        if (finalTotal === 0 && done > 0) finalTotal = done;

        const undone = Math.max(0, finalTotal - done);

        const assignedCategory =
          r.assignedCategory ??
          r.assigned_category ??
          r.name ??
          r.label ??
          `Category ${idx}`;
        const id = `${sanitizeId(assignedCategory)}__${idx}`;

        return {
          id,
          name: assignedCategory,
          assignedCategory,
          totalCount: finalTotal,
          doneCount: done,
          undone,
          members: Array.isArray(r.members) ? r.members : [],
          membersCount: Number(
            r.membersCount ?? r.members_count ?? r.members?.length ?? 0,
          ),
          membersHasMore: !!r.membersHasMore,
          __raw: r,
        };
      });

      normalized.sort((a, b) => b.totalCount - a.totalCount);

      return {
        raw: rows,
        normalized,
        sample: normalized.slice(0, 10),
      };
    } catch (err) {
      console.error('fetchFrequencyData failed', err);
      return thunkAPI.rejectWithValue(normalizeAxiosError(err));
    }
  },
);

/* ============================
   Slice & initial state
   ============================ */

const initialState = {
  frequencyData: [],
  rawRows: [],
  normalizedSample: [],
  loadingFrequency: false,
  error: null,
};

const frequencySlice = createSlice({
  name: 'frequency',
  initialState,
  reducers: {
    clearFrequency(state) {
      state.frequencyData = [];
      state.rawRows = [];
      state.normalizedSample = [];
    },
  },
  extraReducers: (builder) => {
    builder
      /* in your report slice extraReducers: */
      .addCase(fetchFrequencyData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFrequencyData.fulfilled, (state, action) => {
        state.loading = false;
        // EXPECTED payload format from the thunk:
        // { raw: [...], normalized: [...], sample: [...] }
        state.rawRows = action.payload?.raw ?? [];
        state.frequencyData = action.payload?.normalized ?? [];
        state.normalizedSample = action.payload?.sample ?? [];
      })
      .addCase(fetchFrequencyData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Unknown error';
        state.rawRows = [];
        state.frequencyData = [];
        state.normalizedSample = [];
      });
  },
});

export const { clearFrequency } = frequencySlice.actions;
export default frequencySlice.reducer;
