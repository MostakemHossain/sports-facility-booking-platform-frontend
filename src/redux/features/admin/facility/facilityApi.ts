import { baseApi } from "../../../api/baseApi";

const facilityApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createFacility: builder.mutation({
      query: (data) => ({
        url: "/facility",
        method: "POST",
        body: data,
      }),
    }),
    getAllFacility: builder.query({
      query: () => ({
        url: "/facility",
        method: "GET",
      }),
    }),
  }),
});

export const { useCreateFacilityMutation, useGetAllFacilityQuery } =
  facilityApi;
