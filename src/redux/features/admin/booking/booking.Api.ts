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
      query: (data) => ({
        url: "/bookings/user",
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateBookingMutation, useGetUserBookingQuery } = bookingApi;
