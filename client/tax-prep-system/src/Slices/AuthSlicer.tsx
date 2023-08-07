import { createSlice } from "@reduxjs/toolkit";

interface AuthState {
    token: string | null;
    ssn: string | null;
  }

const initState: AuthState = {
    token : null,
    ssn : null
}

const authSlicer = createSlice({
    name: 'auth',
    initialState: initState,
    reducers:{
        setCredentials: (state, action) =>{
            const {accessToken, ssn} = action.payload
            state.token = accessToken
            state.ssn = ssn
        },
        logOut: (state, action) =>{
            state.token = null
            state.ssn = null
        }
    }
})

export const {setCredentials, logOut} = authSlicer.actions
export default authSlicer.reducer
export const selectCurrentToken = (state: { auth: AuthState }) => state.auth.token
export const selectCurrentSSN = (state : {auth: AuthState}) => state.auth.ssn