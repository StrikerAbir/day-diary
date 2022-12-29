import { configureStore } from "@reduxjs/toolkit";
import storySlice from "../features/storySlice";
import userSlice from "../features/userSlice";

const store = configureStore({
  reducer: {
    userR: userSlice,
    storiesR: storySlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
