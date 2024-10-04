import { baseApi } from "../../api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    google: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/google-login",
        method: "POST",
        body: userInfo,
      }),
    }),
    registerAUser: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/signup",
        method: "POST",
        body: userInfo,
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterAUserMutation,useGoogleMutation } = authApi;
