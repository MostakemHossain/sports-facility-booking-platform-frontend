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
  }),
});

export const {
  useCreateFacilityMutation,
  useGetAllFacilityQuery,
  useGetFacilityByIdQuery,
  useUpdateFacilityMutation,
} = facilityApi;
