/* eslint-disable default-param-last */
/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import api from '../api/axios';

/**
 * Normalize an axios error to something safe for rejectWithValue.
 */
const normalizeAxiosError = (err) => {
  if (axios.isAxiosError && axios.isAxiosError(err)) {
    return err.response?.data ?? err.message ?? 'Axios error';
  }
  if (err && typeof err === 'object' && 'message' in err) return err.message;
  return String(err);
};

/* ============================
   Async Thunks (non-frequency)
   ============================ */

export const fetchSummary = createAsyncThunk(
  'report/fetchSummary',
  async (_, thunkAPI) => {
    try {
      const resp = await api.get('/api/dao/analytic/public/summary', {
        signal: thunkAPI.signal,
      });
      return resp.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(normalizeAxiosError(e));
    }
  },
);

export const fetchTransactions = createAsyncThunk(
  'report/fetchTransactions',
  async ({ page, rowsPerPage, start, end } = {}, thunkAPI) => {
    try {
      const params = {};
      if (start) params.start = start;
      if (end) params.end = end;

      const resp = await api.get('/api/dao/analytic/public/transactions', {
        params,
        signal: thunkAPI.signal,
        headers: {
          'x-limit': `${rowsPerPage}`,
          'x-take': `${page}`,
        },
      });
      return resp.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(normalizeAxiosError(e));
    }
  },
);

export const fetchSeasonComparison = createAsyncThunk(
  'report/fetchSeasonComparison',
  async ({ season, includeRates } = {}, thunkAPI) => {
    try {
      const resp = await api.get(
        `/api/dao/analytic/public/season-comparison?season=${season}&includeRates=${includeRates}`,
        { signal: thunkAPI.signal },
      );
      return resp.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(normalizeAxiosError(e));
    }
  },
);

export const fetchLogs = createAsyncThunk(
  'report/fetchLogs',
  async (_, thunkAPI) => {
    try {
      const resp = await api.get('/api/dao/logs', { signal: thunkAPI.signal });
      return resp.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(normalizeAxiosError(e));
    }
  },
);

/* ============================
   Slice & initial state
   ============================ */

const initialState = {
  summary: {
    totalUsers: null,
    totalNeeds: null,
    totalPayments: null,
    totalNewNeeds: null,
  },
  season: null,
  transactions: [],
  logs: [],
  loadingSummary: false,
  loadingSeasonComparison: false,
  loadingTransactions: false,
  loadingLogs: false,
  error: null,
};

const reportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    clearTransactions(state) {
      state.transactions = [];
    },
    setSummary(state, action) {
      state.summary = { ...(state.summary || {}), ...(action.payload || {}) };
    },
  },
  extraReducers: (builder) => {
    builder
      /* summary */
      .addCase(fetchSummary.pending, (state) => {
        state.loadingSummary = true;
        state.error = null;
      })
      .addCase(fetchSummary.fulfilled, (state, action) => {
        state.loadingSummary = false;
        state.summary = action.payload || state.summary;
      })
      .addCase(fetchSummary.rejected, (state, action) => {
        state.loadingSummary = false;
        state.error = action.payload ?? action.error?.message;
      })

      /* season comparison */
      .addCase(fetchSeasonComparison.pending, (state) => {
        state.loadingSeasonComparison = true;
        state.error = null;
      })
      .addCase(fetchSeasonComparison.fulfilled, (state, action) => {
        state.loadingSeasonComparison = false;
        state.season = action.payload || null;
      })
      .addCase(fetchSeasonComparison.rejected, (state, action) => {
        state.loadingSeasonComparison = false;
        state.error = action.payload ?? action.error?.message;
      })

      /* transactions */
      .addCase(fetchTransactions.pending, (state) => {
        state.loadingTransactions = true;
        state.error = null;
        state.transactions = [];
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loadingTransactions = false;
        state.transactions = action.payload || [];
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loadingTransactions = false;
        state.error = action.payload ?? action.error?.message;
      })

      /* logs */
      .addCase(fetchLogs.pending, (state) => {
        state.loadingLogs = true;
        state.error = null;
      })
      .addCase(fetchLogs.fulfilled, (state, action) => {
        state.loadingLogs = false;
        state.logs = action.payload || [];
      })
      .addCase(fetchLogs.rejected, (state, action) => {
        state.loadingLogs = false;
        state.error = action.payload ?? action.error?.message;
      });
  },
});

export const { clearTransactions, setSummary } = reportSlice.actions;
export default reportSlice.reducer;
