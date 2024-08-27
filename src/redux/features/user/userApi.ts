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
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/auth/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
    profile: builder.query({
      query: () => ({
        url: `/auth/profile/me`,
        method: "GET",
      }),
      providesTags: ["my-profile"],
    }),
  }),
});

export const {
  useGetAllUsersQuery,
  useUpdateRoleMutation,
  useDeleteUserMutation,
  useProfileQuery,
} = userApi;
