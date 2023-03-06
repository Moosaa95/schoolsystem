import { api } from "./api";

export const authApiSlice = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      // query: (credentials) => ({
        query: (payload) => ({
        url: "/account/login",
        method: "POST",
        // body: { ...credentials },
        body: payload,
      }),
      invalidatesTags: (result, error, { username }) => [{ type: 'Login', username }],
    }),
    changePassword: builder.mutation({
      // query: (credentials) => ({
        query: (payload) => ({
        url: "/account/change_password",
        method: "POST",
        // body: { ...credentials },
        body: payload,
      }),
      invalidatesTags: (result, error, { username }) => [{ type: 'changePassword', username }],
    }),
  }),
});


export const {
    useLoginMutation, 
    useChangePasswordMutation,
} = authApiSlice