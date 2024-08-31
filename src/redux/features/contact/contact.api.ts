import { baseApi } from "../../api/baseApi";

const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/auth/get-all-users",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    createContact: builder.mutation({
      query: (data) => ({
        url: `/contact/create-contact`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["contact"],
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/auth/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useCreateContactMutation } = contactApi;
