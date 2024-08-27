import { baseApi } from "../../api/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers: builder.query({
      query: () => ({
        url: "/auth/get-all-users",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    updateRole: builder.mutation({
      query: ({ id, data }) => ({
        url: `/auth/update/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useGetAllUsersQuery, useUpdateRoleMutation } = userApi;
