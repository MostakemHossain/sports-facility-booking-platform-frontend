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
    deleteContact: builder.mutation({
      query: (id) => ({
        url: `/contact/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["contact"],
    }),
  }),
});

export const {
  useCreateContactMutation,
  useGetAllContactQuery,
  useDeleteContactMutation,
} = contactApi;
