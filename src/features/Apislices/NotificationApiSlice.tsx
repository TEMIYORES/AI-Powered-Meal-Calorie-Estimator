import { apiSlice } from "../../app/api/apiSlice";

export const notificationApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getNotifications: builder.query({
      query: (credentials) => ({
        url: `/notifications/${credentials.email}`,
      }),
    }),
    deleteNotifications: builder.mutation({
      query: (credentials) => ({
        url: `/notifications/delete`,
        method: "DELETE",
        body: { ...credentials },
      }),
    }),
  }),
});

export const {
  useGetNotificationsQuery,
  useDeleteNotificationsMutation,
} = notificationApiSlice;
