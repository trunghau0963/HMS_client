import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  valueAuth: authState;
};
type authState = {
  user: any | null;
  token: string | null;
};

const initialState = {
  valueAuth: {
    user: null,
    token: null,
  } as authState,
} as InitialState;
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      const { user, accessToken } = action.payload;
      state.valueAuth.user = user;
      state.valueAuth.token = accessToken;
    },
    logOut: (state, action) => {
      state.valueAuth.user = null;
      state.valueAuth.token = null;
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: any) => state.auth.user;
export const selectCurrentToken = (state: any) => state.auth.token;
