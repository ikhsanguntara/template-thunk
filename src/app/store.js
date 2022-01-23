import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { rootReducer } from "./rootReducer";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["auth"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
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
