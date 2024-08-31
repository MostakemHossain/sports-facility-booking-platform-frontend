import { baseApi } from "../../api/baseApi";

const contactApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllContact: builder.query({
      query: () => ({
        url: "/contact",
        method: "GET",
      }),
      providesTags: ["contact"],
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

export const { useCreateContactMutation, useGetAllContactQuery } = contactApi;
