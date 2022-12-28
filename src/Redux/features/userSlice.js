import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "users",
    initialState: {
        user: null,
        isLoading: true
    },
    reducers: {
        currentUser: (state,action) => {
            state.user = action.payload;
        },
        stopLoading: state => {
            state.isLoading = false;
        },
        startLoading: state => {
            state.isLoading = true;
        }
    }
    
})

export const { currentUser, stopLoading,startLoading } = userSlice.actions
export default userSlice.reducer