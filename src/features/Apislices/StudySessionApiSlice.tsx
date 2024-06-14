import { apiSlice } from "../../app/api/apiSlice";

export const LogSessionApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    logSession: builder.mutation({
      query: (credentials) => ({
        url: "/studysession",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    getStudyMins: builder.query({
      query: (credentials) => ({
        url: `/studysession/progress/${credentials.email}`,
      }),
    }),
    getStudySessions: builder.query({
      query: (credentials) => ({
        url: `/studysession/${credentials.email}/${credentials.timeRange}`,
      }),
    }),
  }),
});

export const {
  useLogSessionMutation,
  useGetStudySessionsQuery,
  useGetStudyMinsQuery,
} = LogSessionApiSlice;
