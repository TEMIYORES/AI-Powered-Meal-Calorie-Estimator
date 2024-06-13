import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../../app/store";
interface initialStateProps {
  currentUser: {
    fullName: string;
    email: string;
    profileSetup: boolean;
    photoURL: string;
    studyPlanSetup: boolean;
  } | null;
  userLoggedIn: boolean | null;
  loading: boolean | null;
}

const initialState: initialStateProps = {
  currentUser: null,
  userLoggedIn: false,
  loading: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (state, action) => {
      console.log("action.payload", action.payload);
      const user = action.payload;
      if (user) {
        state.currentUser = { ...state.currentUser, ...user };
        state.userLoggedIn = true;
        state.loading = false;
      }
    },
    removeAuth: () => {
      return initialState;
    },
  },
});

export const { setAuth, removeAuth } = authSlice.actions;
export default authSlice.reducer;
export const getCurrentUser = (state: RootState) => state.auth.currentUser;
export const getUserLoggedIn = (state: RootState) => state.auth.userLoggedIn;
