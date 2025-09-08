// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import reportReducer from '../features/reportSlice';
import frequencyReducer from '../features/frequencySlice';
import needsReducer from '../features/needsSlice';

const store = configureStore({
  reducer: {
    report: reportReducer,
    frequency: frequencyReducer,
    needs: needsReducer,
  },
});

// export both named and default (helps avoid import mistakes)
export { store };
export default store;
