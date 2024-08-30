import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../../types";
import { RootState } from "../../store";

type TAuthToken = {
  token: string | null;
  user: User | null;
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
      state.user = action.payload.user as User | null;
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

export const useCurrentToken = (state: RootState) => state.auth.token;
export const useCurrentUser = (state: RootState): User | null =>
  state.auth.user;
