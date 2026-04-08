import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from '../features/employees/employeeSlice';
import authReducer from '../features/auth/authSlice';
import uiReducer from '../features/ui/uiSlice';
import { loggerMiddleware } from '../middleware/loggerMiddleware';

// Load state from localStorage (persistence)
const loadState = () => {
  try {
    const saved = localStorage.getItem('ems_redux_state');
    return saved ? JSON.parse(saved) : undefined;
  } catch {
    return undefined;
  }
};

// Save state to localStorage after every dispatch
const saveState = (state) => {
  try {
    localStorage.setItem('ems_redux_state', JSON.stringify(state));
  } catch {}
};

export const store = configureStore({
  reducer: {
    employees: employeeReducer,
    auth: authReducer,
    ui: uiReducer,
  },
  preloadedState: loadState(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware),
});

// Persist state on every state change
store.subscribe(() => saveState(store.getState()));