import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  metrics: {},
  loading: false,
  error: null,
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setMetrics(state, action) {
      state.metrics = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setMetrics, setLoading, setError } = analyticsSlice.actions;
export default analyticsSlice.reducer;
