import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  current: null,
  list: [],
  loading: false,
  error: null,
};

const campaignSlice = createSlice({
  name: 'campaigns',
  initialState,
  reducers: {
    setCampaigns(state, action) {
      state.list = action.payload;
    },
    setCurrent(state, action) {
      state.current = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setCampaigns, setCurrent, setLoading, setError } =
  campaignSlice.actions;
export default campaignSlice.reducer;
