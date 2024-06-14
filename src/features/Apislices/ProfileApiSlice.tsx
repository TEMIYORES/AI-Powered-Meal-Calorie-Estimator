import { apiSlice } from "../../app/api/apiSlice";

export const accountApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: (credentials) => ({
        url: `/profile/${credentials.email}`,
      }),
    }),
    saveProfile: builder.mutation({
      query: (credentials) => ({
        url: "/profile",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    getStudyPlan: builder.query({
      query: (credentials) => ({
        url: `/profile/generatestudyplan/${credentials.email}`,
      }),
    }),
    generateStudyPlan: builder.mutation({
      query: (credentials) => ({
        url: "/profile/generatestudyplan",
        method: "POST",
        body: { ...credentials },
      }),
    }),
    getSubjects: builder.query({
      query: (credentials) => ({
        url: `/profile/subjects/${credentials.email}`,
      }),
    }),
  }),
});

export const {
  useGetProfileQuery,
  useSaveProfileMutation,
  useGetStudyPlanQuery,
  useGenerateStudyPlanMutation,
  useGetSubjectsQuery,
} = accountApiSlice;
