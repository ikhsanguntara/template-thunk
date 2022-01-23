import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import authReducer from "./pages/auth/authSlice";

export const store = configureStore({
  reducer: {
    authReducer,
  },
  middleware: {
    ...getDefaultMiddleware({
      // immutableCheck: false,
      serializableCheck: false,
      // thunk: true,
    }),
  },
  devTools: process.env.NODE_ENV !== "production",
});

export const persistor = persistStore(store);
