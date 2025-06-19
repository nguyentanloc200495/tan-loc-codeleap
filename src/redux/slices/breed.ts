import { createSlice } from '@reduxjs/toolkit';
// @types
import { BreedStateType, VoteParamsType } from '_types/product';

// services
import * as services from 'services/product';
// redux
import { dispatch } from '../store';
// ----------------------------------------------------------------------

const initialState: BreedStateType = {
  isLoading: false,
  error: null,
  breed: null,
  nextBreed: null,
};

const slice = createSlice({
  name: 'breed',
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

    // SET
    setBreed(state, action) {
      state.isLoading = false;
      state.breed = action.payload;
    },
    // SET
    setRandomBreed(state, action) {
      state.isLoading = false;
      state.nextBreed = action.payload;
    },
  },
});

// Reducer
export default slice.reducer;
export const { actions } = slice;

// ----------------------------------------------------------------------

export function getBreed(limit: number, page: number) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      services
        .getBreed(limit, page)
        .then((response: any) => {
          dispatch(slice.actions.setBreed(response));
        })
        .catch((error: any) => {
          dispatch(slice.actions.hasError(error?.message));
        });
    } catch (error) {
      dispatch(slice.actions.hasError(error?.message));
    }
  };
}

// ----------------------------------------------------------------------

export function randomBreed() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      services
        .getRandomBreed()
        .then((response: any) => {
          dispatch(slice.actions.setRandomBreed(response));
        })
        .catch((error: any) => {
          dispatch(slice.actions.hasError(error?.message));
        });
    } catch (error) {
      dispatch(slice.actions.hasError(error?.message));
    }
  };
}

// ----------------------------------------------------------------------

export function voteImageById (params: VoteParamsType) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      services
        .voteImageById(params)
        .then((response: any) => {
          dispatch(slice.actions.setRandomBreed(response));
        })
        .catch((error: any) => {
          dispatch(slice.actions.hasError(error?.message));
        });
    } catch (error) {
      dispatch(slice.actions.hasError(error?.message));
    }
  };
}


export function getBreedByImagesId(id: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      services
        .getBreedByImagesId(id)
        .then((response: any) => {
          dispatch(slice.actions.setBreed(response));
        })
        .catch((error: any) => {
          dispatch(slice.actions.hasError(error?.message));
        });
    } catch (error) {
      dispatch(slice.actions.hasError(error?.message));
    }
  };
}