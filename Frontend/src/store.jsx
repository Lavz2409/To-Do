// import {
//   createSlice,
//   configureStore,
// } from "@reduxjs/toolkit"
// import { act } from "react"

// const counterSlice = createSlice({
//   name: "counter",
//   initialState: { counter: 0 },
//   reducers: {
//     Increment(state, action) {
//       state.counter += action.payload
//     },
//     Decrement(state, action) {
//       state.counter -= action.payload
//     },
//   },
// })

// export const actions = counterSlice.actions

// export const store = configureStore({
//   reducer: counterSlice.reducer,
// })

import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./slices/apiSlice.jsx"
import authSlice from "./slices/authSlice.jsx"

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer, //handles API catching/state
    auth: authSlice,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
})
