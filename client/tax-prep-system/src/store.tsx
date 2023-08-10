import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import w2sReducer from './Slices/W2Slice';
import ten99sReducer from './Slices/Ten99Slice';
import dataReducer from './Slices/DataSlice';
import authReducer from './Slices/AuthSlicer';

const rootReducer = combineReducers({
  w2s: w2sReducer,
  ten99s: ten99sReducer,
  auth: authReducer,
  data: dataReducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  })
});

export default store;