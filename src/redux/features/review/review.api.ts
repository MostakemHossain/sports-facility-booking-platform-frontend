import { baseApi } from "../../api/baseApi";

const createReview = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (data) => ({
        url: `/review/create-review`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["review"],
    }),
    getMyReviewsById: builder.query({
      query: (id) => ({
        url: `/review/my-reviews/${id}`,
        method: "GET",
      }),
      providesTags: ["review"],
    }),
    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/review/my-reviews/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["review"],
    }),
    updateReview: builder.mutation({
      query: ({ id, data }) => ({
        url: `/review/my-reviews/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["review"],
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useGetMyReviewsByIdQuery,
  useDeleteReviewMutation,
  useUpdateReviewMutation,
} = createReview;