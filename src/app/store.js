// Created a store
import {configureStore} from "@reduxjs/toolkit";
import userReducer from "../reducers/userSlice";


const store = configureStore({
  reducer: {
    user: userReducer, // Add user slice here
  },
})

export default store;
