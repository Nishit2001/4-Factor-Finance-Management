import { createSlice } from "@reduxjs/toolkit";

const stateChange = createSlice({
    name : "state",
    initialState : {
        stateChange : true
    },
    reducers : {
        setState : (state) => {state.stateChange = !state.stateChange}
    }
})

export const {setState} = stateChange.actions;
export default stateChange.reducer;