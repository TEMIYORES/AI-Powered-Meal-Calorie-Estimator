import { apiSlice } from "../../app/api/apiSlice";

export const chatApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    chats: builder.query({
      query: (credentials) => ({
        url: `/chats/${credentials.email}`,
      }),
    }),
    chatbotResponse: builder.mutation({
      query: (credentials) => ({
        url: "/chats",
        method: "POST",
        body: { ...credentials },
      }),
    }),
  }),
});

export const { useChatsQuery, useChatbotResponseMutation } = chatApiSlice;
