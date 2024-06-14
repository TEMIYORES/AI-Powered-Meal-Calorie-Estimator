import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";
import { removeAuth } from "../../features/store/auth/authSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://ai-powered-study-assistant.glitch.me/api",
  // baseUrl: "http://localhost:3600/api",
  credentials: "include",
});

const baseQueryWithRefreshToken = async (
  args: any,
  api: any,
  extraOptions: any
) => {
  let result = await baseQuery(args, api, extraOptions);
  //   if accessToken has expired
  if (result?.error?.status === 401) {
    // Request a new accessToken with the RefreshToken
    api.dispatch(removeAuth());
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithRefreshToken,
  endpoints: () => ({}),
});
