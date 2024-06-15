import { apiSlice } from "../../app/api/apiSlice";

export const accountApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateSettingAccount: builder.mutation({
      query: (credentials) => ({
        url: `/settings/account`,
        method: "POST",
        body: credentials,
      }),
    }),
    updateSettingProfile: builder.mutation({
      query: (credentials) => ({
        url: "/settings/profile",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const {
  useUpdateSettingAccountMutation,
  useUpdateSettingProfileMutation,
} = accountApiSlice;
