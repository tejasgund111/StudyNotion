import { combineReducers } from "@reduxjs/toolkit"

import authReducer from "../slices/authSlice"
import profileReducer from "../slices/profileSlice"
import cartReducer from "../slices/cartSlice"

const rootReducer = combineReducers({
    auth: authReducer,
    profile: profileReducer,
    cart: cartReducer,
})

export default rootReducer;

// combineReducers:
// This function is used to combine multiple reducers into one root reducer.
// This is useful when you have different pieces of state managed by different reducers.

// rootReducer combines all your reducers. 
