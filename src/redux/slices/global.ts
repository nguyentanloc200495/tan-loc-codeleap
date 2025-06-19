import { createSlice } from '@reduxjs/toolkit';
//
import { dispatch } from 'redux/store';

// ----------------------------------------------------------------------

type InitialState = {
  isLoading: boolean;
  error: Error | string | null;
};

const initialState: InitialState = {
  isLoading: false,
  error: null,
};

const slice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // LOGOUT CLEAR REDUX
    logout() {},
  },
});

// Reducer
export default slice.reducer;

export const { startLoading, hasError } = slice.actions;

// ----------------------------------------------------------------------

export function clearLogout() {
  return () => {
    dispatch(slice.actions.logout());
  };
}

// ----------------------------------------------------------------------
