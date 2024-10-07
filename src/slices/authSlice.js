import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    token: localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null,
};

const authSlice = createSlice ({
    name : "auth",
    initialState : initialState,
    reducers : {
        setToken(state, value) {
            state.token = value.payload;
        },
    },
});

export const {setToken} = authSlice.actions;
export default authSlice.reducer;

// initialState defines the initial state of the auth slice of the state.
// It stores the token which is fetched from localStorage (if available) or set to null if no token exists.

// reducers: Defines the functions (actions) that can update the state. 
// The setToken action allows you to update the token in the state.