import { createSlice } from "@reduxjs/toolkit";

const w2sSlice = createSlice({
    name: "w2s",
    initialState: {
        empTin: "",
        wages: "",
        fedWithheld: "",
    },
    reducers: {
        setField: (state, action) => {
            const {fieldName, value} = action.payload;
            (state as any)[fieldName] = value;
        }
    }
})

export const {setField} = w2sSlice.actions;

export default w2sSlice.reducer;