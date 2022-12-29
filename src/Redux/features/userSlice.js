import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: "users",
    initialState: {
        user: null,
        isLoading: true,
        userEmail:''
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
        },
        setUserEmail: (state,action) => {
            state.userEmail=action.payload
        }
    }
    
})

export const { currentUser, stopLoading, startLoading, setUserEmail } =
  userSlice.actions;
export default userSlice.reducer