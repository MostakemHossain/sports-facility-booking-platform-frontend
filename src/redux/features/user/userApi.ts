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
  }),
});

export const { useGetAllUsersQuery } = userApi;
