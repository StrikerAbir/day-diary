import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchStories = createAsyncThunk(
  "stories/fetchStories",
    async (email) => {
      console.log(email);
    const res = await axios.get(`https://day-diary-server.vercel.app/stories?mail=${email}`, {
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return res.data;
  }
);
export const storySlice = createSlice({
  name: "stories",
  initialState: {
    isLoading: true,
    stories: [],
    error: null,
  },
  extraReducers: (builder) => {
    builder.addCase(fetchStories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchStories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.stories = action.payload;
      state.error = null;
    });
    builder.addCase(fetchStories.rejected, (state, action) => {
      state.isLoading = false;
      state.stories = [];
      state.error = action.error.message;
    });
  },
  reducers: {
    emptyArray: (state) => {
          state.stories = [];
    },
  },
});
export const { emptyArray } =
  storySlice.actions;
export default storySlice.reducer;
