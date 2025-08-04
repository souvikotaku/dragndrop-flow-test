import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  flows: [],
  loading: false,
  error: null,
};

const automationSlice = createSlice({
  name: 'automation',
  initialState,
  reducers: {
    setFlows(state, action) {
      state.flows = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setFlows, setLoading, setError } = automationSlice.actions;
export default automationSlice.reducer;
