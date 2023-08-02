import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import w2sReducer from './Slices/W2Slice';
import ten99sReducer from './Slices/Ten99Slice';

const rootReducer = combineReducers({
  w2s: w2sReducer,
  ten99s: ten99sReducer,
  
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;