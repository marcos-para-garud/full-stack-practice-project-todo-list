import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "./slice.jsx"

export const configStore = configureStore({
    reducer : todoReducer
})