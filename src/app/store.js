import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { rootReducer } from "./rootReducer";

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware({
    // immutableCheck: false,
    serializableCheck: false,
    // thunk: true,
  }),
  devTools: process.env.NODE_ENV !== "production",
});



export const persistor = persistStore(store);
