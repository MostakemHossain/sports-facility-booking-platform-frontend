import { baseApi } from "../../../api/baseApi";

const facilityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createFacility: builder.mutation({
      query: (data) => ({
        url: "/facility",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["facility"],
    }),
    getAllFacility: builder.query({
      query: (arg: Record<string, any>) => ({
        url: "/facility",
        method: "GET",
        params: arg,
      }),
      providesTags: ["facility"],
    }),
    getFacilityById: builder.query({
      query: (id) => ({
        url: `/facility/${id}`,
        method: "GET",
      }),
    }),
    updateFacility: builder.mutation({
      query: ({ id, data }) => ({
        url: `/facility/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["facility"],
    }),

    deleteFacility: builder.mutation({
      query: (id) => ({
        url: `/facility/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["facility"],
    }),
    getAvailableTimeSlots: builder.query({
      query: ({ facility, date }) => {
        console.log("Fetching available time slots for facility ID:", facility);
        console.log("Selected date:", date);
        return {
          url: `/check-availability`,
          params: { facility, date },
          method: "GET",
        };
      },
    }),
  }),
});

export const {
  useCreateFacilityMutation,
  useGetAllFacilityQuery,
  useGetFacilityByIdQuery,
  useUpdateFacilityMutation,
  useDeleteFacilityMutation,
  useGetAvailableTimeSlotsQuery,
} = facilityApi;
