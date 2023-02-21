import { createSlice } from "@reduxjs/toolkit";
import { Toast } from "react-native-toast-message/lib/src/Toast";

import {
  authSignUpUser,
  authSignInUser,
  authSingOutUser,
} from "../auth/authOperations";

const handleAuthRejected = (state, action) => {
  const error = action.error.message;
  Toast.show({ type: "error", text1: `${error}, try again!` });
  console.log(error);
};

const initialState = {
  userId: null,
  login: null,
  email: null,
  avatar: null,
  stateChange: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authStateChanged: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      login: payload.login,
      email: payload.email,
      stateChange: true,
      avatar: payload.avatar,
    }),
  },
  extraReducers: {
    [authSignUpUser.fulfilled](state, action) {
      state.userId = action.payload.uid;
      state.login = action.payload.displayName;
      state.email = action.payload.email;
      state.avatar = action.payload.photoURL;
      Toast.show({ type: "success", text1: `Welcome ${state.login}!` });
    },
    [authSignUpUser.rejected]: handleAuthRejected,

    [authSignInUser.fulfilled]() {
      Toast.show({ type: "success", text1: `Welcome ${state.login}!` });
    },
    [authSignInUser.rejected]: handleAuthRejected,
    [authSingOutUser.fulfilled](state) {
      state.userId = null;
      state.login = null;
      state.stateChange = false;
      state.email = null;
      state.avatar = null;
      Toast.show({ type: "success", text1: `Goodby!` });
    },
  },
});

export const authReducer = authSlice.reducer;
export const onStateChange = authSlice.actions.authStateChanged;
