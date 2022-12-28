import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/userSlice";


const store = configureStore({
  reducer: {
    userR: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
