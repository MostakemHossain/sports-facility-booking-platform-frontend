import { createSlice } from "@reduxjs/toolkit";

type TAuthToken = {
  token: string | null;
  user: null | object;
};

const initialState: TAuthToken = {
  user: null,
  token: null,
};
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
    setLogout: (state) => {
      state.user = null;
      state.token = null;
    },
  },
});

export const { setUser, setLogout } = authSlice.actions;
export default authSlice.reducer;
