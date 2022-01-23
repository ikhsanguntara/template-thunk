import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    email: "web@mail.com",
    password: "pass",
  },
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state) => {
      state.token = "test";
    },
    logout: (state) => {
      state.token = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
