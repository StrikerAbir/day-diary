import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";


const store = configureStore({
  reducer: {
    userR: userSlice,
  },
});

export default store;
