import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    SET_AUTH_INFO: (state, action) => {
      state = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { SET_AUTH_INFO } = AuthSlice.actions;

export default AuthSlice.reducer;