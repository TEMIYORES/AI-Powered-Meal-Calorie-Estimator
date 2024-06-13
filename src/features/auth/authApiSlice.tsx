import { apiSlice } from "../../app/api/apiSlice";

export const accountApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAccount: builder.query({
      query: (credentials) => ({
        url: `/auth/${credentials.email}`,
      }),
    }),
    registerAccount: builder.mutation({
      query: (credentials) => ({
        url: "/auth/register",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    loginAccount: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    updateAccount: builder.mutation({
      query: (credentials) => ({
        url: "/auth",
        method: "PUT",
        body: { ...credentials },
      }),
    }),
  }),
});

export const {
  useRegisterAccountMutation,
  useUpdateAccountMutation,
  useLoginAccountMutation,
  useGetAccountQuery,
} = accountApiSlice;
