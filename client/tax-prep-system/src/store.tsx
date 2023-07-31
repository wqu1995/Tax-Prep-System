import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import w2sReducer from './Slices/W2Slice';

const rootReducer = combineReducers({
  w2s: w2sReducer,
  
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;