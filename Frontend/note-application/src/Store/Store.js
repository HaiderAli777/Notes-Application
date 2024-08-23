import { configureStore } from "@reduxjs/toolkit";
import LoginSlice from "./LoginSlice";
const Store = configureStore({
  reducer: {
    LoginState: LoginSlice,
  },
});

export default Store;
