import { createSlice } from "@reduxjs/toolkit";

//redux slicer for tracking w2 form data 
interface W2FormData {
    empTin: string;
    wages: string;
    fedWithheld: string;
}
  
interface W2FormState {
    forms: W2FormData[];
}
  
const initialState: W2FormState = {
    forms: [
      {
        empTin: "",
        wages: "",
        fedWithheld: "",
      },
    ],
};

const w2sSlice = createSlice({
    name: "w2s",
    initialState,
    reducers: {
      updateW2Form: (state, action) => {
        const { index, data } = action.payload;
        state.forms = state.forms.map((form, i) => (i === index ? data : form));
      },
      addNewW2Form: (state) => {
        state.forms = [
          ...state.forms,
          {
            empTin: "",
            wages: "",
            fedWithheld: "",
          },
        ];
      },
    },
  });

export const {updateW2Form, addNewW2Form} = w2sSlice.actions;

export default w2sSlice.reducer;