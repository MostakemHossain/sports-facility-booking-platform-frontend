import { baseApi } from "../../../api/baseApi";

const bookingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createBooking: builder.mutation({
      query: (data) => ({
        url: "/bookings/create-booking",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["booking"],
    }),
    getUserBooking: builder.query({
      query: () => ({
        url: "/bookings/user",
        method: "GET",
      }),
    }),
    getAllBooking: builder.query({
      query: () => ({
        url: "/bookings/admin",
        method: "GET",
      }),
      providesTags: ["booking"],
    }),
    updateBookingStatus: builder.mutation({
      query: ({ id, data }) => {
        return {
          url: `/bookings/admin/status/${id}`,
          method: "PUT",
          body: { status: data },
        };
      },
      invalidatesTags: ["booking"],
    }),
  }),
});

export const {
  useCreateBookingMutation,
  useGetUserBookingQuery,
  useGetAllBookingQuery,
  useUpdateBookingStatusMutation,
} = bookingApi;
