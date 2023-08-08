import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
    ssn: string | null;
  }

const initState: AuthState = {
    ssn : null
}

const authSlicer = createSlice({
    name: 'auth',
    initialState: initState,
    reducers:{
        setCredentials: (state, action) =>{
            const {ssn} = action.payload
            state.ssn = ssn
        },
        logOut: (state, action) =>{
            state.ssn = null
        }
    }
})

export const {setCredentials, logOut} = authSlicer.actions
export default authSlicer.reducer
export const selectCurrentSSN = (state : {auth: AuthState}) => state.auth.ssn