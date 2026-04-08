import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  theme: 'light',
  actionLogs: [],
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setTheme: (state, action) => {
      state.theme = action.payload;
    },
    addLog: (state, action) => {
      state.actionLogs.unshift(action.payload);
      if (state.actionLogs.length > 50) state.actionLogs.pop();
    },
    clearLogs: (state) => {
      state.actionLogs = [];
    },
  },
});

export const { setLoading, setTheme, addLog, clearLogs } = uiSlice.actions;
export const selectLoading = (state) => state.ui.loading;
export const selectTheme = (state) => state.ui.theme;
export const selectLogs = (state) => state.ui.actionLogs;

export default uiSlice.reducer;