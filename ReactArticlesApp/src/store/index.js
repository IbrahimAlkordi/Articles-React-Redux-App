import { configureStore } from "@reduxjs/toolkit";
import articlesSlice from "./articles-slice";
import authSlice from './login-slice';
import uiSlice from './ui-slice';





const store = configureStore({
  reducer: {
   
    auth: authSlice.reducer,
    ui: uiSlice.reducer,
    art : articlesSlice.reducer,
  },
});



export default store;





 


