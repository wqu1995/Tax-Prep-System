import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// redux slicer for storing w2 and 1099
interface DataState {
  w2Data: any[];
  ten99Data: any[];
}

const initialState: DataState = {
  w2Data: [],
  ten99Data: [],
};

const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setStoreW2Data: (state, action: PayloadAction<any[]>) => {
      state.w2Data = action.payload;
    },
    setStoreTen99Data: (state, action: PayloadAction<any[]>) => {
      state.ten99Data = action.payload;
    },
  },
});

export const { setStoreW2Data, setStoreTen99Data } = dataSlice.actions;

export default dataSlice.reducer;