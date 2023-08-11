import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../types/CustomTypes";


//redux slicer for storing authentication related info
const initState: AuthState = {
    ssn : null,
    firstName: null,
    lastName: null
}

const authSlicer = createSlice({
    name: 'auth',
    initialState: initState,
    reducers:{
        setCredentials: (state, action) =>{
            const {ssn} = action.payload
            state.ssn = ssn
        },
        setName : (state, action) =>{
            const {firstName, lastName} = action.payload
            state.firstName = firstName
            state.lastName = lastName
        },
        logOut: (state, action) =>{
            state.ssn = null
        }
    }
})

export const {setCredentials, setName, logOut} = authSlicer.actions
export default authSlicer.reducer
export const selectCurrentSSN = (state : {auth: AuthState}) => state.auth.ssn
export const selectCurrentFirstName = (state : {auth: AuthState}) => state.auth.firstName
export const selectCurrentLastName = (state : {auth: AuthState}) => state.auth.lastName