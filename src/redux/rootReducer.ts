import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';

// slices
import globalReducer from 'redux/slices/global';
import breedReducer from 'redux/slices/breed';

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const combineReducer = combineReducers({
  global: globalReducer,
  breed: breedReducer,

});

const rootReducer = (state: any, action: any) => {
  if (action.type === 'global/logout') {
    // check for action type
    state = undefined;
  }
  return combineReducer(state, action);
};

export { rootReducer, rootPersistConfig };
