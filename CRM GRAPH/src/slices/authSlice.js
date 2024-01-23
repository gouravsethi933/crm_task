import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isAuthenticated: false,
  },
  reducers: {
    setAuth: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setAuth } = authSlice.actions;
export const selectAuth = (state) => state.auth.isAuthenticated;
export default authSlice.reducer;
