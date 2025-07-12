import { configureStore } from "@reduxjs/toolkit"
import authSlice from "./slices/authSlice"
import itemsSlice from "./slices/itemsSlice"
import swapsSlice from "./slices/swapsSlice"

export const store = configureStore({
  reducer: {
    auth: authSlice,
    items: itemsSlice,
    swaps: swapsSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
