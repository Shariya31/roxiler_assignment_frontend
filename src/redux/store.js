import { configureStore } from "@reduxjs/toolkit";
import userReducer from './reducer/userReducer.js'

export const server = import.meta.env.VITE_SERVER

export const store = configureStore({
    reducer: {
        user: userReducer
    }
})