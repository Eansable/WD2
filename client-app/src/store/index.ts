import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer"

export const store = configureStore({
    reducer: rootReducer,
    preloadedState: {},
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
}) 

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch