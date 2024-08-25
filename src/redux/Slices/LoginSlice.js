import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
    name : 'login',
    initialState : {isLoggedin : false},
    reducers : {
        setIsLoggedin:(state,action)=>{state.isLoggedin=action.payload}
    }
})

export const {setIsLoggedin} = loginSlice.actions;
export default loginSlice.reducer;