import { baseApi } from "../../../api/baseApi";

const employeeApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    deleteEmployee: builder.mutation({
      query: (id) => ({
        url: `/employee/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["employee"],
    }),
    getAllEmployee: builder.query({
      query: () => ({
        url: `/employee/get`,
        method: "GET",
      }),
      providesTags: ["employee"],
    }),
    createEmployee: builder.mutation({
      query: (formData) => {
        return {
          url: `/employee/create-employee`,
          method: "POST",
          body: formData,
          //   headers: {
          //     "Content-Type": "multipart/form-data",
          //   },
        };
      },
      invalidatesTags: ["employee"],
    }),
  }),
});

export const {
  useCreateEmployeeMutation,
  useDeleteEmployeeMutation,
  useGetAllEmployeeQuery,
} = employeeApi;
