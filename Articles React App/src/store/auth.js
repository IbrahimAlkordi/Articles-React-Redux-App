import { createSlice } from "@reduxjs/toolkit";
const initialAuthState = {
  user: null,
  isLoggedIn: false,
  AccessToken: "",
  Articles: [],
  SearchArticles: [],
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
    Articles(state, action) {
      state.Articles = action.payload;
    },
    moreArticles(state, action) {
      let Articles = [...state.Articles];
      let temp = action.payload;
      for (let i = 0; i < temp.length; i++) {
        Articles.push(temp[i]);
      }
      state.Articles = Articles;
    },
    search(state, action) {
      let Articles = [...state.Articles];
      let SearchArticles = [];
      let temp = action.payload;
      for (let i = 0; i < Articles.length; i++) {
        if (
          Articles[i].abstract.includes(temp) ||
          Articles[i].lead_paragraph.includes(temp)
        ) {
          SearchArticles.push(Articles[i]);
        } else {
          if (temp === "") {
            SearchArticles.push(Articles[i]);
          }
        }
      }

      state.SearchArticles = SearchArticles;
    },
  },
});

export default authSlice;
export const authActions = authSlice.actions;
