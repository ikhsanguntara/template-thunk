import { combineReducers } from "redux";
import authReducer from "./pages/auth/authSlice";

export const rootReducer = combineReducers({
  auth: authReducer,
});
