import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/store/auth/authSlice";
import profileReducer from "../features/store/profile/profileSlice";
import { apiSlice } from "./api/apiSlice";
export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    profileData: profileReducer,
  },
  middleware: (getDefaultMiddleWare) =>
    getDefaultMiddleWare().concat(apiSlice.middleware),
  devTools: true,
});

export type RootState = ReturnType<typeof store.getState>;
