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
  }),
});

export const { useCreateBookingMutation } = bookingApi;
