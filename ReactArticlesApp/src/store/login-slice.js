import { createSlice } from "@reduxjs/toolkit";
const initialAuthState = {
  user: null,
  isLoggedIn: false,
  AccessToken: "",
};
const authSlice = createSlice({
  name: "authentication",
  initialState: initialAuthState,
  reducers: {
    login(state, action) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
      state.isLoggedIn = false;
    },
    isloggedin(state, action) {
      state.isLoggedIn = action.payload;
    },
    AccessToken(state, action) {
      state.AccessToken = action.payload;
    },   
  },
});

export default authSlice;
export const authActions = authSlice.actions;
