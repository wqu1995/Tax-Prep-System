import { createSlice } from "@reduxjs/toolkit";

//redux slicer for tracking 1099 form data 
interface Ten99FormData {
    payerTin: string;
    wages: string;
    fedWithheld: string;
}

interface Ten99FormState {
    forms: Ten99FormData[];
}

const initialState: Ten99FormState = {
    forms: [{
        payerTin: "",
        wages: "",
        fedWithheld: "",
    }]
};

const ten99sSlice = createSlice({
    name: "ten99s",
    initialState,
    reducers: {
      updateTen99Form: (state, action) => {
        const { index, data } = action.payload;
        state.forms = state.forms.map((form, i) => (i === index ? data : form));
      },
      addNewTen99Form: (state) => {
        state.forms = [
          ...state.forms,
          {
            payerTin: "",
            wages: "",
            fedWithheld: "",
          },
        ];
      },
    },
  });

export const {updateTen99Form, addNewTen99Form} = ten99sSlice.actions;

export default ten99sSlice.reducer;